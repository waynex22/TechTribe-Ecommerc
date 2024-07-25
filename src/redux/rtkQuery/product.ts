import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { product } from '../../utils/types/product'

export const productSclice = createApi({
  reducerPath: 'productQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getProduct: builder.query<product[], void>({
      query: () => `product`
    })
  })
})

export const { useGetProductQuery } = productSclice;