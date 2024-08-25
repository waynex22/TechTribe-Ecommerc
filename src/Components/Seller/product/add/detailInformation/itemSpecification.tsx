import { useEffect, useState } from "react"
import { specifications, specificationsDetail } from "../../../../../utils/types/specifications"
import { typeProductSpecification } from "../../../../../utils/types/product"

const ItemSpecification = ({handleSpecification, id_specification, listSpecifications, listSpecificationDetail,product_specifications }: {
    listSpecifications: specifications[]
    listSpecificationDetail: specificationsDetail[]
    id_specification:string
    handleSpecification: (idSpecification:string, idSpecificationDetail:string) => void
    product_specifications?: typeProductSpecification[]

}) => {
    const [specification, setSpecification] = useState({} as specifications)
    const [listValue, setListValue] = useState([] as specificationsDetail[])
    useEffect(()=>{
        const specification = listSpecifications.find((item)=> item._id === id_specification)
        if(specification){
            setSpecification(specification)
            const valueSpecification = 
            listSpecificationDetail.filter((item)=> {
                    return item.id_specification === specification._id 
                })
            if(valueSpecification)
                setListValue(valueSpecification)
        }
    },[id_specification, listSpecificationDetail, listSpecifications])

    return (
        
        <div className='flex gap-4 items-center'>
            <div className=" w-[200px] text-right">
                <label htmlFor="">{specification.name}</label>
            </div>
            <select onChange={(e)=>handleSpecification(specification._id,e.target.value)} className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="" > - - - - - - - - - - - - </option>
                {listValue &&
                    listValue.map((item)=>{
                        let check = false;
                        product_specifications?.forEach(spec => {
                            if(spec.id_specifications_detail.includes(item._id))
                            check = spec.id_specifications_detail.includes(item._id)
                        })
                        return (
                          <option key={item._id} value={item._id} selected={check}>
                            {item.name}
                          </option>
                        );
                    })
                }
            </select>
        </div>
    )
}

export default ItemSpecification