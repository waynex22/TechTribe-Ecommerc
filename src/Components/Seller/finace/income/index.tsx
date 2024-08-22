import React from 'react'

const IncomeComponent: React.FC = () => {
  return (
    <>
      <div className='text-sm flex flex-col gap-6  font-normal'>
        <div className=' p-6 bg-white rounded shadow-md'>
          <div className='pb-4'>
            <h4 className=' text-xl py-1 '>Tổng Quan</h4>
          </div>
          <div className=' py-4 px-6 pt-4 grid grid-cols-2 gap-2 border rounded w-[770px]'>
            <div className=' border-r flex flex-col gap-2'>
              <p className=' font-semibold text-base'>Chưa thanh toán</p>
              <p className=' text-sm text-gray-600'>Tổng cộng</p>
              <p className=' font-semibold text-xl'>718.000 đ</p>
            </div>
            <div className=' px-4 flex flex-col gap-2'>
              <p className=' font-semibold text-base'>Đã thanh toán</p>
              <p className=' text-sm text-gray-600'>Tổng cộng</p>
              <p className=' font-semibold text-xl'>2.858.000 đ</p>
            </div>
          </div>
        </div>

        <div className=' p-6 bg-white rounded shadow-md'>
          <div className='pb-2'>
            <h4 className=' text-xl py-1 '>Chi Tiết</h4>
          </div>
          <div className=' py-2'>
            <div className='flex gap-2 border-b'>
              <p className=' p-4 border-b-4 border-primary text-primary font-bold'>Chưa thanh toán</p>
              <p className=' p-4 '>Đã thanh toán</p>
            </div>
          </div>
          <div className=' py-2 w-[770px]'>
            <div className=' border rounded'>
              <div className=' p-2 bg-gray-100 flex gap-4 '>
                <p className=' flex-1 min-w-[180px] px-2'>Đơn hàng</p>
                <p className=' w-[200px] text-center'>Trạng thái</p>
                <p className=' w-[200px] text-center'>Phương thức thanh toán</p>
                <p className=' w-[200px] text-center'>Số tiền chưa thanh toán</p>
              </div>
              <div className=' p-2  flex gap-4  text-xs'>
                <div className='flex-1 flex gap-2 px-2 border-r'>
                  <div>
                    <p className=' font-semibold text-xs'>66a770e494cb9b1b5a9142df</p>
                    <p className=' text-gray-600 truncate'>Người mua: Luffy Toro</p>
                  </div>
                </div>
                <div className=' w-[200px] px-2 border-r'>Đơn hàng chưa hoàn thành</div>
                <div className=' w-[200px] px-2 border-r'>Thanh toán khi nhận hàng</div>
                <div className=' w-[200px] px-2 text-sm font-semibold'>120.000 đ</div>
              </div>
              <div className=' p-2  flex gap-4  text-xs'>
                <div className='flex-1 flex gap-2 px-2 border-r'>
                  <div>
                    <p className=' font-semibold text-xs'>667abcd8782d1e423c0017db</p>
                    <p className=' text-gray-600 truncate'>Người mua: Lysa</p>
                  </div>
                </div>
                <div className=' w-[200px] px-2 border-r'>Đơn hàng chưa hoàn thành</div>
                <div className=' w-[200px] px-2 border-r'>Thanh toán khi nhận hàng</div>
                <div className=' w-[200px] px-2 text-sm font-semibold'>178.000 đ</div>
              </div>
              <div className=' p-2  flex gap-4  text-xs'>
                <div className='flex-1 flex gap-2 px-2 border-r'>
                  <div>
                    <p className=' font-semibold text-xs'>667abd08782d1e423c0017de</p>
                    <p className=' text-gray-600 truncate'>Người mua: Luffy Toro</p>
                  </div>
                </div>
                <div className=' w-[200px] px-2 border-r'>Đơn hàng chưa hoàn thành</div>
                <div className=' w-[200px] px-2 border-r'>Thanh toán khi nhận hàng</div>
                <div className=' w-[200px] px-2 text-sm font-semibold'>140.000 đ</div>
              </div>
              <div className=' p-2  flex gap-4  text-xs'>
                <div className='flex-1 flex gap-2 px-2 border-r'>
                  <div>
                    <p className=' font-semibold text-xs'>667abd25782d1e423c0017e1</p>
                    <p className=' text-gray-600 truncate'>Người mua: Lady Gaga</p>
                  </div>
                </div>
                <div className=' w-[200px] px-2 border-r'>Đơn hàng chưa hoàn thành</div>
                <div className=' w-[200px] px-2 border-r'>Thanh toán khi nhận hàng</div>
                <div className=' w-[200px] px-2 text-sm font-semibold'>280.000 đ</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default IncomeComponent