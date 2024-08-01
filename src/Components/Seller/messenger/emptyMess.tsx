import React from 'react'

const EmptyMess = () => {
    return (
        <>
            <div className=' flex h-full w-full items-center justify-center bg-gray-100  gap-2 flex-col'>
                <div>
                    <img src="https://img.icons8.com/?size=100&id=TMFgwWoadkBg&format=png&color=000000" alt="" />
                </div>
                <p className=' text-sm font-semibold'> Chào mừng đến với tính năng Chat dành cho người bán</p>
                <p className=' text-xs font-semibold text-gray-500'>Bắt đầu trả lời người mua</p>
            </div>
        </>
    )
}

export default EmptyMess