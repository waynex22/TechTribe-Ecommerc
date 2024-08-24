import { Link } from "react-router-dom";
import { formatNumberVnd } from "src/utils/fortmartNumberVnd";

interface Props {
    item: any
}
const ItemReturn: React.FC<Props> = ({ item }) => {
    console.log(item);

    return (
        <>
            <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between border-b border-dashed border-gray-200">
                    <div className="flex items-center gap-2 my-2">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="store"><path fill="#0795ff" d="M27.4,9.553l-3-6A1,1,0,0,0,23.5,3H8.5a1,1,0,0,0-.895.553l-3,6A1,1,0,0,0,5.5,11h21A1,1,0,0,0,27.4,9.553Z"></path><path fill="#0795ff" d="M27,10V24a5,5,0,0,1-5,5H10a5,5,0,0,1-5-5V10A1,1,0,0,1,6,9H26A1,1,0,0,1,27,10Z"></path><path fill="#dfe8f4" d="M26 9H6a3 3 0 00-3 3v2a3.983 3.983 0 007 2.618 3.947 3.947 0 006 0 3.947 3.947 0 006 0A3.983 3.983 0 0029 14V12A3 3 0 0026 9zM21 25v4H11V25a5 5 0 0110 0z"></path></svg>
                        <p className="font-nomal text-gray-500 text-sm">{item?.shopId?.name} Store</p>
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

                            <Link to={`/shop/${item?.shopId._id}`} className="text-[12px]">Xem shop</Link>
                        </button>
                    </div>

                </div>
                <div className='flex flex-col items-center'>
                    {item?.itemsReturn?.map((item: any, index: number) => (
                        <>
                            <div key={index} className='flex items-center justify-between w-full my-4'>
                                <Link to={`/product/${item?.productPriceId?.id_product[0]?._id}`} className='flex items-center gap-2'>
                                {item?.productPriceId?.id_color[0]?.thumbnail ? (
                                    <>
                                        <img src={`http://localhost:8080/uploads/${item?.productPriceId?.id_color[0]?.thumbnail}`} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                    </>
                                ) : (
                                    <>
                                        <img src={`http://localhost:8080/uploads/${item?.productPriceId?.id_product[0]?.thumbnails[0]}`} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                    </>
                                )}
                                    <div>
                                        <p className='font-normal text-[14px]'>{item?.productPriceId?.id_product[0]?.name}</p>
                                        <p className='text-[12px] text-gray-400'>Phân loại hàng : {item?.productPriceId?.id_color?.length > 0 && item?.productPriceId?.id_size?.length > 0 ? item?.productPriceId?.id_color[0]?.value + ' , ' + item?.productPriceId?.id_size[0]?.value : item?.productPriceId?.id_size[0]?.value || item?.productPriceId?.id_color[0]?.value}</p>
                                        <p className='text-[12px]'>x{item?.quantity}</p>
                                    </div>
                                </Link>
                                <div className='flex items-center gap-4'>
                                    {item?.discountDetailId ? (
                                        <>
                                            <del className='font-normal text-[14px] text-gray-400'>{formatNumberVnd(item?.productPriceId?.price * item?.quantity)}đ</del>
                                            <p className="font-normal text-[14px] text-red-400">{formatNumberVnd(item?.productPriceId?.price * item?.quantity * (100 - item?.discountDetailId?.percent) / 100)}đ</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='font-normal text-[14px] text-red-400'>{item?.productPriceId?.price ? formatNumberVnd(item?.productPriceId?.price * item?.quantity) : 0}đ</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mt-6 border-t border-dashed w-full'>
                                <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                                    <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Số tiền hoàn lại</p>
                                    <p className="w-[20%] py-2 px-1 text-[14px] text-gray-500 text-end font-normal">{formatNumberVnd(item?.refundAmount)}đ</p>
                                </div>
                                {item?.discount2t > 0 && (
                                     <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                                     <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Giảm giá từ voucher</p>
                                     <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal">- {formatNumberVnd(item?.discount2t)}đ</p>
                                 </div>
                                )}
                                <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                                    <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Hoàn tiền vào</p>
                                    <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal">Ví Techtribe Pay</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 p-4 w-full">
                                <p className="text-md font-bold-light">Lý do: {item?.returnReason}</p>
                                <div className="flex flex-col items-start gap-4 border-t border-dashed border-gray-200">
                                    <p className="text-xs my-2 text-gray-400 font-normal">{item?.description}</p>
                                    <div className="flex items-center gap-2">
                                        {item?.images?.map((item: any, index: number) => (
                                            <img key={index} src={`http://localhost:8080/uploads/${item}`} alt="" className="w-[100px] h-[100px] rounded-lg object-cover" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>

            </div>
        </>
    )
}
export default ItemReturn;