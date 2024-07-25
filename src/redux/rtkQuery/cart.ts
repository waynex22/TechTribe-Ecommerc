import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../config';
import { Cart } from '../../utils/types/cart';

interface UpdateCartPayload {
    customerId: string;
    productId: string;
    quantity: number;
}
interface DeleteCartPayload {
    customerId: string;
    productId: string;
}
export const cartSlice = createApi({
    reducerPath: 'cartQuery',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: builder => ({
        getCartMe: builder.query<Cart, void>({
            query: (id) => `cart/${id}`,
        }),
        updateCart: builder.mutation<any, UpdateCartPayload>({
            query: ({ customerId ,productId, quantity }) => ({
                url: `cart/${customerId}`,
                method: 'PATCH',
                body: {
                    productId,
                    quantity
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(cartSlice.endpoints.getCartMe.initiate());
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }
            }),
        deleteChildItemCart: builder.mutation<any, DeleteCartPayload>({
            query: ({ customerId, productId }) => ({
                url: `cart/${customerId}/${productId}`,
                method: 'PATCH',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(cartSlice.endpoints.getCartMe.initiate());
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }
        }),
        removeCart : builder.mutation<any, string>({
            query: (id) => ({
                url: `cart/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(cartSlice.endpoints.getCartMe.initiate());
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }
        })
    }),

})

export const { useGetCartMeQuery, useUpdateCartMutation, useDeleteChildItemCartMutation, useRemoveCartMutation } = cartSlice;