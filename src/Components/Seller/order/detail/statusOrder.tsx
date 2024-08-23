import React, { useContext } from 'react'
import { typeItemOrder } from '../../../../utils/types/orderSeller'
import requestApi from '../../../../helper/api'
import { useAppDispatch } from '../../../../redux/hook'
import { LoaderContex } from '../../loadingProvider'
import { toast } from 'react-toastify'
import { fetchOrderByID } from '../../../../redux/features/orderSeller'
import { formatShowDate } from '../../../../utils/fortmartNumberVnd/formartDate'

const StatusOrderComponent = ({ order }: { order: typeItemOrder }) => {
    const dispatch = useAppDispatch()
    const { setLoader } = useContext(LoaderContex)
    const handleStatusOrder = (status: string) => {
        setLoader(true)
        requestApi(`items-order/update-status/${order._id}`, 'PATCH', { status }, 'application/json')
            .then((data) => {
                setLoader(false)
                if (data.data.status === 201) {
                    dispatch(fetchOrderByID(order._id))
                    toast.success(data.data.message)
                } else
                    toast.error(data.data.message)
            })
            .catch((err) => {
                setLoader(false)
                console.log(err);
                toast.error('Có lỗi xảy ra')
            })
    }
    return (
        <>
            {
                order &&
                <div className=' p-6 bg-white rounded shadow-md font-normal  text-sm'>
                    <div className=''>
                        <h4 className=' text-xl py-1 '>Tình trạng đơn hàng</h4>
                    </div>
                    <div className=' py-4 flex gap-2 justify-center'>

                        <div className=' items-center flex flex-col gap-2'>
                            <div className={`w-16 h-16 p-2 rounded-full border-2 ${checkStatusOrder(order.status) >= 1 && 'border-green-600'}`}>
                                <img className=' w-full rounded' src="https://img.icons8.com/?size=100&id=112165&format=png&color=000000" alt="" />
                            </div>
                            <p className={`${checkStatusOrder(order.status) >= 1 && 'font-semibold'}`}>Chờ xác nhận</p>
                            <p className=' text-xs text-gray-600'> {formatShowDate(order.updated)} </p>

                        </div>

                        <span className={`mt-8 border-2 h-0 w-[100px] 
                ${checkStatusOrder(order.status) > 1 ? 'border-green-600' : 'border-gray-400'}`}>
                        </span>

                        <div className=' items-center flex flex-col gap-2 '>
                            <div className={`w-16 h-16 p-2 rounded-full border-2 ${checkStatusOrder(order.status) >= 2 && 'border-green-600'}`}>
                                <img className=' w-full rounded' src="https://img.icons8.com/?size=100&id=49KhpaZpJ3ZD&format=png&color=000000" alt="" />
                            </div>
                            <p className={`${checkStatusOrder(order.status) >= 2 && 'font-semibold'}`}>Chờ lấy hàng</p>
                            <p className=' text-xs text-gray-600'>
                                {order.statusUpdate && order.statusUpdate[0] && order.statusUpdate[0].key === 'Xác nhận' &&
                                    formatShowDate(order.statusUpdate[0].value)}
                            </p>
                        </div>

                        <span className={`mt-8 border-2 h-0  w-[100px] 
                ${checkStatusOrder(order.status) > 2 ? 'border-green-600' : 'border-gray-400'}`}>
                        </span>

                        <div className=' items-center flex flex-col gap-2 '>
                            <div className={`w-16 h-16 p-2 rounded-full border-2 ${checkStatusOrder(order.status) >= 3 && 'border-green-600'}`}>
                                <img className=' w-full rounded' src="https://img.icons8.com/?size=100&id=0KLANXRXHEKJ&format=png&color=000000" alt="" />
                            </div>
                            <p className={`${checkStatusOrder(order.status) >= 3 && 'font-semibold'}`}>Đang giao</p>
                            <p className=' text-xs text-gray-600'>
                                {order.statusUpdate && order.statusUpdate[1] && order.statusUpdate[1].key === 'Đã gửi hàng' && formatShowDate(order.statusUpdate[1].value)}
                            </p>
                        </div>

                        <span className={`mt-8 border-2 h-0  w-[100px] 
                ${checkStatusOrder(order.status) > 3 ? 'border-green-600' : 'border-gray-400'}`}>
                        </span>

                        <div className=' items-center flex flex-col gap-2'>
                            <div className={`w-16 h-16 p-2 rounded-full border-2 ${checkStatusOrder(order.status) >= 4 && 'border-green-600'}`}>
                                <img className=' w-full rounded' src="https://img.icons8.com/?size=100&id=Qubc69P3VbM8&format=png&color=000000" alt="" />
                            </div>
                            <p className={`${checkStatusOrder(order.status) >= 4 && 'font-semibold'}`}>Đã giao</p>
                            <p className=' text-xs text-gray-600'>
                                {order.statusUpdate && order.statusUpdate[2]  && order.statusUpdate[2].key === 'Hoàn thành'
                                    && formatShowDate(order.statusUpdate[2].value)}
                            </p>
                        </div>
                    </div>
                    <div className=' py-2 text-right px-20'>

                        {checkStatusOrder(order.status) === 1 &&
                            <span onClick={() => handleStatusOrder('Xác nhận')} className=' py-1 px-6 cursor-pointer font-semibold text-base rounded bg-primary text-white'>Xác nhận</span>
                        }
                        {checkStatusOrder(order.status) === 2 &&
                            <span onClick={() => handleStatusOrder('Đang vận chuyển')} className=' py-1 px-6 cursor-pointer font-semibold text-base rounded bg-primary text-white'>Giao hàng</span>
                        }
                    </div>
                </div>
            }
        </>
    )
}

const checkStatusOrder = (status: string) => {
    if (status === 'Chờ xác nhận')
        return 1
    if (status === 'Xác nhận')
        return 2
    if (status === 'Đang vận chuyển')
        return 3
    if (status === 'Hoàn thành')
        return 4
    if (status === 'Hoàn hàng')
        return -1
    if (status === 'Giao không thành công')
        return -2
    return 0
}

export default StatusOrderComponent