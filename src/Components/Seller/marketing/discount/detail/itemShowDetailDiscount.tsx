import React, { useEffect, useState } from 'react'
import { typeDiscountDetail } from '../../../../../utils/types/discount'
import { typeProduct } from '../../../../../utils/types/product'
import requestApi from '../../../../../helper/api'
import { formatNumberVnd } from '../../../../../utils/fortmartNumberVnd'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { typeFlashSaleDetailResult } from '../../../../../utils/types/flashSale'

const ItemShowDetailDiscount = ({ listDiscount }: { listDiscount: typeDiscountDetail[] | typeFlashSaleDetailResult[]}) => {
    const [product, setProduct] = useState({} as typeProduct)
    useEffect(() => {
        if (listDiscount[0]) {
            requestApi(`product/${listDiscount[0].id_productPrice.id_product[0]}`, 'GET', {}, 'application/json')
                .then((data) => {
                    console.log(data.data);
                    setProduct(data.data)
                })
                .catch(err => console.log(err))
        }
    }, [listDiscount])

    return (
        <div className=' rounded border text-sm'>
            {product._id && <ItemProduct product={product} />}

            {listDiscount.map((item) => {
                return <div key={item._id}>
                    <div className=' py-2 flex flex-col gap-2'>
                        <div className=' flex gap-4 items-center justify-between'>
                            <div className=' w-2 flex items-center'>
                            </div>
                            <div className=' w-32'>
                                <p className=' text-center'>
                                    {item.id_productPrice.id_color[0]?.value}
                                    {item.id_productPrice.id_color[0] && item.id_productPrice.id_size[0] && ', '}
                                    {item.id_productPrice.id_size[0]?.value}
                                </p>
                            </div>
                            <div className=' w-32'>
                                <p className=' text-center'> {formatNumberVnd(item.id_productPrice.price)} </p>
                            </div>
                            <div className=' w-32'>
                                <div className={` w-28 border rounded p-0.5 relative  ${true && 'bg-gray-200 cursor-not-allowed'}`}>
                                    <input
                                        readOnly={true}
                                        value={item.id_productPrice.price - (item.percent / 100 * item.id_productPrice.price)}
                                        type="number"
                                        className={` w-24 ${true && 'bg-gray-200 cursor-not-allowed'}`}
                                    />
                                    <p className=' absolute top-1/2 -translate-y-1/2 right-1'>đ</p>
                                </div>
                            </div>
                            <div className=' w-32'>
                                <div className={`w-[120px] border rounded p-0.5  relative  ${true && 'bg-gray-200 cursor-not-allowed'} `}>
                                    <input
                                        value={item.percent}
                                        readOnly={true}
                                        type="string"
                                        className={` w-[70px] ${true && 'bg-gray-200 cursor-not-allowed'}`}
                                    />
                                    <div className={` text-gray-500 border-l pl-2 text-xs absolute right-2 top-1/2 -translate-y-1/2 ${true && 'bg-gray-200 cursor-not-allowed'}`}>
                                        <p>%GIẢM</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-12'>
                                <p className=' text-center'> {item.id_productPrice.stock} </p>
                            </div>
                            <div className=' w-36'>
                                <div className={`flex cursor-not-allowed `}>
                                    <div className={`bg-gray-200 cursor-not-allowed pointer-events-none relative py-1 px-2 border rounded ${item.limit_product !== "Không giới hạn" ? 'w-[80px]' : 'w-[140px]'}  `}>
                                        <div className=' cursor-pointer flex items-center justify-between'>
                                            <p className={` truncate  w-[120px] `}> {item.limit_product !== "Không giới hạn" ? 'Giới hạng' : item.limit_product} </p>
                                            <p> <IoIosArrowDown /></p>
                                        </div>
                                    </div>
                                    {item.limit_product !== "Không giới hạn" &&
                                        <div className={` border rounded w-[60px] ${'bg-gray-200 cursor-not-allowed'}`}>
                                            <input
                                                type="number"
                                                readOnly
                                                value={item.limit_product}
                                                className={`w-[57px] countDiscout bg-gray-200 cursor-not-allowed`} />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className=' w-36'>
                                <div className={`flex cursor-not-allowed `}>
                                    <div className={`bg-gray-200 cursor-not-allowed pointer-events-none relative py-1 px-2 border rounded ${item.limit_customer !== "Không giới hạn" ? 'w-[80px]' : 'w-[140px]'}  `}>
                                        <div className=' cursor-pointer flex items-center justify-between'>
                                            <p className={` truncate  w-[120px] `}> {item.limit_customer !== "Không giới hạn" ? 'Giới hạng' : item.limit_customer} </p>
                                            <p> <IoIosArrowDown /></p>
                                        </div>
                                    </div>
                                    {item.limit_customer !== "Không giới hạn" &&
                                        <div className={` border rounded w-[60px] ${'bg-gray-200 cursor-not-allowed'}`}>
                                            <input
                                                type="number"
                                                readOnly
                                                value={item.limit_customer}
                                                className={`w-[57px] countDiscout bg-gray-200 cursor-not-allowed`} />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='w-16'>
                                <label className='flex cursor-not-allowed select-none items-center'>
                                    <div className='relative'>
                                        <input
                                            type='checkbox'
                                            checked={item.status}
                                            className='sr-only'
                                        />
                                        <div
                                            className={`box block h-8 w-14 rounded-full ${item.status ? 'bg-primary' : ' bg-gray-300'
                                                }`}
                                        ></div>
                                        <div
                                            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${item.status ? 'translate-x-full' : ''
                                                }`}
                                        ></div>
                                    </div>
                                </label>
                            </div>
                            <div className=' w-16'>
                            </div>
                        </div>
                    </div>
                </div>
            })}

        </div>
    )
}
const ItemProduct = ({ product }: { product: typeProduct }) => {

    return (
        <>
            <div className=' rounded-t py-2 px-4 bg-gray-100'>
                <div className=' flex items-center justify-between'>
                    <div className=' flex gap-4 items-center'>
                        <div className=' w-2 flex items-center'>
                        </div>
                        <div>
                            <img src={product.thumbnails[0]} className=' w-10' alt="" />
                        </div>
                        <div className=' w-[200px]  relative group'>
                            <p className=' truncate cursor-pointer'>{product.name}</p>
                            <div className='group-hover:block hidden absolute bg-gray-800 bg-opacity-75 text-white p-2 rounded-xl bottom-full left-0'>
                                {product.name}
                            </div>
                        </div>
                    </div>
                    <div className=' text-xl w-10 text-center'>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ItemShowDetailDiscount