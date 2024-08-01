import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { fetchFlashSaleByIdShop, SelectListFlashSale } from '../../../../../redux/features/flashSale'
import EmptyBox from '../../discount/create/emptyBox'
import { checkTimeStatus } from '../../discount/list/listDiscout'
import CheckTimeOperation from '../../discount/list/checkTimeOperation'
import { formatShowDate, formatShowDate_HH_MM } from '../../../../../utils/fortmartNumberVnd/formartDate'

const ListFlashSale = ({ id_shop }: { id_shop: string }) => {
  const dispatch = useAppDispatch()
  const listFlashSale = useAppSelector(SelectListFlashSale)
  useEffect(() => {
    dispatch(fetchFlashSaleByIdShop(id_shop))
  }, [])

  return (
    <>
      <div className=' bg-white shadow-md my-6 py-6 rounded px-4 flex flex-col gap-6'>
        <div className=''>
          <h4 className=' text-base py-1 '>Danh sách chương trình</h4>
          <p className=' text-gray-600 text-sm'>Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh số</p>
        </div>

        <div>
          <div className=' border rounded overflow-hidden text-sm'>
            <div className='px-4 bg-gray-100 py-4 border-b'>
              <div className=' flex gap-4 items-center justify-between'>
                <div className=' w-1/6'>
                  <p>Khung giờ</p>
                </div>
                <div className=' w-1/6  text-center'>
                  <p>Số sản phẩm tham gia</p>
                </div>
                <div className=' w-1/6  text-center'>
                  <p>Lượt Người đặt Nhắc nhở</p>
                </div>
                <div className=' w-1/6  text-center'>
                  <p>Lượt nhấp chuột/xem</p>
                </div>
                <div className=' w-1/6' >
                  <p>Trạng thái</p>
                </div>
                <div className=' w-1/12 '>
                  <p>Thao tác</p>
                </div>
              </div>
            </div>
            {listFlashSale[0]._id && listFlashSale.length > 0 ? listFlashSale.map(item => {
              return (
                <div key={item._id} className=' flex gap-4 items-center p-2 border-b text-xs'>
                  <div className=' w-1/6 flex gap-2 items-center'>
                  <p> {formatShowDate_HH_MM(item.time_start)} </p>
                  <span> - </span>
                  <p> {formatShowDate(item.time_end)} </p>
                  </div>
                  <div className=' w-1/6 text-center'>
                    <p>Số sản phẩm tham gia</p>
                  </div>
                  <div className=' w-1/6 text-center'>
                    <p> {item.number_reminders || '-'} </p>
                  </div>
                  <div className=' w-1/6 text-center'>
                    <p> {item.view || '-'} </p>
                  </div>
                  <div className=' w-1/6 '>
                    <div className=' flex'> {checkTimeStatus(item.time_start, item.time_end)} </div>
                  </div>
                  <div className=' w-1/12 '>
                   {item._id && <CheckTimeOperation time_start={item.time_start} time_end={item.time_end} endpoint={`flash-sale/${item._id}`}/>}
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

export default ListFlashSale