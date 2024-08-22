export type categoryDetail = {
    _id: string,
    id_category:string[],
    name: string,
    thumbnail: string,
    id_specification: string[],
    slug: string,
}

export const defaultValueCategoryDetail: categoryDetail = {
    _id: '',
    id_category:[],
    name: '',
    thumbnail: '',
    id_specification: [],
    slug: '',
}

export type createCategoryDetail = {
    id_category: string,
    name: string,
}

export type updateSpecifications = {
    _id: string,
    specifications: string[],
}
