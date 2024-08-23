import { Link, useParams } from "react-router-dom";
import { useGetReturnOrderByItemOrderIdQuery } from "src/redux/rtkQuery/order";
import TimeLineStatus from "./TimeLineStatus";
import ItemReturn from "./ItemReturn";
import SpinLoading from "src/Components/spinner/spinLoading";

const ReturnOrder: React.FC = () => {
    const slug = useParams<{ slug: string }>().slug;
    const { data: returnOrder, isLoading } = useGetReturnOrderByItemOrderIdQuery(slug as string, {
        skip: !slug
    });
    return (
        <>
            <h2 className="font-normal">Đơn hàng hoàn trả</h2>
            {isLoading ? (
                <>
                    <SpinLoading loading={isLoading} />
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between border-b border-dashed mt-2 p-4 bg-white rounded-lg">
                        <Link to={`/me/purchase/order/${returnOrder?.itemsOrderId?._id}`} className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer uppercase">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            <p>Trở lại</p>
                        </Link>
                        <div className="flex items-center justify-between uppercase text-sm gap-2">
                            <p>Mã yêu cầu. 2TRF{returnOrder?._id.slice(0, 6)}</p>
                            <div className="w-[1px] h-4 bg-gray-600"></div>
                            <p className="text-sm text-primary">{returnOrder?.status}</p>
                        </div>
                    </div>
                    {returnOrder.status === 'Đã tiếp nhận' && (
                        <>
                            <div className="border-b border-dashed p-4 flex items-center justify-center bg-white rounded-lg">
                                <p className="text-xs text-gray-400">Đơn vị vận chuyển sẽ đến lấy hàng trong vòng 1 - 2 ngày tới</p>
                            </div>
                        </>
                    )}
                    <div className="border-b border-dashed p-4 flex items-center justify-center bg-white rounded-lg">
                        <TimeLineStatus returnOrder={returnOrder} />
                    </div>
                    <ItemReturn item={returnOrder} />
                </>
            )}

        </>
    )
}
export default ReturnOrder;