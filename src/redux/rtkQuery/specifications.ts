import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { dataToCreateSpecification, dataToCreateSpecificationDetail, specifications, specificationsDetail } from '../../utils/types/specifications'

export const specificationsSlice = createApi({
  reducerPath: 'specificationsQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getspecifications: builder.query<specifications[], void>({
      query: () => `specifications`
    }),
    getspecificationsDetail: builder.query<specificationsDetail[], void>({
      query: () => `specification-detail`
    }),
    getSpecifiDetailByIdSpecifi: builder.query<specificationsDetail[], string>({
      query: (id_specifi: string) => `specification-detail/get-by-idspecifi/${id_specifi}`
    }),
    createSpecifi: builder.mutation({
      query: (name: dataToCreateSpecification) => ({
        url: 'specifications',
        method: "POST",
        body: name
      })
    }),
    createSpecifiDetail: builder.mutation({
      query: ({data, token}:{data: dataToCreateSpecificationDetail, token : string} ) => ({
        url: 'specification-detail',
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    })

    
  })
})

export const { useCreateSpecifiDetailMutation,useCreateSpecifiMutation,useGetSpecifiDetailByIdSpecifiQuery ,useGetspecificationsQuery, useGetspecificationsDetailQuery } = specificationsSlice