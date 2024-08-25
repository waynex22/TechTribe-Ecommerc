import { useEffect, useState } from "react"
import { useGetcategoryDetailByIdQuery } from "../../../../../redux/rtkQuery/categoryDetail"
import { typeFormCreateProduct, typeProductSpecification, typeSpecifications } from "../../../../../utils/types/product"
import { specifications, specificationsDetail } from "../../../../../utils/types/specifications"
import ItemSpecification from "./itemSpecification"

const SelectSpecification = ({ formAddProduct, listSpecifications, listSpecificationDetail, handleFormAddproduct, product_specifications }: {
    listSpecifications: specifications[]
    listSpecificationDetail: specificationsDetail[]
    formAddProduct: typeFormCreateProduct
    handleFormAddproduct: (key: string, value: string | typeSpecifications[]) => void
    product_specifications?: typeProductSpecification[]
}) => {
    const [specification, setSpecification] = useState([] as typeSpecifications[])
    const { data: category, isLoading, isSuccess, isFetching } = useGetcategoryDetailByIdQuery(formAddProduct.id_categoryDetail)
    const handleSpecification = (idSpecification: string, idSpecificationDetail: string) => {
        setSpecification({ ...specification, [idSpecification]: idSpecificationDetail })
    }
    useEffect(() => {
        handleFormAddproduct('specifications', specification)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [specification])
    
    return (
        <>
            <p className=' font-normal text-sm px-8 py-2'>Hoàn thành: 0 / {category?.id_specification.length || 0}
                <span className=' text-gray-500 pl-3'>Điền thông tin thuộc tính để tăng mức độ hiển thị cho sản phẩm</span>
            </p>
            <div className='gap-6 pt-4 px-12 text-sm font-normal'>
                <div className=' grid grid-cols-2 gap-4'>
                    {!isFetching ?
                        !isLoading && isSuccess && category &&
                        category.id_specification.map((item,index) => {
                            return <ItemSpecification key={index} 
                                handleSpecification={handleSpecification} 
                                id_specification={item} 
                                listSpecifications={listSpecifications}
                                listSpecificationDetail={listSpecificationDetail}
                                product_specifications={product_specifications} 
                                 />
                        })
                        :
                        <>
                        <LoadItemSpecification />
                        </>
                    }

                </div>
            </div>
        </>
    )
}

const LoadItemSpecification = () => {
    const numberOfDivs = 6;
    const divs = [];

    for (let i = 0; i < numberOfDivs; i++) {
        divs.push(
            <div className='flex animate-pulse gap-4 items-center'>
                <div className="rounded  bg-gray-200 h-5 w-[200px] text-right">
                </div>
                <select className="block appearance-none w-full bg-gray-200 border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                </select>
            </div>
        );
    }

    return <>{divs}</>;
};

export default SelectSpecification