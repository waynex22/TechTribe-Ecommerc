import React from 'react'
import { typeProduct } from '../../../../utils/types/product';

const SelectActiveFilter = ({ products, activeFilter, setActiveFilter }: {
  products: typeProduct[]
  activeFilter: string
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className=' py-4 px-6'>
      <div className=' flex'>
        <p
          onClick={() => setActiveFilter('all')}
          className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'all' && 'text-primary border-b-4 border-b-primary'}`}>
          Tất cả
        </p>
        <p
          onClick={() => setActiveFilter('activate')}
          className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'activate' && 'text-primary border-b-4 border-b-primary'}`}>
          Đang hoạt động({products.filter(item => !item.banned && !item.unlisted).length | 0})
        </p>
        <p
          onClick={() => setActiveFilter('banned')}
          className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'banned' && 'text-primary border-b-4 border-b-primary'}`}>
          Vi phạm({products.filter(item => item.banned).length | 0})
        </p>
        <p
          onClick={() => setActiveFilter('unlisted')}
          className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'unlisted' && 'text-primary border-b-4 border-b-primary'}`}>
          Chưa được đăng({products.filter(item => item.unlisted).length | 0})
        </p>
      </div>
    </div>
  )
}

export default SelectActiveFilter