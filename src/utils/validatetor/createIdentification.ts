import { TypeIdentification } from "../types/shop"

export interface FormErrorsIdentification {
    CCCD_photo?: string,
    full_name?: string,
    CCCD_number?: string,
}
export const validateFormIdentification = (FormData: TypeIdentification): FormErrorsIdentification => {
    let errors: FormErrorsIdentification = {};

    if (!FormData.full_name?.trim()) {
        errors.full_name = 'Điền chính sát họ tên theo căn cước của bạn';
    } else if (!vietnameseNameRegex.test(FormData.full_name)) {
        errors.full_name = 'Tên chỉ chứa các ký tự tiếng Việt hợp lệ';
    }
  
    if (!FormData.CCCD_number) {
        errors.CCCD_number = `Vui lòng nhập ${FormData.type_card}`;
    }else {
        if(
            (FormData.type_card === 'Căn Cước Công Dân (CCCD)' && FormData.CCCD_number.length !== 12) ||
            (FormData.type_card === 'Chứng Minh Nhân Dân (CMND)' && FormData.CCCD_number.length !== 12) 
    ){
            errors.CCCD_number = `Số ${FormData.type_card} không hợp lệ`;
        }
    }
  
    if (!FormData.CCCD_photo) {
        errors.CCCD_photo = 'Vui lòng chọn ảnh';
    }
  
    return errors;
};

export const vietnameseNameRegex = /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/