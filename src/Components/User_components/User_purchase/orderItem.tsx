import React from 'react';
import shipping from './shipping.gif'
import { formatNumberVnd } from 'src/utils/fortmartNumberVnd';
import { formatDate, formatDateAndTime } from 'src/utils/formartDate';
import { Link } from 'react-router-dom';
interface Props {
    order: any
}
const OrderItem: React.FC<Props> = ({ order }) => {
    const [showTimeUpdate, setShowTimeUpdate] = React.useState(false);
    const getKeyUpdateItem = (key: string) => {
        return order?.statusUpdate?.filter((item: any) => item.key === key).map((item: any) => item.value);
    }
    return (
        <>
            <div className="p-4">
                    <div className="flex items-center justify-between border-b border-dashed border-gray-200">
                        <div className="flex items-center gap-2">
                            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="store"><path fill="#0795ff" d="M27.4,9.553l-3-6A1,1,0,0,0,23.5,3H8.5a1,1,0,0,0-.895.553l-3,6A1,1,0,0,0,5.5,11h21A1,1,0,0,0,27.4,9.553Z"></path><path fill="#0795ff" d="M27,10V24a5,5,0,0,1-5,5H10a5,5,0,0,1-5-5V10A1,1,0,0,1,6,9H26A1,1,0,0,1,27,10Z"></path><path fill="#dfe8f4" d="M26 9H6a3 3 0 00-3 3v2a3.983 3.983 0 007 2.618 3.947 3.947 0 006 0 3.947 3.947 0 006 0A3.983 3.983 0 0029 14V12A3 3 0 0026 9zM21 25v4H11V25a5 5 0 0110 0z"></path></svg>
                            <p className="font-nomal text-gray-500 text-sm">{order?.shopId?.name} Store</p>
                            <button className="flex items-center gap-1 p-1 rounded-md bg-blue-500 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>
                                <p className="text-[12px]">Chat</p>
                            </button>
                            <button className="flex items-center gap-1 p-1 rounded-md bg-blue-500/20 text-blue-500/60">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                </svg>

                                <p className="text-[12px]">Xem shop</p>
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <img src={shipping} alt="" className='w-[40px]' />
                            {!order.statusShipping ? (
                                <>
                            <p className="text-primary font-normal text-[12px]">{order?.status}</p>
                                </>
                            ): (
                                <>
                                   <p className="text-primary font-normal text-[12px]">{order?.statusShipping === 'Đã gửi hàng' ? 'Đang giao hàng' : 'Giao hàng thành công'}</p>
                                </>
                            )}
                            <svg onMouseMove={() => setShowTimeUpdate(true)} onMouseLeave={() => setShowTimeUpdate(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500 relative cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>
                           {showTimeUpdate && (
                             <div className='absolute p-1 ml-[75px] mb-12 bg-gray-500/20 backdrop-blur-sm rounded-lg'>
                             <p className='text-[8px] text-gray-400'>Cập nhật lúc : {formatDateAndTime(getKeyUpdateItem(order?.statusShipping)[0    ])}</p>
                         </div>
                           )}
                        </div>
                    </div>
                    <Link to={`/profile/purchase/order/${order?._id}`} className='flex flex-col items-center cursor-pointer'>
                        {order?.items?.map((item: any, index: number) => (
                            <>
                            <div key={index} className='flex items-center justify-between w-full my-2 '>
                                <div className='flex items-center gap-2'>
                                    <img src={item?.productPriceId?.id_product[0]?.thumbnails[0]} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                    <div>
                                        <p className='font-normal text-[14px]'>{item?.productPriceId?.id_product[0]?.name}</p>
                                        <p className='text-[12px] text-gray-400'>Phân loại hàng : {item?.productPriceId?.id_color?.length > 0 && item?.productPriceId?.id_size?.length > 0  ? item?.productPriceId?.id_color[0]?.value + ' , ' + item?.productPriceId?.id_size[0]?.value : item?.productPriceId?.id_size[0]?.value || item?.productPriceId?.id_color[0]?.value}</p>
                                        <p className='text-[12px]'>x{item?.quantity}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <p className='font-normal text-[14px] text-red-400'>{item?.productPriceId?.price ? formatNumberVnd(item?.productPriceId?.price * item?.quantity) : 0}đ</p>
                                </div>
                            </div>
                            </>
                        ))}
                    </Link>
                    <div className='flex items-center justify-end gap-2 mt-2 border-t border-dashed py-2'>
                        <div className='flex items-center gap-2'>
                        <svg className='size-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="money"><polygon fill="#3870cf" points="7 5 5 5 4 1 8 1 7 5"></polygon><polygon fill="#3870cf" points="11 5 9 5 8 1 12 1 11 5"></polygon><path fill="#468ff1" d="M9.09,22H6.91A6.91,6.91,0,0,1,1.16,11.26L4,7h8l2.84,4.26A6.91,6.91,0,0,1,9.09,22Z"></path><path fill="#fff" d="M7.5,12H11V10H9V9H7v1.05A2.5,2.5,0,0,0,7.5,15h1a.5.5,0,0,1,0,1H5v2H7v1H9V18A2.5,2.5,0,0,0,8.5,13h-1a.5.5,0,0,1,0-1Z"></path><polygon fill="#468ff1" points="9 5 7 5 6 0 10 0 9 5"></polygon><rect width="10" height="3" x="3" y="4" fill="#61c5fa"></rect><path fill="#6dedd4" d="M24,14v3.9A6.22,6.22,0,0,1,19,24a6.21,6.21,0,0,1-5-6.1V14l5-2Z"></path><polygon fill="#fff" points="18.5 20.41 15.79 17.71 17.21 16.29 18.5 17.59 20.79 15.29 22.21 16.71 18.5 20.41"></polygon></svg>
                        <p className='font-normal text-[14px]'>Thành tiền:</p>
                        </div>
                        <p>{formatNumberVnd(order?.total)}đ</p>
                    </div>
            </div>

        </>
    )
}

export default OrderItem;