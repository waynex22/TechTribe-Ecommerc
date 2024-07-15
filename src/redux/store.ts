import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../services/authApi';
import { userApi } from '../services/userApi';
import { categorySlice } from './rtkQuery/category';
import { categoryDetailSlice } from './rtkQuery/categoryDetail';
import { specificationsSlice } from './rtkQuery/specifications';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [categoryDetailSlice.reducerPath]: categoryDetailSlice.reducer,
    [specificationsSlice.reducerPath]: specificationsSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categorySlice.middleware)
      .concat(categoryDetailSlice.middleware)
      .concat(specificationsSlice.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// function authReducer(state: unknown, action: UnknownAction): unknown {
//   throw new Error("Function not implemented.");
// }

