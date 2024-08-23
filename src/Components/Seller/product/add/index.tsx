import React, { useContext, useEffect, useState } from 'react'
import BasicInformation from './basicInformation/index'
import DetailInformation from './detailInformation/index'
import { typeFormCreateProduct, typeProductPrice, typeSpecifications, TypeVariation } from '../../../../utils/types/product'
import DefaultInfoAddProduct from './defaultInfo'
import VariationsProduct from './variations'
import requestApi from '../../../../helper/api'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { FormErrorsProduct, validateFormProduct } from '../../../../utils/validatetor/createproduct'
import { LoaderContex } from '../../loadingProvider'

const defaultSpecifications: typeSpecifications[] = [];
const defaultVariation: TypeVariation = {}
const AddProduct: React.FC = () => {
  const navigate = useNavigate()
  const [formAddProduct, setFormAddProduct] = useState({} as typeFormCreateProduct)
  const [prevImages, setPrevImages] = useState([] as { preview: string }[])
  const [isSubmit, setIsSubmit] = useState(false)
  const [errForm, setErrForm] = useState({} as FormErrorsProduct)
  const { setLoader } = useContext(LoaderContex)
  const handleFormAddproduct = (
    key: string,
    value: string | typeSpecifications[] | TypeVariation | typeProductPrice[] | File[]
  ) => {
    setFormAddProduct({ ...formAddProduct, [key]: value });
  }
  const handleVaritaion = (value: TypeVariation) => {
    handleFormAddproduct('variation', value)
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

  useEffect(() => {
    if (isSubmit === true)
      setErrForm(validateFormProduct(formAddProduct))
  }, [formAddProduct, isSubmit])

  const createProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmit(true)
    const errors = validateFormProduct(formAddProduct)
    if (Object.keys(errors).length > 0) {
      setErrForm(errForm)
    } else {
      setLoader(true)
      requestApi('product', 'POST', formAddProduct, 'application/json')
        .then( async (data) => {
          const idProductr = data.data._id
          const newData = { ...formAddProduct, id_product: idProductr }

          await uploadFiles(idProductr)
          await createVariation(newData)
          setLoader(false)
          toast.success('thêm thành công')
        })
        .catch(err => {
          toast.error('Có lỗi khi tạo')
          setLoader(false)
          console.log(err);
        })
    }
  }

  const createVariation = async (dataFormNew: typeFormCreateProduct) => {
    await requestApi('product-price/variation', 'POST', dataFormNew, 'application/json')
      .then( async () => {
        await createProductPrice(dataFormNew)
      })
      .catch(errPrice => {
          setLoader(false)
          toast.error('Có lỗi khi thêm tiền')
        console.log(errPrice);
      })
  }

  const createProductPrice = async (newData: typeFormCreateProduct) => {
    await requestApi('product-price', 'POST', newData, 'application/json')
      .then(() => {
          setLoader(false)
          navigate('/seller/product/list')
      })
      .catch(errPrice => {
          setLoader(false)
          toast.error('Có lỗi khi thêm tiền')
        console.log(errPrice);
      })
  }

  const uploadFiles = async (idProduct: string) => {
    const formData = new FormData();
    formAddProduct.files.forEach((file: File) => {
      formData.append('files', file);
    });
    await requestApi('upload/files', 'POST', formData, 'multipart/form-data')
      .then( async (file) => {
        const thumbnails = file.data.filenames
        await updateThumbnailProduct(idProduct, thumbnails)
      })
      .catch(errFile => {
          setLoader(false)
          toast.error('Có lỗi khi thêm ảnh')
        console.log(errFile);
      })
  };

  const updateThumbnailProduct = async (idProduct: string, thumbnails: string[]) => {
    await requestApi(`product/updateThumbnails/${idProduct}`, 'PATCH', { thumbnails }, 'application/json')
      .catch(err => {
          setLoader(false)
          toast.error('Có lỗi khi thêm ảnh vào product')
        console.log(err);
      })
  }
  return (
    <div className=' flex gap-4 flex-col'>
      <BasicInformation
        errForm={errForm}
        prevImages={prevImages}
        setPrevImages={setPrevImages}
        handleFormAddproduct={handleFormAddproduct} />
      {formAddProduct.id_categoryDetail ?
        <>
          <DetailInformation
            formAddProduct={formAddProduct}
            handleFormAddproduct={handleFormAddproduct} />
          <VariationsProduct
            errForm={errForm}
            formAddProduct={formAddProduct}
            handleFormAddproduct={handleFormAddproduct}
            onHandleVaritaion={handleVaritaion}
          />
        </>
        :
        <>
          <DefaultInfoAddProduct title='Thông tin bán hàng' />
          <DefaultInfoAddProduct title='Thông tin khác' />
        </>
      }
      <div className=' flex flex-row-reverse py-4 gap-5'>
        <button
          className=' px-4 py-2 rounded shadow-md text-white font-semibold border bg-primary hover:border-primary hover:bg-white hover:text-primary'
          onClick={(e) => createProduct(e)}>
          Xác nhận
        </button>
        <Link
          className=' px-4 py-2 rounded shadow-md hover:bg-gray-200 hover:border'
          to={'/seller/product/list'}>
          Hủy
        </Link>
      </div>
    </div>
  )
}

export default AddProduct