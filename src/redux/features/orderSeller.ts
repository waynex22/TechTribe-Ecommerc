import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { typeItemOrder } from "../../utils/types/orderSeller";

export const fetchListOrderByShop = createAsyncThunk('items-order/shop/id', async () => {
    const response = await requestApi(`items-order/shop/idShop`, 'GET', {})
    return response.data
})
export const fetchOrderByID = createAsyncThunk(
    'items-order',
    async (id: string) => {
        const response = await requestApi(`items-order/${id}`, 'GET', {});
        return response.data;
    }
);

const OrderSlice = createSlice({
    name: 'ItemOrder',
    initialState: {
        listItemOrder: [] as typeItemOrder[],
        loading: false,
        itemOrder: {} as typeItemOrder,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchListOrderByShop.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchListOrderByShop.fulfilled, (state, action) => {
                state.loading = false
                state.listItemOrder = action.payload
            })
            .addCase(fetchListOrderByShop.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchOrderByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchOrderByID.fulfilled, (state, action) => {
                state.loading = false
                state.itemOrder = action.payload
            })
            .addCase(fetchOrderByID.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectListOrderByShop = (state: RootState) => state.order.listItemOrder
export const SelectItemOrder = (state: RootState) => state.order.itemOrder
export const SelectLoadingOrder = (state: RootState) => state.order.loading
export default OrderSlice.reducer