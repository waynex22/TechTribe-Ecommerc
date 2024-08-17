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

interface AdminVoucherDataToCreate {
    type: string;
  
    name: string;
  
    code: string;
  
    time_start: Date | '';
  
    time_end: Date | '';
  
    percent: number;
  
    maximum_reduction: number;
  
    minimum_order_value: number;
  
    maximum_total_usage: number;
  
    is_public: boolean;
  }

export  interface AdminVoucherDataToGet {
    _id: string,
    type: string;
  
    name: string;
  
    code: string;
  
    time_start: Date | '';
  
    time_end: Date | '';
  
    percent: number;
  
    maximum_reduction: number;
  
    minimum_order_value: number;
  
    maximum_total_usage: number;
  
    is_public: boolean;

    id_customer: string[]
  }
export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    }),
    
    endpoints: (builder) => ({
        deleteAdminVoucher: builder.mutation({
            query: (_id: string) => ({
                url: `/admin-voucher/${_id}`,
                method: "DELETE"
            })
        }),
        getAllVoucherAdmin: builder.query<AdminVoucherDataToGet[],unknown> ({
            query: () => '/admin-voucher',
        }),
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
        }),

        createAdminVoucher: builder.mutation({
            query: ({data, token}: {data: AdminVoucherDataToCreate, token: string}) => ({
                url: '/admin-voucher',
                body: data,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        })

        
    })

    
})

export const {useDeleteAdminVoucherMutation ,useGetAllVoucherAdminQuery,useCreateAdminVoucherMutation,useGetCheckStatusBanShopQuery,useGetBanShopByIdShopQuery, useGetAllShopQuery, useGetBanShopQuery,useUpdateBanShopMutation} = adminApi