/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { typeFormCreateProduct, typeProductPrice, typeSpecifications, TypeVariation } from '../../../../utils/types/product'
import requestApi from '../../../../helper/api'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import BasicInformation from '../add/basicInformation';
import DetailInformation from '../add/detailInformation';
import VariationsProduct from '../add/variations';
import DefaultInfoAddProduct from '../add/defaultInfo';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { fetchProductById, SelectProduct } from '../../../../redux/features/product';
import { FormErrorsProduct, validateFormProductVariation } from '../../../../utils/validatetor/createproduct';

const defaultSpecifications: typeSpecifications[] = [];
const defaultVariation: TypeVariation = {}

const EditProduct = ({ idProduct }: { idProduct: string }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const product = useAppSelector(SelectProduct)
  useEffect(() => {
    dispatch(fetchProductById(idProduct))
  }, [dispatch, idProduct])
  const [formAddProduct, setFormAddProduct] = useState({} as typeFormCreateProduct)
  const [prevImages, setPrevImages] = useState([] as { preview: string }[])
  const [isSubmit, setIsSubmit] = useState(false)
  const [errForm, setErrForm] = useState({} as FormErrorsProduct)
  useEffect(() => {
    if (isSubmit === true)
      setErrForm(validateFormProductVariation(formAddProduct))
  }, [formAddProduct, isSubmit])

  const handleFormAddproduct = (
    key: string,
    value: string | typeSpecifications[] | TypeVariation | typeProductPrice[] | File[]
  ) => {
    setFormAddProduct({ ...formAddProduct, [key]: value });
  }
  useEffect(() => {
    if (formAddProduct.id_categoryDetail !== '') {
      setFormAddProduct((prevUser: any) => ({
        ...prevUser,
        specifications: defaultSpecifications,
      }));
    }
  }, [formAddProduct.id_categoryDetail]);

  const updateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formAddProduct);
    setIsSubmit(true)
    const errors = validateFormProductVariation(formAddProduct)
    if (Object.keys(errors).length > 0) {
      setErrForm(errForm)
      if (errors.variation)
        window.scrollTo({ top: 900, behavior: "smooth" });
      return
    }
    uploadFiles(product._id)
    updateSpecification()
    requestApi(`product/${product._id}`, 'PATCH', formAddProduct, 'application/json')
      .then(data => {
        const newData = { ...formAddProduct, id_product: product._id }
        createProductPrice(newData)
        toast.success('sửa thành công')
      })
      .catch(err => {
        toast.error('Có lỗi khi sửa')
        console.log(err);
      })
  }

  const updateSpecification = () => {
    if (formAddProduct.specifications) {
      const data = {
        id_product: product._id,
        specification: formAddProduct.specifications
      }
      requestApi(`product/specification`, 'PUT', data, 'application/json')
        .catch(err => {
          toast.error('Có lỗi khi sửa')
          console.log(err);
        })
    }
  }
  const createProductPrice = (newData: typeFormCreateProduct) => {
    requestApi('product-price', 'POST', newData)
      .then(() => {
        navigate('/seller/product/list')
      })
      .catch(errPrice => {
        toast.error('Có lỗi khi thêm tiền')
        console.log(errPrice);
      })
  }

  const uploadFiles = async (idProduct: string) => {
    const formData = new FormData();
    let files: (string | undefined)[] = []
    let checkFormData = false
    if (formAddProduct.files && formAddProduct.files.length >= 0) {
      formAddProduct.files.forEach((file: File) => {
        if (!file.name.startsWith('http://') && !file.name.startsWith('https://')) {
          formData.append('files', file);
          checkFormData = true
        } else {
          files.push(file.name)
        }
      });
    } else {
      files = product.thumbnails
    }

    const filesToDelete = product.thumbnails
      .filter(file => !files.includes(file))
      .map(file => file.split('/').pop());
    files = files.map(file => file?.split('/').pop())

    if (checkFormData) {
      requestApi('upload/files', 'POST', formData, 'multipart/form-data')
        .then(file => {
          const thumbnails = [...files, ...file.data.filenames]
          updateThumbnailProduct(idProduct, thumbnails)
          toast.success('them anh thanh cong')
        })
        .catch(errFile => {
          toast.error('Có lỗi khi thêm ảnh')
          console.log(errFile);
        })
    }

    if (filesToDelete.length > 0) {
      requestApi('upload/files', 'DELETE', { filesToDelete }, 'application/json')
        .then(file => {
          if (!checkFormData) {
            const thumbnails = files.filter(file => file !== undefined) as string[];
            updateThumbnailProduct(idProduct, thumbnails);
          }
          toast.success('xoa thanh cong')
        })
        .catch(errFile => {
          toast.error('xoa ảnh that bai')
          console.log(errFile);
        })
    }
  };

  const updateThumbnailProduct = (idProduct: string, thumbnails: string[]) => {
    requestApi(`product/updateThumbnails/${idProduct}`, 'PATCH', { thumbnails }, 'application/json')
      .catch(err => {
        toast.error('Có lỗi khi thêm ảnh vào product')
        console.log(err);
      })
  }
  return (
    <>
      {product._id &&
        <div className=' flex gap-4 flex-col'>
          <BasicInformation
            errForm={errForm}
            prevImages={prevImages}
            setPrevImages={setPrevImages} handleFormAddproduct={handleFormAddproduct} product={product} />
          {formAddProduct.id_categoryDetail ?
            <>
              <DetailInformation product={product} formAddProduct={formAddProduct} handleFormAddproduct={handleFormAddproduct} />
              <VariationsProduct             
              errForm={errForm} 
              product={product} 
              formAddProduct={formAddProduct} 
              handleFormAddproduct={handleFormAddproduct} />
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
          onClick={(e) => updateProduct(e)}>
          Xác nhận
        </button>
        <Link 
        className=' px-4 py-2 rounded shadow-md hover:bg-gray-200 hover:border'
        to={'/seller/product/list'}>
          Hủy
        </Link>
      </div>
        </div>
      }
    </>

  )
}

export default EditProduct