import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "src/config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (formData: FormData) => ({
        url: "update",
        method: "POST",
        body: formData,
      }),
    }),
    updatePasswordUser: builder.mutation({
      query: ({passworData, token}: {passworData: {old_password: string, new_password:string};token: string}) => ({
        url: "customer/change-pass",
        method: "PATCH",
        body: passworData,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
    }),
    addAddress: builder.mutation({
      query: ({addressData, token}: {addressData: {fullName: string, phoneNumber:string, address: string, addressType: boolean, province: string, district: string, ward: string, customerId: string}, token: string}) => ({
        url: "/address",
        method: "POST",
        body: addressData,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
    }),

    getAddressByIdCustomer: builder.mutation({
      query: (idCustomer: {idCustomer: string}) => ({
        url: `/address/customer/${idCustomer.idCustomer}`,
        method: "GET"
      })
    }),

    deleteAddress: builder.mutation({
      query: (idAddress: {idAddress: string}) => ({
        url: `/address/${idAddress.idAddress}`,
        method: "DELETE"
      })
    }),

    setDefaultAddress: builder.mutation({
      query: (setDefaultAddressData: {customerId:string, addressId :string}) => ({
        url: '/address/default/',
        method: "PATCH",
        body: setDefaultAddressData,
      })
    }),

    getAddressById: builder.mutation({
      query: (addressId: {addressId : string}) => ({
        url: `/address/byaddressid/${addressId.addressId}`,
        method: "GET"
      })
    }),
    getAddressByUserId: builder.query< any, string>({
      query: (id) => ({
        url: `/address/customer/${id}`,
        method: "GET"
      })
    }),
    updateAddress: builder.mutation({
      query: ({addressData,addressId}: {addressData: {fullName: string, phoneNumber:string, address: string, addressType: boolean, province: string, district: string, ward: string,}, addressId: string}) => ({
        url: `/address/${addressId}`,
        method: "PUT",
        body: addressData
      })
    })
  }),
});

export const {useUpdateAddressMutation ,useUpdateUserMutation, useUpdatePasswordUserMutation, useAddAddressMutation, useGetAddressByIdCustomerMutation, useDeleteAddressMutation, useSetDefaultAddressMutation, useGetAddressByIdMutation, useGetAddressByUserIdQuery } = userApi;
