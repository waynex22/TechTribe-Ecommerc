import React from 'react'

const ButtonGroup = ({setStatusOrder, statusOrder, counstOrder}: {
    setStatusOrder: React.Dispatch<React.SetStateAction<string>>
    statusOrder: string
    counstOrder: (status: string) => number
}) => {
  return (
    <div className=' flex gap-2 border-b'>
    <p onClick={()=>{setStatusOrder('all')}} 
        className={` p-4 cursor-pointer ${ statusOrder === 'all' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Tất cả ({counstOrder('all')})
    </p>
    <p onClick={()=>{setStatusOrder('Chờ xác nhận')}} 
    className={` p-4 cursor-pointer ${ statusOrder === 'Chờ xác nhận' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Chờ xác nhận ({counstOrder('Chờ xác nhận')})
    </p>
    <p onClick={()=>{setStatusOrder('Xác nhận')}} 
    className={` p-4 cursor-pointer ${ statusOrder === 'Xác nhận' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Chờ lấy hàng ({counstOrder('Xác nhận')}) 
    </p>
    <p onClick={()=>{setStatusOrder('Đang vận chuyển')}} 
        className={` p-4 cursor-pointer ${ statusOrder === 'Đang vận chuyển' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Đang giao ({counstOrder('Đang vận chuyển')}) 
    </p>
    <p onClick={()=>{setStatusOrder('Hoàn thành')}}
        className={` p-4 cursor-pointer ${ statusOrder === 'Hoàn thành' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Đã giao ({counstOrder('Hoàn thành')}) 
    </p>
    <p onClick={()=>{setStatusOrder('Huỷ đơn hàng')}}
        className={` p-4 cursor-pointer ${ statusOrder === 'Huỷ đơn hàng' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Đơn Huỷ ({counstOrder('Huỷ đơn hàng')}) 
    </p>

    <p onClick={()=>{setStatusOrder('Hoàn hàng')}}
        className={` p-4 cursor-pointer ${ statusOrder === 'Hoàn hàng' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Trả hàng/Hoàn tiền ({counstOrder('Hoàn hàng')})

    </p>
    {/* <p onClick={()=>{setStatusOrder('Giao không thành công')}}
    className={` p-4 cursor-pointer ${ statusOrder === '' && 'clear-start font-semibold text-primary border-b-4 border-primary'}`}>
        Giao không thành công ({counstOrder('Giao không thành công')})
    </p> */}
</div>
  )
}

export default ButtonGroup