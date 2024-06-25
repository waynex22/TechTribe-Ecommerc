import React from 'react'
import BasicInformation from './basicInformation'
import TopMenuNewProduct from './topMenu'
import DetailInformation from './detailInformation'

const AddProduct: React.FC = () => {
  return (
    <div className=' flex gap-4 flex-col'> 
      <TopMenuNewProduct />
      <BasicInformation />
      <DetailInformation />
    </div>
  )
}

export default AddProduct