import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { categoryDetail } from '../../utils/types/categoryDetail'

export const categoryDetailSlice = createApi({
  reducerPath: 'categoryDetailQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getcategoryDetail: builder.query<categoryDetail[], void>({
      query: () => `category-detail`
    }),
    getcategoryDetailById: builder.query<categoryDetail, string>({
      query: (id) => `category-detail/${id}`
    })
  })
})

export const { useGetcategoryDetailQuery,useGetcategoryDetailByIdQuery } = categoryDetailSlice