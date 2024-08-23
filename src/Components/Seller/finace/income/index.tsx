import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchListOrderByShop, SelectListOrderByShop } from '../../../../redux/features/orderSeller'
import { typeItemOrder } from '../../../../utils/types/orderSeller'
import { formatNumberVnd } from '../../../../utils/fortmartNumberVnd/index';
import EmptyBox from '../../marketing/discount/create/emptyBox';
import { Link } from 'react-router-dom';

const IncomeComponent: React.FC = () => {
  const dispath = useAppDispatch()
  const listOrder = useAppSelector(SelectListOrderByShop)
  const [listOrderComplated, setListOrderComplated] = useState([] as typeItemOrder[])
  const [listOrderShipping, setListOrderShipping] = useState([] as typeItemOrder[])
  const [nameShow, setNameShow] = useState('' as 'shipping' | 'complated')

  useEffect(() => {
    setNameShow('shipping')
  }, [])

  useEffect(() => {
    dispath(fetchListOrderByShop())
  }, [dispath])

  useEffect(() => {
    if (listOrder.length > 0) {
      setListOrderComplated(() => listOrder.filter(order => order.status === 'Hoàn thành'))
      setListOrderShipping(() => listOrder.filter(order => order.status === 'Đang vận chuyển'))
    }
  }, [listOrder])

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
              <p className=' font-semibold text-xl'>
                {
                  formatNumberVnd(
                    listOrderShipping.reduce((com, item) => {
                      return com + item.subTotal
                    }, 0)
                  )
                }
              </p>
            </div>
            <div className=' px-4 flex flex-col gap-2'>
              <p className=' font-semibold text-base'>Đã thanh toán</p>
              <p className=' text-sm text-gray-600'>Tổng cộng</p>
              <p className=' font-semibold text-xl'>
                {
                  formatNumberVnd(
                    listOrderComplated.reduce((com, item) => {
                      return com + item.subTotal
                    }, 0)
                  )
                }
              </p>
            </div>
          </div>
        </div>

        <div className=' p-6 bg-white rounded shadow-md'>
          <div className='pb-2'>
            <h4 className=' text-xl py-1 '>Chi Tiết</h4>
          </div>
          <div className=' py-2'>
            <div className='flex gap-2 border-b'>
              <p
                onClick={() => setNameShow('shipping')}
                className={` cursor-pointer p-4 ${nameShow === 'shipping' && 'border-b-4 border-primary text-primary font-bold'}`}>
                Chưa thanh toán
              </p>
              <p
                onClick={() => setNameShow('complated')}
                className={` cursor-pointer p-4 ${nameShow === 'complated' && 'border-b-4 border-primary text-primary font-bold'}`}>
                Đã thanh toán
              </p>
            </div>
          </div>
          <div className=' py-2'>
            <div className=' border rounded'>

              <div className=' p-2  flex gap-4  text-sm bg-gray-100 border-b text-gray-600 font-medium '>
                <div className='flex-1 flex gap-2 py-2 px-2 border-r'>
                  <div>
                    <p className='  truncate'>Thông tin đơn hàng:</p>
                  </div>
                </div>
                <div className=' w-[200px] px-2 py-2 border-r'> Trạng thái đơn hàng</div>
                <div className=' w-[200px] px-2 py-2 border-r'> Phương thức thanh toán</div>
                <div className=' w-[200px] px-2 py-2 '> Tổng số tiền </div>
              </div>

              {nameShow === 'shipping' &&
                <>
                  {listOrderShipping.length > 0 ?
                    listOrderShipping.map((item) => {
                      return <div key={item._id} className=' p-2  flex gap-4  text-sm'>
                        <div className='flex-1 flex gap-2 px-2 border-r'>
                          <Link to={`/seller/order/detail/${item._id}`} className='py-2 '>
                            <p className=' font-semibold text-xs'>Mã đơn hàng: {item._id.toUpperCase()} </p>
                            <p className=' text-gray-600 truncate'>Người mua: {item.customerId.name}</p>
                          </Link>
                        </div>
                        <div className=' w-[200px] py-2  px-2 border-r'> {item.status} </div>
                        <div className=' w-[200px] py-2 px-2 border-r'> {item.orderId.methodPayment}</div>
                        <div className=' w-[200px] py-2 px-2 text-sm font-semibold'> {formatNumberVnd(item.subTotal)} </div>
                      </div>
                    }) :
                    <EmptyBox text='không thấy lịch sử' />}
                </>
              }

              {nameShow === 'complated' &&
                <>
                  {listOrderComplated.length > 0 ?
                    listOrderComplated.map((item) => {
                      return <div key={item._id} className=' p-2  flex gap-4  text-sm'>
                        <div className='flex-1 flex gap-2 px-2 border-r'>
                          <Link to={`/seller/order/detail/${item._id}`} className='py-2 '>
                            <p className=' font-semibold text-xs'>Mã đơn hàng: {item._id.toUpperCase()} </p>
                            <p className=' text-gray-600 truncate'>Người mua: {item.customerId.name}</p>
                          </Link>
                        </div>
                        <div className=' w-[200px] py-2  px-2 border-r'> {item.status} </div>
                        <div className=' w-[200px] py-2 px-2 border-r'> {item.orderId.methodPayment}</div>
                        <div className=' w-[200px] py-2 px-2 text-sm font-semibold'> {formatNumberVnd(item.subTotal)} </div>
                      </div>
                    }) :
                    <EmptyBox text='không thấy lịch sử' />}
                </>
              }

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default IncomeComponent