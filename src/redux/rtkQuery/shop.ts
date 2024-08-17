import { createApi } from '@reduxjs/toolkit/query/react';
import requestApi from '../../helper/api';


const customBaseQuery = async ({ url, method, body }: { url: string, method: string, body?: object }) => {
    try {
        const response = await requestApi(url, method, body || {});
        return { data: response.data };
    } catch (error: any) {
        return { error: { status: error.response?.status, data: error.response?.data } };
    }
};

export const shopApi = createApi({
    reducerPath: 'shopQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getShop: builder.query<any, string>({
            query: (id) => ({
                url: `shop/store/${id}`,
                method: 'GET'
            }),
        }),
    }),
});

export const { useGetShopQuery } = shopApi;
