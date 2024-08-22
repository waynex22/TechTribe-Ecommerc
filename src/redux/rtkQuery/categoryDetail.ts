import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { categoryDetail, createCategoryDetail, updateSpecifications } from '../../utils/types/categoryDetail'

export const categoryDetailSlice = createApi({
  reducerPath: 'categoryDetailQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getcategoryDetail: builder.query<categoryDetail[], void>({
      query: () => `category-detail`
    }),
    getcategoryDetailById: builder.query<categoryDetail, string>({
      query: (id) => `category-detail/${id}`
    }),
    getcategoryDetailByIdCategory: builder.query<categoryDetail[], string>({
      query: (id_category ) => `category-detail/${id_category}`
    }),
    createCategoryDetail: builder.mutation({
      query: (createData: createCategoryDetail) => ({
        url: 'category-detail',
        method: "POST",
        body: createData
      })
    }),
    updateSpecifications: builder.mutation({
      query: (updateData: updateSpecifications) => ({
        url: "category-detail/update-specification",
        method: "PATCH",
        body: updateData
      })
    }),
    getSpecificationsById: builder.query<string[],string>({
      query: (id: string) => `category-detail/find-specification/${id}`
    }),
    getCategoryChild: builder.mutation<categoryDetail[], string>({
      query: (id: string) => ({
        url: `category-detail/find-idcategory/${id}`, 
        method: "GET"
      })
    })
  })
})

export const {useGetCategoryChildMutation ,useGetSpecificationsByIdQuery,useUpdateSpecificationsMutation,useCreateCategoryDetailMutation,useGetcategoryDetailByIdCategoryQuery ,useGetcategoryDetailQuery,useGetcategoryDetailByIdQuery } = categoryDetailSlice