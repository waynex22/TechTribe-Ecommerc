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

export const customerRewardApi = createApi({
    reducerPath: 'customerRewardQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getcustomerReward: builder.query({
            query: (customerId) => ({
                url: `customer-reward/${customerId}`,
                method: 'GET',
            })
        }),
        addCoinRefund: builder.mutation({
            query: (payload: any) => ({
                url: `customer-reward/refund/${payload.customerId}`,
                method: 'PATCH',
                body: payload.coin,
            }),
        }),
    }),
});

export const { useGetcustomerRewardQuery , useAddCoinRefundMutation} = customerRewardApi;
