export type typeFormCreateProduct = {
    id_shop: string[],
    images: string[],
    name:string,
    id_category:string,
    description:string,
    view:number,
    specifications: typeSpecifications[],
    variation:TypeVariation[]
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