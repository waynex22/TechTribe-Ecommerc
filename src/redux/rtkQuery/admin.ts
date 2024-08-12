import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "src/config";

interface shopForAdmin {
    _id: string,
    id_customer: string[],
    name: string,
    thumbnail: string,
    countFollower: string,
    start: string,
    description: string
}

interface banShopForAdmin {
    id_banShopForAdmin: string,
    id_shop: string
    banStartDate: Date,
    banEndDate: Date,
    numberOfBan: number,
    reasonBan: string
}
export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    }),
    
    endpoints: (builder) => ({
        getAllShop: builder.query<shopForAdmin[], void>({
            query: () => '/shop',
        }),
        getBanShop: builder.query<banShopForAdmin[], void>({
            query: () => 'ban-shop'
        }),
        getBanShopByIdShop: builder.query<banShopForAdmin, string>({
            query: (id_shop: string) => `ban-shop/${id_shop}`
        }),
        getCheckStatusBanShop: builder.query({
            query: (id_shop: string) => `ban-shop/check-ban/${id_shop}`
        }),
        updateBanShop: builder.mutation({
            query: ({banShopData, id_shop}: {banShopData: {banStartDate: Date | "", banEndDate: Date | "", reasonBan:string};id_shop: string}) => ({
                url: `/ban-shop/${id_shop}`,
                body: banShopData,
                method: "PUT"
            })
        })
        
    })

    
})

export const {useGetCheckStatusBanShopQuery,useGetBanShopByIdShopQuery, useGetAllShopQuery, useGetBanShopQuery,useUpdateBanShopMutation} = adminApi