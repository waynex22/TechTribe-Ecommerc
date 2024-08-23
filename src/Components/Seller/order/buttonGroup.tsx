import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const ButtonGroup = ({setStatusOrder, statusOrder, counstOrder}: {
    setStatusOrder: React.Dispatch<React.SetStateAction<string>>
    statusOrder: string
    counstOrder: (status: string) => number
}) => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    useEffect(() => {
        if(type === 'unpaid')
            setStatusOrder('Chờ xác nhận')
        else if(type === 'to_process')
            setStatusOrder('Xác nhận')
        else if(type === 'shipping')
            setStatusOrder('Đang vận chuyển')
        else if(type === 'completed')
            setStatusOrder('Hoàn thành')
        else if(type === 'cancelled')
            setStatusOrder('Huỷ đơn hàng')
        else
            setStatusOrder('all')
    },[setStatusOrder, type])
  return (
    <div className=' flex gap-2 border-b'>
    <Link to={`/seller/order`}
        className={` p-4 cursor-pointer ${ statusOrder === 'all' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Tất cả ({counstOrder('all')})
    </Link>
    <Link to={`/seller/order?type=unpaid`}
    className={` p-4 cursor-pointer ${ statusOrder === 'Chờ xác nhận' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Chờ xác nhận ({counstOrder('Chờ xác nhận')})
    </Link>
    <Link to={`/seller/order?type=to_process`}
    className={` p-4 cursor-pointer ${ statusOrder === 'Xác nhận' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Chờ lấy hàng ({counstOrder('Xác nhận')}) 
    </Link>
    <Link to={`/seller/order?type=shipping`}
        className={` p-4 cursor-pointer ${ statusOrder === 'Đang vận chuyển' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Đang giao ({counstOrder('Đang vận chuyển')}) 
    </Link>
    <Link to={`/seller/order?type=completed`}
        className={` p-4 cursor-pointer ${ statusOrder === 'Hoàn thành' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Đã giao ({counstOrder('Hoàn thành')}) 
    </Link>
    <Link to={`/seller/order?type=cancelled`}
        className={` p-4 cursor-pointer ${ statusOrder === 'Huỷ đơn hàng' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Đơn Huỷ ({counstOrder('Huỷ đơn hàng')}) 
    </Link>

    <Link to={`/seller/order/return`}
        className={` p-4 cursor-pointer ${ statusOrder === 'Hoàn hàng' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Trả hàng/Hoàn tiền ({counstOrder('Hoàn hàng')})
    </Link>
    {/* <p onClick={()=>{setStatusOrder('Giao không thành công')}}
    className={` p-4 cursor-pointer ${ statusOrder === '' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Giao không thành công ({counstOrder('Giao không thành công')})
    </p> */}
</div>
  )
}

export default ButtonGroup