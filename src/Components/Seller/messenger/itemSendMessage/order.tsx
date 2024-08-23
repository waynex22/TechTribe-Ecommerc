import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchListOrderByShop, SelectListOrderByShop } from '../../../../redux/features/orderSeller'
import { typeItemOrder } from '../../../../utils/types/orderSeller'
import { formatNumberVnd } from '../../../../utils/fortmartNumberVnd'
import EmptyBox from '../../marketing/discount/create/emptyBox'

const ItemSendMessageOrder = ({onSendMess, id_customer , showList, onHandleListShow}:{
    onSendMess: (data: { id_customer: string; id_order?: string;}) => void
    id_customer: string
    showList: string
    onHandleListShow: (value:string) => void
}) => {
    const dispatch = useAppDispatch()
    const listOrderShop = useAppSelector(SelectListOrderByShop)
    const [listShowOrder, setListShowOrder] = useState([] as typeItemOrder[])
    const [valueSearch, setValueSearch] = useState('')

    useEffect(() => {
        dispatch(fetchListOrderByShop())
    },[dispatch])

    useEffect(()=>{
        setListShowOrder(listOrderShop.filter(item => item.customerId._id === id_customer))
    },[id_customer, listOrderShop])

    const sendProduct = (id_order: string) => {
        onHandleListShow('')
        const data = {
            id_customer,
            id_order
        }
        onSendMess(data)
    }

    const handleValueSearch = (value: string) => {
        setValueSearch(value)
    }
    const handleKeyDown = (key: string) => {
        if (key === 'Enter') {
            handleListShow();
        }
      };
    const handleListShow = () => {
        setListShowOrder(listOrderShop.filter(item => item.customerId._id === id_customer && item._id.toLowerCase() === valueSearch.toLowerCase()))
    }
    return (
        <>
            <div className='group relative'>
                <div onClick={() => onHandleListShow('order')}>
                    <img className='w-5 cursor-pointer' src="https://img.icons8.com/parakeet-line/48/purchase-order.png" alt="purchase-order" />
                </div>
                <p className='hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'>Order</p>

                {showList === 'order' &&
                    <div className=' text-xs absolute bottom-full w-[300px]  bg-gray-200 border left-1/2 -translate-x-1/2 rounded shadow-md'>
                        <div className=' p-2 border-b bg-white'>
                            <div className=' flex border rounded items-center gap-2 pr-4 px-2 shadow'>
                                <input
                                    value={valueSearch}
                                    onChange={(e) => { handleValueSearch(e.target.value) }}
                                    onKeyDown={(e) => handleKeyDown(e.key)}
                                    type="text" className=' w-full' />
                                <p onClick={handleListShow} className=' cursor-pointer'> <BiSearch /> </p>
                            </div>
                        </div>
                        <div className=' py-1 flex flex-col gap-1 overflow-y-auto h-[250px]'>
                        {listShowOrder && listShowOrder.length > 0 && listShowOrder[0]._id ?
                            listShowOrder.map(order => {
                                return (
                                    <div className=' px-2 py-1 bg-white'>
                                        <div className=' flex gap-2 border-b py-1'>
                                            <img src={order.items[0].productPriceId.id_product[0].thumbnails[0]} className=' w-8 h-8 object-cover border rounded' alt="" />
                                            <div>
                                                <p className=' truncate max-w-[200px]'>ID: <span className=' uppercase font-semibold'>{order._id}</span> </p>
                                                <p className=' text-red-500'> {formatNumberVnd(order.total)} </p>
                                            </div>
                                        </div>
                                        <div className=' flex justify-between pt-1 items-center'>
                                            <p> {order.status} </p>
                                            <p onClick={() => sendProduct(order._id)} className=' cursor-pointer hover:shadow-md hover:bg-opacity-90 bg-primary text-white px-2 py-1 rounded'>Gửi</p>
                                        </div>
                                    </div>
                                )
                            }) :
                            <EmptyBox />
                        }
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default ItemSendMessageOrder