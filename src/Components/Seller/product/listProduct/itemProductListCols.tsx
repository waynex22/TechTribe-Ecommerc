import React, { useState } from 'react'
import { IoEyeOutline, IoHeartOutline } from 'react-icons/io5'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosMore, IoMdLock } from 'react-icons/io'
import { typeProduct } from '../../../../utils/types/product'
import { Link } from 'react-router-dom'
import requestApi from '../../../../helper/api'
import Popup from '../../../../Page/popup/popup'
import { toast } from 'react-toastify'

const ItemProductListCols = ({ product, fetchProduct }: { product: typeProduct, fetchProduct: () => void }) => {
  const [showPopup, setShowPopup] = useState(false)
  const unlistedProduct = (unlisted: boolean) => {
    if(unlisted)
      handleShowPopup()
    requestApi(`product/unlisted/${product._id}`, 'PATCH', { unlisted: unlisted })
      .then(data => {
        toast.success(`${unlisted ? 'Ẩn' : 'Hiện'} sản phẩm thành công`)
        fetchProduct()
      })
      .catch(err => {
        toast.error(`Có lỗi khi ${unlisted ? 'Ẩn' : 'Hiện'}`)
        console.log(err);
      })
  }
  const handleShowPopup = () => {
    setShowPopup(!showPopup)
  }
  return (
    <div className=' border rounded border-gray-400 text-sm font-normal hover:shadow-xl hover:border-none transition ease-in-out delay-75'>
      {
        !product.unlisted ? 
        <Link to={`/seller/product/edit/${product._id}`}>
          <img className=' w-full object-cover h-44' src={product.thumbnails[0]} alt="" />
        </Link>:
        <div className=' relative'>
          <img className=' w-full object-cover h-44' src={product.thumbnails[0]} alt="" />
          <div className=' absolute  w-full object-cover h-44  bg-black bg-opacity-60 top-0 left-0 text-base font-semibold flex flex-col gap-2 items-center justify-center text-white'>
            <p className=' text-4xl'><IoMdLock /></p>
            <p>Đã ẩn</p>
            <p onClick={() => unlistedProduct(false)} className=' font-normal text-sm border px-4 py-1 rounded cursor-pointer hover:bg-opacity-60 hover:bg-black'>Hiển thị</p>
          </div>
        </div>
      }
      <div className=' px-2 flex flex-col gap-3 py-2 border-b border-gray-400 '>
        <Link to={`/seller/product/edit/${product._id}`} >
          <p className='font-semibold truncate hover:text-primary'> {product.name} </p>
        </Link>
        <p className=' text-red-600'> {formatPriceProduct(product)}  </p>
        <p className=' text-gray-700'>Kho hàng: {formatStockProduct(product)} </p>
        <div className=' flex justify-evenly'>
          <p className=' flex items-center justify-center gap-1'><IoEyeOutline /> {product.view} </p>
          <p className=' flex items-center justify-center gap-1'><IoHeartOutline /> 0 </p>
        </div>
      </div>
      <div className=' py-2 flex text-lg'>
        <div className=' w-1/2 border-r border-gray-400 px-2'>
          <Link to={`/seller/product/edit/${product._id}`} className=' hover:bg-gray-100 w-full py-1 flex items-center justify-center'><FaRegEdit /></Link>
        </div>
        <div className=' w-1/2 px-2 relative group'>
          <button className=' hover:bg-gray-100 w-full py-1 flex items-center justify-center'><IoIosMore /></button>
          <div className='group-hover:block transition ease-in-out delay-150 absolute hidden bottom-full py-2'>
            <div className=' z-20 w-24 rounded py-1 text-sm bg-white shadow-md border text-center flex flex-col gap-1'>
              <p onClick={() => handleShowPopup()} className=' cursor-pointer hover:bg-gray-100 py-1'>Ẩn</p>
            </div>
          </div>
        </div>
      </div>
      {showPopup &&
        <Popup onHandlePopup={handleShowPopup} >
          <div className=' bg-white w-[500px] py-6 px-4 rounded-lg'>
            <div className=' flex gap-4 py-2'>
              <p className=' text-xl font-semibold '>Bạn có chắc chắn muốn ẩn sản phẩm này?</p>
              <p></p>
            </div>
            <p>Người mua sẽ không thể xem hoặc mua sản phẩm đã ẩn.</p>
            <div className=' flex-row-reverse flex gap-2 pt-4'>
              <p onClick={() => unlistedProduct(true)} className=' px-4 py-1 rounded border cursor-pointer text-primary hover:shadow border-primary hover:text-white hover:bg-primary'>Xác nhận</p>
              <p onClick={() => handleShowPopup()} className=' px-4 py-1 rounded border text-gray-600 hover:text-black hover:shadow hover:bg-gray-100 cursor-pointer'>Hủy</p>
            </div>
          </div>
        </Popup>
      }
    </div>
  )
}
export const formatPriceProduct = (product: typeProduct) => {
  if (!product.product_price || product.product_price.length === 0) {
    return '';
  }
  let minPrice = product.product_price[0].price;
  let maxPrice = product.product_price[0].price;

  product.product_price.forEach(item => {
    if (item.price < minPrice) {
      minPrice = item.price;
    }
    if (item.price > maxPrice) {
      maxPrice = item.price;
    }
  });

  return minPrice !== maxPrice
    ? `${minPrice.toLocaleString('vi-VN')} - ${maxPrice.toLocaleString('vi-VN')} VND`
    : `${minPrice.toLocaleString('vi-VN')} VND`;
};
export const formatStockProduct = (product: typeProduct) => {
  if (!product.product_price || product.product_price.length === 0) {
    return '';
  }
  const stock = product.product_price.reduce((a, b) => {
    return b.stock + a
  }, 0)
  return stock
}
export default ItemProductListCols