import { typeDiscount, typeDiscountDetail } from '../types/discount';
import { defaultValueProductPrice } from './product';

export const defaultvalueDiscount: typeDiscount = {
    _id:  '',
    type: '',
    name: '',
    time_start: new Date(),
    time_end: new Date(),
    discount_detail: []
}
export const defaultValueDiscountDetail: typeDiscountDetail = {
    _id: '',
    id_discocunt: '',
    id_productPrice: defaultValueProductPrice,
    percent: 0,
    limit_product: "Không giới hạn",
    limit_customer: "Không giới hạn",
    status: true
}
