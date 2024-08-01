import { typeFormCreateProduct } from "../types/product";

const validationConfig = {
    thumbnails: {
        required: 'Chọn ít nhất 1 ảnh.',
    },
    nameProduct: {
        required: 'Tên sản phẩm không được trống.',
    },
    category: {
        required: 'Danh mục không được để trống.',
    },
    description: {
        required: 'Mô tả không được để trống.',
    },
    variation: {
        required: 'Phân loại không được để trống.',
    },
    price: {
        required: 'Giá tiền không được để trống.',
    },
};

export interface FormErrorsProduct {
    thumbnails?: string;
    nameProduct?: string;
    category?: string;
    description?: string;
    variation?: string;
    price?: string;
}
export const validateFormProduct = (FormData: typeFormCreateProduct): FormErrorsProduct => {
    let errors: FormErrorsProduct = {};
    if (!FormData.files) {
        errors.thumbnails = validationConfig.thumbnails.required;
    }
    if (!FormData.name?.trim()) {
        errors.nameProduct = validationConfig.nameProduct.required;
    }

    if (!FormData.id_categoryDetail) {
        errors.category = validationConfig.category.required;
    }

    if (!FormData.description?.trim()) {
        errors.description = validationConfig.description.required;
    }


    if (!FormData.variation || !Object.keys(FormData.variation).length) {
        console.log(FormData.variation);
        errors.variation = validationConfig.variation.required;
    }

    if (FormData.variation) {
        for (const [attributeType, details] of Object.entries(FormData.variation)) {
            const existingNames = new Set<string>();
            let hasDuplicateNames = false;

            details.forEach(detail => {
                if (existingNames.has(detail.name)) {
                    hasDuplicateNames = true;
                } else {
                    existingNames.add(detail.name);
                }
            });

            if (hasDuplicateNames) {
                errors.variation = `Tên trong thuộc tính ${attributeType} không được trùng nhau.`;
                break;
            }
        }
    }

    if (!FormData.productPrice || !FormData.productPrice.length) {
        errors.price = validationConfig.price.required;
    }
    return errors;
};

export const validateFormProductVariation = (FormData: typeFormCreateProduct): FormErrorsProduct => {
    let errors: FormErrorsProduct = {};

    if (FormData.variation) {
        for (const [attributeType, details] of Object.entries(FormData.variation)) {
            const existingNames = new Set<string>();
            let hasDuplicateNames = false;

            details.forEach(detail => {
                if (existingNames.has(detail.name)) {
                    hasDuplicateNames = true;
                } else {
                    existingNames.add(detail.name);
                }
            });

            if (hasDuplicateNames) {
                errors.variation = `Tên trong thuộc tính ${attributeType} không được trùng nhau.`;
                break;
            }
        }
    }
    return errors;
};