import { createApi } from '@reduxjs/toolkit/query/react';
import requestApi from '../../helper/api';
import { Order } from '../../utils/types/order';
import { setIdOrderNotComplete } from '../../utils/localStorage/token';

export interface createSubOrderPayload {
    customerId: string;
    status?: string;
    address?: string;
    shipping?: string;
    voucherShop?: string;
    voucher2t?: string;
    coin?: number;
    coinRefunt?: number;
    costShipping?: number;
    voucherShipping?: string;
    methodPayment?: string;
    items: { productPriceId: string; quantity: number }[]
}
export interface UpdateSubOrderPayload {
    id: string | any;
    customerId?: string | any;
    status?: string;
    address?: string;
    shipping?: string;
    voucherShop?: string;
    voucher2t?: string;
    coin?: number;
    coinRefunt?: number;
    costShipping?: number;
    voucherShipping?: string;
    methodPayment?: string;
    items?: { productPriceId: string; quantity: number }[];
    total?: number;
}
const customBaseQuery = async ({ url, method, body }: { url: string, method: string, body?: object }) => {
    try {
        const response = await requestApi(url, method, body || {});
        return { data: response.data };
    } catch (error: any) {
        return { error: { status: error.response?.status, data: error.response?.data } };
    }
};

export const orderApi = createApi({
    reducerPath: 'orderQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getSubOrder: builder.query<Order | any, string>({
            query: (id) => ({
                url: `sub-order/${id}`,
                method: 'GET'
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // console.log('fetch');
                } catch (error) {
                    console.log('error', error);
                }
            }
        }),
        createSubOrder: builder.mutation<any, createSubOrderPayload>({
            query: (payload) => ({
                url: 'sub-order',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    setIdOrderNotComplete(result.data.data._id);
                } catch (error) {
                    console.log('error', error);
                }
            }
        }),
        UpdateSubOrderDto: builder.mutation<any, UpdateSubOrderPayload>({
            query: (payload) => ({
                url: `sub-order/${payload.id}`,
                method: 'PATCH',
                body: payload
            })
        }),
        deleteSubOrder: builder.mutation<any, string>({
            query: (id) => ({
                url: `sub-order/${id}`,
                method: 'DELETE'
            })
        })
    }),
});

export const { useGetSubOrderQuery, useCreateSubOrderMutation, useDeleteSubOrderMutation , useUpdateSubOrderDtoMutation } = orderApi;
