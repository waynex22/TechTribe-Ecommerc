import { TypeIdentification, TypeShop } from "../types/shop";

export const defaultValueShop: TypeShop = {
    _id: '',
    id_customer: [''],
    name: '',
    thumbnail: '',
    count_follower: 0,
    star: 0,
}

export const defaultValueIdentification: TypeIdentification = {
    id_shop:  '',
    type_card:  '',
    full_name:  '',
    CCCD_number:  '',
    CCCD_photo:  '',
}