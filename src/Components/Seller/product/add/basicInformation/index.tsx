/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { FcAddImage } from "react-icons/fc";
import { categoryDetail } from '../../../../../utils/types/categoryDetail';
import { category } from '../../../../../utils/types/category';
import SelectCategory from './selectCategory';
import SelectImage from './selectImage';
import { typeProduct } from '../../../../../utils/types/product';
import { FormErrorsProduct } from '../../../../../utils/validatetor/createproduct';

const BasicInformation = ({handleFormAddproduct, prevImages, setPrevImages, product, errForm}:{
    handleFormAddproduct: (key:string, value:string | File[]) => void
    prevImages: { preview: string;}[]
    setPrevImages:React.Dispatch<React.SetStateAction<{preview: string;}[]>>
    product?: typeProduct
    errForm: FormErrorsProduct
}) => {
    const [listFile, setListFile] = useState<File[]>([])
    const [nameProduct, setNameProduct] = useState('')
    const [valueCategory, setValueCategory] = useState({} as categoryDetail | category)
    const [decription, setDecription] = useState('')

    useEffect(() => {
        if(product && product.thumbnails) {
            setNameProduct(product.name)
            setDecription(product.description)
            handleFormAddproduct('name',product.name)
            handleFormAddproduct('description',product.description)
            if(product.thumbnails) {
                const files:File[] = []
                const thumbnails = product.thumbnails.map((item: string) => { 
                    files.push(new File([], item));
                    return { preview: item } 
                })
                setPrevImages(thumbnails)
                setListFile(files)
            }
            if(product.id_categoryDetail) {
                setValueCategory(product.id_categoryDetail[0])
                handleFormAddproduct('id_categoryDetail',product.id_categoryDetail[0]._id)
            }
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [product, setPrevImages])
    const handleFile = (files: File[]) => {
        setListFile(files)
        handleFormAddproduct('files',files)
    }
    const handlePrevImages = (value: { preview: string }[]) => {
        setPrevImages(value)
    }
    const handleValueCategory = (value: categoryDetail | category) => {
        setValueCategory(value)
        handleFormAddproduct('id_categoryDetail',value._id)
    }
    const handleNameProduct = (value:string) =>{
        setNameProduct(value)
        handleFormAddproduct('name',value)
    }
    const handleDescription = (value:string) =>{
        setDecription(value)
        handleFormAddproduct('description',value)
    }
    return (
        <div id='BasicInformation' className='px-4 py-8 bg-white rounded-md shadow text-left'>
            <h3 className=' font-semibold text-lg px-5'>Thông tin cơ bản</h3>
            <div className=' flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>

                <SelectImage 
                    errForm={errForm}
                onHandleFile={handleFile} 
                onHandlePrevImages={handlePrevImages} 
                prevImages={prevImages} 
                listFile={listFile} />

                <div className=' flex gap-4'>
                    <div className=' w-60 text-right'>
                        <p> <span className=' text-red-600'>*</span> Ảnh bìa</p>
                    </div>
                    <div>
                        {prevImages.length > 0 ?
                            <img className=" border rounded object-cover w-20 h-20" src={prevImages[0].preview} />
                            :
                            <div className=' cursor-pointer p-2 border  text-xs border-dashed rounded w-24 text-center'>
                                <p className=' text-4xl flex items-center justify-center'><FcAddImage /></p>
                                <p>(0/1)</p>
                            </div>
                        }

                    </div>
                </div>

                <div className=' flex gap-4 items-center'>
                    <div className=' w-60 text-right'>
                        <p> <span className=' text-red-600'>*</span> Tên sản phẩm</p>
                        {errForm.nameProduct && <p className=' text-red-600'> {errForm.nameProduct} </p>}
                    </div>
                    <div className=' flex-1'>
                        <input
                        value={nameProduct}
                        onChange={(e)=>handleNameProduct(e.target.value)}
                        name='nameProduct'
                        type="text" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full p-2.5" placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kĩ thuật" required />
                    </div>
                </div>

                    <SelectCategory errForm={errForm} handleValueCategory={handleValueCategory} valueCategory={valueCategory} />

                <div className=' flex gap-4 '>
                    <div className=' w-60 text-right'>
                        <label> <span className=' text-red-600'>*</span> Mô tả sản phẩm</label>
                        {errForm.description && <p className=' text-red-600'> {errForm.description} </p>}
                    </div>
                    <div className=' flex-1'>
                        <textarea value={decription} onChange={(e)=>handleDescription(e.target.value)} id="message" className="block p-2.5 w-full h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder=""></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicInformation