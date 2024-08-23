import { typeCustomer } from "./customer"
import { TypeShop } from "./shop"

export type typeItemOrder = {
    _id: string,
    customerId: typeCustomer,
    shopId: TypeShop,
    orderId: {
        _id: string,
        address: {
            _id: string,
            customerId: string,
            fullName: string,
            phoneNumber: string,
            address: string,
            addressType: string,
            isDefault: string,
            province: string,
            district: string,
            ward: string,
        }
        voucher2t: null,
        coin: number,
        methodPayment: string,
        total: number,
    },
    items: typeProductPriceOrder[],
    costShipping: number,
    total: number,
    subTotal: number,
    discount: number,
    discount2t: number,
    coin: number,
    voucherShopId: null,
    statusShipping: string,
    status: string,
    DeliveryTime: Date,
    statusUpdate: {
        key: string,
        value: Date,
        _id: string
    }[],
    created: Date,
    updated: Date,

}

export type typeAddress = {
    address: string,
    ward: string,
    district: string,
    province: string,
}

type typeProductPriceOrder = {
    productPriceId: typeProductPriceIdOrder,
    quantity: number,
    discountDetailId: null
}


type typeProductPriceIdOrder = {
    _id: string,
    id_product: {
        _id: string,
        name: string,
        thumbnails: string[],
    }[],
    id_color: {
        _id: string,
        id_product: string[],
        thumbnail: string,
        value:string,
    }[],
    id_size: {
        _id: string,
        id_product: string[],
        value:string,
    }[],
    price: number,
    stock: number
}