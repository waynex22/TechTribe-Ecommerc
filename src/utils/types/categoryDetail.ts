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
