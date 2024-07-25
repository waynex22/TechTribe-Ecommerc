export type typeCreateVoucher = {
    case?: string,
    _id?: string,
    id_product: string[];
    type: string;
    name: string;
    code: string;
    time_start: Date;
    time_end: Date;
    percent: number;
    maximum_reduction: number;
    minimum_order_value: number;
    maximum_total_usage: number;
    number_of_uses: number;
}