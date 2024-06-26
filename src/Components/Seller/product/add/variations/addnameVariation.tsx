import React, { useState } from 'react'
import { IoAddOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TypeVariation } from '../../../../../utils/types/product';

const AddnameVariation = ({ variation, setVariation }: {
    variation: TypeVariation
    setVariation: React.Dispatch<React.SetStateAction<TypeVariation>>
}) => {
    const [showVariation, setShowVariation] = useState(false)

    const handleKeyVariation = (key: string) => {
        setShowVariation(!showVariation)
        setVariation(prevVariation => ({
            ...prevVariation,
            [key]: [],
        }));
    };
    const removeKeyVariation = (key: string) => {
        const { [key]: removedKey, ...rest } = variation;
        setVariation(rest);
    };
    const handleValueKeyVariation = (key: string, value: string, index: number) => {
        if (value.trim() !== '') {
            setVariation(prevVariation => ({
                ...prevVariation,
                [key]: [
                    ...prevVariation[key].slice(0, index), // Keep items before the updated index
                    { ...prevVariation[key][index], name: value }, // Update the item at the specified index
                    ...prevVariation[key].slice(index + 1), // Keep items after the updated index
                ],
            }));
        }
    };
    const handleDeleteVariationItem = (key: string, index: number) => {
        setVariation(prevVariation => ({
            ...prevVariation,
            [key]: prevVariation[key].filter((_, idx) => idx !== index),
        }));
    };
    return (
        <div className=' flex gap-4'>
            <div className=' w-32 text-right pt-1'>
                <p> Phân loại hàng</p>
            </div>
            <div className=' flex-auto relative flex flex-col gap-2'>
                {variation &&
                    Object.keys(variation).map((key, index) => (
                        <div key={index} className='bg-gray-100 w-full p-4 rounded'>
                            <div className='flex justify-between border-b pb-2'>
                                <p className='text-sm font-semibold'> {key} </p>
                                <p onClick={() => removeKeyVariation(key)} className=' text-2xl cursor-pointer'><IoMdRemoveCircleOutline /></p>
                            </div>
                            <div className=' grid grid-cols-2 gap-y-4 gap-x-8 py-4 px-6'>
                                <div className=' flex gap-2 items-center'>
                                    <input
                                        value={variation[key][0]?.name || ''}
                                        onChange={(e) => { handleValueKeyVariation(key, e.target.value, 0) }}
                                        type="text" className=' w-full rounded border border-gray-400 py-1' />
                                    <p
                                        onClick={() => handleDeleteVariationItem(key, 0)}
                                        className=' text-xl cursor-pointer'><RiDeleteBin6Line /></p>
                                </div>
                                {variation[key].map((item, indexs) => {
                                    return (
                                        <div key={indexs} className=' flex gap-2 items-center'>
                                            <input
                                                value={variation[key][indexs + 1]?.name || ''}
                                                onChange={(e) => { handleValueKeyVariation(key, e.target.value, indexs + 1) }} type="text" className=' w-full rounded border border-gray-400 py-1' />
                                            <p
                                                onClick={() => handleDeleteVariationItem(key, index + 1)}
                                                className=' text-xl cursor-pointer'><RiDeleteBin6Line /></p>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    ))
                }
                <div className='flex'>
                    <div onClick={() => (setShowVariation(!showVariation))} className=' border-primary font-semibold text-primary items-center flex gap-2 cursor-pointer p-2 border  text-sm border-dashed rounded px-4 text-center'>
                        <p className=' text-lg'><IoAddOutline /></p>
                        <p>Thêm nhóm phân loại</p>
                    </div>
                    {showVariation &&
                        <div className=' absolute top-full pt-2 z-20'>
                            <div className=' bg-white border flex flex-col gap-2 rounded p-2 w-64 shadow-md'>
                                <p onClick={() => handleKeyVariation('Màu sắc')} className=' cursor-pointer'>Màu sắc</p>
                                <p onClick={() => handleKeyVariation('Size')} className=' cursor-pointer'>Màu size</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddnameVariation