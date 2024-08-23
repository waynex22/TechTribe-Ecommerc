import React, { useContext } from 'react'
import { CiBarcode } from 'react-icons/ci'
import { FaLocationDot } from 'react-icons/fa6'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
import { typeAddress, typeItemOrder } from '../../../../utils/types/orderSeller'
import { SendMessage } from '../../../../services/messenge'
import { MessageContex } from '../../messageProvider'

const InfoCustomerOrder = ({order}: {order: typeItemOrder}) => {
    const  { setShowRoomChat } = useContext(MessageContex)
    const handleSendMess = async () => {
        const dataSendMess = {
            id_customer: order.customerId._id,
            id_order: order._id
        };
        SendMessage(dataSendMess)
        .then((data) => {
            setShowRoomChat(data.data.id_roomChat)
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <div className=' mb-4 rounded bg-white shadow p-6 flex flex-col gap-4'>
                <div className=' flex gap-2'>
                    <img src={order.customerId.avata} className=' w-12 h-12 rounded-full object-cover border' alt="" />
                    <div className=' flex-auto'>
                        <p className=' font-semibold'> {order.customerId.name} </p>
                        <div className=' flex flex-row-reverse'>
                            <div onClick={handleSendMess} className='  px-4 py-1 rounded border cursor-pointer border-primary text-primary hover:shadow-md  hover:bg-primary hover:text-white flex items-center gap-2'>
                                <p className=' text-sm font-semibold text-center'>Chat ngay</p>
                                <p className=' text-lg'><IoChatbubbleEllipsesSharp /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rounded bg-white shadow p-6 flex flex-col gap-4'>
                <div className=''>
                    <div className=' flex gap-4'>
                        <p className=' text-primary font-semibold text-xl py-1'><CiBarcode /></p>
                        <div className=' py-1'>
                            <p className=' text-base font-semibold'> Mã đơn hàng </p>
                            <p className=' text-sm py-1'> {order._id.toUpperCase()} </p>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <div className=' flex gap-4'>
                        <p className=' text-primary font-semibold text-xl py-1'><FaLocationDot /></p>
                        <div>
                            <p className=' text-base font-semibold'> Thông tin nhận hàng</p>
                            <div className=' text-sm py-1 flex flex-col gap-1'>
                                <p>Tên: {order.orderId.address.fullName} </p>
                                <p>Số điện thoại: {order.orderId.address.phoneNumber} </p>
                                <p>Địa chỉ: {handleAddressCustomer(order.orderId.address)} </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export const handleAddressCustomer = (address: typeAddress) => {
    return `${address.address}, ${address.ward}, ${address.district}, ${address.province}`
}

export default InfoCustomerOrder