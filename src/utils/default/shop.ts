import { TypeIdentification, TypeShop } from "../types/shop";

export const defaultValueShop: TypeShop = {
    _id: '',
    id_customer: [''],
    name: '',
    thumbnail: '',
    count_follower: 0,
    star: 0,
    AddressShop: [{
            _id: '',
            id_shop: '',
            province: '',
            district: '',
            ward: '',
            address: '',
        }]
}

export const defaultValueIdentification: TypeIdentification = {
    id_shop: '',
    type_card: '',
    full_name: '',
    CCCD_number: '',
    CCCD_photo: '',
}