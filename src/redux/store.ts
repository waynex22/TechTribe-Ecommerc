import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { categorySlice } from './rtkQuery/category';
import { categoryDetailSlice } from './rtkQuery/categoryDetail';
import { specificationsSlice } from './rtkQuery/specifications';
import { authSlice } from './rtkQuery/auth'
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import { productSclice } from './rtkQuery/product';
// import { cartSlice } from './rtkQuery/cart';
import { userApi } from './rtkQuery/user_customers';
import { cartApi } from './rtkQuery/cart';
import { orderApi } from './rtkQuery/order';
import { searchApi } from './rtkQuery/search';
import { voucherApi } from './rtkQuery/voucher';
export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productSclice.reducerPath]: productSclice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [categoryDetailSlice.reducerPath]: categoryDetailSlice.reducer,
    [specificationsSlice.reducerPath]: specificationsSlice.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [voucherApi.reducerPath]: voucherApi.reducer,
    auth: authReducer,
    cart: cartReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(productSclice.middleware)
      .concat(categorySlice.middleware)
      .concat(categoryDetailSlice.middleware)
      .concat(specificationsSlice.middleware)
      // .concat(cartSlice.middleware)
      .concat(userApi.middleware)
      .concat(cartApi.middleware)
      .concat(searchApi.middleware)
      .concat(voucherApi.middleware)
      .concat(orderApi.middleware),

});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// function authReducer(state: unknown, action: UnknownAction): unknown {
//   throw new Error("Function not implemented.");
// }

