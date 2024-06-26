import { useGetspecificationsQuery, useGetspecificationsDetailQuery } from "../../../../../redux/rtkQuery/specifications"
import { typeFormCreateProduct, typeSpecifications } from "../../../../../utils/types/product"
import SelectSpecification from "./selectSpecification"

const DetailInformation = ({formAddProduct,handleFormAddproduct}:{
    formAddProduct: typeFormCreateProduct
    handleFormAddproduct: (key:string, value:string| typeSpecifications[]) => void
}) => {
    const {data:specification, isLoading: loadSpec, isSuccess: successSpec } = useGetspecificationsQuery()
    const {data:specificationDetail, isLoading: loadSpecDetail, isSuccess: successSpecDeatil } = useGetspecificationsDetailQuery()
    return (
        <div id='DetailInformation' className='px-4 py-8 bg-white rounded-md shadow text-left'>
            <h3 className=' font-semibold text-lg px-5'>Thông tin chi tiết</h3>

            {!loadSpec && !loadSpecDetail && successSpec && successSpecDeatil && specification && specificationDetail &&
                <SelectSpecification formAddProduct={formAddProduct} listSpecifications={specification} listSpecificationDetail={specificationDetail} handleFormAddproduct={handleFormAddproduct} />
            }
        </div>
    )
}

export default DetailInformation