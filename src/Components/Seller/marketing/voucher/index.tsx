import React from 'react'
import { Link } from 'react-router-dom'
import ListVoucherComponent from './list/listVoucher'
import { useAppSelector } from '../../../../redux/hook'
import { SelectShop } from '../../../../redux/features/shop'

const VoucherComponet: React.FC = () => {
    const shop = useAppSelector(SelectShop)

  return (
    <>
            <div className=' p-6 bg-white rounded shadow-md'>
                <div className=' py-2'>
                    <h4 className=' text-xl py-1 '>Tạo Voucher</h4>
                    <p className=' text-gray-600 text-sm'>Tạo Mã giảm giá toàn shop hoặc Mã giảm giá sản phẩm ngay bây giờ để thu hút người mua.</p>
                </div>
                <div className=' pt-6 grid grid-cols-3 gap-2'>
                    <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <img className=' w-6' src="https://img.icons8.com/?size=100&id=49324&format=png&color=000000" alt="" />
                            <p className=' text-lg'>Voucher toàn Shop</p>
                        </div>
                        <p className=' text-gray-600 text-sm'>Voucher áp dụng cho tất cả sản phẩm trong shop của bạn.</p>
                        <div className=' flex flex-row-reverse'>
                            <Link to={'/seller/marketing/vouchers/new?case=1'} className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</Link>
                        </div>
                    </div>
                    <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <img className=' w-6' src="https://img.icons8.com/?size=100&id=xH3QxZpfwH6W&format=png&color=000000" alt="" />
                            <p className=' text-lg'>Voucher sản phẩm</p>
                        </div>
                        <p className=' text-gray-600 text-sm'>Voucher áp dụng cho những sản phẩm chỉ định mà Shop chọn</p>
                        <div className=' flex flex-row-reverse'>
                          <Link to={'/seller/marketing/vouchers/new?case=2'} className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</Link>
                        </div>
                    </div>
                </div>
            </div>
            {shop._id && <ListVoucherComponent id_shop={shop._id} />}
    </>
  )
}

export default VoucherComponet