import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { categorySlice } from './rtkQuery/category';
import { categoryDetailSlice } from './rtkQuery/categoryDetail';
import { specificationsSlice } from './rtkQuery/specifications';
import { authApi } from '../services/authApi';
import { authSlice } from './rtkQuery/auth'
import authReducer from './slices/authSlice';
import { productSclice } from './rtkQuery/product';
import { cartSlice } from './rtkQuery/cart';
import shopReducer  from './features/shop'
import discountReducer  from './features/discount'
import productReducer  from './features/product'
import voucherReducer  from './features/voucher'
import flashSaleReducer  from './features/flashSale'
import roomChatReducer  from './features/message'

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    discount: discountReducer,
    product: productReducer,
    voucher: voucherReducer,
    flashSale: flashSaleReducer,
    roomChat: roomChatReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [productSclice.reducerPath]: productSclice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [categoryDetailSlice.reducerPath]: categoryDetailSlice.reducer,
    [specificationsSlice.reducerPath]: specificationsSlice.reducer,
    [cartSlice.reducerPath]: cartSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(productSclice.middleware)
      .concat(categorySlice.middleware)
      .concat(categoryDetailSlice.middleware)
      .concat(specificationsSlice.middleware)
      .concat(cartSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
                                                                                