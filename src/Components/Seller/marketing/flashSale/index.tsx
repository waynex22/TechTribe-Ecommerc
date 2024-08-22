import React from 'react'
import { Link } from 'react-router-dom'
import ListFlashSale from './list/listFlashSale'
import { useAppSelector } from '../../../../redux/hook'
import { SelectShop } from '../../../../redux/features/shop'

const FlashSaleComponet: React.FC = () => {
  const shop = useAppSelector(SelectShop)
  return (
    <div className=' text-sm font-normal'>
      <div className=' p-6 bg-white rounded shadow-md'>
        <div className=' py-2'>
          <h4 className=' text-xl py-1 '>Tạo Flash Sale</h4>
          <p className=' text-gray-600 text-sm'>Chạy chương trình Flash Sale của riêng Shop để tăng doanh số!</p>
        </div>
        <div className=' pt-6 grid grid-cols-3 gap-2'>
          <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <img className=' w-6' src="https://img.icons8.com/?size=100&id=R1BiZHA6YeDU&format=png&color=000000" alt="" />
              <p className=' text-lg'>  Chương Trình mới</p>
            </div>
            <p className=' text-gray-600 text-sm'>Tạo Chương trình của Shop để thiết lập các chương trình giảm giá sản phẩm</p>
            <div className=' flex flex-row-reverse'>
              <Link to={'/seller/marketing/flash-sale/new'} className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</Link>
            </div>
          </div>
        </div>
      </div>
      {shop._id && <ListFlashSale id_shop={shop._id} />}
    </div>
  )
}

export default FlashSaleComponet