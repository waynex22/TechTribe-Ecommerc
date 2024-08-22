import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { defaultvalueFlashSale} from "../../utils/default/flashSale";

export const fetchFlashSaleByIdShop = createAsyncThunk('FlashSale/fetchFlashSaleByIdShop', async (idShop: string) => {
    const response = await requestApi(`flash-sale/shop/${idShop}`, 'GET', {})
    return response.data
})
export const fetchFlashSaleByID = createAsyncThunk(
    'FlashSale/fetchFlashSaleByID',
    async (id: string) => {
        const response = await requestApi(`flash-sale/${id}`, 'GET', {});
        return response.data;
    }
);

const FlashSaleSlice = createSlice({
    name: 'flashSale',
    initialState: {
        listFlashSale: [defaultvalueFlashSale],
        loading: false,
        flashSale: defaultvalueFlashSale
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchFlashSaleByIdShop.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchFlashSaleByIdShop.fulfilled, (state, action) => {
                state.loading = false
                state.listFlashSale = action.payload
            })
            .addCase(fetchFlashSaleByIdShop.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchFlashSaleByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchFlashSaleByID.fulfilled, (state, action) => {
                state.loading = false
                state.flashSale = action.payload
            })
            .addCase(fetchFlashSaleByID.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectFlashSale = (state: RootState) => state.flashSale.flashSale
export const SelectListFlashSale = (state: RootState) => state.flashSale.listFlashSale
export const SelectLoadingFlashSale = (state: RootState) => state.flashSale.loading
export default FlashSaleSlice.reducer