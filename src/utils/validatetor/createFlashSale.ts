import { typeFlashSale, typeFlashSaleDetail } from "../types/flashSale";
import { validateTimeStart_End } from "./validateTime";

export interface FormErrorsFlashSale {
    time?: string,
    percent?: string,
}
export const validateFormFlashSale = (FormFlashSale: typeFlashSale ,FormFlashSaleDetail: typeFlashSaleDetail[]): FormErrorsFlashSale => {
    let errors: FormErrorsFlashSale = {};

    if (!FormFlashSale.time_start) {
        errors.time = errors.time = 'Vui lòng chọn thời gian!'
    }
    const errtime = validateTimeStart_End(FormFlashSale.time_start, FormFlashSale.time_end)
    if(errtime.end_time)
        errors.time = 'Vui lòng chọn thời gian!'

    if(FormFlashSaleDetail.filter((item) => item.percent === 0 || item.percent > 50).length > 0 )
        errors.percent = 'Giảm ít nhất 1% và bé hơn 50%'

    return errors;
};