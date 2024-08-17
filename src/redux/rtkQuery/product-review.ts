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

interface PayloadReview {
    customerId: string;
    productId: string;
    productPriceId: string;
    rating: number;
    content: string;
    images: string[] | any;
    videos: string[] | any;
}
interface UpdateStatusTime {
    id: string;
    key: string;
    value: Date;
}
export const productReviewApi = createApi({
    reducerPath: 'productReviewQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        addReview: builder.mutation<any, PayloadReview>({
            query: (payload) => ({
                url: `product-review`,
                method: 'POST',
                body: payload
            }),
        }),
        updateStatusTime: builder.mutation<any, UpdateStatusTime>({
            query: (payload) => ({
                url: `items-order/updateStatusTime`,
                method: 'PATCH',
                body: payload
            }),
            
        }),
        getProductReviewByProduct: builder.query<any, string>({
            query: (id) => ({
                url: `product-review/product/${id}`,
                method: 'GET'
            }),
        })
    }),
});

export const { useAddReviewMutation , useUpdateStatusTimeMutation, useGetProductReviewByProductQuery} = productReviewApi;
