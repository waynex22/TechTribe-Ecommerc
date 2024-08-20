export type Notification = {
    _id: string,
    customerId: string,
    title: string,
    content: string,
    type: string,
    orderItemsId?: string | any,
    createdAt: string
}