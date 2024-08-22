import React, { useEffect, useState } from 'react'
import ItemSearchProduct from '../create/itemSearchProduct'
import { GoSearch } from 'react-icons/go'
import { IoCloseSharp } from 'react-icons/io5'
import { typeDiscountDetail } from '../../../../../utils/types/discount'
import { RiDeleteBinLine } from 'react-icons/ri'
import ItemShowDetailDiscount from './itemShowDetailDiscount'
import { typeFlashSaleDetailResult } from '../../../../../utils/types/flashSale'

const ShowDiscountDetail = ({ discountDetail }: { discountDetail: typeDiscountDetail[] | typeFlashSaleDetailResult[]}) => {
    const [nameSearch, setNameSearch] = useState('Tên sản phẩm')
    const [valueSearch, setValueSearch] = useState('')
    const [listDiscountByIdProduct, setListDiscountByIDProduct] = useState([] as typeDiscountDetail[][] | typeFlashSaleDetailResult[][]) 
    const handleNameSearch = (value: string) => {
        setNameSearch(value)
    }
    const handleFindListShow = () => {
    }
    const removeFindName = () => {
        setValueSearch('')
    }
    useEffect(()=>{
        setListDiscountByIDProduct(groupByProduct(discountDetail))
    },[discountDetail])
    
    return (
        <>
            <div className=' bg-white my-6 shadow-md py-6 rounded px-4 flex flex-col gap-6  font-normal text-sm'>
                <div className={`'flex items-center justify-between'}`}>
                    <div>
                        <h4 className=" text-xl py-1">Sản phẩm khuyến mãi</h4>
                    </div>
                </div>
                <div className=' flex flex-col gap-4'>
                    <div className=' flex '>
                        <div className=' flex items-center gap-4 relative'>
                            <ItemSearchProduct onHandleNameSearch={handleNameSearch} onSetValueSearch={setValueSearch} valueSearch={valueSearch} />
                            <p onClick={() => handleFindListShow()} className=' text-xl cursor-pointer'><GoSearch /></p>
                            {valueSearch && <p onClick={() => removeFindName()} className=' absolute p-2 right-10 cursor-pointer text-xl'> <IoCloseSharp /></p>}
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col gap-4'>
                    <p className=' text-gray-500'>
                        tổng cộng <span className=' text-black'></span> sản phẩm
                    </p>

                    <div className=' bg-gray-100 rounded border p-2 px-4 text-sm text-gray-500'>
                        <div className=' flex gap-4 items-center justify-between'>
                            <div className=' w-2 flex items-center'>
                            </div>
                            <div className=' w-32'>
                                <p className=' text-center'>Tên sản phẩm</p>
                            </div>
                            <div className=' w-32'>
                                <p className=' text-center'>Giá gốc</p>
                            </div>
                            <div className=' w-32'>
                                <p className=' text-center'>Giá sau giảm</p>
                            </div>
                            <div className=' w-32'>
                                <p className=' text-center'>Giảm giá</p>
                            </div>
                            <div className=' w-12'>
                                <p className=' text-center'>Kho hàng</p>
                            </div>
                            <div className=' w-36'>
                                <p className=' text-center'>Số lượng sản phẩm khuyến mãi</p>
                            </div>
                            <div className=' w-36'>
                                <p className=' text-center'>Giới hạn đặt hàng mỗi khách</p>
                            </div>
                            <div className='w-16'>
                                <p className=' text-center'>Bật / Tắt</p>
                            </div>
                            <div className=' w-16'>
                                <p className=' text-center'></p>
                            </div>
                        </div>
                    </div>

                    <div className=' flex flex-col gap-4'>
                        {listDiscountByIdProduct.map((item, index) => {
                            return (
                                <ItemShowDetailDiscount key={index} listDiscount={item} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}


type GroupedDiscountDetails = {
    [key: string]: typeDiscountDetail[] | typeFlashSaleDetailResult[];
};

function groupByProduct(discount_detail: (typeDiscountDetail | typeFlashSaleDetailResult)[]) {
    
    const grouped = discount_detail.reduce((acc, detail) => {
        // Assuming 'id_productPrice' and 'id_product' exist on both types
        const productId = detail.id_productPrice.id_product[0];

        // Check if 'detail' is of type 'typeDiscountDetail' or 'typeFlashSaleDetailResult'
        if ((detail as typeDiscountDetail).id_discount !== undefined) {
            if (!acc[productId]) {
                acc[productId] = [];
            }
            (acc[productId] as typeDiscountDetail[]).push(detail as typeDiscountDetail);
        } else {
            if (!acc[productId]) {
                acc[productId] = [];
            }
            (acc[productId] as typeFlashSaleDetailResult[]).push(detail as typeFlashSaleDetailResult);
        }

        return acc;
    }, {} as GroupedDiscountDetails);

    return Object.values(grouped);
}
export default ShowDiscountDetail