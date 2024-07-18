import { createApi } from '@reduxjs/toolkit/query/react';
import requestApi from '../../helper/api';
import { Cart } from '../../utils/types/cart';
import { setCart } from '../slices/cartSlice';

export interface UpdateCartPayload {
    customerId: string;
    productPriceId: string;
    quantity: number;
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
                    console.log('fetch');
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
    }),
});

export const { useGetCartMeQuery, useUpdateCartMutation, useDeleteCartMutation } = cartApi;
