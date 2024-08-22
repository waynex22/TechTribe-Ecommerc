import { vietnameseNameRegex } from "./createIdentification";

export interface FormErrorsProfileShop {
    name?: string, 
    description?: string,
    thumbnail?: string
}
export const validateFormProfileShop = (FormData: { name: string, description: string | undefined, thumbnail: string }): FormErrorsProfileShop => {
    let errors: FormErrorsProfileShop = {};
    
    if (!FormData.name || !FormData.name.trim()) {
        errors.name = 'Tên không được để trống';
    } else if (!vietnameseNameRegex.test(FormData.name)) {
        errors.name = 'Tên chỉ chứa các ký tự tiếng Việt hợp lệ';
    }
  
    return errors;
};