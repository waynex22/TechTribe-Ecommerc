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
        getVoucherByShop: builder.query<Voucher[], string>({
            query: (id) => ({
                url: `voucher/shop/${id}`,
                method: 'GET'
            })
        })
    })
})
export const { useGetVoucherQuery, useGetVoucherByShopQuery } = voucherApi;