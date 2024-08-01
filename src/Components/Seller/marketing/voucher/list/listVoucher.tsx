import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { fetchVoucherByIdShop, SelectListVoucher } from '../../../../../redux/features/voucher'
import EmptyBox from '../../discount/create/emptyBox'
import { checkTimeStatus } from '../../discount/list/listDiscout'
import { formatShowDate } from '../../../../../utils/fortmartNumberVnd/formartDate'
import CheckTimeOperationVoucher from './checkTimeOperationVoucher'

const ListVoucherComponent = ({ id_shop }: { id_shop: string }) => {
  const dispath = useAppDispatch()
  const listVoucher = useAppSelector(SelectListVoucher)
  useEffect(() => {
    dispath(fetchVoucherByIdShop(id_shop))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_shop])
  return (
    <>
      <div className=' bg-white shadow-md my-6 py-6 rounded px-4 flex flex-col gap-6'>
        <div className=''>
          <h4 className=' text-base py-1'>Hiệu quả</h4>
          <div className=' border p-4 grid grid-cols-4 gap-4 rounded my-4'>
            <div className=' border-r'>
              <p>Danh số</p>
              <p>0</p>
            </div>
            <div className=' border-r'>
              <p>Danh số</p>
              <p>0</p>
            </div>
            <div className=' border-r'>
              <p>Danh số</p>
              <p>0</p>
            </div>
            <div className=''>
              <p>Danh số</p>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className=''>
          <h4 className=' text-base py-1 '>Danh sách mã giảm giá</h4>
        </div>

        <div>
          <div className=' border rounded overflow-hidden text-sm'>
            <div className='px-4 bg-gray-100 py-4 border-b'>
              <div className=' flex gap-4 items-center'>
                <div className=' w-3/12'>
                  <p>Tên Voucher | Mã voucher</p>
                </div>
                <div className=' w-1/6'>
                  <p>Loại khuyến mãi</p>
                </div>
                <div className=' w-1/6'>
                  <p>Hình thức</p>
                </div>
                <div className=' w-1/6'>
                  <p> Tỉ lệ </p>
                </div>
                <div className=' w-1/6'>
                  <p>	Thời Gian</p>
                </div>
                <div className=' w-1/6'>
                  <p>	Thao tác</p>
                </div>
              </div>
            </div>
            {listVoucher[0]._id && listVoucher.length > 0 ? listVoucher.map(item => {
              return (
                <div key={item._id} className=' flex gap-4 items-center p-2 border-b text-xs font-normal'>
                  <div className=' w-3/12 px-6'>
                    <div className=' flex'> {checkTimeStatus(item.time_start, item.time_end)} </div>
                    <p className=' py-1 truncate'>{item.name}</p>
                    <p> Mã giảm giá: <span className=' font-semibold'>{item.code}</span> </p>
                  </div>
                  <div className=' w-1/6'>
                    <p>{item.id_product.length > 0 ? 'Mã giảm giá trên sản phẩm' : 'Mã giảm giá toàn Shop'}</p>
                  </div>
                  <div className=' w-1/6'>
                    <p>{item.id_product.length > 0 ? 'Tổng cộng ' + item.id_product.length + ' sản phẩm' : 'Tất cả sản phẩm'}</p>
                  </div>
                  <div className=' w-1/6'>
                    <p> {item.type === 'price' ? `Giảm ${item.percent}%` : `Hoàn ${item.percent}% xu`} </p>
                  </div>
                  <div className=' w-1/6'>
                    <p> {formatShowDate(item.time_start)} </p>
                    <p> - </p>
                    <p> {formatShowDate(item.time_end)} </p>
                  </div>
                  <div className=' w-1/6'>
                    <CheckTimeOperationVoucher time_start={item.time_start} time_end={item.time_end} id={item._id} />
                  </div>
                </div>
              )
            }) :
              <>
                <EmptyBox />
              </>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListVoucherComponent