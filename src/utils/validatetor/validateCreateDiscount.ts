import { typeCreaeteDiscount } from "../types/discount";
import { validateTimeStart_End } from "./validateTime";

export interface FormErrorsDiscount {
    name?: string,
    time_end?: string,
    time_start?: string,
    percent?: string,
}
export const validateFormDiscount = (FormData: typeCreaeteDiscount[]): FormErrorsDiscount => {
    let errors: FormErrorsDiscount = {};

    if (!FormData[0].name?.trim()) {
        errors.name = 'Hãy điền tên chương trình';
    }
    if (!FormData[0].time_start) {
        errors.time_start = 'Hãy điền thời gian bắt đầu';
    }
    if (!FormData[0].time_end) {
        errors.time_end = 'Hãy điền thời gian kết thúc';
    }
    const errtime = validateTimeStart_End(FormData[0].time_start,FormData[0].time_end)
    if(errtime.end_time)
        errors.time_end = errtime.end_time
    if(errtime.start_time)
        errors.time_start = errtime.start_time

    if(FormData.filter((item) => item.percent === 0 || item.percent > 50).length > 0 )
        errors.percent = 'Giảm ít nhất 1% và bé hơn 50%'

    return errors;
};