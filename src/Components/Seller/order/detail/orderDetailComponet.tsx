import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchOrderByID, SelectItemOrder } from '../../../../redux/features/orderSeller'

import StatusOrderComponent from './statusOrder'
import InfoCustomerOrder from './infoCustomerOrder'
import ItemProductOrder from './itemProductOrder'

const OrderDetailComponet = ({ idOrder }: { idOrder: string }) => {
  const dispatch = useAppDispatch()
  const order = useAppSelector(SelectItemOrder)
  useEffect(() => {
    if (idOrder)
      dispatch(fetchOrderByID(idOrder))
  }, [dispatch, idOrder])
  return (
    <>
      {order && order._id &&
        <>
          <StatusOrderComponent order={order} />

          <div className=' my-4 flex gap-4 font-normal'>
            <div className=' w-2/3'>
              <ItemProductOrder  order={order} />
            </div>
            <div className=' w-1/3'>
              <InfoCustomerOrder  order={order} />
            </div>
          </div>
        </>
      }
    </>
  )
}

export default OrderDetailComponet