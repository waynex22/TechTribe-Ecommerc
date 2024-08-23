import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchListReview, SelectListReview } from '../../../../redux/features/productReviewSeller'
import ShopReviewComponent from './shopReview'
import { SelectListOrderByShop, fetchListOrderByShop } from '../../../../redux/features/orderSeller';
import ListReviewComponent from './listReview'
import SetShowStar from './setShowStar'
import { typeProductReview } from '../../../../utils/types/productReviewSeller'
import { checkTimeInLast24Hours } from '../../../../utils/fortmartNumberVnd/formartDate'

const ReviewManagamentComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const listReview = useAppSelector(SelectListReview)
  const listOrder = useAppSelector(SelectListOrderByShop)
  const [listShowReview, setListShowReview] = useState([] as typeProductReview[])

  useEffect(() => {
    dispatch(fetchListReview())
    dispatch(fetchListOrderByShop())
  }, [dispatch])

  useEffect(() => {
    if (listReview)
      setListShowReview(listReview)
  }, [listReview])

  const handleListShowReview = (listStar: number[] | string) => {
    if (listReview)
      if (typeof listStar === 'string')
        setListShowReview(() => {
          return listReview.filter((item) => ! item.ProductReviewReply || item.ProductReviewReply.length ===0)
        })
      else
        setListShowReview((prev) => {
          if (listStar.length === 5)
            return listReview
          else {
            return listReview.filter((item) => listStar.includes(item.rating))
          }
        })
  }

  return (
    <div className=' flex flex-col gap-6'>

      <ShopReviewComponent
        listReview={listReview}
        listOrder={listOrder}
        onHandleListShowReview={handleListShowReview}
      />

      <div className=' p-6 bg-white rounded shadow-md font-normal'>
        <div className=' py-2'>
          <h4 className=' text-xl py-1 '>Danh sách đánh giá shop</h4>
        </div>

        {listReview &&
          <SetShowStar
            listReview={listReview}
            onHandleListShowReview={handleListShowReview}
          />
        }

        <div className=' py-2 my-4 text-sm'>
          <div className=' flex items-center'>
            <div className=' border rounded flex items-center'>
              <div className='  py-1 px-4   w-[120px] flex items-center justify-between border-r'>
                <p>Tìm yêu cầu</p>
              </div>
              <div className=' py-1  px-4 '>
                <input type="text" className=' w-[250px]' placeholder=' Tên sản phẩm/Mã đơn hàng' />
              </div>
            </div>
            <div className=' ml-4 text-xl'>
              <IoSearch />
            </div>
          </div>
        </div>

        {listShowReview && <ListReviewComponent listReview={listShowReview} />}

      </div>
    </div>
  )
}

export default ReviewManagamentComponent