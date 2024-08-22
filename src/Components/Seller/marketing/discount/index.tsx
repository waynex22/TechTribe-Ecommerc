import React from 'react'
import TopComponentDiscount from './topComponentDiscount'
import ListDiscount from './list/listDiscout'

const DiscountComponet: React.FC = () => {
  return (
    <div className=' font-normal'>
      <TopComponentDiscount />

      <ListDiscount />
    </div>
  )
}

export default DiscountComponet