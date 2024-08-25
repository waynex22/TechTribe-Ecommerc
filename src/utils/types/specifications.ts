export type specifications = {
    _id:string;
    name:string,
}

export type dataToCreateSpecification = {
    name: string,
}

export type dataToCreateSpecificationDetail = {
    name: string,
    id_specification: string
}

export type dataToUpdateSpecificationDetail = {
    name: string,
    id: string
}


export type specificationsDetail = {
    _id:string;
    id_specification: string,
    name:string,
}