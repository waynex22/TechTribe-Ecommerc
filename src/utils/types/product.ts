export type typeFormCreateProduct = {
    id_shop: string[] | any,
    images: string[],
    name:string,
    id_category:string,
    description:string,
    view:number,
    specifications: typeSpecifications[],
    variation:TypeVariation[]
}
export type typeDiscount = {
    _id: string,
    status: boolean,
    percent: number,
    limit_customer: number,
    limit_product: number,
    _id_productPrice: string,
    _id_discount: any
}
export type product = {
    _id: any,
    id_shop: string[] | any,
    thumbnails: string[],
    name:string | any,
    id_category:string,
    description:string,
    view:number,
    rating:number | any,
    id_categoryDetail?:string | any;
    product_specifications?: typeProductSpecification[],
    specifications?: typeSpecifications[],
    variation?:TypeVariation[],
    product_price?:any,
    variation_color?:any,
    variation_size?:any,
    discount?:typeDiscount[],
    valuePriceDiscount?: any,
    percent?: number |  any,
}
export type typeSpecifications = {
    [key: string]: string;
};
export type TypeVariation = {
    [key:string] : detail_variation[];
}
export type detail_variation = {
    name:string,
    thumbnail:string,
    price:string,
    stock:string
}
  
export type typeProductSpecification = {
    _id: string,
    id_shop: string[],
    id_specifications: string,
    id_specifications_detail:string,
}