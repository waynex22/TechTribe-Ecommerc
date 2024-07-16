import React from 'react'

const DefaultInfoAddProduct = ({title}:{title:string}) => {
  return (
    <div id='DetailInformation' className='text-gray-400 px-4 py-8 bg-white rounded-md shadow text-left'>
                <h3 className='  font-semibold text-lg px-5'>{title}</h3>
                <p className=' font-normal text-sm px-5 py-2'> 
                Có thể điều chỉnh sau khi chọn ngành hàng
                </p>
            </div>
  )
}

export default DefaultInfoAddProduct