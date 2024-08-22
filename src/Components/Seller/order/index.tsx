import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { fetchListOrderByShop, SelectListOrderByShop } from '../../../redux/features/orderSeller'
import EmptyBox from '../marketing/discount/create/emptyBox'
import { typeItemOrder } from '../../../utils/types/orderSeller'
import ButtonGroup from './buttonGroup'
import ItemOrder from './itemOrder'

const OrderComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    const listOrder = useAppSelector(SelectListOrderByShop)
    const [listOrderShow, setListOrderShow] = useState([] as typeItemOrder[] )
    const [statusOrder, setStatusOrder] = useState('all')
    useEffect(() => {
        dispatch(fetchListOrderByShop())
    }, [dispatch])
    useEffect(()=>{
        setListOrderShow(listOrder)
    },[listOrder])
    useEffect(()=>{
        if(statusOrder !== 'all') {
            const checkListStatus = listOrder.filter(item => item.status === statusOrder)
            setListOrderShow(checkListStatus)
        } else { 
            setListOrderShow(listOrder)
        }
    },[listOrder, statusOrder])
    const counstOrder = (status: string) =>{
        if (status === 'all')
            return listOrder.length
        return listOrder.filter(item => item.status === status).length
    }
    return (
        <>
            <div className=' p-6 bg-white rounded shadow-md font-normal  text-sm'>
                <div className=' py-2'>
                    <h4 className=' text-xl py-1 '>Đơn hàng</h4>
                </div>

                <ButtonGroup setStatusOrder={setStatusOrder} statusOrder={statusOrder} counstOrder={counstOrder} />

                <div className=' py-2 my-4'>
                    <div className=' flex items-center'>
                        <div className=' border rounded flex items-center'>
                            <div className='  py-1 px-4   w-[200px] flex items-center justify-between border-r'>
                                <p>Mã đơn hàng</p>
                                <p><FaAngleDown /></p>
                            </div>
                            <div className=' py-1  px-4 '>
                                <input type="text" placeholder=' Nhập Mã đơn hàng' />
                            </div>
                        </div>
                        <div className=' ml-4 text-xl'>
                            <IoSearch />
                        </div>
                    </div>
                </div>
                <div className=' py-2 my-4'>
                    <div className=' bg-gray-100 p-2 flex gap-4 rounded px-4 py-4'>
                        <div className=' flex-1'>Sản phẩm</div>
                        <div className=' w-[150px] '>Danh thu đơn hàng</div>
                        <div className=' w-[150px] '>Thời gian tạo</div>
                        <div className=' w-[150px] '>Trạng thái</div>
                        <div className=' w-[100px] '>Thao tác</div>
                    </div>
                    {
                        listOrderShow && listOrderShow.length > 0 ?
                            <div className=' flex gap-4 py-4 flex-col'>
                                {
                                    listOrderShow.map((order) => {
                                        return <div key={order._id}>
                                            <ItemOrder order={order} />
                                        </div>
                                    })
                                }
                            </div>

                            : <EmptyBox text='Không tìm thấy đơn hàng nào' />
                    }
                </div>
            </div>
        </>
    )
}

export default OrderComponent