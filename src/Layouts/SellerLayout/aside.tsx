import React from 'react'
// import 'flowbite/dist/flowbite.css';
import { Link } from 'react-router-dom';

const AsideLayout: React.FC = () => {
    return (
        <aside className=" z-10  w-72 max-h-screen overflow-y-hidden hover:overflow-y-auto pt-[50px]" aria-label="Sidebar">
            <div className=' fixed w-[244px] bg-white '>
                <div className=' flex flex-col gap-4 text-gray-500 py-4 text-left px-4 '>
                    <div className=' '>
                        <p className=' font-semibold text-base'>Quản lý đơn hàng</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'product'}>Tất cả</Link>
                            <Link to={'/seller'}>Giao hàng </Link>
                            <Link to={'voucher'}>Đơn hủy</Link>
                            <p>Đơn Trả hàng/hoàn tiền</p>
                            <p>Cài đặt vận chuyển</p>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base'>Quản lý sản phẩm</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'product/list'}>Tất cả sản phẩm</Link>
                            <Link to={'product/new'}>Thêm sản phẩm</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base'>Kênh Marketing</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'marketing/discount'}>Khuyễn mãi của Shop</Link>
                            <Link to={'marketing/flash-sale'}>Flash Sale của Shop</Link>
                            <Link to={'marketing/vouchers'}>Mã giảm giá của Shop</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base'>Quản lý shop</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'settings/profile'}>Hồ sơ shop</Link>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default AsideLayout