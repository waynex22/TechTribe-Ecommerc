import { categoryDetail } from "./categoryDetail";

export type typeFormCreateProduct = {
    id_product:string,
    files: File[],
    name:string,
    id_categoryDetail:string,
    description:string,
    specifications: typeSpecifications[],
    variation: TypeVariation
    productPrice: typeProductPrice[]
}
export type product = {
    id_shop: string[],
    thumnnails: string[],
    name:string,
    id_category:string,
    description:string,
    view:number,
    specifications?: typeSpecifications[],
    variation?:TypeVariation[]
}
export type typeSpecifications = {
    [key: string]: string;
};
export type TypeVariation = {
    [key:string] : detail_variation[];
}
type detail_variation = {
    name:string,
    thumbnail?: string,
}
  
export type typeProductSpecification = {
    _id: string,
    id_shop: string[],
    id_specifications: string[],
    id_specifications_detail:string[],
}

export type typeProductPrice = {
    _id?: string,
    name_color?:string,
    name_size?: string,
    price?:number,
    stock?: number
}

export type typeProduct = {
    _id:string,
    code:string,
    name: string,
    id_shop: string[],
    id_categoryDetail: categoryDetail[],
    thumbnails: string[],
    description: string,
    view:number,
    product_specifications: typeProductSpecification[]
    variation_color?: typeVariationProduct[]
    variation_size?: typeVariationProduct[]
    product_price: typeProductPriceResult[]
    banned: boolean,
    unlisted: boolean
}

export type typeVariationProduct= {
    _id: string,
    id_product: string[],
    value:string
}

export type typeProductPriceResult = {
    _id: string,
    id_product: string[],
    id_color: {
        _id: string,
        id_product: string[],
        value:string,
    }[],
    id_size: {
        _id: string,
        id_product: string[],
        value:string,
    }[],
    price: number,
    stock: number
}