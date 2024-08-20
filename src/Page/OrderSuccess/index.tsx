import { Link } from 'react-router-dom';
import orderSuccess from './Packaging For Delivery.gif'
import { useGetOrderByUserIdQuery } from 'src/redux/rtkQuery/order';
import { useSelector } from 'react-redux';
const OrderSuccessPage: React.FC = () => {
    const {user} = useSelector((state: any) => state.auth);
    const {data: orders } = useGetOrderByUserIdQuery(user?.sub);
    return (
        <>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <img src={orderSuccess} alt="" className='object-cover w-[400px] h-[400px]' />
                <p className='text-3xl font-normal'>Đơn hàng của bạn đang được xử lý</p>
                <Link to={'/me/purchase'} className='mt-5 bg-primary/50 backdrop-blur-md rounded-md px-4 py-2 text-white'>Quản lý đơn hàng</Link>
            </div>
        </>
    )
}

export default OrderSuccessPage;