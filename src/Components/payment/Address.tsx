import React from 'react';
import { Order } from '../../utils/types/order';
import { useGetAddressByUserIdQuery } from 'src/redux/rtkQuery/user_customers';
import { useUpdateSubOrderDtoMutation } from 'src/redux/rtkQuery/order';
import Spinner from '../spinner/Spinner';
interface Props {
    subOrder?: Order | any;
    refecth: () => void
}
const Address: React.FC<Props> = ({ subOrder , refecth }) => {
    const { data: addressUser } = useGetAddressByUserIdQuery(subOrder?.customerId._id, {
        skip: !subOrder
    });
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [update] = useUpdateSubOrderDtoMutation();
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const handleSelectAddress = async (address: string) => {
        setLoading(true);
        const payload = {
            id: subOrder?._id,
            address: address
        }
        closeModal();
        try {
            await update(payload);
            refecth();
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    }
    return (
        <>
        <Spinner loading={loading} />
            <div className="bg-white rounded-lg">
                <div className="flex items-start justify-between font-light-bold text-sm">
                    <p className="text-gray-400">Giao tới</p>
                    <p onClick={openModal} className="text-primary/80 cursor-pointer">Thay đổi</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm mt-4">
                    <div className='flex items-center gap-2 font-normal'></div>
                    <span className='text-sm'>Người nhận</span>
                    <p className='text-gray-500 text-sm'>{subOrder?.address?.fullName}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm mt-4">
                    <div className='flex items-center gap-2 font-normal'></div>
                    <span className='text-sm'>Số điện thoại</span>
                    <p className='text-gray-500 text-sm'>{subOrder?.address?.phoneNumber}</p>
                </div>
                <div className="mt-4 flex items-start  gap-2">
                    <div className={`${subOrder?.address?.isDefault ? 'bg-green-400/20' : 'bg-yellow-400/20 '} backdrop-blur-0 py-1 px-1.5 rounded-md text-center items-center flex justify-center`}>
                        <p className={`text-[12px] ${subOrder?.address?.isDefault ? 'text-green-400/50' : 'text-yellow-400/50'}`}>{subOrder?.address?.isDefault ? 'Nhà' : 'Khác'}</p>
                    </div>
                    <span className="text-[14px] text-gray-400">{subOrder?.address?.address + ', ' + subOrder?.address?.ward + ', ' + subOrder?.address?.district + ', ' + subOrder?.address?.province}</span>
                </div>
            </div>
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-3/5 max-w-lg">
                            <div className="flex items-center justify-between">
                                <h3>Địa chỉ của bạn</h3>
                                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            {addressUser && addressUser.map((item: any) => (
                                <>
                                    <div key={item._id} className='mt-2 p-2 border border-solid border-gray-200 rounded-lg flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            {item.isDefault ? <div className="bg-green-400/20 backdrop-blur-0 py-1 px-1.5 rounded-md text-center items-center flex justify-center">
                                                <p className="text-[12px] text-green-400/50">Nhà</p>
                                            </div> : 
                                            <div className="bg-yellow-400/20 backdrop-blur-0 py-1 px-1.5 rounded-md text-center items-center flex justify-center">
                                            <p className="text-[12px] text-yellow-400/50">Khác</p>
                                        </div>}
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                <p className='text-[12px] text-gray-500 font-light'>{item.fullName}</p>
                                                <div className='w-[1px] h-[12px] bg-gray-500'></div>
                                                <p className='text-[12px] text-gray-500 font-light'>{item.phoneNumber}</p>
                                                </div>
                                                <p className='text-[12px] text-gray-500 font-light'>Địa chỉ : {item.address + ', ' + item.ward + ', ' + item.district + ', ' + item.province}</p>
                                            </div>
                                        </div>
                                        <div className='w-2/5 flex items-center justify-end'>
                                            {item._id !== subOrder?.address?._id ? <input onClick={() => handleSelectAddress(item._id)} type="radio" name="address" className='w-4 h-4 cursor-pointer' /> :
                                               <input type="radio" name="address" className='w-4 h-4' defaultChecked />
                                            }
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </>
            )
            }
        </>

    )
}
export default Address;