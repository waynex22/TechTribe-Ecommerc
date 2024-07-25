import { typeProductPriceResult } from "./product";

export type typeCreaeteDiscount = {
    type: string;
    name: string;
    id_productPrice: string;
    percent: number;
    limit_product: number | "Không giới hạn";
    limit_customer: number | "Không giới hạn";
    time_start: Date;
    time_end: Date;
    status: boolean;
}

export type typeDiscount = {
    _id: string,
    type:string,
    name:string,
    time_start: Date,
    time_end: Date,
    discount_detail: typeDiscountDetail[]
}

export type typeDiscountDetail = {
    _id: string,
    id_discocunt: string,
    id_productPrice: typeProductPriceResult,
    percent: number,
    limit_product: number | "Không giới hạn";
    limit_customer: number | "Không giới hạn";
    status: boolean
}