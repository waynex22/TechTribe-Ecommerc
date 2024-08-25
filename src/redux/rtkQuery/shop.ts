import { createApi } from '@reduxjs/toolkit/query/react';
import requestApi from '../../helper/api';


const customBaseQuery = async ({ url, method, body, params }: { url: string, method: string, body?: object, params?: object }) => {
    try {
        const response = await requestApi(url, method, body || {});
        return { data: response.data };
    } catch (error: any) {
        return { error: { status: error.response?.status, data: error.response?.data } };
    }
};

interface payloadFollow {
    customerId: string,
    shopId: string
}
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
        follow: builder.mutation<any, payloadFollow>({
            query: (payloadFollow) => ({
                url: `customer-follow/follow/${payloadFollow.shopId}`,
                method: 'POST',
                body: payloadFollow
            }),
        }),
        countShop: builder.query({
            query: () => ({
                url: `shop/count-shop`,
                method: "GET"
            })
        }),
    }),
});

export const { useCountShopQuery,useGetShopQuery, useFollowMutation } = shopApi;
