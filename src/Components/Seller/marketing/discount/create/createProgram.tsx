import React, { useContext, useEffect, useState } from "react"
import SelectTimeStart from "./selectTime";
import SlectProductDiscount from "./slectProduct";
import { typeCreaeteDiscount } from "../../../../../utils/types/discount";
import Popup from "../../../../../Page/popup/popup";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FormErrorsDiscount, validateFormDiscount } from '../../../../../utils/validatetor/validateCreateDiscount';
import { LoaderContex } from "../../../loading";
import requestApi from '../../../../../helper/api';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import { fetchDiscount, SelectListDiscount } from "../../../../../redux/features/discount";

export type TypeSelectTimeDiscount = { name: string, time_start: Date, time_end: Date }
type value = string | Date
const CreateDiscountProgram: React.FC = () => {
    const navigate = useNavigate()
    const dispacth = useAppDispatch()
    const listDiscount = useAppSelector(SelectListDiscount)
    const { setLoader } = useContext(LoaderContex)
    const [isPopup, setIsPopup] = useState(false)
    const [listIdProductDelete, setListIdProductDelete] = useState([] as string[])
    const [isDeleteProduct, setIsDeleteProduct] = useState(false)
    const [valueTimeEnd, setValueTimeEnd] = useState('' as value)
    const [selectName, setSelectName] = useState({} as TypeSelectTimeDiscount)
    const [formCreateDiscount, setFormCreateDiscount] = useState([] as typeCreaeteDiscount[])
    const [errorForm, setErrorForm] = useState({} as FormErrorsDiscount)
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        dispacth(fetchDiscount())
    }, [dispacth])
    useEffect(() => {
        if (isSubmit === true)
            setErrorForm(validateFormDiscount(formCreateDiscount))
    }, [formCreateDiscount, isSubmit])

    useEffect(() => {
        if (!selectName.time_start && formCreateDiscount.length > 0) {
            setSelectName((prev) => {
                return { ...prev, time_start: formCreateDiscount[0].time_start, time_end: formCreateDiscount[0].time_end }
            })
        }
    }, [formCreateDiscount, selectName.time_start])
    const handlePopup = () => {
        setIsPopup(!isPopup)
    }

    const handlePopupCheckTime = () => {
        setListIdProductDelete([])
    }
    const confirmPopupTime = () =>{
        handleFormCreate('time_end', valueTimeEnd)
        setIsDeleteProduct(true)
        // setIsDeleteProduct(false)
        handlePopupCheckTime()
    }

    const handleSelectName = (key: string, value: string | Date) => {
        if (key === 'time_end') {
            const time_start = new Date(selectName.time_start)
            const time_end = new Date(value)
            const listDiscountCheck = listDiscount.flatMap(item => {
                const dateStart = new Date(item.time_start)
                const dateEnd = new Date(item.time_end)
                if (time_start < dateEnd && time_end > dateStart)
                    return item.discount_detail
                return []
            }).filter(item => item)
            const checkItem = listDiscountCheck
                .filter((item) =>
                    formCreateDiscount.some(itemCreate => {
                        return itemCreate.id_productPrice === item?.id_productPrice._id
                    }))
                .flatMap(item => item.id_productPrice.id_product[0])
            if (checkItem.length > 0) {
                const idProduct = checkItem.filter((item, index) => checkItem.indexOf(item) === index);
                setListIdProductDelete(idProduct)
                setValueTimeEnd(value)
                return
            }
        }
        handleFormCreate(key, value)
    }

    const handleFormCreate = (key: string, value: string | Date) => {
        setSelectName((prev) => {
            return { ...prev, [key]: value }
        })
        const newList = formCreateDiscount.map((item) => {
            const newItem = {
                ...item,
                [key]: value
            }
            return newItem
        })
        setFormCreateDiscount(newList)
    }

    const leaveCreateDiscount = () => {
        if (formCreateDiscount.length > 0)
            setIsPopup(!isPopup)
        else
            navigate('/seller/marketing/discount')
    }

    const submitForm = () => {
        setIsSubmit(true)
        formCreateDiscount[0].type = "Chương Trình Của Shop"
        formCreateDiscount[0].name = selectName.name
        formCreateDiscount[0].time_end = selectName.time_end
        formCreateDiscount[0].time_start = selectName.time_start

        const err = validateFormDiscount(formCreateDiscount)
        if (err.name || err.time_end || err.time_start)
            window.scrollTo({ top: 1, behavior: 'smooth' });
        if (err.percent)
            window.scrollTo({ top: 250, behavior: 'smooth' });
        setErrorForm(err)

        if (!Object.keys(err).length) {
            setLoader(true)
            requestApi('discount', 'POST', formCreateDiscount, "application/json")
                .then((res) => {
                    console.log(res);
                    toast.success('Thêm thành công')
                    setLoader(false)
                    navigate('/seller/marketing/discount')
                })
                .catch((err) => {
                    toast.error('Thêm thất bại')
                    console.log(err);
                })
        }
    }

    return (
        <>
            <SelectTimeStart onHandleSelectName={handleSelectName} errorForm={errorForm} selectNameTime={selectName} />
            <SlectProductDiscount
                selectNameTime={selectName}
                isSubmitForm={isSubmit}
                errorForm={errorForm}
                formCreateDiscount={formCreateDiscount}
                setFormCreateDiscount={setFormCreateDiscount}
                listIdDelete={listIdProductDelete}
                isDeleteProduct={isDeleteProduct}
                setIsDeleteProduct={setIsDeleteProduct}
            />

            <div className='flex flex-row-reverse gap-4 items-center text-sm'>
                {formCreateDiscount.length > 0 ?
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
                                <Link to={'/seller/marketing/discount'} className=' px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-opacity-100 hover:shadow-md'>Thoát</Link>
                                <button onClick={() => handlePopup()} className=" bg-white px-4 py-2 rounded border  hover:shadow-md hover:bg-gray-100">Hủy</button>
                            </div>
                        </div>
                    </>
                </Popup>}
            {false &&
                <Popup onHandlePopup={handlePopupCheckTime}>
                    <>
                        <div className=" bg-white w-[500px] py-6 px-8 rounded shadow-md flex flex-col gap-6 font-normal text-sm">
                            <div className=" flex justify-between items-center">
                                <p className=" text-xl">Chú ý</p>
                                <p className=" text-xl" onClick={() => handlePopupCheckTime()}><IoMdClose /></p>
                            </div>
                            <p> {listIdProductDelete.length} sản phẩm đang tham gia khuyến mãi khác trong thời gian bạn đã chọn. Bạn có muốn bỏ chọn các sản phẩm này?</p>
                            <div className=" flex flex-row-reverse gap-4">
                                <button onClick={()=> confirmPopupTime()} className=' px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-opacity-100 hover:shadow-md'>Bỏ chọn sản phẩm</button>
                                <button onClick={() => handlePopupCheckTime()} className=" bg-white px-4 py-2 rounded border  hover:shadow-md hover:bg-gray-100">Hủy</button>
                            </div>
                        </div>
                    </>
                </Popup>}

        </>
    )
}

export default CreateDiscountProgram