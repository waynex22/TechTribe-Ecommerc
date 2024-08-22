import React, { useContext, useEffect, useState } from "react"
import SelectTimeStartFlashSale from "./selectTimeStart"
import { typeFlashSale, typeFlashSaleDetail } from "../../../../../utils/types/flashSale"
import SelectProductFlashSale from "./selectProduct"
import { Link, useNavigate } from "react-router-dom"
import { validateFormFlashSale } from "../../../../../utils/validatetor/createFlashSale"
import Popup from "../../../../../Page/popup/popup"
import { IoMdClose } from "react-icons/io"
import { LoaderContex } from "../../../loadingProvider"
import requestApi from "../../../../../helper/api"
import { toast } from "react-toastify"

const CreateFlashSale: React.FC = () => {
  const navigate = useNavigate()
  const [formFlashSale, setFormFlashSale] = useState({} as typeFlashSale)
  const [formFlashSaleDetail, setFormFlashSaleDetail] = useState([] as typeFlashSaleDetail[])
  const [isSubmitForm, setIsSubmitForm] = useState(false)
  const [isPopup, setIsPopup] = useState(false)
  const [errorForm, setErrorForm] = useState({})
  const { setLoader } = useContext(LoaderContex)

  useEffect(() => {
    if (isSubmitForm === true)
      setErrorForm(validateFormFlashSale(formFlashSale, formFlashSaleDetail))
  }, [formFlashSale, formFlashSaleDetail, isSubmitForm])
  const leaveCreateDiscount = () => {
    if (formFlashSaleDetail.length > 0)
      setIsPopup(!isPopup)
    else
      navigate('/seller/marketing/flash-sale')
  }
  const handlePopup = () => {
    setIsPopup(!isPopup)
  }
  const submitForm = () => {
    setIsSubmitForm(true)

    const err = validateFormFlashSale(formFlashSale, formFlashSaleDetail)
    if (err.time)
      window.scrollTo({ top: 1, behavior: 'smooth' });
    if (err.percent)
      window.scrollTo({ top: 250, behavior: 'smooth' });
    setErrorForm(err)
  
    if (!Object.keys(err).length) {
      setLoader(true)
      requestApi('flash-sale', 'POST', formFlashSale, "application/json")
        .then((res) => {
          
          if(!res.data._id){
            toast.error(res.data.message)
            setLoader(false)
            return
          }
          const newListDetail = formFlashSaleDetail.map((item) => {
            return { ...item, id_flashSale: res.data._id }
          })
          requestApi('flash-sale/detail', 'POST', newListDetail, "application/json")
            .then(() => {
              toast.success('Thêm thành công')
              setLoader(false)
              navigate('/seller/marketing/flash-sale')
            })
            .catch((err) => {
              setLoader(false)
              toast.error('Thêm thất bại')
              console.log(err);
            })
        })
        .catch((err) => {
          toast.error('Thêm thất bại')
          console.log(err);
          setLoader(false)
        })
    }
  }
  return (
    <>
      <SelectTimeStartFlashSale
        setFormFlashSale={setFormFlashSale}
        errorForm={errorForm}
      />
      <SelectProductFlashSale
        formFlashSale={formFlashSale}
        setFormFlashSaleDetail={setFormFlashSaleDetail}
        formFlashSaleDetail={formFlashSaleDetail}
        isSubmitForm={isSubmitForm}
        errorForm={errorForm}
      />

      <div className='flex flex-row-reverse gap-4 items-center text-sm'>
        {formFlashSaleDetail.length > 0 ?
          <button onClick={() => submitForm()} className=' px-4 py-2 rounded bg-primary bg-opacity-70 text-white font-semibold hover:bg-opacity-100 hover:shadow-md'>Xác nhận</button>
          :
          <button className=' px-4 py-2 rounded bg-primary bg-opacity-70 text-white font-semibold cursor-not-allowed '>Xác nhận</button>
        }
        <button onClick={() => leaveCreateDiscount()} className=" bg-white px-4 py-2 rounded border text-gray-700 hover:shadow-md hover:bg-gray-100">Hủy</button>
      </div>
      {isPopup &&
        <Popup onHandlePopup={handlePopup}>
          <>
            <div className=" bg-white w-[500px] py-6 px-8 rounded shadow-md flex flex-col gap-6 font-normal text-sm">
              <div className=" flex justify-between items-center">
                <p className=" text-xl">Chú ý</p>
                <p className=" text-xl" onClick={() => handlePopup()}><IoMdClose /></p>
              </div>
              <p>Các thông tin sẽ không được lưu lại. Bạn có chắc chắn muốn thoát?</p>
              <div className=" flex flex-row-reverse gap-4">
                <Link to={'/seller/marketing/flash-sale'} className=' px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-opacity-100 hover:shadow-md'>Thoát</Link>
                <button onClick={() => handlePopup()} className=" bg-white px-4 py-2 rounded border  hover:shadow-md hover:bg-gray-100">Hủy</button>
              </div>
            </div>
          </>
        </Popup>}
    </>
  )
}

export default CreateFlashSale