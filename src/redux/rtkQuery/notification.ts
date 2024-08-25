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

export const notificationApi = createApi({
    reducerPath: 'NotificationQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: (customerId) => ({
                url: `notification/customer/${customerId}`,
                method: 'GET',
            })
        }),
        readNotification: builder.mutation({
            query: (id) => ({
                url: `notification/read/${id}`,
                method: 'PATCH',
            })
        }),
    }),
});

export const { useGetNotificationQuery, useReadNotificationMutation } = notificationApi;
