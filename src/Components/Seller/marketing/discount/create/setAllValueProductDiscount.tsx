import { useState } from "react"
import ItemSlectLimit from "./itemTable/ItemSlectLimit"
type typeSetValueAll = {
  percent?: number,
  limit_product: number | 'Không giới hạn',
  limit_customer: number | 'Không giới hạn'
}
const defauleSetValueAll: typeSetValueAll = {
  limit_product: 'Không giới hạn',
  limit_customer: 'Không giới hạn'
}
const SetAllValueProductDiscount = ({ listIdProduct, onUpdateManyItemCreate }: {
  listIdProduct: string[]
  onUpdateManyItemCreate: (value: typeSetValueAll) => void
}) => {
  const [valueAll, setValueAll] = useState({} as typeSetValueAll)
  
  const handleSetValue = (key: string, value: number | string) => {
    if (key === 'percent' && typeof value === 'number') {
      if (value < 1) value = 1
      if (value > 50) value = 50
    }

    setValueAll((prev) => {
      return { ...prev, [key]: value }
    })
  }
  const update = () => {
    onUpdateManyItemCreate(valueAll)
  }
  return (
    <div className=' bg-gray-100 rounded border p-2 px-4 text-sm'>
      <div className=' flex justify-between gap-6 items-center'>
        <div className=' flex flex-col  gap-2'>
          <p>Thiết lập hàng loạt</p>
          <p className=' text-gray-500 text-sm '> {listIdProduct.length} sản phẩm đã chọn</p>
        </div>

        <div className=' flex flex-col items-center gap-2'>
          <p>Khuyến Mãi</p>
          <div className=' w-[120px] border rounded p-0.5 bg-white relative'>
            <input
              value={valueAll.percent ? valueAll.percent : ''}
              onChange={(e) => handleSetValue(e.target.name, Number(e.target.value))}
              type="number"
              name="percent"
              className=' w-[70px]' min={1} minLength={2} max={50}
            />
            <div className=' text-gray-500 border-l pl-2 text-xs absolute right-2 top-1/2 -translate-y-1/2'>
              <p>%GIẢM</p>
            </div>
          </div>
        </div>
        <div className=' flex flex-col items-center gap-2'>
          <p>Số lượng sản phẩm khuyến mãi</p>
          <ItemSlectLimit 
            onHandleSetValue={handleSetValue} 
            name={'limit_product'} 
            valueNameSelect={valueAll.limit_product} />
        </div>
        <div className=' flex flex-col items-center gap-2'>
          <p>Giới hạn mua tối đa của mỗi khách hàng</p>
          <ItemSlectLimit 
            onHandleSetValue={handleSetValue} 
            name={'limit_customer'} 
            valueNameSelect={valueAll.limit_customer} />
        </div>
        <div className=' flex gap-4'>
          {valueAll.percent && listIdProduct.length >0 ?
            <button onClick={() => update()} className={`cursor-pointer hover:bg-gray-100  px-4 py-2 bg-white rounded border`}>
              Cập nhật hoàng loạt
            </button>
            :
            <button className={`cursor-not-allowed bg-gray-50 text-gray-500 px-4 py-2 rounded border`}>
              Cập nhật hoàng loạt
            </button>
          }

          {valueAll.percent ?
            <button onClick={() => setValueAll(defauleSetValueAll)} className=' cursor-pointer hover:bg-gray-100 px-4 py-2 bg-white rounded border'>Đặt lại</button>
            :
            <button  className='cursor-not-allowed bg-gray-50 text-gray-500 px-4 py-2 rounded border'>Đặt lại</button>
          }
        </div>
      </div>
    </div>
  )
}

export default SetAllValueProductDiscount