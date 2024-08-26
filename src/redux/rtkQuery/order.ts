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
        getOrderByUserId: builder.query<any, string>({
            query: (id) => ({
                url: `items-order/customer/${id}`,
                method: 'GET'
            })
        })
        ,
        getOrderById: builder.query<any, string>({
            query: (id) => ({
                url: `items-order/${id}`,
                method: 'GET'
            })
        })
        ,
        createOrder: builder.mutation<any, any>({
            query: (payload) => ({
                url: 'order',
                method: 'POST',
                body: payload
            })
        })
        ,
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
        }),
        updateItemsSubOrder: builder.mutation<any, any>({
            query: (payload) => ({
                url: `items-sub-order/${payload._id}`,
                method: 'PATCH',
                body: payload
            })
        }),
        updateItemsOrder: builder.mutation<any, any>({
            query: (payload) => ({
                url: `items-order/${payload._id}`,
                method: 'PATCH',
                body: payload
            })
        }),
        cancelOrder: builder.mutation<any, any>({
            query: (payload) => ({
                url: `items-order/cancel/${payload._id}`,
                method: 'POST',
            })
        }),
        getAllOrder: builder.query<any, void>({
            query: () => ({
                url: 'items-order',
                method: 'GET'
            })
        }),
        returnOrder: builder.mutation<any, any>({
            query: (payload) => ({
                url: `return-order`,
                method: 'POST',
                body: payload
            })
        }),
        getReturnOrderByItemOrderId: builder.query<any, string>({
            query: (id: string) => ({
                url: `return-order/items-order/${id}`,
                method: 'GET'
            })
        }),
        deliveryFailed: builder.mutation<any, any>({
            query: (id) => ({
                url: `items-order/deliveryFailed/${id}`,
                method: 'POST',
            })
        }),
        getReturnOrder: builder.query<any, void>({
            query: () => ({
                url: `return-order`,
                method: 'GET'
            })
        }),
        updateReturnOrder: builder.mutation<any, any>({
            query: (payload) => ({
                url: `return-order/${payload.id}`,
                method: 'PATCH',
                body: payload
            })
        })
    }),
});

export const { useGetSubOrderQuery, useCreateSubOrderMutation, useDeleteSubOrderMutation , useUpdateSubOrderDtoMutation, useUpdateItemsSubOrderMutation, useCreateOrderMutation, useGetOrderByUserIdQuery, useGetOrderByIdQuery , useUpdateItemsOrderMutation, useCancelOrderMutation, useGetAllOrderQuery, useReturnOrderMutation, useGetReturnOrderByItemOrderIdQuery, useDeliveryFailedMutation, useGetReturnOrderQuery, useUpdateReturnOrderMutation } = orderApi;
