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

export const walletApi = createApi({
    reducerPath: 'walletQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getWalletByCustomer: builder.query({
            query: (walletId) => ({
                url: `wallet/customer/${walletId}`,
                method: 'GET',
            })
        }),
        getTransactions: builder.query({
            query: (walletId) => ({
                url: `wallet-transactions/wallet/${walletId}`,
                method: 'GET',
            })
        })
    }),
});

export const { useGetWalletByCustomerQuery, useGetTransactionsQuery } = walletApi;
