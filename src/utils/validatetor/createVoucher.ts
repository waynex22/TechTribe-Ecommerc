import { typeCreateVoucher } from "../types/voucher";
import { validateTimeStart_End } from "./validateTime";

export interface FormErrorsVoucher {
    id_product?: string;
    type?: string;
    name?: string;
    code?: string;
    time_start?: string;
    time_end?: string;
    percent?: string;
    maximum_reduction?: string;
    minimum_order_value?: string;
    maximum_total_usage?: string;
    number_of_uses?: string;
}
export const validateFormVoucher = (FormData: typeCreateVoucher): FormErrorsVoucher => {
    let errors: FormErrorsVoucher = {};

    if (!FormData.name?.trim()) 
        errors.name = 'Tên chương trình không được để trống';
    
    if (!FormData.code) 
        errors.code = 'Hãy điền mã giảm giá';

    if(!FormData.percent)
        errors.percent = 'Không được để trống';
  
    const errtime = validateTimeStart_End(FormData.time_start, FormData.time_end)
    if(errtime.end_time)
        errors.time_end = errtime.end_time
    if(errtime.start_time)
        errors.time_start = errtime.start_time

    if (!FormData.maximum_reduction) 
        errors.maximum_reduction = 'Hãy điền mức giảm tối đa';
    
    if (!FormData.minimum_order_value) 
        errors.minimum_order_value = 'Không được để trống';
    
    if (!FormData.maximum_total_usage) 
        errors.maximum_total_usage = 'Không được để trống';
        
    if (!FormData.number_of_uses) 
        errors.number_of_uses = 'Không được để trống';

    if(FormData.case === '2')
        if(FormData.id_product.length === 0)
            errors.id_product = 'Không được để trống';
    return errors;
};