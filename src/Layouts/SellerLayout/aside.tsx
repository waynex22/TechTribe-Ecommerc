import React from 'react'
import { FaBox, FaClipboardList } from 'react-icons/fa';
import { IoWalletSharp } from 'react-icons/io5';
import { MdDiscount } from 'react-icons/md';
import { RiCustomerService2Line } from 'react-icons/ri';
import { SiGoogleanalytics } from "react-icons/si";
import { FaShop } from "react-icons/fa6";

// import 'flowbite/dist/flowbite.css';
import { Link } from 'react-router-dom';

const AsideLayout: React.FC = () => {
    return (
        <aside className=" z-10  w-72 min-h-screen overflow-y-hidden hover:overflow-y-auto pt-[50px]" aria-label="Sidebar">
            <div className=' fixed w-[244px] min-h-screen pt-6 bg-white '>
                <div className=' flex flex-col gap-4 text-gray-500 py-4 text-left px-4 '>
                    <div className=' '>
                        <p className=' font-semibold text-base flex gap-2 items-center'> <FaClipboardList /> Quản lý đơn hàng</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'order'}>Tất cả</Link>
                            <Link to={'order?type=cancelled'}>Đơn hủy</Link>
                            <Link to={'order/return'}>Đơn Trả hàng/hoàn tiền</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base flex gap-2 items-center'><FaBox />Quản lý sản phẩm</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'product/list'}>Tất cả sản phẩm</Link>
                            <Link to={'product/new'}>Thêm sản phẩm</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base flex gap-2 items-center'> <MdDiscount /> Kênh Marketing</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'marketing/discount'}>Khuyễn mãi của Shop</Link>
                            <Link to={'marketing/flash-sale'}>Flash Sale của Shop</Link>
                            <Link to={'marketing/vouchers'}>Mã giảm giá của Shop</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base flex gap-2 items-center'> <RiCustomerService2Line /> Chăm sóc khách hàng</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'chat-management'}>Quản lý Chat</Link>
                            <Link to={'rating-management'}>Quản lý đánh giá</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base flex gap-2 items-center'> <IoWalletSharp /> Tài chính</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'income'}>Danh thu</Link>
                            <Link to={'wallet'}>Số dư TK</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base flex gap-2 items-center'> <SiGoogleanalytics /> Dữ liệu</p>
                        <div className=' font-normal text-sm text-gray-700 pt-2 pl-4 flex gap-1 flex-col'>
                            <Link to={'overview'}>Phân tích bán hàng</Link>
                        </div>
                    </div>
                    <div className=' '>
                        <p className=' font-semibold text-base flex gap-2 items-center'> <FaShop /> Quản lý shop</p>
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