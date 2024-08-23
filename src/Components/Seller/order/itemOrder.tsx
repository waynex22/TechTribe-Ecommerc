import React, { useContext } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineMessage } from 'react-icons/md'
import { formatNumberVnd } from '../../../utils/fortmartNumberVnd'
import { formatShowDate } from '../../../utils/fortmartNumberVnd/formartDate'
import { typeItemOrder } from '../../../utils/types/orderSeller'
import requestApi from '../../../helper/api'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../redux/hook'
import { fetchListOrderByShop } from '../../../redux/features/orderSeller'
import { MessageContex } from '../messageProvider'
import { SendMessage } from '../../../services/messenge'
import { Link } from 'react-router-dom'
import { HandleNameVariationByOrder } from './detail/itemProductOrder'

const ItemOrder = ({ order }: {
    order: typeItemOrder
}) => {
    const dispatch = useAppDispatch()
    const  { setShowRoomChat } = useContext(MessageContex)
    const handleStatusOrder = (status: string) => {
        requestApi(`items-order/update-status/${order._id}`, 'PATCH', { status }, 'application/json')
            .then((data) => {
                if (data.data.status === 201) {
                    dispatch(fetchListOrderByShop())
                    toast.success(data.data.message)
                } else
                    toast.error(data.data.message)
            })
            .catch((err) => {
                console.log(err);
                toast.error('Có lỗi xảy ra')
            })
    }
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
        <div className=' border rounded'>
            <div className=' p-2 border-b flex justify-between items-center bg-gray-50 rounded-t'>
                <div className=' flex items-center gap-2'>
                    <img className=' w-7 h-7 object-cover rounded-full' src={order.customerId.avata} alt="" />
                    <p className=' max-w-[300px] truncate'> {order.customerId.name} </p>
                    <p onClick={() => handleSendMess()} className=' text-lg cursor-pointer'><MdOutlineMessage /></p>
                </div>
                <div>
                    <p>Mã đơn hàng: <span className=' uppercase'>{order._id} </span></p>
                </div>
            </div>
            <div className=' p-2 flex gap-4 border-b '>
                <div className=' flex-1 border-r'>
                    <div className=' flex gap-2'>
                        <div className=' w-12 items-center'>
                            <img src={order.items[0].productPriceId.id_product[0].thumbnails[0]} className='w-12 h-12 rounded' alt="" />
                        </div>
                        <div className=' flex-1 pr-4'>
                            <div className=' flex justify-between items-center'>
                                <p className=' max-w-[400px] truncate font-semibold'> {order.items[0].productPriceId.id_product[0].name} </p>
                                <p className=' px-2 flex-none'>x {order.items[0].quantity}</p>
                            </div>
                            <p className=' text-gray-600 pt-1 text-xs'>
                            <HandleNameVariationByOrder order={order} />
                            </p>
                        </div>
                    </div>
                    {order.items.length > 1 &&
                        <div className=' pt-2  text-gray-600'>
                            Và 1 số sản phẩm khác
                        </div>}
                </div>
                <div className=' w-[150px] border-r '> {formatNumberVnd(order.total)}</div>
                <div className=' w-[150px] border-r '> {formatShowDate(order.updated)} </div>
                <div className=' w-[150px] border-r '> {order.status}  </div>
                <div className=' w-[100px] text-primary'>
                    {order.status === 'Chờ xác nhận' &&
                        <div>
                            <button onClick={() => { handleStatusOrder('Xác nhận') }}> Xác nhận </button>
                        </div>
                    }
                    {order.status === 'Xác nhận' &&
                        <div>
                            <button onClick={() => { handleStatusOrder('Đang vận chuyển') }}> Giao hàng </button>
                        </div>
                    }
                </div>
            </div>
            <div className=' p-2 px-4 flex gap-4 rounded-b justify-between items-center '>
                <div className=' flex gap-2 items-center'>
                    <p className=' font-semibold text-sm'>GHI CHÚ: </p>
                    <p className=' truncate max-w-[600px] text-sm'></p>
                </div>
                <div className=' text-lg'>
                    <Link to={`detail/${order._id}`}><FaRegEdit /></Link>
                </div>
            </div>
        </div>
    )
}

export default ItemOrder