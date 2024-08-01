import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { fetchDiscount, SelectListDiscount, } from '../../../../../redux/features/discount'
import { formatShowDate } from '../../../../../utils/fortmartNumberVnd/formartDate'

import EmptyBox from '../create/emptyBox'
import CheckTimeOperation from './checkTimeOperation'

const ListDiscount = () => {
  const dispatch = useAppDispatch()
  const listDiscount = useAppSelector(SelectListDiscount)
  useEffect(() => {
    dispatch(fetchDiscount())
  }, [dispatch])
  return (
    <>
      <div className=' bg-white shadow-md my-6 py-6 rounded px-4 flex flex-col gap-6'>

        {/* <div className=''>
          <h4 className=' text-base py-1'>Hiệu quả Khuyến Mãi</h4>
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
        </div> */}
        <div className=''>
          <h4 className=' text-base py-1 '>Danh sách chương trình</h4>
          <p className=' text-gray-600 text-sm'>Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh số</p>
        </div>

        <div>
          <div className=' border rounded overflow-hidden text-sm'>
            <div className='px-4 bg-gray-100 py-4 border-b'>
              <div className=' flex gap-4 items-center'>
                <div className=' w-2/6'>
                  <p>Tất cả</p>
                </div>
                <div className=' w-1/5'>
                  <p>Loại khuyến mãi</p>
                </div>
                <div className=' w-1/5'>
                  <p>Sản phẩm</p>
                </div>
                <div className=' w-1/5'>
                  <p>	Thời Gian</p>
                </div>
                <div className=' w-1/6'>
                  <p>	Thao tác</p>
                </div>
              </div>
            </div>
            {listDiscount &&
            listDiscount.length > 0 &&
              listDiscount[0]._id ? listDiscount.map(item => {
                return (
                  <div key={item._id} className=' flex gap-4 items-center p-2 border-b text-xs'>
                    <div className=' w-2/6 px-6'>
                      <div className=' flex'> {checkTimeStatus(item.time_start, item.time_end)} </div>
                      <p className=' py-2 font-semibold text-base truncate'>{item.name}</p>
                    </div>
                    <div className=' w-1/5'>
                      <p>{item.type}</p>
                    </div>
                    <div className=' w-1/5'>
                      <p>Chưa có sản phẩm</p>
                    </div>
                    <div className=' w-1/5'>
                      <p> {formatShowDate(item.time_start)} </p>
                      <p> - </p>
                      <p> {formatShowDate(item.time_end)} </p>
                    </div>
                    <div className=' w-1/6'>
                      <CheckTimeOperation time_start={item.time_start} time_end={item.time_end} endpoint={`discount/${item._id}`} />
                    </div>
                  </div>
                )
              }) :
              <>
                <EmptyBox />
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export const checkTimeStatus = (time_start: Date, time_end: Date) => {
  const dateNow = new Date();
  const startDate = new Date(time_start);
  const endDate = new Date(time_end);
  if (dateNow < startDate) {
    return <p className="text-red-500 rounded bg-red-200 px-2 py-1">Sắp diễn ra</p>;
  }
  if (dateNow > endDate) {
    return <p className="text-gray-500 rounded bg-gray-200 px-2 py-1">Đã kết thúc</p>;
  }
  return <p className="text-green-500 rounded bg-green-200 px-2 py-1">Đang diễn ra</p>;
};

export default ListDiscount