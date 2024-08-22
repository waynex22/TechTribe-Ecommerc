import React from 'react'
import { Link } from 'react-router-dom'

const ChatManagamentComponent: React.FC = () => {
    return (
        <div className=' flex flex-col gap-6'>
            <div className=' p-6 bg-white rounded shadow-md font-normal'>
                <div className='pb-4'>
                    <h4 className=' text-xl py-1 '>Quản lý Chat</h4>
                </div>
                <div className=' py-4 px-6 pt-4 grid grid-cols-3 gap-2 border rounded w-[770px]'>
                    <div className=' border-r'>
                        <p className=' text-sm text-gray-600'>Lượt chat</p>
                        <p className=' pt-4 text-xl'>12</p>
                    </div>
                    <div className=' border-r  px-4'>
                        <p className=' text-sm text-gray-600'>Tỷ lệ phản hồi chat</p>
                        <p className=' pt-4 text-xl'>100,00%</p>
                    </div>
                    <div className='  px-4'>
                        <p className=' text-sm text-gray-600'>Thời gian phản hồi trung bình</p>
                        <p className=' pt-4 text-xl'> 00:30:22 </p>
                    </div>
                </div>
            </div>
            <div className=' p-6 bg-white rounded shadow-md font-normal'>
                <div className=' py-2'>
                    <h4 className=' text-xl py-1 '>Trợ lý Chat</h4>
                </div>
                <div className=' pt-2 grid grid-cols-3 gap-2'>
                    <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <img className=' w-6' src="https://img.icons8.com/?size=100&id=22815&format=png&color=000000" alt="" />
                            <p className=' text-lg'> Tin nhắn tự động</p>
                        </div>
                        <p className=' text-gray-600 text-sm'>Tự động gửi lời chào khi người mua bắt đầu cuộc trò chuyện.</p>
                        <div className=' flex flex-row-reverse'>
                            <Link to={'auto-reply'} className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</Link>
                        </div>
                    </div>
                    <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <img className=' w-6' src="https://img.icons8.com/?size=100&id=103881&format=png&color=000000" alt="" />
                            <p className=' text-lg'>Tin nhắn nhanh</p>
                        </div>
                        <p className=' text-gray-600 text-sm'>Giúp bộ phận chăm sóc khách hàng phản hồi nhanh hơn thông qua mẫu tin nhắn có sẵn.</p>
                        <div className=' flex flex-row-reverse'>
                            <Link to={'message-short-cuts'} className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatManagamentComponent