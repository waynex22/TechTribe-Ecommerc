import { useState } from 'react';
import { Link } from 'react-router-dom'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { MdEdit } from 'react-icons/md'
import Popup from '../../../../../Page/popup/popup';
import { IoMdClose } from 'react-icons/io';
import requestApi from '../../../../../helper/api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { fetchDiscount } from '../../../../../redux/features/discount';
import { SelectShop } from '../../../../../redux/features/shop';
import { fetchFlashSaleByIdShop } from '../../../../../redux/features/flashSale';


const CheckTimeOperation = ({ time_start, time_end, endpoint }: { time_start: Date, time_end: Date, endpoint: string }) => {
    const dispatch = useAppDispatch()
    const shop = useAppSelector(SelectShop)
    const dateNow = new Date();
    const startDate = new Date(time_start);
    const endDate = new Date(time_end);
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
            requestApi(endpoint, 'DELETE', {}, "application/json")
            .then(()=> {
                dispatch(fetchDiscount())
                if (shop._id)
                    dispatch(fetchFlashSaleByIdShop(shop._id))
                toast.success('Xóa thành công')
            })
            .catch((err)=>{
                console.log(err);
                toast.error('Xóa thất bại')
            })
        }else {
            let currentDate = new Date();
            let time_end = new Date(currentDate.getTime() - 1 * 60);
            requestApi(endpoint, 'PATCH', {time_end}, "application/json")
            .then(()=> {
                dispatch(fetchDiscount())
                if (shop._id)
                    dispatch(fetchFlashSaleByIdShop(shop._id))
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
                <Link to={`/seller/marketing/${endpoint}`} className=' flex gap-2 items-center cursor-pointer  hover:text-primary'>	Chi tiết   <MdEdit />
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
                                <p className=" text-xl">{promotion} Chương trình khuyến mãi</p>
                                <p className=" text-xl cursor-pointer" onClick={() => handlePopup()}><IoMdClose /></p>
                            </div>
                            <p>Bạn có chắc chắn muốn {promotion} Chương trình khuyến mãi này?</p>
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

export default CheckTimeOperation