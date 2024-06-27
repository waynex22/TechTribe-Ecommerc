import React, { useState } from 'react'
import { useGetcategoryQuery } from '../../../../../redux/rtkQuery/category'
import { useGetcategoryDetailQuery } from '../../../../../redux/rtkQuery/categoryDetail'
import { categoryDetail } from '../../../../../utils/types/categoryDetail'
import { category } from '../../../../../utils/types/category'
import ShowCategory, { handleNameCategory } from './showCategory'
import Popup from '../../../../../Page/popup/popup'

const SelectCategory = ({handleValueCategory,valueCategory}: {
    handleValueCategory:(value:categoryDetail|category) => void
    valueCategory:categoryDetail|category
}) => {
    const [showCategory, setShowCategory] = useState(false)
    const { data: dataCategory } = useGetcategoryQuery()
    const { data: dataCateDetail } = useGetcategoryDetailQuery()
    
    const handlePopup = () => {
        setShowCategory(!showCategory)
    }
    return (
        <>
            <div className=' flex gap-4 items-center'>
                <div className=' w-60 text-right'>
                    <p> <span className=' text-red-600'>*</span> Danh mục sản phẩm</p>
                </div>
                <div className=' flex-1'>
                    {valueCategory && dataCateDetail && dataCategory ?
                        <input
                            onClick={() => handlePopup()}
                            value={handleNameCategory(valueCategory, dataCateDetail, dataCategory).name}
                            type="text" className=" cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full p-2.5" placeholder='Chọn danh mục' readOnly /> :
                        <input
                            onClick={() => handlePopup()}
                            type="text" className=" cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full p-2.5" placeholder='Chọn danh mục' readOnly />
                    }
                </div>
            </div>
            {showCategory &&
                <Popup onHandlePopup={handlePopup}>
                    {dataCategory && dataCateDetail &&
                    <ShowCategory 
                        onHandlePopup={handlePopup} 
                        handleValueCategory={handleValueCategory} 
                        listCategory={dataCategory}
                        listCategoryDetail={dataCateDetail}
                    />}
                </Popup>}
        </>
    )
}

export default SelectCategory