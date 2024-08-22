import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { category } from '../../utils/types/category'
import { url } from 'inspector'

export const categorySlice = createApi({
  reducerPath: 'categoryQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getcategory: builder.query<category[], void>({
      query: () => `category`
    }),
    createCategory: builder.mutation({
      query: (formdata: FormData) => ({
        url: `category`,
        method: "POST",
        body: formdata
      })
    })
  })
})

export const { useCreateCategoryMutation,useGetcategoryQuery } = categorySlice