import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../services/authApi';
import { categorySlice } from './rtkQuery/category';
import { categoryDetailSlice } from './rtkQuery/categoryDetail';
import { specificationsSlice } from './rtkQuery/specifications';
import { productSclice } from './rtkQuery/product';
import { authSlice } from './rtkQuery/auth';
import shopReducer  from './features/shop'
import productReducer  from './features/product'
import voucherReducer  from './features/voucher'
import flashSaleReducer  from './features/flashSale'
import roomChatReducer  from './features/message'
import OrderReducer  from './features/orderSeller'
import AutoReplyReducer  from './features/autoReplyMessage'
import MessageShortCutReducer  from './features/messageShortCut'
import ReviewReducer  from './features/productReviewSeller'
import NotificationReducer  from './features/notification'
import DiscountReducer  from './features/discount'


export const store = configureStore({
  reducer: {
    shop: shopReducer,
    product: productReducer,
    voucher: voucherReducer,
    flashSale: flashSaleReducer,
    roomChat: roomChatReducer,
    order: OrderReducer,
    autoReply: AutoReplyReducer,
    messageShortCut: MessageShortCutReducer,
    review: ReviewReducer,
    notification: NotificationReducer,
    discount: DiscountReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [productSclice.reducerPath]: productSclice.reducer,
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
                                                                                