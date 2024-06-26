import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponse {
  token: string;
}
interface RegisterRequest {
    name: string,
    phone: string,
    password: string
}
interface RegisterResponse {
  name: string,
    phone: string,
    password: string
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL_API}/auth/` }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterRequest, RegisterResponse>({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
    })
  }),
});

export const { useLoginMutation , useRegisterMutation } = authApi;