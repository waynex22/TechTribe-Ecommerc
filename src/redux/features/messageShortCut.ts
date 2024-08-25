import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { TypeMessageShortCut } from "src/utils/types/messageShortCut";

export const fetchMessageShorCut = createAsyncThunk('message-short-cut', async () => {
    const response = await requestApi(`message-short-cut`, 'GET', {})
    return response.data
})
export const fetchMessageShorCutSample = createAsyncThunk('message-short-cut/sample', async () => {
    const response = await requestApi(`message-short-cut/admin/sample`, 'GET', {})
    return response.data
})
export const fetchMessageShortCutByID = createAsyncThunk(
    'items-message-by-id',
    async (id: string) => {
        const response = await requestApi(`message-short-cut/${id}`, 'GET', {});
        return response.data;
    }
);

const MessageShortCut = createSlice({
    name: 'messageShortCut',
    initialState: {
        loading: false,
        messageShortCut: [] as TypeMessageShortCut[],
        messageSampleContentd: {} as TypeMessageShortCut,
        messShortCutById: {} as TypeMessageShortCut,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMessageShorCut.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMessageShorCut.fulfilled, (state, action) => {
                state.loading = false
                state.messageShortCut = action.payload
            })
            .addCase(fetchMessageShorCut.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchMessageShorCutSample.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMessageShorCutSample.fulfilled, (state, action) => {
                state.loading = false
                state.messageSampleContentd = action.payload
            })
            .addCase(fetchMessageShorCutSample.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchMessageShortCutByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMessageShortCutByID.fulfilled, (state, action) => {
                state.loading = false
                state.messShortCutById = action.payload
            })
            .addCase(fetchMessageShortCutByID.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectMessageShortCut = (state: RootState) => state.messageShortCut.messageShortCut
export const SelectMessageShortCutSample = (state: RootState) => state.messageShortCut.messageSampleContentd
export const SelectMessageShortCutByID = (state: RootState) => state.messageShortCut.messShortCutById
export const SelectLoadingMessageShortCut = (state: RootState) => state.messageShortCut.loading
export default MessageShortCut.reducer