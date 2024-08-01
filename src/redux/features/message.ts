import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { typeRoomChat } from "../../utils/types/roomChat";

export const fetchListRoomByShop = createAsyncThunk('roomChat/fetchRoomChat', async () => {
    const response = await requestApi(`room-chat/shop`, 'GET', {})
    return response.data
})
export const fetchRoomChatByID = createAsyncThunk(
    'RoomChat/fetchRoomChatByID',
    async (id: string) => {
        const response = await requestApi(`room-chat/detail/${id}`, 'GET', {});
        return response.data;
    }
);

const RoomChatSlice = createSlice({
    name: 'RoomChat',
    initialState: {
        listRoomChatByShop: [] as typeRoomChat[],
        loading: false,
        RoomChatDetail: {} as typeRoomChat,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchListRoomByShop.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchListRoomByShop.fulfilled, (state, action) => {
                state.loading = false
                state.listRoomChatByShop = action.payload
            })
            .addCase(fetchListRoomByShop.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchRoomChatByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchRoomChatByID.fulfilled, (state, action) => {
                state.loading = false
                state.RoomChatDetail = action.payload
            })
            .addCase(fetchRoomChatByID.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectListRoomChatByShop = (state: RootState) => state.roomChat.listRoomChatByShop
export const SelectRoomChatDetail = (state: RootState) => state.roomChat.RoomChatDetail
export const SelectLoadingRoomChat = (state: RootState) => state.roomChat.loading
export default RoomChatSlice.reducer