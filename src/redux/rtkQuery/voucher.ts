import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../config';
import { Voucher, Voucher2t } from '../../utils/types/voucher';

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
        }),
        getVoucher2t: builder.query<Voucher2t[], string>({
            query: () => ({
                url: `admin-voucher`,
                method: 'GET'
            })
        }),
    })
})
export const { useGetVoucherQuery, useGetVoucherByShopQuery, useGetVoucher2tQuery } = voucherApi;