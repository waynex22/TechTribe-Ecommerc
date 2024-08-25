import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { typeProductReview } from "../../utils/types/productReviewSeller";

export const fetchListReview = createAsyncThunk('product-review/shop/id', async () => {
    const response = await requestApi(`product-review/shop/idShop`, 'GET', {})
    return response.data
})

const ReviewSlice = createSlice({
    name: 'review',
    initialState: {
        listReview: [] as typeProductReview[],
        loading: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchListReview.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchListReview.fulfilled, (state, action) => {
                state.loading = false
                state.listReview = action.payload
            })
            .addCase(fetchListReview.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectListReview = (state: RootState) => state.review.listReview
export const SelectLoadingReview = (state: RootState) => state.review.loading
export default ReviewSlice.reducer