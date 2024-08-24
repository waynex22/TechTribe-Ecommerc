import { useGetReturnOrderQuery } from "src/redux/rtkQuery/order";
import SpinLoading from "../spinner/spinLoading";
import ItemShip from "./item";
import { Link } from "react-router-dom";
const LogisticsReturn: React.FC = () => {
    const { data: orders, isLoading } = useGetReturnOrderQuery();
    console.log(orders);
    
    return (
        <>
         <div className="flex items-center gap-4 my-2">
            <Link to="/logistics" className={`px-4 py-2 text-sm font-medium text-gray-600 }`}>Đơn hàng giao</Link>
            <Link to="/logistics/return" className={`px-4 py-2 text-sm font-medium text-primary/80 border-b border-primary }`}>Đơn hàng trả</Link>
        </div>
            <div className="bg-white p-4 rounded-md min-h-screen">  
                {isLoading ? (
                    <SpinLoading loading={isLoading} />
                ) : (
                    <>
                        <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                                <thead className="hidden border-b lg:table-header-group">
                                    <tr className="">
                                        <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                                            Ngày tạo đơn
                                            <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </td>

                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Mã đơn</td>
                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Địa chỉ lấy hàng</td>
                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Số điện thoại</td>
                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                            Tiền thu hộ
                                            <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                            </svg>
                                        </td>
                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>
                                    </tr>
                                </thead>

                                {/* <tbody className="bg-white lg:border-gray-300">
                                    {listOrderShipping?.map((order: any, index: number) => (
                                        <ItemShip key={index} item={order} />
                                    ))}
                                </tbody> */}
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default LogisticsReturn