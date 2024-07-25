import { MdEdit } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { fetchDiscountByID, SelectDiscount } from '../../../../../redux/features/discount'
import { useEffect } from 'react'
import { checkTimeStatus } from '../list/listDiscout'
import { formatShowDate } from '../../../../../utils/fortmartNumberVnd/formartDate'
import SlectProductDiscount from '../create/slectProduct'
import ShowDiscountDetail from './showDiscount'

const PromotionDetail = ({idDiscount}: {idDiscount: string}) => {
  const dispatch = useAppDispatch()
  const discount = useAppSelector(SelectDiscount)
  useEffect(()=>{
    dispatch(fetchDiscountByID(idDiscount))
  },[dispatch, idDiscount])
  console.log(discount);
  
  return (
    <>
      <div className=' bg-white shadow-md py-6 rounded px-4 flex flex-col gap-6  font-normal text-sm'>
        <div className=' flex justify-between items-center'>
          <h4 className=' text-xl flex gap-2 items-center'>Thông tin cơ bản <span className=' text-xs '>{checkTimeStatus(discount.time_start, discount.time_end)}</span> </h4>
        </div>
        <div className=' flex justify-between items-center'>
          <div className=' flex gap-2'>
            <p className=' text-gray-600'>Loại chương trình khuyến mãi:</p>
            <p> {discount.type} </p>
          </div>
          <div className=' flex gap-2'>
            <p className=' text-gray-600'>Tên chương trình khuyến mãi:</p>
            <p> {discount.name} </p>
          </div>
          <div className=' flex gap-2'>
            <p className=' text-gray-600'>Thời gian khuyến mãi:</p>
            <p>{formatShowDate(discount.time_start)} - {formatShowDate(discount.time_end)}</p>
          </div>
        </div>
      </div>

      <ShowDiscountDetail />
    </>
  )
}

export default PromotionDetail