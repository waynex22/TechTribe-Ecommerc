import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { defaultValueProduct } from "../../utils/default/product";

export const fetchProductByIdShop = createAsyncThunk('product/fetchProductByIdShop', async (id:string) => {
    const response = await requestApi(`product/shop/${id}`, 'GET', {})
    return response.data
})
export const fetchProductById = createAsyncThunk('product/fetchProductById', async (id:string) => {
    const response = await requestApi(`product/${id}`, 'GET', {})
    return response.data
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        productByIdShop: [defaultValueProduct],
        product: defaultValueProduct,
        loading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProductByIdShop.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductByIdShop.fulfilled, (state, action) => {
                state.loading = false
                state.productByIdShop = action.payload
            })
            .addCase(fetchProductByIdShop.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchProductById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectProductByIdShop = (state: RootState) => state.product.productByIdShop
export const SelectProduct = (state: RootState) => state.product.product
export default productSlice.reducer