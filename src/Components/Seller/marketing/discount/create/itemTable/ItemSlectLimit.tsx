import { useEffect, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const ItemSlectLimit = ({onHandleSetValue, name, valueNameSelect, status}: {
  onHandleSetValue: (key:string, value: number | string) => void,
  name:string
  valueNameSelect: string | number
  status?: boolean
}) => {
    const [valueInput, setValue] = useState(1)
    const [isSelect, setIsSelect] = useState(false)
    const [nameSelect, setNameSelect] = useState('Không giới hạn')
    useEffect(()=>{
      if(valueNameSelect === 'Không giới hạn' || !valueNameSelect)
        setNameSelect('Không giới hạn')
      else{
        setNameSelect('Giới hạng')
        setValue(Number(valueNameSelect))
      }
    },[valueNameSelect])
    const handleNameSelect = (value:string) => {
      setNameSelect(value)
      setIsSelect(false)
      if(value === 'Giới hạng')
        onHandleSetValue(name, valueInput)
      else
      onHandleSetValue(name, value)
    }
    const handleValue = (key:string, value:number) => {
      if(value < 1) value = 1
      onHandleSetValue(key, value)
      setValue(value)
    }
    return (
      <>
        <div className={`flex ${status === false && ' cursor-not-allowed'} `}>
          <div className={` ${status === false ? 'bg-gray-200 cursor-not-allowed pointer-events-none ' : 'bg-white'} relative py-1 px-2 border rounded ${nameSelect === 'Giới hạng' ? ' w-[80px]' : ' w-[140px]'} `}>
            <div onClick={()=>setIsSelect(!isSelect)} className=' cursor-pointer flex items-center justify-between'>
              <p className={` truncate ${nameSelect === 'Giới hạng' ? ' w-[60px]' : ' w-[120px]'}`}> {nameSelect} </p>
              <p> {!isSelect ? <IoIosArrowDown /> :<IoIosArrowUp />} </p>
            </div>
            {isSelect && 
            <div className=' pt-1 z-10 absolute top-full left-0 w-[140px]'>
              <div className={` border py-1 shadow-md rounded text-left ${status === false ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}  `}>
              <p onClick={()=>handleNameSelect('Không giới hạn')} className=' px-2 py-1 hover:bg-gray-100 cursor-pointer'>Không giới hạn</p>
              <p onClick={()=>handleNameSelect('Giới hạng')} className=' px-2 py-1 hover:bg-gray-100 cursor-pointer'>Giới hạng</p>
            </div>
            </div>
            }
          </div>
          {
            nameSelect === 'Giới hạng' &&
             <div className={` border rounded w-[60px] ${status === false && 'bg-gray-200 cursor-not-allowed'}`}>
              <input 
              type="number" 
              value={valueInput}
              readOnly={status === false}
              onChange={(e)=> handleValue(e.target.name, Number(e.target.value))} 
              name={name} 
              className={`w-[57px] countDiscout ${status === false && 'bg-gray-200 cursor-not-allowed'}`}  />
            </div>
          }
        </div>
      </>)
}

export default ItemSlectLimit