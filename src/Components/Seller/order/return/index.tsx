import React from 'react'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import { IoMdTimer } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { SelectProductByIdShop } from '../../../../redux/features/product'
import { useAppSelector } from '../../../../redux/hook'
import { formatNumberVnd } from '../../../../utils/fortmartNumberVnd'

const OrderReturnComponent: React.FC = () => {
    const products = useAppSelector(SelectProductByIdShop)
    return (
        <>
            <div className=' p-6 bg-white rounded shadow-md font-normal  text-sm'>
                <div className=' py-2'>
                    <h4 className=' text-xl py-1 '>Trả hàng / Hoàn tiền</h4>
                </div>
                <div className=' flex gap-2 border-b'>
                    <p className=' p-4 cursor-pointer clear-start font-semibold text-primary border-b-4 border-primary'>
                        Tất cả
                    </p>
                    <p className=' p-4 cursor-pointer'>
                        TechTribe đang xem xét
                    </p>
                    <p className=' p-4 cursor-pointer'>
                        Đang trả hàng
                    </p>
                    <p className=' p-4 cursor-pointer'>
                        Đã hoàn tiền cho Người mua
                    </p>
                    <p className=' p-4 cursor-pointer'>
                        Đã khiếu nại đến TechTribe
                    </p>
                    <p className=' p-4 cursor-pointer'>
                        Yêu cầu THHT bị hủy/không hợp lệ
                    </p>
                </div>
                <div className=' py-2 my-4'>
                    <div className=' flex items-center'>
                        <div className=' border rounded flex items-center'>
                            <div className='  py-1 px-4   w-[120px] flex items-center justify-between border-r'>
                                <p>Tìm yêu cầu</p>
                            </div>
                            <div className=' py-1  px-4 '>
                                <input type="text" className=' w-[300px]' placeholder=' Nhập mã yêu cầu trả hàng/Mã đơn hàng' />
                            </div>
                        </div>
                        <div className=' ml-4 text-xl'>
                            <IoSearch />
                        </div>
                    </div>
                </div>
                <div className=' flex justify-between items-center'>
                    <p>2 Yêu cầu</p>
                    <div className=' border rounded p-2 flex gap-2 items-center'>
                        Sắp xếp theo yêu cầu gần nhất <FaSortAmountDownAlt />
                    </div>
                </div>
                <div className=' py-2 my-4 flex flex-col gap-4  text-xs'>
                    <div className=' bg-gray-100 p-2 flex gap-4 rounded px-4 items-center  text-sm'>
                        <div className=' flex-1'>Sản phẩm</div>
                        <div className=' w-[100px] '>Số tiền</div>
                        <div className=' w-[100px] '>Lý do</div>
                        <div className=' w-[100px] '>Phương án</div>
                        <div className=' w-[100px] '>Trạng thái</div>
                        <div className=' w-[150px] '>Vận chuyển đến Người Mua</div>
                        <div className=' w-[150px] '>Vận chuyển hàng hoàn</div>
                        <div className=' w-[100px] '>Thao tác</div>
                    </div>
                    <div className=' border rounded'>
                        <div className=' p-2 border-b flex items-center gap-4 bg-gray-50 rounded-t'>
                            <div className=' flex items-center gap-2 border-r'>
                                <img className=' w-7 h-7 object-cover rounded-full' src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/11/19/766929/Lisa-Plo_Rdyz.jpg" alt="" />
                                <p className=' w-[150px] truncate  text-sm'> Lysa </p>
                            </div>
                            <p>Mã đơn hàng: <span className=' uppercase border-r pr-4'>66a770e494cb9b512a91422f</span></p>
                            <p>Mã yêu cầu trả hàng: <span className=' uppercase'>668c06438c822b4d1a392495</span></p>
                        </div>
                        <div className=' p-2 flex gap-4 border-b '>

                            <div className=' flex-1 border-r  w-[150px] '>
                                <div className=' flex gap-2'>
                                    <div className=' flex-auto w-12 items-center'>
                                        <img src={products[5].thumbnails[0]} className='w-12 h-12 rounded' alt="" />
                                    </div>
                                    <div className=' flex-1 pr-4'>
                                        <div className=' flex justify-between items-center'>
                                            <p className=' max-w-[140px] truncate font-semibold'>{products[5].name} </p>
                                            <p className=' px-2 flex-none'>x 1</p>
                                        </div>
                                        <p className=' text-gray-600 pt-1 text-xs flex gap-1'>
                                            <span>{products[5].product_price[0].id_color[0]&&products[5].product_price[0].id_color[0].value},</span>
                                            <span>{ products[5].product_price[0].id_size[0]&& products[5].product_price[0].id_size[0].value}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className=' w-[100px] border-r pr-4'>
                                <p>Dự kiến hoàn tiền</p>
                                <p> {formatNumberVnd(products[5].product_price[0].price)}</p>
                            </div>
                            <div className=' w-[100px] border-r pr-4'>
                                Thiếu hàng
                            </div>
                            <div className=' w-[100px] border-r pr-4'>
                                Hoàn tiền ngay
                            </div>
                            <div className=' w-[100px] border-r pr-4'>
                                Người mua đang trả hàng
                            </div>
                            <div className=' w-[150px] border-r pr-4'>
                                <p className=' p-1 rounded bg-green-300 text-green-700'>Đã giao hàng</p>
                                <p>Đã giao hàng ngày 31/07/2024</p>
                            </div>
                            <div className=' w-[150px] border-r '>
                                Người mua đang chuẩn bị giao hàng
                            </div>
                            <div className=' w-[100px] '>
                                <p className=' text-primary'>Hoàn tiền</p>
                            </div>
                        </div>
                    </div>
                    <div className=' border rounded'>
                        <div className=' p-2 border-b flex items-center gap-4 bg-gray-50 rounded-t'>
                            <div className=' flex items-center gap-2 border-r  text-sm'>
                                <img className=' w-7 h-7 object-cover rounded-full' src="https://imageio.forbes.com/specials-images/imageserve/653fcd49893eb27774ba7ecc/65th-GRAMMY-Awards---Arrivals/960x0.jpg?format=jpg&wMãth=960" alt="" />
                                <p className=' w-[150px] truncate'> Taylor Swift</p>
                            </div>
                            <p>Mã đơn hàng: <span className=' uppercase border-r pr-4 '>66a770f294cb9b1b5a914421</span></p>
                            <p>Mã yêu cầu trả hàng: <span className=' uppercase'>66a7710494cb9b1b5a9142eb</span></p>
                        </div>
                        <div className=' p-2 flex gap-4 border-b '>

                            <div className=' flex-1 border-r  w-[150px] '>
                                <div className=' flex gap-2'>
                                    <div className=' w-12 items-center'>
                                        <img src={products[4].thumbnails[0]} className='w-12 h-12 rounded' alt="" />
                                    </div>
                                    <div className=' flex-1 pr-4'>
                                        <div className=' flex justify-between items-center'>
                                            <p className='  max-w-[140px]  truncate font-semibold'> {products[4].name}</p>
                                            <p className=' px-2 flex-none'>x 2</p>
                                        </div>
                                        <p className=' text-gray-600 pt-1 text-xs flex gap-1'>
                                            <span>{products[4].product_price[0].id_color[0]&&products[4].product_price[0].id_color[0].value + ', '}</span>
                                            <span>{ products[4].product_price[0].id_size[0]&& products[4].product_price[0].id_size[0].value}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className=' w-[100px] border-r '>
                                <p>Dự kiến hoàn tiền</p>
                                <p> {formatNumberVnd(products[4].product_price[0].price)}</p>
                            </div>
                            <div className=' w-[100px] border-r '>
                                Người bán gửi hàng sai
                            </div>
                            <div className=' w-[100px] border-r '>
                                Trả hàng và hoàn tiền
                            </div>
                            <div className=' w-[100px] border-r '>
                                Đã hoàn tiền cho người mua
                            </div>
                            <div className=' w-[150px] border-r '>
                                <p className=' p-1 rounded bg-green-300 text-green-700'>Đã giao hàng</p>
                                <p>Đã giao hàng ngày 01/08/2024</p>
                            </div>
                            <div className=' w-[150px] border-r '>
                                Người mua đang chuẩn bị giao hàng
                            </div>
                            <div className=' w-[100px] '>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderReturnComponent