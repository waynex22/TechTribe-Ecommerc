import React from 'react';
import { Order } from '../../utils/types/order';
interface Props {
    subOrder?: Order
}
const Address: React.FC<Props> = ({ subOrder }) => {
    console.log(subOrder);
    
    return (
        <>
        <div className="bg-white rounded-lg">
            <div className="flex items-start justify-between font-light-bold text-sm">
                <p className="text-gray-400">Giao tới</p>
                <p className="text-primary/80">Thay đổi</p>
            </div>
            <div className="flex items-center gap-3 text-sm mt-4 font-bold text-gray-800">
                <div className='flex items-center gap-2'></div>
                <span>Tài khoản</span>
                <p className='text-gray-400'>{subOrder?.customerId?.name}</p>
                <div className="w-[1px] h-[20px] bg-gray-400"></div>
                <p>{subOrder?.customerId?.phone}</p>
            </div>
            <div className="mt-4 flex items-start  gap-2">
                <div className="bg-green-400/20 backdrop-blur-0 py-1 px-1.5 rounded-md text-center items-center flex justify-center">
                    <p className="text-[12px] text-green-400/50">Nhà</p>
                </div>
                <span className="text-[14px] text-gray-400">196/28 Nguyễn Huy Tưởng, Phường Hoà Minh , Thành Phố Đà Nẵng</span>
            </div>
        </div>
        </>
    )
}
export default Address;