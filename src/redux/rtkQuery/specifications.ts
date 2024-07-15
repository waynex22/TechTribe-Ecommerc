import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config'
import { specifications, specificationsDetail } from '../../utils/types/specifications'

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
    
  })
})

export const { useGetspecificationsQuery, useGetspecificationsDetailQuery } = specificationsSlice