export type Notification = {
    _id: string,
    customerId: string,
    title: string,
    content: string,
    type: string,
    orderItemsId?: string | any,
    createdAt: string
}

import { typeItemOrder } from "./orderSeller"

export type typeNotification = {
    _id: string,
    title: string,
    content: string,
    createdAt: string,
    customerId: string,
    read: boolean,
    type: string,
    orderItemsId?: typeItemOrder
}