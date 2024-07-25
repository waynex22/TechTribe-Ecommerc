import React, { useEffect, useState } from 'react'
import { typeCreaeteDiscount } from '../../../../../../utils/types/discount'

const ItemSwitcher = ({fomCreateDiscount, onHandleListCreate}:{
  fomCreateDiscount: typeCreaeteDiscount
  onHandleListCreate:  (idPrice: string, key: string, value:string | number | boolean) => void
}) => {
    const [isChecked, setIsChecked] = useState(fomCreateDiscount.status)
    useEffect(()=>{
      setIsChecked(fomCreateDiscount.status)
    },[fomCreateDiscount.status])
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
      onHandleListCreate(fomCreateDiscount.id_productPrice,'status', !isChecked)
    }
  
    return (
      <>
        <label className='flex cursor-pointer select-none items-center'>
          <div className='relative'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className='sr-only'
            />
            <div
              className={`box block h-8 w-14 rounded-full ${
                isChecked ? 'bg-primary' : ' bg-gray-300'
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                isChecked ? 'translate-x-full' : ''
              }`}
            ></div>
          </div>
        </label>
      </>
    )
}

export default ItemSwitcher