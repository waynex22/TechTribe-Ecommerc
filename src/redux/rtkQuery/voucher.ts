import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../config';
import { Voucher } from '../../utils/types/voucher';

export const voucherApi = createApi({
    reducerPath: 'voucherQuery',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        getVoucher: builder.query<Voucher[], string>({
            query: () => ({
                url: `voucher`,
                method: 'GET'
            })
        }),
    })
})
export const { useGetVoucherQuery } = voucherApi;