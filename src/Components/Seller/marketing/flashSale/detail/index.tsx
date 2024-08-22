import React from 'react'
import { useParams } from 'react-router-dom'
import PromotionDetailFlashSale from './promotionDetail'

const DetailFlashSaleCheckID: React.FC = () => {
    const { idFlashSale } = useParams()
  return (
    <>
       {idFlashSale && <PromotionDetailFlashSale idFlashSale={idFlashSale} />}
    </>
  )
}

export default DetailFlashSaleCheckID