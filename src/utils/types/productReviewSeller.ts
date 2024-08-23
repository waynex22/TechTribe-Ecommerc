import { typeCustomer } from "./customer"
import { typeProduct, typeProductPriceResult } from "./product"

export type typeProductReview = {
    _id: string,
    productId: typeProduct,
    productPriceId: typeProductPriceResult,
    customerId: typeCustomer,
    content: string,
    images: string[],
    rating: number,
    created: string,
    ProductReviewReply: typeProductReviewReply[]
}

export type typeProductReviewReply = {
    _id: string,
    id_productReview: string,
    id_shop: string,
    content: string,
    images: string[],
    created: string
}