import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { defaultvalueDiscount } from "../../utils/default/discount";

export const fetchDiscount = createAsyncThunk('Discount/fetchDiscount', async () => {
    const response = await requestApi(`discount/shop/123`, 'GET', {})
    return response.data
})
export const fetchDiscountByID = createAsyncThunk(
    'Discount/fetchDiscountByID',
    async (id: string) => {
        const response = await requestApi(`discount/${id}`, 'GET', {});
        return response.data;
    }
);

const DiscountSlice = createSlice({
    name: 'Discount',
    initialState: {
        listDiscount: [defaultvalueDiscount],
        loading: false,
        discount: defaultvalueDiscount
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDiscount.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDiscount.fulfilled, (state, action) => {
                state.loading = false
                state.listDiscount = action.payload
            })
            .addCase(fetchDiscount.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchDiscountByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDiscountByID.fulfilled, (state, action) => {
                state.loading = false
                state.discount = action.payload
            })
            .addCase(fetchDiscountByID.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectListDiscount = (state: RootState) => state.discount.listDiscount
export const SelectDiscount = (state: RootState) => state.discount.discount
export const SelectLoadingDiscount = (state: RootState) => state.discount.loading
export default DiscountSlice.reducer