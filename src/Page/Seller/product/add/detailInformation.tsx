import React from 'react'
import { FcAddImage } from 'react-icons/fc'

const DetailInformation = () => {
  return (
    <div id='DetailInformation' className='px-4 py-8 bg-white rounded-md shadow text-left'>
    <h3 className=' font-semibold text-lg px-5'>Thông tin cơ bản</h3>
    <div className=' flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>
        <div className=' flex gap-4'>
            <div className=' w-60 text-right'>
                <p> <span className=' text-red-600'>*</span> Hình ảnh sản phẩm</p>
            </div>
            <div>
                <div className=' cursor-pointer p-2 border  text-xs border-dashed rounded w-24 text-center'>
                    <p className=' text-4xl flex items-center justify-center'><FcAddImage /></p>
                    <p>Thêm hình ảnh (0/9)</p>
                </div>
            </div>
        </div>
        <div className=' flex gap-4'>
            <div className=' w-60 text-right'>
                <p> <span className=' text-red-600'>*</span> Ảnh bìa</p>
            </div>
            <div>
                <div className=' cursor-pointer p-2 border  text-xs border-dashed rounded w-24 text-center'>
                    <p className=' text-4xl flex items-center justify-center'><FcAddImage /></p>
                    <p>(0/1)</p>
                </div>
            </div>
        </div>
        <div className=' flex gap-4 items-center'>
            <div className=' w-60 text-right'>
                <p> <span className=' text-red-600'>*</span> Tên sản phẩm</p>
            </div>
            <div className=' flex-1'>
                <input type="text" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full p-2.5" placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kĩ thuật" required />
            </div>
        </div>
        <div className=' flex gap-4 items-center'>
            <div className=' w-60 text-right'>
                <p> <span className=' text-red-600'>*</span> Danh mục sản phẩm</p>
            </div>
        </div>
        <div className=' flex gap-4 '>
            <div className=' w-60 text-right'>
                <label> <span className=' text-red-600'>*</span> Mô tả sản phẩm</label>
            </div>
            <div className=' flex-1'>
            <textarea id="message"  className="block p-2.5 w-full h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder=""></textarea>

            </div>
        </div>
    </div>
</div>
  )
}

export default DetailInformation