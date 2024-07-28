export type Voucher = {
    _id: string
    id_shop: string
    id_product: string[]
    type: string
    name: string
    code: string
    time_start: string
    time_end: string
    percent: number
    maximum_reduction: number
    minimum_order_value: number
    maximum_total_usage: number
    number_of_uses: number
    created: Date
}