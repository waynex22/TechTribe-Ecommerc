import React, { useEffect } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { fetchMessageShorCut, SelectLoadingMessageShortCut, SelectMessageShortCut } from '../../../../../redux/features/messageShortCut'
import EmptyBox from '../../../marketing/discount/create/emptyBox'
import ListShortCut from './listShortCut'
import { Link } from 'react-router-dom'

const MessageShortCut: React.FC = () => {
    const dispatch = useAppDispatch()
    const messageShortCuts = useAppSelector(SelectMessageShortCut)
    const loading = useAppSelector(SelectLoadingMessageShortCut)

    useEffect(() => {
        dispatch(fetchMessageShorCut())
    }, [dispatch])

    return (
        <>
            <div className=' p-6 bg-white rounded shadow-md font-normal'>
                <div className=' flex items-center justify-between'>
                    <div className=' py-2 flex gap-1 flex-col'>
                        <h4 className=' text-xl py-1 '>Tin nhắn nhanh</h4>
                        <p className=' text-gray-500 text-xs'>Tin nhắn nhanh cho phép bạn tạo và sử dụng các mẫu tin nhắn mà bạn thường xuyên gửi cho Người mua.</p>
                    </div>
                    <Link to={'create'} className=' cursor-pointer flex items-center gap-2 bg-primary text-white rounded px-4 py-1 text-sm'>
                        <p className=' text-lg'><IoMdAdd /></p>
                        <p className=''>Tạo tin nhắn nhanh</p>
                    </Link>
                </div>
                <div className=' my-6'>
                    {!loading ?
                        messageShortCuts.length > 0 ?
                            messageShortCuts.map((item) => {
                                return (
                                    <div className=' my-6' key={item._id}>
                                        <ListShortCut messageShortCut={item} />
                                    </div>
                                )
                            })
                            :
                            <EmptyBox text='Bạn chưa có tin nhắn nhanh!' />
                        : <>
                            <div className='rounded border cursor-wait'>
                                <div className='bg-gray-400 border-b rounded-t py-2 px-4 h-8 animate-pulse '>
                                </div>
                                <div className=' h-64 animate-pulse bg-gray-300 '>

                                </div>
                            </div>
                        </>}

                </div>

            </div>
        </>
    )
}

export default MessageShortCut