import React, { useContext, useEffect, useState } from 'react'
import { TypeMessageShortCut } from '../../../../../utils/types/messageShortCut'
import { FaAngleDown, FaAngleRight } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import Popup from '../../../../../Page/popup/popup'
import { IoClose } from 'react-icons/io5'
import requestApi from '../../../../../helper/api'
import { useAppDispatch } from '../../../../../redux/hook'
import { LoaderContex } from '../../../loadingProvider'
import { toast } from 'react-toastify'
import { fetchMessageShorCut } from '../../../../../redux/features/messageShortCut'
import { Link } from 'react-router-dom'

const ListShortCut = ({ messageShortCut }: { messageShortCut: TypeMessageShortCut }) => {
    const dispatch = useAppDispatch()
    const { setLoader } = useContext(LoaderContex)
    const [status, setStatus] = useState(false)
    const [isShowContents, setIsShowContents] = useState(true)
    const [isShowPopup, setIsShowPopup] = useState(false)
    const [typePopup, setTypePopup] = useState('')

    useEffect(() => {
        setStatus(messageShortCut.status)
    }, [messageShortCut.status])

    const handleCheckboxChange = () => {
        setIsShowPopup(true)
        setTypePopup('status')
    }
    const handleDelete = () => {
        setIsShowPopup(true)
        setTypePopup('delete')
    }
    const handleisShowContents = () => {
        setIsShowContents(!isShowContents)
    }
    const hanldIsShowPopup = () => {
        setIsShowPopup(!isShowPopup)
    }
    const onSubmit = () =>{
        setIsShowPopup(false)
        if(typePopup === 'status'){
            setLoader(true)
            requestApi(`message-short-cut/${messageShortCut._id}`,'PATCH', {status: !status }, 'application/json')
                .then((data)=>{
                    setLoader(false)
                    if (data.data.status === 409) {
                        toast.error(data.data.message)
                    }else {
                        setStatus(!status)
                        toast.success('Thay đổi thành công')
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    toast.error('Có lỗi khi thay đổi')
                    
                })
        } else if(typePopup === 'delete') {
            setLoader(true)
            requestApi(`message-short-cut/${messageShortCut._id}`,'DELETE', {}, 'application/json')
                .then((data)=>{
                    setLoader(false)
                    dispatch(fetchMessageShorCut())
                    toast.success('Xóa thành công')
                })
                .catch((err)=>{
                    console.log(err);
                    toast.error('Có lỗi khi xóa')
                    
                })
        }
        
    }
    return (
        <>
            <div className=' rounded border'>
                <div onClick={handleisShowContents} className='bg-gray-100 border-b rounded-t py-2 px-4 flex items-center justify-between'>
                    <div className=' flex items-center gap-4'>
                        <p className=' text-lg cursor-pointer'>
                            {isShowContents ? <FaAngleDown /> : <FaAngleRight />}
                        </p>
                        <p> {messageShortCut.group_name} </p>
                    </div>
                    <div className=' flex items-center gap-4'>
                        <label className='flex cursor-pointer select-none items-center'>
                            <div className='relative'>
                                <input
                                    type='checkbox'
                                    checked={status}
                                    onChange={handleCheckboxChange}
                                    className='sr-only'
                                />
                                <div
                                    className={`box block h-6 w-12 rounded-full ${status ? 'bg-primary' : ' bg-gray-300'
                                        }`}
                                ></div>
                                <div
                                    className={`absolute left-1 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${status ? 'translate-x-full' : ''
                                        }`}
                                ></div>
                            </div>
                        </label>
                        <Link to={`edit/${messageShortCut._id}`} className=' text-xl cursor-pointer'><MdModeEdit /></Link>
                        <p onClick={handleDelete} className=' text-xl cursor-pointer'><RiDeleteBin5Fill /></p>
                    </div>
                </div>
                {isShowContents &&
                    <div className=' text-sm font-normal'>
                        {messageShortCut.contents.length > 0 &&
                            messageShortCut.contents.map((content, index) => {
                                return (
                                    <div key={index} className=' px-6 py-2 border-b'>
                                        <p> {content} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
            {isShowPopup &&
                <Popup onHandlePopup={hanldIsShowPopup} >
                    <div className=' w-[350px] p-4 bg-white border shadow rounded relative flex flex-col gap-6'>
                        <h4 className='text-base font-bold'>Lưu ý</h4>
                        <p className=' text-sm'>
                            {typePopup ==='status' && 'Nếu bạn bật chức năng này, nhóm Tin nhắn nhanh sẽ được hiển thị trong cửa sổ Chat của bạn. Bạn có chắc muốn bật chức năng này?'}
                            {typePopup === 'delete' && 'Bạn có chắc muốn xóa Tin nhắn nhanh này?'}
                        </p>
                        <div className=' flex flex-row-reverse pb-2 gap-4 px-4 text-sm'>
                            <p onClick={onSubmit} className=' cursor-pointer px-4 py-1 rounded bg-primary text-white  hover:bg-opacity-80'>Xác nhận</p>
                            <p onClick={hanldIsShowPopup} className=' cursor-pointer px-4 py-1 rounded border hover:bg-gray-100'>Hủy</p>
                        </div>
                        <p onClick={hanldIsShowPopup} className=' absolute top-4 right-4 text-xl cursor-pointer'><IoClose /></p>
                    </div>
                </Popup>
            }
        </>
    )
}

export default ListShortCut