import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchProductByIdShop, SelectProductByIdShop } from '../../../../redux/features/product'
import { typeProduct } from '../../../../utils/types/product'
import EmptyBox from '../../marketing/discount/create/emptyBox'
import { SelectShop } from '../../../../redux/features/shop'
import { formatPriceProduct, formatStockProduct } from '../../product/listProduct/itemProductListCols'

const ItemSendMessageProduct = ({onHandleSubmit} :{
    onHandleSubmit: (id_product: string) => void
}) => {
    const dispath = useAppDispatch()
    const shop = useAppSelector(SelectShop)
    const listProduct = useAppSelector(SelectProductByIdShop)
    const [listShowProduct, setListShowProduct] = useState([] as typeProduct[])
    const [showListProduct, setShowListProduct] = useState(false)
    useEffect(() => {
        setListShowProduct(listProduct.filter(product => !product.unlisted && !product.banned))
    }, [listProduct])
    useEffect(()=>{
        dispath(fetchProductByIdShop(shop._id))
    },[dispath, shop._id])

    const sendProduct = (id_product: string) =>{
        onHandleSubmit(id_product)
        setShowListProduct(false)
    }
    return (
        <div className='group relative'>
            <div onClick={()=>setShowListProduct(!showListProduct)}>
                <img className='w-5 cursor-pointer' src="https://img.icons8.com/?size=100&id=59867&format=png&color=000000" alt="purchase-product" />
            </div>
            <p className='hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'>Sản phẩm</p>

            {showListProduct && 
            <div className=' text-xs absolute bottom-full w-[300px]  bg-gray-200 border left-1/2 -translate-x-1/2 rounded shadow-md'>
            <div className=' p-2 border-b bg-white'>
                <div className=' flex border rounded items-center gap-2 pr-4 px-2 shadow'>
                    <input type="text" className=' w-full' />
                    <p> <BiSearch /> </p>
                </div>
            </div>
            <div className=' py-1 flex flex-col gap-1 overflow-y-auto h-[250px]'>
                { listShowProduct && listShowProduct.length > 0 && listShowProduct[0]._id ? 
                listShowProduct.map(product => {
                    return (
                        <div className=' px-2 py-1 bg-white'>
                            <div className=' flex gap-2 border-b py-1'>
                                <img src={product.thumbnails[0]} className=' w-8 h-8 object-cover border rounded' alt="" />
                                <div>
                                    <p className=' truncate'> {product.name} </p>
                                    <p> {formatPriceProduct(product)} </p>
                                </div>
                            </div>
                            <div className=' flex justify-between pt-1 items-center'>
                                <p> {formatStockProduct(product)} có sẵn </p>
                                <p onClick={()=> sendProduct(product._id)} className=' cursor-pointer hover:shadow-md hover:bg-opacity-90 bg-primary text-white px-2 py-1 rounded'>Gửi</p>
                            </div>
                        </div>
                    )
                }):
                <EmptyBox />
                }

            </div>
        </div>}
        </div>
    )
}

export default ItemSendMessageProduct