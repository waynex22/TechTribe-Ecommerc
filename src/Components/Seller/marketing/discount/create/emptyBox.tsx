import React from 'react'

const EmptyBox = () => {
  return (
    <div className=' flex flex-col items-center justify-center py-5'>
        <img className=' w-[100px]' src="https://img.icons8.com/?size=100&id=RwKyRA7u1eLS&format=png&color=000000" alt="" />
        <p className=' text-gray-500 pt-10'>Không tìm thấy sản phẩm</p>
    </div>
  )
}

export default EmptyBox