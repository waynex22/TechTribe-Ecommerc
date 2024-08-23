import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../services/authApi';
import { categorySlice } from './rtkQuery/category';
import { categoryDetailSlice } from './rtkQuery/categoryDetail';
import { specificationsSlice } from './rtkQuery/specifications';

import shopReducer  from './features/shop'
import productReducer  from './features/product'
import voucherReducer  from './features/voucher'
import flashSaleReducer  from './features/flashSale'
import roomChatReducer  from './features/message'
import OrderReducer  from './features/orderSeller'

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    product: productReducer,
    voucher: voucherReducer,
    flashSale: flashSaleReducer,
    roomChat: roomChatReducer,
    order: OrderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [categoryDetailSlice.reducerPath]: categoryDetailSlice.reducer,
    [specificationsSlice.reducerPath]: specificationsSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categorySlice.middleware)
      .concat(categoryDetailSlice.middleware)
      .concat(specificationsSlice.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
                                                                                