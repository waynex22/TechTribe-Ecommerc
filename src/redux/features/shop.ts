import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { defaultValueIdentification, defaultValueShop } from "../../utils/default/shop";

export const fetchShop = createAsyncThunk('shop/fetchShop', async () => {
    const response = await requestApi(`shop/123`, 'GET', {})
    return response.data
})
export const fetchIdentification = createAsyncThunk('shop/fetchIdentification', async () => {
    const response = await requestApi(`identification/123`, 'GET', {})
    return response.data
})


const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shop: defaultValueShop,
        loading: false,
        identification: defaultValueIdentification,
        loaddingIdentifcation: false
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

            .addCase(fetchIdentification.pending, (state) => {
                state.loaddingIdentifcation = true
            })
            .addCase(fetchIdentification.fulfilled, (state, action) => {
                state.identification = action.payload
                state.loaddingIdentifcation = false
            })
            .addCase(fetchIdentification.rejected, (state, action) => {
                state.loaddingIdentifcation = true
                console.log(action.error);
            })
    }
})

export const SelectShop = (state: RootState) => state.shop.shop
export const SelectIdentification = (state: RootState) => state.shop.identification
export const SelectLoadingShop = (state: RootState) => state.shop.loading
export const SelectLoadingIdentification = (state: RootState) => state.shop.loaddingIdentifcation
export default shopSlice.reducer