import { createApi } from '@reduxjs/toolkit/query/react';
import requestApi from '../../helper/api';
import { Cart } from '../../utils/types/cart';
import { setCart } from '../slices/cartSlice';
import { get } from 'http';

export interface UpdateCartPayload {
    shopId: string;
    customerId: string;
    items: {
        productPriceId: string;
        quantity: number;
        discountDetailId?: string;
    };
}
export interface UpdateCartSelect {
    customerId: string;
    productPriceId: string;
    shopId?: string;
}
export interface SelectAllCart {
    customerId: string;
    type: string;
    listProductSelect: any ;
}
interface DeleteCartPayload {
    customerId: string;
    productId: string;
}

const customBaseQuery = async ({ url, method, body }: { url: string, method: string, body?: object }) => {
    try {
        const response = await requestApi(url, method, body || {});
        return { data: response.data };
    } catch (error: any) {
        return { error: { status: error.response?.status, data: error.response?.data } };
    }
};

export const cartApi = createApi({
    reducerPath: 'cartQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getCartMe: builder.query<Cart, string>({
            query: (id) => ({
                url: `cart/${id}`,
                method: 'GET'
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCart({ cart: data }));
                } catch (error) {
                    console.log('error', error);
                }
            }
        }),
        updateCart: builder.mutation<Cart, UpdateCartPayload>({
            query: (payload) => ({
                url: `cart/${payload.customerId}`,
                method: 'PATCH',
                body: payload
            }),
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(cartApi.endpoints.getCartMe.initiate(payload.customerId));
                } catch (error) {
                    console.log('error', error);
                }
            }
        }),
        deleteCart: builder.mutation<Cart, DeleteCartPayload>({
            query: (payload) => ({
                url: `cart/${payload.customerId}`,
                method: 'DELETE',
                body: payload
            }),
        }),
        getCartSelect: builder.query<any, string>({
            query: (id) => ({
                url: `cart-select/${id}`,
                method: 'GET'
            }),
        }),
        updateCartSelect: builder.mutation<Cart, UpdateCartSelect>({
            query: (payload) => ({
                url: `cart-select/${payload.customerId}`,
                method: 'PATCH',
                body: payload
            }),
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(cartApi.endpoints.getCartMe.initiate(payload.customerId));
                } catch (error) {
                    console.log('error', error);
                }
            }
        }),
        selectAllCart: builder.mutation<Cart, SelectAllCart>({
            query: (payload) => ({
                url: `cart-select/select-all/${payload.customerId}`,
                method: 'PATCH',
                body: payload
            }),
        }),
        removeChildItem: builder.mutation<Cart, UpdateCartSelect>({
            query: (payload) => ({
                url: `cart/remove-child-item/${payload.customerId}`,
                method: 'PATCH',
                body: payload
            }),
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(cartApi.endpoints.getCartMe.initiate(payload.customerId));
                } catch (error) {
                    console.log('error', error);
                }
            }
        })
    }),
});

export const { useGetCartMeQuery, useUpdateCartMutation, useDeleteCartMutation, useUpdateCartSelectMutation, useGetCartSelectQuery, useRemoveChildItemMutation, useSelectAllCartMutation } = cartApi;
