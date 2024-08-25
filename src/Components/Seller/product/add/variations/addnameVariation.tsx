import React, { useEffect, useRef, useState } from 'react'
import { IoAddOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { RiDeleteBin6Line } from "react-icons/ri";
import { typeFormCreateProduct, typeProduct, typeProductPrice, TypeVariation,  } from '../../../../../utils/types/product';
import { FcAddImage } from 'react-icons/fc';
import { FormErrorsProduct } from '../../../../../utils/validatetor/createproduct';
import { MdDelete } from 'react-icons/md';
import requestApi from '../../../../../helper/api';
import { toast } from 'react-toastify';
import { apiUrl } from '../../../../../config';

const AddnameVariation = ({ formAddProduct, product, setVariation, errForm ,setProductPrice }: {
    formAddProduct: typeFormCreateProduct
    setVariation: React.Dispatch<React.SetStateAction<TypeVariation>>
    errForm: FormErrorsProduct
    product?: typeProduct
    setProductPrice: React.Dispatch<React.SetStateAction<typeProductPrice[]>>
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [indexThumbnail, setIndexThumbnail] = useState(0)
    const [variation, setVariationProduct] = useState({} as TypeVariation)
    useEffect(()=>{
        setVariationProduct(formAddProduct.variation)
    },[formAddProduct.variation])
    const handleClick = (index: number) => {
        if (inputRef.current) {
            inputRef.current.click();
        }
        setIndexThumbnail(index)
    };
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
        setProductPrice([])
    };
    const handleValueKeyVariation = (key: string, value: string, index: number, thumbnail?: string) => {
        const keys = Object.keys(variation);
        
        if(keys.includes(key) && variation[key].length > 0) {
        }else {
            setProductPrice([])
        }
        
        if (thumbnail) {
            setVariation(prevVariation => ({
                ...prevVariation,
                [key]: [
                    ...prevVariation[key].slice(0, index),
                    { ...prevVariation[key][index], thumbnail },
                    ...prevVariation[key].slice(index + 1),
                ],
            }));
        } else {
            if (value.trim() !== '') {
                setVariation(prevVariation => ({
                    ...prevVariation,
                    [key]: [
                        ...prevVariation[key].slice(0, index),
                        { ...prevVariation[key][index], name: value },
                        ...prevVariation[key].slice(index + 1),
                    ],
                }));
                setProductPrice((prev) => {
                    let nameCheck: string[] = []
                    return prev.map((item)=>{
                        if(key === 'Size')
                            if(
                                item.name_color 
                                && !nameCheck.includes(item.name_color) 
                                && variation[key][index] 
                                && item.name_size === variation[key][index].name
                            ){
                                nameCheck.push(item.name_color)
                                return {...item, name_size: value}
                            }
                        if(key === 'Màu sắc')
                            if(
                                item.name_size 
                                && !nameCheck.includes(item.name_size) 
                                && variation[key][index] 
                                && item.name_color === variation[key][index].name
                            ){
                                nameCheck.push(item.name_size)
                                return {...item, name_color: value}
                            }
                        return item
                    }).filter((item): item is typeProductPrice => item !== undefined)
                })
            } else {
                setVariation(prevVariation => {
                    const newItems = prevVariation[key].filter((_, idx) => idx !== index);
                    const newVariation = { ...prevVariation };
                    newVariation[key] = newItems;
                    return newVariation;
                });
            }
        }
    };
    const handleDeleteVariationItem = (key: string, index: number) => {

        setVariation(prevVariation => {
            const newItems = prevVariation[key].filter((_, idx) => idx !== index);

            const newVariation = { ...prevVariation };
            if (newItems.length === 0) {
                setProductPrice([])
                delete newVariation[key];
            } else {
                newVariation[key] = newItems;
            }
            
            return newVariation;
        });
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            const formData = new FormData();
            imageFiles.forEach((file: File) => {
                formData.append('files', file);
            });
            requestApi('upload/files', 'POST', formData, 'multipart/form-data')
                .then(file => {
                    const thumbnails = file.data.filenames
                    handleValueKeyVariation('Màu sắc', '', indexThumbnail, thumbnails[0])
                })
                .catch(errFile => {
                    toast.error('Có lỗi khi thêm ảnh')
                    console.log(errFile);
                })
        }
    };

    const removeThumbnail = (index: number) => {
        const colorVariation = variation['Màu sắc'][index];
        if (colorVariation.thumbnail) {
            const filesToDelete = colorVariation.thumbnail.split('/').pop();
            const thumbnailVariation = product?.variation_color?.flatMap(item => item.thumbnail)
            let check = true
            if (thumbnailVariation) {
                if (thumbnailVariation.includes(filesToDelete))
                    check = false
            }
            if (check)
                requestApi('upload/files', 'DELETE', { filesToDelete }, 'application/json');
        }
        setVariation(prevVariation => ({
            ...prevVariation,
            'Màu sắc': [
                ...prevVariation['Màu sắc'].slice(0, index),
                { ...prevVariation['Màu sắc'][index], thumbnail: '' },
                ...prevVariation['Màu sắc'].slice(index + 1),
            ],
        }));
    };
    return (
        <div className=' flex gap-4'>
            <div className=' w-32 text-right pt-1'>
                <p> <span className=' text-red-600'>*</span> Phân loại hàng</p>
                {errForm.variation && <p className=' text-red-600'> {errForm.variation} </p>}
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
                                        className="hidden"
                                        id="uploadFile1"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={inputRef}
                                    />
                                    {key === 'Màu sắc' && variation[key][0]?.name && <>

                                        {variation[key][0]?.thumbnail ?
                                            <div onClick={() => removeThumbnail(index)} className=' cursor-pointer relative'>
                                                <img src={apiUrl + 'uploads/' + variation[key][0]?.thumbnail} className=' border  w-12 h-10 rounded object-cover' alt="" />
                                                <p className=' absolute bottom-0 flex justify-center shadow left-0 w-full bg-black opacity-80 text-white'> <MdDelete /> </p>
                                            </div>
                                            :
                                            <div onClick={() => { handleClick(index) }} className=' cursor-pointer border  text-xs border-dashed rounded w-12 text-center'>
                                                <p className=' text-4xl flex items-center justify-center'><FcAddImage /></p>
                                            </div>
                                        }
                                    </>}
                                    <input
                                        maxLength={32}
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
                                            {key === 'Màu sắc' && variation[key][indexs + 1]?.name && <>

                                                {variation[key][indexs + 1]?.thumbnail ?
                                                    <div onClick={() => removeThumbnail(indexs + 1)} className=' cursor-pointer relative'>
                                                        <img src={apiUrl + 'uploads/' + variation[key][indexs + 1]?.thumbnail} className=' border  w-12 h-10 rounded object-cover' alt="" />
                                                        <p className=' absolute bottom-0 flex justify-center shadow left-0 w-full bg-black opacity-80 text-white'> <MdDelete /> </p>
                                                    </div>
                                                    :
                                                    <div onClick={() => { handleClick(indexs + 1) }} className=' cursor-pointer border  text-xs border-dashed rounded w-12 text-center'>
                                                        <p className=' text-4xl flex items-center justify-center'><FcAddImage /></p>
                                                    </div>

                                                }
                                            </>}
                                            <input
                                                maxLength={32}
                                                value={variation[key][indexs + 1]?.name || ''}
                                                onChange={(e) => { handleValueKeyVariation(key, e.target.value, indexs + 1) }} type="text" className=' w-full rounded border border-gray-400 py-1' />
                                            <p
                                                onClick={() => handleDeleteVariationItem(key, indexs + 1)}
                                                className=' text-xl cursor-pointer'><RiDeleteBin6Line /></p>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    ))
                }
                {variation && Object.keys(variation).length < 2 && <div className='flex'>
                    <div onClick={() => (setShowVariation(!showVariation))} className=' border-primary font-semibold text-primary items-center flex gap-2 cursor-pointer p-2 border  text-sm border-dashed rounded px-4 text-center'>
                        <p className=' text-lg'><IoAddOutline /></p>
                        <p>Thêm nhóm phân loại</p>
                    </div>
                    {showVariation &&
                        <div className=' absolute top-full pt-2 z-20'>
                            <div className=' bg-white border flex flex-col gap-2 rounded p-2 w-64 shadow-md'>
                                {!variation['Màu sắc'] && <p onClick={() => handleKeyVariation('Màu sắc')} className=' cursor-pointer'>Màu sắc</p>}
                                {!variation['Size'] && <p onClick={() => handleKeyVariation('Size')} className=' cursor-pointer'>Màu size</p>}
                            </div>
                        </div>
                    }
                </div>}
            </div>
        </div>
    )
}

export default AddnameVariation