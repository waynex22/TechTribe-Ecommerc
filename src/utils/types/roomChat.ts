import { typeCustomer } from "./customer"
import { typeProduct } from "./product"
import { TypeShop } from "./shop"

export type typeRoomChat = {
    _id: string,
    id_customer: typeCustomer,
    id_shop: TypeShop,
    id_lastMess: typeMessage,
    messenger: typeMessage[]
}

export type typeMessage = {
    _id: string,
    id_roomChat: string,
    id_sender: string,
    senderType: string,
    isWatched: boolean,
    created_at: string,
    content?: string,
    thumbnail?: string,
    video?: string,
    id_product?: typeProduct,
    id_order?: string,
}