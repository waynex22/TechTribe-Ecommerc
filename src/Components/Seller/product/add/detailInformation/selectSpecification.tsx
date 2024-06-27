import { useEffect, useState } from "react"
import { useGetcategoryDetailByIdQuery } from "../../../../../redux/rtkQuery/categoryDetail"
import { typeFormCreateProduct, typeSpecifications } from "../../../../../utils/types/product"
import { specifications, specificationsDetail } from "../../../../../utils/types/specifications"
import ItemSpecification from "./itemSpecification"

const SelectSpecification = ({ formAddProduct, listSpecifications, listSpecificationDetail, handleFormAddproduct }: {
    listSpecifications: specifications[]
    listSpecificationDetail: specificationsDetail[]
    formAddProduct: typeFormCreateProduct
    handleFormAddproduct: (key: string, value: string | typeSpecifications[]) => void
}) => {
    const [specification, setSpecification] = useState([] as typeSpecifications[])
    const { data: category, isLoading, isSuccess } = useGetcategoryDetailByIdQuery(formAddProduct.id_category)
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
                    {!isLoading && isSuccess && category &&
                        category.id_specification.map((item) => {
                            return <ItemSpecification handleSpecification={handleSpecification} id_specification={item} listSpecifications={listSpecifications} listSpecificationDetail={listSpecificationDetail} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SelectSpecification