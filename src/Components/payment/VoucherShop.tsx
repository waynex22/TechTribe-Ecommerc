import { useState } from "react";
import { useGetVoucherByShopQuery } from "../../redux/rtkQuery/voucher";
import { Voucher } from "../../utils/types/voucher";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd";
import { formatDate } from "../../utils/formartDate";
import { useUpdateItemsSubOrderMutation } from "../../redux/rtkQuery/order";
import Spinner from "../spinner/Spinner";
import { sortByValidity } from "../../utils/sortVoucher";
import EmptyVoucher from "./EmptyVoucher";
import { checkTimeValidVoucher } from "src/utils/checkDiscount";
interface Props {
    subOrder?: any,
    itemsSubOrder?: any,
    refecth: () => void;
}
const VoucherShop: React.FC<Props> = ({ subOrder, itemsSubOrder, refecth }) => {
    const [updateItemsSubOrder] = useUpdateItemsSubOrderMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const { data: vouchers = [], isLoading } = useGetVoucherByShopQuery(itemsSubOrder?.shopId?._id);
    const listVoucherShow = vouchers?.filter((voucher) => {
        const EndTime = new Date(voucher.time_end).getTime();
        return EndTime >= new Date().getTime();
    });
    const isVoucherValid = (voucher: Voucher) => {
        const isOrderValueValid = itemsSubOrder?.total >= voucher.minimum_order_value;
        const isDateValid = checkTimeValidVoucher(voucher.time_start, voucher.time_end);
        const usage = voucher.maximum_total_usage > 1;
        if (voucher.id_product.length > 0) {
            const isProductValid = voucher.id_product.some((id: any) => subOrder?.subOrder?.id_product?.includes(id));
            return isOrderValueValid && isProductValid && isDateValid && usage;
        }
        return isOrderValueValid && isDateValid && usage;
    };
    const sortedVouchers = listVoucherShow ? sortByValidity(listVoucherShow, isVoucherValid) : [];
    const handleChooseVoucher = async (voucher: Voucher) => {
        setLoading(true);
        try {
            const payload = {
                _id: itemsSubOrder._id,
                voucherShopId: voucher._id
            }
            await updateItemsSubOrder(payload);
            refecth();
            closeModal();
        } catch (error) {
            console.log(error);
        } finally {
            refecth();
            closeModal();
            setLoading(false);
        }
    }
    const checkStartTime = (startTime: string) => {
        const time = new Date(startTime).getTime();
        return time > new Date().getTime();
    }
    if (isLoading) return <></>
    return (
        <>
            <Spinner loading={loading} />
            <div className="flex items-center justify-start gap-4 my-4 border border-solid border-gray-200 p-4 rounded-lg w-2/3">
                {!itemsSubOrder?.voucherShopId ? (
                    <>
                        <h3 className="font-normal text-gray-700 text-sm">Shop khuyến mãi</h3>
                        <div onClick={openModal} className="flex items-center gap-2 cursor-pointer">
                            <p className="text-[12px] font-thin text-blue-400 ">Nhập hoặc chọn mã</p>
                            <svg className="text-blue-400 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </>
                ) : (
                    <>
                        <div onClick={() => setIsModalOpen(true)} className="flex items-center justify-between gap-2 w-full cursor-pointer">
                            <div className="flex items-center gap-2">
                                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="none" viewBox="0 0 96 96" id="shopping-bag"><path fill="url(#paint0_linear_844_6853)" fill-rule="evenodd" d="M39.5 20.4196C39.5 15.51 43.5129 11.5 48.5 11.5C53.4871 11.5 57.5 15.51 57.5 20.4196V21.5006L39.5 21.5003V20.4196ZM34.5 21.5002V20.4196C34.5 12.7155 40.7846 6.5 48.5 6.5C56.2154 6.5 62.5 12.7155 62.5 20.4196V21.5006L76.0001 21.5008C77.933 21.5009 79.5 23.0679 79.5 25.0008V58.8088C83.1768 62.0168 85.5 66.7371 85.5 72C85.5 81.665 77.665 89.5 68 89.5M67.9766 89.5H30C22.5442 89.5 16.5 83.4558 16.5 76V25C16.5 23.067 18.067 21.5 20.0001 21.5L34.5 21.5002M48.5 43.5C53.6589 43.5 58.5 39.0853 58.5 34C58.5 32.6193 59.6193 31.5 61 31.5C62.3807 31.5 63.5 32.6193 63.5 34C63.5 42.1695 56.0861 48.5 48.5 48.5C40.9139 48.5 33.5 42.1695 33.5 34C33.5 32.6193 34.6193 31.5 36 31.5C37.3807 31.5 38.5 32.6193 38.5 34C38.5 39.0853 43.3411 43.5 48.5 43.5ZM68 59.5C61.0964 59.5 55.5 65.0964 55.5 72C55.5 78.9036 61.0964 84.5 68 84.5C74.9036 84.5 80.5 78.9036 80.5 72C80.5 65.0964 74.9036 59.5 68 59.5ZM73 79.5C71.6193 79.5 70.5 78.3807 70.5 77C70.5 75.6193 71.6193 74.5 73 74.5C74.3807 74.5 75.5 75.6193 75.5 77C75.5 78.3807 74.3807 79.5 73 79.5ZM63 69.5C64.3807 69.5 65.5 68.3807 65.5 67C65.5 65.6193 64.3807 64.5 63 64.5C61.6193 64.5 60.5 65.6193 60.5 67C60.5 68.3807 61.6193 69.5 63 69.5ZM74.7678 65.2322C75.7441 66.2085 75.7441 67.7915 74.7678 68.7678L64.7678 78.7678C63.7915 79.7441 62.2085 79.7441 61.2322 78.7678C60.2559 77.7915 60.2559 76.2085 61.2322 75.2322L71.2322 65.2322C72.2085 64.2559 73.7915 64.2559 74.7678 65.2322Z" clip-rule="evenodd"></path><defs><linearGradient id="paint0_linear_844_6853" x1="51" x2="51" y1="6.5" y2="89.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF1F00"></stop><stop offset="1" stop-color="#FF8A00"></stop></linearGradient></defs></svg>
                                <p className="font-normal text-sm text-gray-400">Voucher của shop</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] font-light text-green-400">{itemsSubOrder?.discount > 0 ? `-${formatNumberVnd(itemsSubOrder?.discount)}đ` : `Hoàn ${formatNumberVnd(itemsSubOrder?.coin)} xu`}</p>
                                <svg className="size-5 cursor-pointer text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-3/5 max-w-lg">
                            <div className="flex items-center justify-between">
                                <h3>Voucher của shop</h3>
                                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex justify-between items-center my-4">
                                <input
                                    type="text"
                                    placeholder="Nhập mã giảm giá"
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  sm:text-sm"
                                />
                                <button className="ml-4 bg-green-400/20 backdrop-blur-0 text-green-400 py-2 text-[14px] font-semibold px-4 rounded w-[30%]">
                                    Áp dụng
                                </button>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Mã Giảm Giá</h2>
                            </div>
                            <div className="space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                                {sortedVouchers && sortedVouchers.length > 0 ? (
                                    <>
                                        {sortedVouchers && sortedVouchers.map((item: Voucher, index: number) => {
                                            const valid = isVoucherValid(item);
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex items-center overflow-hidden min-h-[120px] border rounded-lg ${valid ? 'border-gray-200' : 'border-gray-300 bg-gray-100 opacity-70 cursor-not-allowed'}`}
                                                >
                                                    <div className="w-32 min-h-[120px] backdrop-blur-sm flex flex-col items-center justify-center border-r border-dashed border-gray-300">
                                                        <svg className="size-10 text-white" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="ticket"><path d="M505.081,196.611c3.82,0,6.919-3.097,6.919-6.919V123.56c0-18.536-15.081-33.615-33.617-33.615H33.613
	C15.077,89.945,0,105.024,0,123.56v66.133c0,3.822,3.099,6.919,6.919,6.919c32.748,0,59.387,26.642,59.387,59.387
	s-26.64,59.387-59.387,59.387c-3.82,0-6.919,3.097-6.919,6.919v66.135c0,18.536,15.077,33.615,33.613,33.615h444.77
	c18.536,0,33.617-15.079,33.617-33.615v-66.135c0-3.822-3.099-6.919-6.919-6.919c-32.748,0-59.387-26.642-59.387-59.387
	S472.333,196.611,505.081,196.611z M431.856,255.999c0,38.043,29.162,69.403,66.306,72.901v59.541
	c0,10.905-8.874,19.777-19.779,19.777H174.297V375.94c0-3.822-3.099-6.919-6.919-6.919s-6.919,3.097-6.919,6.919v32.277H33.613
	c-10.905,0-19.775-8.872-19.775-19.777V328.9c37.144-3.498,66.306-34.858,66.306-72.901s-29.162-69.403-66.306-72.901V123.56
	c0-10.905,8.869-19.777,19.775-19.777H160.46v32.275c0,3.822,3.099,6.919,6.919,6.919s6.919-3.097,6.919-6.919v-32.275h304.086
	c10.905,0,19.779,8.872,19.779,19.777v59.538C461.018,186.596,431.856,217.956,431.856,255.999z M174.297,234.92v42.158
	c0,3.822-3.099,6.919-6.919,6.919s-6.919-3.097-6.919-6.919V234.92c0-3.822,3.099-6.919,6.919-6.919
	C171.198,228.001,174.297,231.098,174.297,234.92z M174.297,305.429v42.162c0,3.822-3.099,6.919-6.919,6.919
	s-6.919-3.097-6.919-6.919v-42.162c0-3.822,3.099-6.919,6.919-6.919C171.198,298.51,174.297,301.607,174.297,305.429z
	 M174.297,164.409v42.16c0,3.822-3.099,6.919-6.919,6.919s-6.919-3.097-6.919-6.919v-42.16c0-3.822,3.099-6.919,6.919-6.919
	C171.198,157.49,174.297,160.587,174.297,164.409z M378.973,170.377c0,3.822-3.099,6.919-6.919,6.919H249.82
	c-3.82,0-6.919-3.097-6.919-6.919s3.099-6.919,6.919-6.919h122.234C375.874,163.458,378.973,166.555,378.973,170.377z
	 M378.973,227.458c0,3.822-3.099,6.919-6.919,6.919H249.82c-3.82,0-6.919-3.097-6.919-6.919s3.099-6.919,6.919-6.919h122.234
	C375.874,220.539,378.973,223.636,378.973,227.458z M378.973,284.539c0,3.822-3.099,6.919-6.919,6.919H249.82
	c-3.82,0-6.919-3.097-6.919-6.919c0-3.822,3.099-6.919,6.919-6.919h122.234C375.874,277.62,378.973,280.717,378.973,284.539z
	 M378.973,341.62c0,3.822-3.099,6.919-6.919,6.919H249.82c-3.82,0-6.919-3.097-6.919-6.919c0-3.822,3.099-6.919,6.919-6.919h122.234
	C375.874,334.702,378.973,337.798,378.973,341.62z"></path></svg>                                            <p className="font-normal">TechTribe</p>
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        {item.type === 'price' ? (
                                                            <>
                                                                <h3 className={`text-gray-900 text-sm font-medium ${valid ? '' : 'text-gray-500'}`}>
                                                                    Mã giảm {item.percent}% giảm tối đa {formatNumberVnd(item.maximum_reduction)}
                                                                </h3>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <h3 className={`text-gray-900 text-sm font-medium ${valid ? '' : 'text-gray-500'}`}>
                                                                    Mã hoàn xu {item.percent}% hoàn tối đa {formatNumberVnd(item.maximum_reduction)} xu
                                                                </h3>

                                                            </>
                                                        )}
                                                        <p className={`text-gray-600 text-sm ${valid ? '' : 'text-gray-400'}`}>
                                                            Đơn tối thiểu {formatNumberVnd(item.minimum_order_value)}
                                                        </p>
                                                        {item.id_product.length > 0 && (
                                                            <p className="text-[12px] text-red-400">Áp dụng cho sản phẩm nhất định</p>
                                                        )}
                                                        {item.maximum_total_usage > 1 ? (
                                                            <>
                                                                <p className={`text-primary/70 text-xs ${valid ? '' : 'text-gray-400'}`}>
                                                                    Còn lại : {item.maximum_total_usage}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className={`text-primary/70 text-xs ${valid ? '' : 'text-red-400'}`}>
                                                                    Đã hết lượt sử dụng
                                                                </p>
                                                            </>
                                                        )}
                                                        {checkStartTime(item.time_start) ? (
                                                            <>
                                                            <p className={`text-gray-400 text-sm ${valid ? '' : 'text-gray-300'}`}>
                                                                Ngày bắt đầu : {formatDate(item.time_start)}
                                                            </p>
                                                            </>
                                                        ) : (
                                                            <p className={`text-gray-400 text-sm ${valid ? '' : 'text-gray-300'}`}>
                                                                HSD: {formatDate(item.time_end)}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {itemsSubOrder?.voucherShopId?._id === item._id ? (
                                                        <>
                                                            <div className="text-sm p-2 rounded-lg text-green-400 bg-green-200">
                                                                Đang dùng
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {valid ? (
                                                                <div onClick={() => handleChooseVoucher(item)} className={`text-sm p-2 rounded-lg ${valid ? 'text-blue-400 bg-blue-400/20 cursor-pointer' : 'text-gray-400 bg-gray-200'}`}>
                                                                    Sử dụng
                                                                </div>
                                                            ) : (
                                                                <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2272%22%20height%3D%2256%22%20viewBox%3D%220%200%2072%2056%22%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Cpath%20id%3D%22ctqxsch3la%22%20d%3D%22M0%200H72V56H0z%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20id%3D%22yg7u4jt8zc%22%20d%3D%22M37.501%2050.4c-6.097%200-11.645-2.352-15.786-6.199h1.822C27.336%2047.325%2032.2%2049.2%2037.501%2049.2s10.166-1.876%2013.965-5h1.822c-4.14%203.848-9.689%206.2-15.787%206.2zm0-46.4c6.61%200%2012.575%202.764%2016.8%207.2h-1.7c-3.94-3.72-9.254-6-15.1-6s-11.16%202.28-15.1%206h-1.7c4.226-4.436%2010.19-7.2%2016.8-7.2z%22%2F%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20transform%3D%22translate%28-3364%20-2553%29%20translate%283200%2080%29%20translate%2852%202285%29%20translate%280%20140%29%20translate%28112%29%20translate%280%2048%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22zk75xhggtb%22%20fill%3D%22%23fff%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23ctqxsch3la%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fmask%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20mask%3D%22url%28%23zk75xhggtb%29%22%20opacity%3D%22.6%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20transform%3D%22translate%28-1%201%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20fill%3D%22%23787878%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20fill-rule%3D%22nonzero%22%20d%3D%22M8.422%2012.819c1.729%200%202.935-.996%203.1-2.569h-1.435c-.156.835-.786%201.348-1.66%201.348-1.128%200-1.836-.928-1.836-2.431%200-1.485.718-2.417%201.831-2.417.86%200%201.524.566%201.66%201.43h1.436c-.112-1.577-1.401-2.651-3.096-2.651-2.04%200-3.335%201.372-3.335%203.642%200%202.276%201.284%203.648%203.335%203.648zm5.484-.122V9.728h3.173v2.969h1.475V5.65H17.08v2.861h-3.173V5.651H12.43v7.046h1.475zm8.774.122c1.782%200%202.95-1.035%202.95-2.612V6.593h.463c.689%200%201.109-.38%201.109-1.04V4.386h-1.128v.889c0%20.249-.137.376-.391.376h-1.528v4.414c0%20.928-.557%201.49-1.475%201.49s-1.48-.562-1.48-1.49V5.651h-1.474v4.556c0%201.577%201.172%202.612%202.954%202.612zm6.28-.122l.536-1.71h2.476l.537%201.71h1.568L31.625%205.65h-1.733l-2.446%207.046h1.513zm2.695-2.813h-1.841L30.717%207h.034l.904%202.885zm8.276%202.813v-5.83h2.041V5.65H36.42v1.216h2.036v5.83h1.475zm4.331%200V9.728h3.174v2.969h1.475V5.65h-1.475v2.861h-3.174V5.651h-1.475v7.046h1.475zm9%20.122c2.084%200%203.398-1.402%203.398-3.643%200-2.246-1.314-3.647-3.399-3.647-2.09%200-3.398%201.401-3.398%203.647%200%202.241%201.308%203.643%203.398%203.643zm0-1.235c-1.158%200-1.895-.933-1.895-2.408%200-1.48.742-2.417%201.894-2.417s1.89.938%201.89%202.417c0%201.475-.738%202.408-1.89%202.408zm7.245-6.27c.571-.244.918-.654.918-1.104%200-.595-.464-.971-1.157-.971-.225%200-.523.049-.698.127V4c.141-.058.327-.092.493-.092.293%200%20.498.156.498.37%200%20.23-.156.406-.464.538l.41.498zm-1.836%207.383l.537-1.71h2.476l.537%201.71h1.567l-2.45-7.046h-1.734l-2.446%207.046h1.513zm2.696-2.813h-1.841L60.429%207h.034l.904%202.885zm-43.05%2012.813c1.691%200%202.687-1.051%202.687-2.84%200-1.79-.996-2.797-2.687-2.797h-2.153v2.34h-.457v.867h.457v2.43h2.153zm-.14-.977h-.833v-1.453h1.027V19.4h-1.027v-1.367h.832c1.04%200%201.625.648%201.625%201.828%200%201.219-.57%201.86-1.625%201.86zm4.769.977V17.06h-1.18v5.637h1.18zm4.246-7.336l-.723-.969h-.96l.839.969h.844zm-2.055%201.328l.598-.652h.031l.598.652h.886l-1.047-1.102h-.906L24.25%2016.69h.887zm2.48%206.008v-.977h-2.554v-1.422h2.41v-.906h-2.41v-1.36h2.555v-.972h-3.735v5.637h3.735zm3.215.097c1.442%200%202.36-.847%202.36-2.09V17.06h-1.18v3.527c0%20.723-.426%201.196-1.18%201.196-.757%200-1.183-.473-1.183-1.196V17.06h-1.18v3.645c0%201.242.918%202.09%202.363%202.09zm6.059-.097v-1.723l.527-.633%201.672%202.356h1.41l-2.23-3.137%202.086-2.5h-1.313l-2.117%202.57h-.035v-2.57h-1.18v5.637h1.18zm5.285%200V17.06h-1.18v5.637h1.18zm2.219-6.067l.57-.722h.031l.57.722h.856l-1.004-1.21h-.875l-1.004%201.21h.856zm2.453%206.067v-.977h-2.555v-1.422h2.41v-.906h-2.41v-1.36h2.555v-.972h-3.734v5.637h3.734zm-1.871%201.648c.332%200%20.594-.265.594-.586%200-.324-.262-.586-.594-.586-.332%200-.594.262-.594.586%200%20.32.262.586.594.586zm3.851-1.648v-3.692h.036l2.636%203.692h.977V17.06h-1.129v3.672h-.031l-2.633-3.672H47.7v5.637h1.128z%22%20transform%3D%22rotate%28-15%2084.872%209.306%29%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M64.842.12H3.969c-.875%200-1.312.118-1.766.462-.417.315-.747.782-.97%201.37C1.01%202.541.92%203.108.907%204.151L.905%2024.79c0%201.236.085%201.853.328%202.495.223.589.553%201.056.97%201.37.454.344.89.463%201.766.463h60.873c.875%200%201.311-.119%201.766-.462.417-.315.747-.782.97-1.371.243-.642.327-1.259.327-2.495V4.447c0-1.236-.084-1.853-.327-2.495-.223-.588-.553-1.055-.97-1.37-.455-.344-.891-.463-1.766-.463zM3.635%201.12l61.36-.002c.702%200%20.959.073%201.223.282.216.17.381.414.496.732.142.39.191.77.191%201.807v21.359l-.005.504c-.016.671-.07.983-.186%201.302-.115.318-.28.562-.496.732-.264.209-.52.282-1.224.282H3.816l-.342-.007c-.454-.024-.665-.104-.882-.275-.215-.17-.38-.414-.496-.732-.128-.355-.18-.7-.19-1.54V3.94c0-1.038.049-1.417.19-1.807.115-.318.281-.562.496-.732.24-.19.475-.267%201.043-.28z%22%20transform%3D%22rotate%28-15%2084.872%209.306%29%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23787878%22%20transform%3D%22rotate%28-15%2037.501%2027.2%29%22%20xlink%3Ahref%3D%22%23yg7u4jt8zc%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E" alt="" />
                                                            )}
                                                        </>
                                                    )}

                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <EmptyVoucher />
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}
export default VoucherShop;