import axios, { AxiosRequestConfig } from "axios";
import { apiUrl } from "../config";
import { setLoginByToken, setLogout } from "../utils/localStorage/token";

const defaultHeaders = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*",
};

export default function requestApi(
    endpoint: string, 
    method: string, 
    body: object, 
    contenType?: string,
    responseType: AxiosRequestConfig['responseType'] = 'json'
) {
    if(contenType){
        defaultHeaders["Content-Type"] = contenType
    }
    const token = localStorage.getItem('access_token');
    const headers = token ? { ...defaultHeaders, "Authorization": `Bearer ${token}` } : { ...defaultHeaders };
    

    const instance = axios.create({ headers });
    
    instance.interceptors.response.use((response: any) => {
        return response;
    }, async (error: any) => {
        const originalRequest = error.config;
        console.log(error.response);
        
        if (error.response && error.response.status === 499 ) {
            console.log('access token expired');
            try {
                const refresh_token = localStorage.getItem('refresh_token');
                
                if (!refresh_token) throw new Error('refresh token not found'); 
                const result = await instance.post(`${apiUrl}auth/refresh-token`, { refreshToken: refresh_token });
                setLoginByToken(result.data)
                originalRequest.headers['Authorization'] = `Bearer ${result.data.access_token}`;
                console.log('refresh token success');
                return instance(originalRequest);        
            } catch (err) {
                setLogout()
                window.location.href = '/';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    })

    return instance.request({
        method: method,
        url: `${apiUrl}${endpoint}`,
        data: body,
        responseType: responseType
    });
}
