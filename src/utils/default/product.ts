import { typeProduct, typeProductPriceResult } from "../types/product"

export const defaultValueProduct: typeProduct = {
    _id: '',
    code: '',
    name:  '',
    id_shop: [''],
    id_categoryDetail: [],
    thumbnails: [''],
    description:  '',
    view: 0,
    product_specifications: [],
    variation_color: [],
    variation_size: [],
    product_price: [],
    banned: false,
    unlisted: false
}

export const defaultValueProductPrice: typeProductPriceResult = {
    _id: '',
    id_product: [],
    id_color: [],
    id_size: [],
    price: 0,
    stock: 0,
}