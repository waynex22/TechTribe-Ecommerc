import React from 'react'
import { useParams } from 'react-router-dom'
import OrderDetailComponet from './orderDetailComponet'


const OrderDetail:React.FC = () => {
  const {id} = useParams()


  
  return (
    <>
      {id  && <OrderDetailComponet idOrder={id}/>}
    </>
  )
}

export default OrderDetail