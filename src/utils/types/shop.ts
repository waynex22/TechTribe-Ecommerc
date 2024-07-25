export type TypeShop = {
    _id: string,
    id_customer: string[],
    name: string,
    thumbnail: string,
    count_follower: number,
    star: number,
    description?: string,
    address?: string,
}

export type TypeIdentification = {
    id_shop?: string,
    type_card: string,
    full_name: string,
    CCCD_number: string,
    CCCD_photo: string,
}