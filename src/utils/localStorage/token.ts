import { typeReturnLogin } from "../types/login";

const setToken = ( key: string, value:string ) => {
    localStorage.setItem(key, value);
}
const getToken = ( key: string ) => {
    return localStorage.getItem(key);
}
const removeToken = ( key: string ) => {
    localStorage.removeItem(key);
}
const setLoginByToken = (loginData : typeReturnLogin) => {
    setToken('access_token', loginData.access_token);
    setToken('refresh_token', loginData.refresh_token);
}
const setLogout = () => {
    removeToken('access_token')
    removeToken('refresh_token')
}
const setIdOrderNotComplete = (id: string) => {
    setToken('idOrderNotComplete', id);
}
const getIdOrderNotComplete = () => {
    return getToken('idOrderNotComplete');
}
const removeIdOrderNotComplete = () => {
    removeToken('idOrderNotComplete');
}
export { setToken, getToken, removeToken , setLoginByToken , setLogout, setIdOrderNotComplete, removeIdOrderNotComplete , getIdOrderNotComplete};