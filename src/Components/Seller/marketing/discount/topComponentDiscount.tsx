import { Link } from "react-router-dom"

const TopComponentDiscount = () => {
    return (
        <>
            <div className=' p-6 bg-white rounded shadow-md'>
                <div className=' py-2'>
                    <h4 className=' text-xl py-1 '>Tạo Khuyến Mãi</h4>
                    <p className=' text-gray-600 text-sm'>Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh số</p>
                </div>
                <div className=' pt-6 grid grid-cols-3 gap-2'>
                    <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <img className=' w-6' src="https://img.icons8.com/?size=100&id=4gZmlQnQ2RTL&format=png&color=000000" alt="" />
                            <p className=' text-lg'>  Chương Trình Của Shop</p>
                        </div>
                        <p className=' text-gray-600 text-sm'>Tạo Chương trình của Shop để thiết lập các chương trình giảm giá sản phẩm</p>
                        <div className=' flex flex-row-reverse'>
                            <Link to={'/seller/marketing/discount/create-program'} className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</Link>
                        </div>
                    </div>
                    <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <img className=' w-6' src="https://img.icons8.com/?size=100&id=yFhZrrsoIub5&format=png&color=000000" alt="" />
                            <p className=' text-lg'>Combo Khuyến Mãi</p>
                        </div>
                        <p className=' text-gray-600 text-sm'>Tạo Combo Khuyến Mãi để tăng giá trị đơn hàng trên mỗi Người mua</p>
                        <div className=' flex flex-row-reverse'>
                            <button className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</button>
                        </div>
                    </div>
                    <div className=' border rounded p-4 shadow border-gray-300 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <img className=' w-6' src="https://img.icons8.com/?size=100&id=l6t4cr9cofOM&format=png&color=000000" alt="" />
                            <p className=' text-lg'>Mua Kèm Deal Sốc</p>
                        </div>
                        <p className=' text-gray-600 text-sm'>Tạo Mua Kèm Deal Sốc để tăng đơn hàng</p>
                        <div className=' flex flex-row-reverse'>
                            <button className=' px-4 py-2 rounded font-semibold text-white bg-primary text-right'>Tạo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopComponentDiscount