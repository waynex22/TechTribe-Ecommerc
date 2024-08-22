import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../config';
import requestApi from '../helper/api';

interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}auth/` }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
export const GetInfoUser = async () => {
  const res = await requestApi('auth/profile', 'GET', {})
  return res.data
}
export const { useLoginMutation } = authApi;
