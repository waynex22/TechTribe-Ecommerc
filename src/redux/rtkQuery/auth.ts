import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../slices/authSlice';
import { apiUrl } from '../../config';
import { setLoginByToken } from '../../utils/localStorage/token';
import { cartApi } from './cart';

interface LoginRequest {
  phone: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  phone: string;
  password: string;
}

export const authSlice = createApi({
  reducerPath: 'authQuery',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}` }),
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.access_token) {
            setLoginByToken(data);
            dispatch(authSlice.endpoints.getInfoUser.initiate());
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    }),
    register: builder.mutation<any, RegisterRequest>({
      query: (credentials: RegisterRequest) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if(data.status === 200)
            setTimeout(() => {
              dispatch(authSlice.endpoints.login.initiate({ phone: args.phone, password: args.password }));
            }, 1000);
        } catch (error) {
          console.log('error', error);
        }
      }
    }),
    refreshToken: builder.mutation<any, string>({
      query: (refreshToken: string) => ({
        url: 'auth/refresh-token',
        method: 'POST',
        body: { refreshToken: refreshToken },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setLoginByToken(data);
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    getInfoUser: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data }));
          dispatch(cartApi.endpoints.getCartMe.initiate(data.sub));
        } catch (error) {
          if (error) {
            dispatch(logout());
          }
        }
      },
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useGetInfoUserMutation } = authSlice;
