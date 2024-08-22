import React from 'react'
import { useParams } from 'react-router-dom'
import PromotionDetail from './promotionDetail'

const DetailDiscountCheckID: React.FC = () => {
    const { idDiscount } = useParams()
  return (
    <>
       {idDiscount && <PromotionDetail idDiscount={idDiscount} />}
    </>
  )
}

export default DetailDiscountCheckID