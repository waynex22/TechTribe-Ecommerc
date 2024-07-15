import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { category } from '../../utils/types/category'

export const categorySlice = createApi({
  reducerPath: 'categoryQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getcategory: builder.query<category[], void>({
      query: () => `category`
    })
  })
})

export const { useGetcategoryQuery } = categorySlice