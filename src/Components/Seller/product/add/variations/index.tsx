import AddnameVariation from "./addnameVariation"
import { TypeVariation } from '../../../../../utils/types/product';
import { useState } from "react";
import DetailVariation from "./detailVariation";


const VariationsProduct = () => {
    const [variation, setVariation] = useState<TypeVariation>({});
    return (
        <div id='DetailInformation' className='px-4 py-8 bg-white rounded-md shadow text-left'>
            <h3 className=' font-semibold text-lg px-5'>Phân loại sản phẩm</h3>
            <div className=' py-2 flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>
                <AddnameVariation variation={variation} setVariation={setVariation}  />
            </div>
            <div className=' py-2 flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>
                {Object.keys(variation).length > 0 && 
                    <DetailVariation variation={variation} />
                }
            </div>
        </div>
    )
}

export default VariationsProduct