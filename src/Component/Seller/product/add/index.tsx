import React, { useEffect, useState } from 'react'
import BasicInformation from './basicInformation/index'
import DetailInformation from './detailInformation/index'
import { typeFormCreateProduct, typeSpecifications } from '../../../../utils/types/product'
import DefaultInfoAddProduct from './defaultInfo'
import VariationsProduct from './variations'

const defaultSpecifications: typeSpecifications[] = [];
const AddProduct: React.FC = () => {
  const [formAddProduct, setFormAddProduct] = useState({} as typeFormCreateProduct)
  const handleFormAddproduct = (key:string, value:string | typeSpecifications[]) => {
    setFormAddProduct({...formAddProduct, [key]: value});
  }

  useEffect(() => {
    if (formAddProduct.id_category !== '') {
      setFormAddProduct(prevUser => ({
        ...prevUser,
        specifications: defaultSpecifications,
      }));
    }
  }, [formAddProduct.id_category]);
  
  return (
    <div className=' flex gap-4 flex-col'> 
      <BasicInformation formAddProduct={formAddProduct} handleFormAddproduct={handleFormAddproduct} />
      {formAddProduct.id_category ?
      <>
        <DetailInformation  formAddProduct={formAddProduct} handleFormAddproduct={handleFormAddproduct} />
        <VariationsProduct />
      </>
      :
      <>
        <DefaultInfoAddProduct title='Thông tin bán hàng' />
        <DefaultInfoAddProduct title='Thông tin khác' />
      </>
      }
      <div className=' flex flex-row-reverse py-4 gap-5'>
        <div>Xác nhận</div>
        <div>Hủy</div>
      </div>
    </div>
  )
}

export default AddProduct