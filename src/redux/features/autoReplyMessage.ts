import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { TypeAutoReply } from "src/utils/types/autoReplyMessage";

export const fetchAutoReply = createAsyncThunk('auto-reply/shop/id', async () => {
    const response = await requestApi(`auto-reply`, 'GET', {})
    return response.data
})

const AutoReplySlice = createSlice({
    name: 'ItemOrder',
    initialState: {
        loading: false,
        autoReply: {} as TypeAutoReply,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAutoReply.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAutoReply.fulfilled, (state, action) => {
                state.loading = false
                state.autoReply = action.payload
            })
            .addCase(fetchAutoReply.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectAutoReply = (state: RootState) => state.autoReply.autoReply
export const SelectLoadingAutoReply = (state: RootState) => state.autoReply.loading
export default AutoReplySlice.reducer