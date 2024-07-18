import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { categorySlice } from './rtkQuery/category';
import { categoryDetailSlice } from './rtkQuery/categoryDetail';
import { specificationsSlice } from './rtkQuery/specifications';
import { authSlice } from './rtkQuery/auth'
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import { productSclice } from './rtkQuery/product';
import { cartApi } from './rtkQuery/cart';
export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [productSclice.reducerPath]: productSclice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [categoryDetailSlice.reducerPath]: categoryDetailSlice.reducer,
    [specificationsSlice.reducerPath]: specificationsSlice.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
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
      .concat(cartApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
                                                                                