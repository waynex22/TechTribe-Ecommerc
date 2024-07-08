import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_URL_API}/user/`,
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (formData: FormData) => ({
        url: "update",
        method: "POST",
        body: formData,
      }),
    }),
    updatePasswordUser: builder.mutation({
      query: (formData: FormData) => ({
        url: "updatepassword",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useUpdatePasswordUserMutation } = userApi;
