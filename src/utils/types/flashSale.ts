import { typeProductPriceResult } from "./product";

export type typeFlashSale = {
    _id?: string,
    id_shop?:string,
    time_start: Date,
    time_end: Date,
    status?: boolean,
    view?: number,
    number_reminders?: number,
    flashSale_detail?: typeFlashSaleDetailResult[],
}
export type typeFlashSaleDetail = {
    id_flashSale?: string,
    id_productPrice: string;
    percent: number;
    limit_product: number | "Không giới hạn";
    limit_customer: number | "Không giới hạn";
    status: boolean;
}

export type typeFlashSaleDetailResult = {
    _id?: string,
    id_flashSale?: string,
    id_productPrice: typeProductPriceResult;
    percent: number;
    limit_product: number | "Không giới hạn";
    limit_customer: number | "Không giới hạn";
    status: boolean;
}