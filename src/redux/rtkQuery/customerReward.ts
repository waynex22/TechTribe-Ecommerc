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
                url: `customerReward/${customerId}`,
                method: 'GET',
            })
        }),
    }),
});

export const { useGetcustomerRewardQuery } = customerRewardApi;
