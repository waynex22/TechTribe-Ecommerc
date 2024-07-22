import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import requestApi from '../../helper/api';
import { HistorySearch } from '../../utils/types/historySearchh';

export interface updateHistoryPayload {
    customerId: string
    value: string
}
const customBaseQuery = async ({ url, method, body }: { url: string, method: string, body?: object }) => {
    try {
        const response = await requestApi(url, method, body || {});
        return { data: response.data };
    } catch (error: any) {
        return { error: { status: error.response?.status, data: error.response?.data } };
    }
};
export const searchApi = createApi({
    reducerPath: 'searchQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        searchQuery: builder.mutation<any, string>({
        query: (query) => ({
            url: `search-query?q=${query}`,
            method: 'GET'
        })
        }),
        getHistory: builder.query<any, void>({
            query: (id) => ({
                url: `history-search/${id}`,
                method: 'GET'
            })
        }),
        updateHistory: builder.mutation<HistorySearch, updateHistoryPayload>({
            query: (payload) => ({
                url: `history-search/${payload.customerId}`,
                method: 'patch',
                body: payload
            })
        })
    }),
});
export const { useSearchQueryMutation , useGetHistoryQuery, useUpdateHistoryMutation} = searchApi;
