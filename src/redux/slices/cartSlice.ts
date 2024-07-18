import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const initialState = {
    cart: [],
    status: "idle",
    error: null,
    message: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
       setCart: (state, action: PayloadAction<any>) => {
           state.cart = action.payload
       }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state: any) => {
          state.cart = null;
        });
      },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
