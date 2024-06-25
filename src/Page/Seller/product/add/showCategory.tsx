import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ShowCategory = ({onHandlePopup}:{onHandlePopup: () => void; }) => {
  return (
    <div>
        <div className=' bg-white p-6 rounded w-[800px]'>
            <div className=' flex justify-between items-center'>
                <h2>Chỉnh sửa danh mục</h2>
                <p  onClick={()=>onHandlePopup()} className=' cursor-pointer text-2xl'><IoClose /></p>
            </div>
            <div className=' text-sm font-normal mt-4 py-2 border rounded-md'>
                <div className=' flex  overflow-x-auto h-[200px]'>
                    <div className=' flex-none w-[250px]  overflow-y-auto border-r'>
                        <div className=' flex flex-col gap-1'>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                        </div>
                    </div>
                    <div className=' flex-none w-[250px]  overflow-y-auto border-r'>
                        <div className=' flex flex-col gap-1'>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                            <p className=' px-2 flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100'>
                                Thời trang nữ
                                <FaAngleRight />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' pt-4 flex justify-between items-center'>
                <p className=' font-normal text-sm '>
                    Đã chọn: 
                    <span className='pl-2 font-semibold'>Dang anh</span>
                </p>
                <div className=' flex gap-4 text-sm '>
                    <p onClick={()=>onHandlePopup()} className=' px-4 py-2 rounded border cursor-pointer hover:bg-gray-100 text-gray-500'>Hủy</p>
                    <p className=' px-4 py-2 rounded border cursor-pointer hover:bg-gray-100'>Xác nhận</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowCategory