import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { typeNotification } from "../../utils/types/notification";

export const fetchNotification = createAsyncThunk('Notification', async () => {
    const response = await requestApi(`notification/shop/123`, 'GET', {})
    return response.data
})

const NotificationSlice = createSlice({
    name: 'Notification',
    initialState: {
        loading: false,
        notification: [] as typeNotification[],
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchNotification.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchNotification.fulfilled, (state, action) => {
                state.loading = false
                state.notification = action.payload
            })
            .addCase(fetchNotification.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectNotification = (state: RootState) => state.notification.notification
export const SelectLoadingNotification = (state: RootState) => state.notification.loading
export default NotificationSlice.reducer