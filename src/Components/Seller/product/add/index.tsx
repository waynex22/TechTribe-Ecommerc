import React, { useEffect, useState } from 'react'
import BasicInformation from './basicInformation/index'
import DetailInformation from './detailInformation/index'
import { typeFormCreateProduct, typeProductPrice, typeSpecifications, TypeVariation } from '../../../../utils/types/product'
import DefaultInfoAddProduct from './defaultInfo'
import VariationsProduct from './variations'
import requestApi from '../../../../helper/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const defaultSpecifications: typeSpecifications[] = [];
const defaultVariation: TypeVariation = {}
const AddProduct: React.FC = () => {
  const navigate = useNavigate()
  const [formAddProduct, setFormAddProduct] = useState({} as typeFormCreateProduct)
  const [prevImages, setPrevImages] = useState([] as { preview: string }[])
  // const [isSubmit, setIsSubmit] = useState(false)
  // const [errForm, setErrForm] = useState('')
  const handleFormAddproduct = (
    key: string,
    value: string | typeSpecifications[] | TypeVariation | typeProductPrice[] | File[]
  ) => {
    setFormAddProduct({ ...formAddProduct, [key]: value });
  }
  useEffect(() => {
    if (formAddProduct.id_categoryDetail !== '') {
      setFormAddProduct(prevUser => ({
        ...prevUser,
        specifications: defaultSpecifications,
        variation: defaultVariation,
      }));
    }
  }, [formAddProduct.id_categoryDetail]);

  const createProduct = (e: React.FormEvent) => {
    console.log(formAddProduct);
    e.preventDefault()

    requestApi('product', 'POST', formAddProduct, 'application/json')
      .then(data => {
        const idProductr = data.data._id
        const newData = { ...formAddProduct, id_product: idProductr }
        createProductPrice(newData)

        uploadFiles(idProductr)

        toast.success('thêm thành công')
        navigate('/seller/product/list')
      })
      .catch(err => {
        toast.error('Có lỗi khi tạo')
        console.log(err);
      })
  }

  const createProductPrice = (newData: typeFormCreateProduct) => {
    requestApi('product-price', 'POST', newData)
      .catch(errPrice => {
        toast.error('Có lỗi khi thêm tiền')
        console.log(errPrice);
      })
  }

  const uploadFiles = async (idProduct: string) => {
    const formData = new FormData();
    formAddProduct.files.forEach((file: File) => {
      formData.append('files', file);
    });
    requestApi('upload/files', 'POST', formData, 'multipart/form-data')
      .then(file => {
        const thumbnails = file.data.filenames
        updateThumbnailProduct(idProduct, thumbnails)
      })
      .catch(errFile => {
        toast.error('Có lỗi khi thêm ảnh')
        console.log(errFile);
      })
  };

  const updateThumbnailProduct = (idProduct: string, thumbnails: string[]) => {
    requestApi(`product/updateThumbnails/${idProduct}`, 'PATCH', {thumbnails}, 'application/json')
      .catch(err => {
        toast.error('Có lỗi khi thêm ảnh vào product')
        console.log(err);
      })
  }
  return (
    <div className=' flex gap-4 flex-col'>
      <BasicInformation 
          prevImages={prevImages} 
          setPrevImages={setPrevImages} 
          handleFormAddproduct={handleFormAddproduct} />
      {formAddProduct.id_categoryDetail ?
        <>
          <DetailInformation 

            formAddProduct={formAddProduct} 
            handleFormAddproduct={handleFormAddproduct} />
          <VariationsProduct formAddProduct={formAddProduct} handleFormAddproduct={handleFormAddproduct} />
        </>
        :
        <>
          <DefaultInfoAddProduct title='Thông tin bán hàng' />
          <DefaultInfoAddProduct title='Thông tin khác' />
        </>
      }
      <div className=' flex flex-row-reverse py-4 gap-5'>
        <button onClick={(e) => createProduct(e)}>Xác nhận</button>
        <div>Hủy</div>
      </div>
    </div>
  )
}

export default AddProduct