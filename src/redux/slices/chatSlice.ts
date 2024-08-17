import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
interface shopSelect {
  shopId: string,
  shopName: string
}
const initialState = {
    chat: false,
    shopSelected: null as shopSelect | null,
    status: "idle",
    error: null,
    message: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
       setOpen: (state, action: PayloadAction<boolean>) => {
         state.chat = action.payload;
       },
       setShopSelected: (state, action: PayloadAction<{shopId: string , shopName: string}>) => {
         state.shopSelected = action.payload;
       },
       setCloseChat: (state) => {
         state.chat = false;
       }
    },
    extraReducers: (builder) => {
        
      },
});
export const { setOpen, setShopSelected, setCloseChat } = chatSlice.actions;
export default chatSlice.reducer;