import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../redux/slices/authSlice';
import { apiUrl } from '../config';
import { setLoginByToken } from '../utils/localStorage/token';
interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface RegisterRequest {
  name: string;
  phone: string;
  password: string;
}

interface RegisterResponse {
  name: string;
  phone: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}` }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials: RegisterRequest) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
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
          console.log(data);
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
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data }));
      },
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useGetInfoUserMutation } = authApi;
