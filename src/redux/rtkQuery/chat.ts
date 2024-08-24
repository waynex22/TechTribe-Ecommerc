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


export interface payload {
    user: any
}

export interface payloadGetDetailRoom {
    id: string
    id_customer: string,
    id_shop: string
}

export interface payloadSendMessage {
    id_room?: string
    id_customer: string
    id_shop: string
    content?: string
    thumbnail?: string
}
export const chatApi = createApi({
    reducerPath: 'chatQuery',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getRoomChat: builder.query<any, payload>({
            query: (payload) => ({
                url: `room-chat/customer`,
                method: 'GET',
                body: payload
            }),
        }),
        getRoomChatDetail: builder.query<any, payloadGetDetailRoom>({
            query: (payloadGetDetailRoom) => ({
                url: `room-chat/detailRoomChat/${payloadGetDetailRoom.id}`,
                method: 'GET',
                body: payloadGetDetailRoom,
            }),
            
        }),
        sendMessage: builder.mutation<any, payloadSendMessage>({
            query: (payload) => ({
                url: `messenger/newMess`,
                method: 'POST',
                body: payload
            }),
        })
    }),
});

export const { useGetRoomChatQuery  , useGetRoomChatDetailQuery, useSendMessageMutation} = chatApi;
