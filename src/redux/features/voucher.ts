import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { defaultValueVoucher } from "../../utils/default/voucher";

export const fetchVoucherByIdShop = createAsyncThunk('Voucher/fetchVoucherByIdShop', async (idShop: string) => {
    const response = await requestApi(`voucher/shop/${idShop}`, 'GET', {})
    return response.data
})
export const fetchVoucherByID = createAsyncThunk(
    'Voucher/fetchVoucherByID',
    async (id: string) => {
        const response = await requestApi(`voucher/${id}`, 'GET', {});
        return response.data;
    }
);

const VoucherSlice = createSlice({
    name: 'Voucher',
    initialState: {
        listVoucher: [defaultValueVoucher],
        loading: false,
        voucher: defaultValueVoucher
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchVoucherByIdShop.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchVoucherByIdShop.fulfilled, (state, action) => {
                state.loading = false
                state.listVoucher = action.payload
            })
            .addCase(fetchVoucherByIdShop.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchVoucherByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchVoucherByID.fulfilled, (state, action) => {
                state.loading = false
                state.voucher = action.payload
            })
            .addCase(fetchVoucherByID.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectVoucher = (state: RootState) => state.voucher.voucher
export const SelectListVoucher = (state: RootState) => state.voucher.listVoucher
export const SelectLoadingVoucher = (state: RootState) => state.voucher.loading
export default VoucherSlice.reducer