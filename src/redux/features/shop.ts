import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { defaultValueShop } from "../../utils/default/shop";

export const fetchShop = createAsyncThunk('shop/fetchShop', async () => {
    const response = await requestApi(`shop/123`, 'GET', {})
    return response.data
})


const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shop: defaultValueShop,
        loading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchShop.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchShop.fulfilled, (state, action) => {
                state.loading = false
                state.shop = action.payload
            })
            .addCase(fetchShop.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectShop = (state: RootState) => state.shop.shop
export default shopSlice.reducer