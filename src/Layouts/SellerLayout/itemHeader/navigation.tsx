import React from 'react'
import { TfiMoreAlt } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

const NavigationComponentHeader = ({ nameShowItem, setShowItem }: {
    nameShowItem: string
    setShowItem: React.Dispatch<React.SetStateAction<string>>
}) => {
    return (
        <>
            <div className="  relative ">
                <div onClick={()=> setShowItem(name => name !== 'navigation' ? 'navigation' : '')} className="p-4 hover:bg-gray-100 cursor-pointer">
                    <TfiMoreAlt />
                </div>
                {nameShowItem === 'navigation' &&
                    <div className="absolute top-full right-0 p-2">
                        <div className="bg-white w-[300px] text-sm font-normal border rounded-md shadow-lg p-4">
                            <div className=" grid grid-cols-3 gap-4">
                                <Link to={'/seller/order'} className=" flex flex-col gap-1 items-center">
                                    <img className=" w-16 " src="https://img.icons8.com/?size=100&id=67582&format=png&color=000000" alt="" />
                                    <p className=' text-center'>Tất cả đơn hàng</p>
                                </Link>
                                <Link to={'/seller/product/list'} className=" flex flex-col gap-1 items-center">
                                    <img className=" w-16 " src="https://img.icons8.com/?size=100&id=114624&format=png&color=000000" alt="" />
                                    <p className=' text-center'>Tất cả sản phẩm</p>
                                </Link>
                                <Link to={'/seller/marketing/discount'}  className=" flex flex-col gap-1 items-center">
                                    <img className=" w-16 " src="https://img.icons8.com/?size=100&id=12381&format=png&color=000000" alt="" />
                                    <p className=' text-center'>Kênh Makerting</p>
                                </Link>
                                <Link to={'/seller/wallet'}  className=" flex flex-col gap-1 items-center">
                                    <img className=" w-16 " src="https://img.icons8.com/?size=100&id=64014&format=png&color=000000" alt="" />
                                    <p className=' text-center'>Số dư TK</p>
                                </Link>
                                <Link to={'/seller/overview'}  className=" flex flex-col gap-1 items-center">
                                    <img className=" w-16 " src="https://img.icons8.com/?size=100&id=KdWQjPvteDje&format=png&color=000000" alt="" />
                                    <p className=' text-center'>Phân tích bán hàng</p>
                                </Link>
                                <Link to={'/seller/settings/profile'}  className=" flex flex-col gap-1 items-center">
                                    <img className=" w-16 " src="https://img.icons8.com/?size=100&id=ZGqV6cHUtDmj&format=png&color=000000" alt="" />
                                    <p className=' text-center'>Thiết lập Shop</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default NavigationComponentHeader