import React from 'react'

const BalanceCompenent: React.FC = () => {
  return (
    <>
      <div className='text-sm font-normal'>
        <div className=' p-6 bg-white rounded shadow-md'>
          <div className='pb-4'>
            <h4 className=' text-xl py-1 '>Tổng Quan</h4>
          </div>
          <div className=' py-4 px-6 pt-4 grid grid-cols-2 gap-2 border rounded w-[770px]'>
            <div className=' flex flex-col gap-2'>
              <div className=' flex items-center gap-5'>
                <p className='text-base'>Số dư</p>
                <p className=' px-4 py-2 rounded border text-white bg-primary font-semibold '>Rút tiền</p>
              </div>
              <p className=' font-semibold text-xl'>400.000 đ</p>
            </div>
          </div>

          <div className=' py-4 flex flex-col gap-4 my-4'>
            <p className=' font-semibold text-base'>Các giao dịch gần đây</p>

            <div className=' border rounded'>
              <div className=' flex gap-2 items-center bg-gray-100  border-b px-4 py-2'>
                <div className=' w-[100px]'> Ngày</div>
                <div className='flex-1'>Loại giao dịch</div>
                <div className=' w-[150px]'>Dòng tiền</div>
                <div className=' w-[150px]'>Số tiền</div>
                <div className=' w-[150px]'>Trạng thái</div>
              </div>
              <div className=' flex gap-2 items-center p-4'>
                <div className=' w-[100px]'> 07/08/2024 </div>
                <div className='flex-1 font-semibold'>Danh thu từ đơn hàng #66a770f294cb9b1b5a9142e4</div>
                <div className=' w-[150px]'>Tiền vào</div>
                <div className=' w-[150px]'> 120.000 đ</div>
                <div className=' w-[150px]'>Hoàn thành</div>
              </div>
              <div className=' flex gap-2 items-center p-4'>
                <div className=' w-[100px]'> 07/08/2024 </div>
                <div className='flex-1 font-semibold'>Danh thu từ đơn hàng #667abd51782d1e423c0017e7</div>
                <div className=' w-[150px]'>Tiền vào</div>
                <div className=' w-[150px]'> 280.000 đ</div>
                <div className=' w-[150px]'>Hoàn thành</div>
              </div>
              <div className=' flex gap-2 items-center p-4'>
                <div className=' w-[100px]'> 06/08/2024 </div>
                <div className='flex-1 font-semibold'>Rút tiền về tài khoản ngân hàng</div>
                <div className=' w-[150px]'>Tiền ra</div>
                <div className=' w-[150px]'>  2.458.000 đ</div>
                <div className=' w-[150px]'>Hoàn thành</div>
              </div>
              <div className=' flex gap-2 items-center p-4'>
                <div className=' w-[100px]'> 06/08/2024 </div>
                <div className='flex-1 font-semibold'>Danh thu từ đơn hàng #667abd64782d1e423c0017ea</div>
                <div className=' w-[150px]'>Tiền vào</div>
                <div className=' w-[150px]'> 240.000 đ</div>
                <div className=' w-[150px]'>Hoàn thành</div>
              </div>
              <div className=' flex gap-2 items-center p-4'>
                <div className=' w-[100px]'> 06/08/2024 </div>
                <div className='flex-1 font-semibold'>Danh thu từ đơn hàng #667abd76782d1e423c0017ed</div>
                <div className=' w-[150px]'>Tiền vào</div>
                <div className=' w-[150px]'> 120.000 đ</div>
                <div className=' w-[150px]'>Hoàn thành</div>
              </div>
              <div className=' flex gap-2 items-center p-4'>
                <div className=' w-[100px]'> 06/08/2024 </div>
                <div className='flex-1 font-semibold'>Danh thu từ đơn hàng #667abd93782d1e423c0017f0</div>
                <div className=' w-[150px]'>Tiền vào</div>
                <div className=' w-[150px]'> 320.000 đ</div>
                <div className=' w-[150px]'>Hoàn thành</div>
              </div>
              <div className=' flex gap-2 items-center p-4'>
                <div className=' w-[100px]'> 05/08/2024 </div>
                <div className='flex-1 font-semibold'>Danh thu từ đơn hàng #667abdc0782d1e423c0017f3</div>
                <div className=' w-[150px]'>Tiền vào</div>
                <div className=' w-[150px]'> 158.000 đ</div>
                <div className=' w-[150px]'>Hoàn thành</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BalanceCompenent