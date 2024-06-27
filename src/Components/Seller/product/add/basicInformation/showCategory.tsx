import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { category } from '../../../../../utils/types/category';
import { categoryDetail, defaultValueCategoryDetail } from '../../../../../utils/types/categoryDetail';
import { useGetcategoryDetailQuery } from '../../../../../redux/rtkQuery/categoryDetail';

const ShowCategory = ({ onHandlePopup, handleValueCategory, listCategory, listCategoryDetail }: {
    onHandlePopup: () => void;
    handleValueCategory: (value: categoryDetail|category) => void
    listCategory: category[]
    listCategoryDetail: categoryDetail[]
}) => {
    const [listShowCategory, setListShowCategory] = useState([] as categoryDetail[][])
    const [valueCategory, setValueCategory] = useState({} as categoryDetail | category)
    const [checkIdentify, setChekIdentify] = useState(false)

    const checkIDCategory = (idCategory: string) => {
        const newData = listCategoryDetail.filter((item) => item.id_category[0] === idCategory)
        if (newData) {
            const arr = [newData]
            setListShowCategory(arr)
        }
        setValueCate(idCategory)
        setChekIdentify(false)
    }
    const checkIDCategoryDetail = (idCategory: string) => {
        const newData = listCategoryDetail.filter((item) => item.id_category[0] === idCategory)
        if (newData.length !== 0) {
            const arr = [listShowCategory[0], newData]
            setListShowCategory(arr)
        }
        setValueCate(idCategory)
        setChekIdentify(false)
    }
    const removeAfterValue = (id: string) => {
        const category = listCategoryDetail.find((item) => item._id === id)
        if (category) {
            const index = listShowCategory.findIndex(subArray => subArray.includes(category));
            if (index === -1) {
                setListShowCategory(listShowCategory);
            } else {
                setListShowCategory(listShowCategory.slice(0, index + 1));
            }
        }else {
            setListShowCategory([[defaultValueCategoryDetail]])
        }
        setChekIdentify(true)
        setValueCate(id)
    };
    const setValueCate = (idCategory: string) => {
        const category = listCategoryDetail.find((item) => item._id === idCategory) || listCategory.find((item) => item._id === idCategory)
        if (category) {
            setValueCategory(category)
        }
    }
    const identifiCategory = () => {
        onHandlePopup()
        handleValueCategory(valueCategory)
    }

    return (
        <div>
            <div className=' bg-white p-6 rounded w-[800px]'>
                <div className=' flex justify-between items-center'>
                    <h2>Chỉnh sửa danh mục</h2>
                    <p onClick={() => onHandlePopup()} className=' cursor-pointer text-2xl'><IoClose /></p>
                </div>
                <div className=' text-sm font-normal mt-4 py-2 border rounded-md'>
                    <div className=' flex  overflow-x-auto h-[200px]'>
                        <BoxCategory listCategory={listCategory}
                            handleValueCategory={removeAfterValue}
                            checkIDCategory={checkIDCategory} />
                        {listShowCategory &&
                            listShowCategory.map((item, index) => {
                                return <BoxCategory key={index}
                                    handleValueCategory={removeAfterValue}
                                    listCategory={item} checkIDCategory={checkIDCategoryDetail} />
                            })
                        }
                    </div>
                </div>
                <div className=' pt-4 flex justify-between items-center'>
                    <p className=' font-normal text-sm '>
                        Đã chọn:
                        <span className='pl-2 font-semibold'>
                            {listCategory && listCategoryDetail && valueCategory &&
                                handleNameCategory(valueCategory, listCategoryDetail, listCategory).name
                            }
                        </span>
                    </p>
                    <div className=' flex gap-4 text-sm '>
                        <p onClick={() => onHandlePopup()} className=' px-4 py-2 rounded border cursor-pointer hover:bg-gray-100 text-gray-500'>Hủy</p>
                        {checkIdentify &&
                            <p onClick={() => {
                                identifiCategory()
                            }} className=' px-4 py-2 rounded border cursor-pointer hover:bg-gray-100'>Xác nhận</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const BoxCategory = ({ listCategory, checkIDCategory, handleValueCategory }: {
    listCategory: category[] | categoryDetail[]
    checkIDCategory: (idCategory: string) => void
    handleValueCategory: (value: string) => void
}) => {

    return (
        <div className=' flex-none w-[250px]  overflow-y-auto border-r'>
            <div className=' flex flex-col gap-1'>
                {listCategory.map((item) => {
                    return <ItemCategory key={item._id}
                        handleValueCategory={handleValueCategory}
                        handleCategory={checkIDCategory} category={item} />
                })}
            </div>
        </div>
    )
}

const ItemCategory = ({ category, handleCategory, handleValueCategory }: {
    category: category | categoryDetail
    handleCategory: (idCategory: string) => void
    handleValueCategory: (value: string) => void

}) => {
    const { data: dataCateDetail, isSuccess, isLoading } = useGetcategoryDetailQuery()
    const [checkDetail, setCheckDetail] = useState(true)
    useEffect(() => {
        if (!isLoading && isSuccess && dataCateDetail) {
            const check = dataCateDetail.find((item) => item.id_category[0] === category._id)
            setCheckDetail(check ? false : true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataCateDetail, isLoading, isSuccess])

    return (
        <>
            {!checkDetail ?
                <p onClick={() => handleCategory(category._id)} className={`px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100 `}>
                    {category.name}
                    <FaAngleRight />
                </p>
                :
                <p onClick={() => handleValueCategory(category._id)} className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                    {category.name}
                </p>}
        </>
    )
}

export const handleNameCategory = (categoryDetail: categoryDetail | category, listCategoryDetail: categoryDetail[], listCategory: category[]) => {

    let name:string = '';
    let arrCategory: (category | categoryDetail)[] = []
    let id = categoryDetail._id
    if ('id_category' in categoryDetail) {
        name = categoryDetail.name
        arrCategory = [categoryDetail]
        id = categoryDetail.id_category[0];
        let found = true;
        // Loop through dataCateDetail until no matching id is found
        while (found) {
            found = false;
            // eslint-disable-next-line no-loop-func
            listCategoryDetail.some((item) => {
                if (id === item._id) {
                    name = item.name + ' > ' + name;
                    id = item.id_category[0];
                    arrCategory.push(item)
                    found = true; // Continue looping
                    return true; // Break out of .some()
                }
                return false;
            });
        }
    }

    // Check in dataCategory
    listCategory.some((item) => {
        if (id === item._id) {
            name ? name = item.name + ' > ' + name :name = item.name
            arrCategory.push(item)
            return true; // Break out of .some()
        }
        return false;
    });
    return {name,arrCategory};
};


export default ShowCategory