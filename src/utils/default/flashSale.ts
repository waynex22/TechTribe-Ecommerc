import { typeFlashSale,  typeFlashSaleDetailResult } from "../types/flashSale"
import { defaultValueProductPrice } from "./product"


export const defaultvalueFlashSale: typeFlashSale = {
    _id:  '',
    id_shop: '',
    time_start: new Date(),
    time_end: new Date(),
    status: true,
    view: 0,
    number_reminders: 0,
}
export const defaultValueFlashSaleDetail: typeFlashSaleDetailResult = {
    _id: '',
    id_flashSale: '',
    id_productPrice: defaultValueProductPrice,
    percent: 0,
    limit_product: "Không giới hạn",
    limit_customer: "Không giới hạn",
    status: true
}
