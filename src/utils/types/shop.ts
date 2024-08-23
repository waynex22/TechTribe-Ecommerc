export type TypeShop = {
    _id: string,
    id_customer: string[],
    name: string,
    thumbnail: string,
    count_follower: number,
    star: number,
    description?: string,
    AddressShop: typeAddressShop[]
}

export type TypeIdentification = {
    id_shop?: string,
    type_card: string,
    full_name: string,
    CCCD_number: string,
    CCCD_photo: string,
}

export type typeAddressShop = {
    _id: string,
    id_shop: string,
    province: string,
    district: string,
    ward: string,
    address: string,
}