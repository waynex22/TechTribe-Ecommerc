import { useState } from 'react';
import { Link } from 'react-router-dom'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { MdEdit } from 'react-icons/md'
import Popup from '../../../../../Page/popup/popup';
import { IoMdClose } from 'react-icons/io';
import requestApi from '../../../../../helper/api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { fetchVoucherByIdShop } from '../../../../../redux/features/voucher';
import { SelectShop } from '../../../../../redux/features/shop';


const CheckTimeOperationVoucher = ({ time_start, time_end, id }: { time_start: Date, time_end: Date, id: string }) => {
    const dispatch = useAppDispatch()
    const dateNow = new Date();
    const startDate = new Date(time_start);
    const endDate = new Date(time_end);
    const shop = useAppSelector(SelectShop)
    const [isPopup, setIsPopup] = useState(false)
    const [promotion, setPromotion] = useState('')
    const handlePopup = () => {
        setIsPopup(!isPopup)
    }
    const handlePromotion = (value:string) => {
        handlePopup()
        setPromotion(value)
    }
    const comfirm =() =>{
        handlePopup()
        if(promotion === 'Xóa') {
            requestApi(`voucher/${id}`, 'DELETE', {}, "application/json")
            .then(()=> {
                dispatch(fetchVoucherByIdShop(shop._id))
                toast.success('Xóa thành công')
            })
            .catch((err)=>{
                console.log(err);
                toast.error('Xóa thất bại')
            })
        }else {
            let currentDate = new Date();
            let time_end = new Date(currentDate.getTime() - 1 * 60);
            requestApi(`voucher/${id}`, 'PATCH', {time_end}, "application/json")
            .then(()=> {
                dispatch(fetchVoucherByIdShop(shop._id))
                toast.success('Kết thúc thành công')
            })
            .catch((err)=>{
                console.log(err);
                toast.error('Kết thúc thất bại')
            })
        }
    }
    return (
        <>
            <div className=' flex gap-2 flex-col'>
                <Link to={`/seller/marketing/vouchers/${id}`} className=' flex gap-2 items-center cursor-pointer  hover:text-primary'>	Chi tiết   <MdEdit />
                </Link>

                {dateNow < startDate &&
                    <p onClick={() => handlePromotion('Xóa')} className=' flex gap-2 items-center cursor-pointer  hover:text-red-500'>Xóa <RiDeleteBin5Fill /></p>
                }
                {dateNow > startDate && dateNow < endDate &&
                    <p onClick={() => handlePromotion('Kết thúc')} className=' flex gap-2 items-center cursor-pointer  hover:text-red-500'>	Kết thúc <RiDeleteBin5Fill /></p>
                }
            </div>
            {isPopup &&
                <Popup onHandlePopup={handlePopup} >
                    <>
                        <div className=" bg-white w-[500px] py-6 px-8 rounded shadow-md flex flex-col gap-6 font-normal text-sm">
                            <div className=" flex justify-between items-center">
                                <p className=" text-xl">{promotion} Voucher</p>
                                <p className=" text-xl cursor-pointer" onClick={() => handlePopup()}><IoMdClose /></p>
                            </div>
                            <p>Bạn có chắc chắn muốn {promotion} Voucher này?</p>
                            <div className=" flex flex-row-reverse gap-4">
                                <button onClick={()=> comfirm()} className=' px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-opacity-100 hover:shadow-md'>{promotion}</button>
                                <button onClick={() => handlePopup()} className=" bg-white px-4 py-2 rounded border  hover:shadow-md hover:bg-gray-100">Hủy</button>
                            </div>
                        </div>
                    </>
                </Popup>
            }
        </>
    )
};

export default CheckTimeOperationVoucher