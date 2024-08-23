import React from 'react'
import { BsCashCoin } from 'react-icons/bs'
import { formatNumberVnd } from '../../../../utils/fortmartNumberVnd'
import { typeItemOrder } from '../../../../utils/types/orderSeller'

const ItemProductOrder = ({ order }: { order: typeItemOrder }) => {
    
    return (
        <>
            <div className='rounded bg-white shadow p-6 flex flex-col gap-4'>
                <div className=' flex gap-4'>
                    <p className=' text-primary font-semibold text-xl py-1'><BsCashCoin /></p>
                    <div className='w-full'>
                        <p className=' text-base font-semibold'> Thông tin thanh toán </p>
                        <div className=' my-4 rounded border text-sm'>
                            <div className=' p-2 rounded-t flex gap-4 bg-gray-100 border-b'>
                                <p className=' w-[50px] text-center'> STT</p>
                                <p className=' flex-auto'>Sản phẩm</p>
                                <p className=' w-[100px] text-center flex items-center justify-center'>Đơn giá</p>
                                <p className=' w-[100px] text-center flex items-center justify-center'>Số lượng</p>
                                <p className=' w-[100px] text-center flex items-center justify-center'>Thành tiền</p>
                            </div>

                            {order.items && order.items.length > 0 &&
                                order.items.map((item, index) => {
                                    return (
                                        <div key={index} className=' p-2 flex gap-4  border-b'>
                                            <p className=' w-[50px] flex items-center justify-center'> {index + 1} </p>
                                            <div className=' flex-auto flex gap-2'>
                                                <img className=' w-12 object-cover' src={item.productPriceId.id_product[0].thumbnails[0]} alt="" />
                                                <div className=' w-56'>
                                                    <p className=' truncate font-semibold'> {item.productPriceId.id_product[0].name} </p>
                                                    <p className=' text-gray-500 text-xs'>
                                                        Phân loại:
                                                        <HandleNameVariationByOrder order={order} />
                                                    </p>
                                                </div>
                                            </div>
                                            <p className=' w-[100px] text-center flex items-center justify-center'>
                                                {formatNumberVnd(item.productPriceId.price)}
                                            </p>
                                            <p className=' w-[100px] text-center flex items-center justify-center'>
                                                {item.quantity}
                                            </p>
                                            <p className=' w-[100px] text-center flex items-center justify-center'>
                                                {formatNumberVnd(item.quantity * item.productPriceId.price)}
                                            </p>
                                        </div>
                                    )
                                })
                            }

                            <div className=' flex flex-row-reverse px-6 py-4 '>
                                <div className=' min-w-[100px] text-right flex flex-col gap-2 border-l text-gray-800'>
                                    <p> {formatNumberVnd(order.subTotal)} </p>
                                    <p> {formatNumberVnd(order.discount)} </p>
                                    <p className=' text-base font-semibold border-t pt-1'> {formatNumberVnd(order.subTotal - order.discount)} </p>
                                </div>
                                <div className=' text-right flex flex-col gap-2 text-gray-600'>
                                    <p className=' px-2 text-sm '>Tổng tiền sản phẩm</p>
                                    <p className=' px-2 text-sm '>Khuyến mãi</p>
                                    <p className=' px-2 text-base  border-t pt-1'>Danh thu đơn hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export const HandleNameVariationByOrder = ({ order }: { order: typeItemOrder }) => {
    return <>
        <span>
            {
                order.items[0].productPriceId.id_color.length > 0 &&
                order.items[0].productPriceId.id_color[0].value + ', '
            }
        </span>
        <span>
            {
                order.items[0].productPriceId.id_size.length > 0 &&
                order.items[0].productPriceId.id_size[0].value
            }
        </span>
    </>


}

export default ItemProductOrder