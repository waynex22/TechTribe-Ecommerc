import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { product } from '../../utils/types/product'

export const productSclice = createApi({
  reducerPath: 'productQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getProduct: builder.query<product[], void>({
      query: () => `product`
    }),
    getProductById: builder.query<product, string>({
      query: (id) => `product/${id}`
    }),
    getProductByCategory: builder.query<product[], string>({
      query: (id) => `product/category/${id}`
    }),
    getProductByShop: builder.query<product[], string>({
      query: (id) => `product/shop/${id}`
    }),
    getProductBySearch: builder.query<product[], string>({
      query: (name) => `product/search/${name}`
    }),
    getProductByPrice: builder.query<product[], string>({
      query: (price) => `product/price/${price}`
    }),
    countProduct: builder.query({
      query: () => `product/count-product`
    })
    })
  })

export const {useCountProductQuery ,useGetProductQuery , useGetProductByIdQuery , useGetProductByCategoryQuery , useGetProductByShopQuery , useGetProductBySearchQuery , useGetProductByPriceQuery} = productSclice;