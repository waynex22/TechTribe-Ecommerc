import React from 'react'
import { Link } from 'react-router-dom'

const TopMenuNewProduct: React.FC = () => {
  return (
    <div className=' bg-white w-full rounded-md shadow text-sm'>
    <div className='flex'>
      <div className=' px-6 py-3'>
        <Link to="#BasicInformation">Thông tin cơ bản</Link>
      </div>
      <div className=' px-6 py-3'>
        <Link to="#DetailInformation">Thông tin chi tiết</Link>
      </div>
      <div className=' px-6 py-3'>
        <Link to="#BasicInformation">Basic information</Link>
      </div>
      <div className=' px-6 py-3'>
        <Link to="#BasicInformation">Basic information</Link>
      </div>
    </div>
  </div>
  )
}

export default TopMenuNewProduct