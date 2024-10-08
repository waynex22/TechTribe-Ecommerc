import { Link, useParams } from "react-router-dom";
import { useCancelOrderMutation, useGetOrderByIdQuery, useGetReturnOrderByItemOrderIdQuery, useUpdateItemsOrderMutation } from "src/redux/rtkQuery/order";
import { formatDate, formatDateAndTime } from "src/utils/formartDate";
import ItemDetail from "./itemDetail";
import Toast from "src/Components/toast/Toast";
import { ToastProps } from "src/Type";
import { useState } from "react";
import ModalRating from "./ModalRating";
import { useUpdateStatusTimeMutation } from "src/redux/rtkQuery/product-review";
import ModalAccept from "src/Components/modal/ModalAccept";
import OrderCancel from "./OrderCancel";
import SpinLoading from "src/Components/spinner/spinLoading";
import ModalReturn from "./ModalReturn";

const OrderDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [updateOrder] = useUpdateItemsOrderMutation();
    const [updateTime] = useUpdateStatusTimeMutation();
    const [cancelOrder] = useCancelOrderMutation();
    const [openModal, setOpenModal] = useState(false);
    const [openModalReturn, setOpenModalReturn] = useState(false);
    const [modalAccept , setModalAccept] = useState(false);
    const [modalAction , setModalAction] = useState<(() => void) | null>(null);
    const [toast, setToast] = useState<ToastProps | null>(null);
    const { data: order, isLoading, refetch } = useGetOrderByIdQuery(slug ? slug : '', { skip: !slug });
    const { data: returnOrder, isLoading: isLoadingReturn } = useGetReturnOrderByItemOrderIdQuery(slug as string, {
        skip: !slug
    });
    const handleUpdate = async (key: string) => {
        await updateOrder({ _id: order?._id, status: key });
        await updateTime({ id: order?._id, key: key, value: new Date() });
        setToast({ message: 'Cập nhật thành công', type: 'success', onClose: () => setToast(null) });
        refetch();
    }
    const handleCancelOrder = async () => {
        await cancelOrder({ _id: order?._id });
        await updateTime({ id: order?._id, key: 'user_cancel', value: new Date() });
        setToast({ message: 'Huỷ đơn hàng thành công', type: 'success', onClose: () => setToast(null) });
        refetch();
    }

    const openModalAccept = () => {
        setModalAccept(true);
        setModalAction(() => handleCancelOrder);
    }
    const handleConfirm = async () => {
        if (modalAction) {
          await modalAction();
        }
        setModalAccept(false);
      };
      const handleCancel = () => {
        setModalAccept(false);
      };
    const getKeyUpdateItem = (key: string) => {
        return order?.statusUpdate?.filter((item: any) => item.key === key).map((item: any) => item.value);
    }
    const checkRefuntOrder = (endDate: string) => {
        const now = new Date();
        const dateRefund = new Date(endDate);
        return now.getTime() < dateRefund.getTime();
    }
    const checkAuto = (key: string) => {
        return order?.statusUpdate?.some((item: any) => item.key === key);
    };
    if (isLoading) return <div className="w-full h-screen flex items-center justify-center"><SpinLoading loading={isLoading} /></div>
    return (
        <>
        <ModalAccept
          isOpen={modalAccept}
          message="Bạn có chắc muốn huỷ đơn hàng này"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
            {toast && <Toast message={toast.message} type={toast.type} onClose={toast.onClose} />}
            <div className="flex items-center justify-between border-b border-dashed p-4 bg-white rounded-lg">
                <Link to="/me/purchase" className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <p>Trở lại</p>
                </Link>
                <div className="flex items-center justify-between uppercase text-sm gap-2">
                    <p>Mã đơn hàng. 2TEX{order?._id.slice(0,6)}</p>
                    <div className="w-[1px] h-4 bg-gray-600"></div>
                    <p className="text-sm text-primary">{order?.status}</p>
                </div>
            </div>
            <div className="border-b border-dashed p-4 flex items-center justify-center bg-white rounded-lg">
                {order?.status === 'Đã huỷ' ?  (
                    <>
                    <OrderCancel />
                    </>
                ):
                (
                    <>
                    <div className="flex items-center justify-start">
                    <div className="flex flex-col items-start justify-start">
                        <div className="flex items-center ">
                            <div className="border p-4 border-green-400 rounded-full">
                                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="courier"><path fill="#ffb127" d="M13.998,61L2.015,61c-0.011-0.332-0.016-0.665-0.016-1c0-16.569,13.431-30,30-30s30,13.431,30,30
		c0,0.335-0.005,0.668-0.016,1l-11.984,0H13.998z"></path><path fill="#ffd55d" d="M10.181,39.421c3.362,8.031,14.755,18.991,51.792,19.557C61.433,42.884,48.224,30,31.998,30
		C23.399,30,15.651,33.624,10.181,39.421z"></path><rect width="36" height="22" x="13.998" y="40" fill="#b8bce1"></rect><path fill="#e2e7f7" d="M13.998,45.266c5.215,5.662,15.585,11.262,36,13.102V40h-36V45.266z"></path><ellipse cx="31.998" cy="16" fill="#f4c8ad" rx="12" ry="14"></ellipse><path fill="#fbdac2" d="M31.998,2c-2.486,0-4.796,0.882-6.711,2.392c-2.034,2.508-3.289,5.885-3.289,9.61
		c0,7.732,5.373,14,12,14c2.486,0,4.796-0.882,6.711-2.392c2.034-2.508,3.289-5.885,3.289-9.61C43.998,8.268,38.626,2,31.998,2z"></path><rect width="8" height="4" x="38.998" y="54" fill="#ffb127"></rect><path fill="#fc9b00" d="M43.998,15l-4.125-1.031c-5.17-1.293-10.579-1.291-15.748,0.005l-4.098,1.027L24.998,20
		c4.657-1.354,8.964-1.329,14,0l0,0l4.971-5H43.998z"></path><path fill="#ffb127" d="M39.873,13.969l4.081,1.02C43.509,7.731,38.333,2,31.998,2c-6.337,0-11.514,5.735-11.957,12.998
		l4.083-1.024C29.294,12.678,34.703,12.676,39.873,13.969z"></path><path fill="#ffd55d" d="M43.609,12.543C42.29,6.485,37.601,2,31.998,2c-2.219,0-4.289,0.715-6.069,1.94
		c-1.283,1.686-1.927,3.578-2.249,5.125c-0.305,1.468,0.969,2.807,2.446,2.552C34.243,10.215,40.86,11.724,43.609,12.543z"></path><ellipse cx="37.699" cy="6.217" fill="#fff" rx="1.391" ry="3.144" transform="rotate(-50.119 37.697 6.216)"></ellipse><ellipse cx="43.955" cy="35.604" fill="#fff" rx="1.727" ry="3.903" transform="rotate(-63.596 43.956 35.603)"></ellipse><path fill="#ffd55d" d="M38.998,56.855c2.311,0.443,4.794,0.829,7.468,1.145h0.532v-4h-8V56.855z"></path><path fill="#fff" d="M47.504 44.489H31.895c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5h15.609c.829 0 1.5.671 1.5 1.5S48.333 44.489 47.504 44.489zM27.745 44.489h-3.484c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5h3.484c.829 0 1.5.671 1.5 1.5S28.574 44.489 27.745 44.489z"></path><g><path d="M38.998,59h8c0.552,0,1-0.447,1-1v-4c0-0.553-0.448-1-1-1h-8c-0.552,0-1,0.447-1,1v4C37.998,58.553,38.446,59,38.998,59z
		 M39.998,55h6v2h-6V55z"></path><path d="M37.598,29.516c4.369-2.42,7.4-7.561,7.4-13.516c0-8.271-5.832-15-13-15s-13,6.729-13,15c0,5.956,3.031,11.096,7.4,13.516
		C11.97,32.161,0.998,44.819,0.998,60c0,0.346,0.005,0.689,0.017,1.032c0.018,0.539,0.46,0.968,1,0.968h10.984c0,0.553,0.448,1,1,1
		h36c0.552,0,1-0.447,1-1h10.984c0.54,0,0.982-0.429,1-0.968c0.011-0.343,0.017-0.687,0.017-1.032
		C62.998,44.819,52.026,32.161,37.598,29.516z M31.998,3c5.392,0,9.881,4.613,10.814,10.672l-2.696-0.674
		c-5.312-1.327-10.925-1.325-16.234,0.005l-2.698,0.676C22.113,7.617,26.604,3,31.998,3z M42.025,15.538l-3.333,3.352
		c-4.812-1.191-8.993-1.195-13.398-0.011l-3.317-3.335l2.391-0.599c4.992-1.253,10.27-1.253,15.263-0.005L42.025,15.538z
		 M21.074,17.472l3.215,3.233C24.48,20.896,24.736,21,24.998,21c0.093,0,0.187-0.013,0.279-0.04
		c4.422-1.287,8.575-1.284,13.466,0.006c0.344,0.091,0.713-0.008,0.964-0.262l3.216-3.234C42.302,23.948,37.642,29,31.998,29
		C26.355,29,21.695,23.949,21.074,17.472z M48.998,61h-34V41h34V61z M50.998,60V40c0-0.553-0.448-1-1-1h-36c-0.552,0-1,0.447-1,1v20
		h-10c0-15.99,13.009-29,29-29s29,13.01,29,29H50.998z"></path></g></svg>
                            </div>
                            <div className={`w-[150px] h-[1px] bg-green-400 `}></div>
                        </div>
                        <div className="min-h-[100px]">
                            <p className="text-gray-800 text-sm font-normal">Đơn hàng đã đặt</p>
                            <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(order?.created)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-start">
                    <div className="flex flex-col items-start justify-start">
                        <div className="flex items-center">
                            <div className={`border  p-4 rounded-full ${order?.status !== 'Chờ xác nhận' && order?.status !== 'Đã huỷ' ? 'border-green-400' : 'border-gray-200'}`}>
                                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="favorite-store"><rect width="21.5" height="15.5" x="1.25" y="7.25" fill="#aff9f7" rx="2.75"></rect><circle cx="17" cy="7" r="5.75" fill="#13e4ea"></circle><path fill="#13e4ea" d="M18.7,10.186a.748.748,0,0,1-.379-.1L17,9.311l-1.319.772a.751.751,0,0,1-1.1-.842l.408-1.512L13.934,6.712a.75.75,0,0,1,.521-1.289H15.7l.641-1.21a.781.781,0,0,1,1.326,0l.641,1.21h1.241a.75.75,0,0,1,.521,1.289L19.015,7.729l.408,1.512a.751.751,0,0,1-.725.945ZM17,7.692a.754.754,0,0,1,.379.1l.119.07-.047-.172a.752.752,0,0,1,.2-.734l.052-.05a.752.752,0,0,1-.517-.384L17,6.166l-.189.358a.752.752,0,0,1-.517.384l.052.05a.752.752,0,0,1,.2.734l-.047.172.119-.07A.754.754,0,0,1,17,7.692Z"></path><path fill="#aff9f7" d="M9 12.75H6a.75.75 0 010-1.5H9a.75.75 0 010 1.5zM12 15.75H6a.75.75 0 010-1.5h6a.75.75 0 010 1.5z"></path><rect width="21.5" height="15.5" x="1.25" y="7.25" fill="#13e4ea" rx="2.75"></rect><circle cx="17" cy="7" r="5" fill="#13e4ea"></circle><path fill="#fff" d="M19.95,5.992a.683.683,0,0,0-.633-.427h-1.13l-.583-1.1a.711.711,0,0,0-1.208,0l-.583,1.1h-1.13a.683.683,0,0,0-.475,1.174l.958.926-.372,1.377a.683.683,0,0,0,1,.767l1.2-.7,1.2.7a.683.683,0,0,0,1-.767l-.372-1.377.958-.926A.683.683,0,0,0,19.95,5.992Z"></path><path fill="#aff9f7" d="M9 12.75H6a.75.75 0 010-1.5H9a.75.75 0 010 1.5zM12 15.75H6a.75.75 0 010-1.5h6a.75.75 0 010 1.5z"></path><line x1="9" x2="10.1" y1="8" y2="8" fill="none" stroke="#007da1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><path fill="none" stroke="#007da1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.64,8.86A1.979,1.979,0,0,1,22,10V20a2.006,2.006,0,0,1-2,2H4a2.006,2.006,0,0,1-2-2V10A2.006,2.006,0,0,1,4,8H7"></path><circle cx="17" cy="7" r="5" fill="none" stroke="#007da1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><circle cx="6" cy="19" r="1" fill="#aff9f7"></circle><circle cx="9" cy="19" r="1" fill="#aff9f7"></circle><circle cx="12" cy="19" r="1" fill="#aff9f7"></circle><circle cx="15" cy="19" r="1" fill="#aff9f7"></circle><circle cx="18" cy="19" r="1" fill="#aff9f7"></circle></svg>
                            </div>
                            <div className={`w-[150px] h-[1px] ${order?.status !== 'Chờ xác nhận' && order?.status !== 'Đã huỷ' ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="min-h-[100px]">
                            {order?.status !== 'Chờ xác nhận' && order?.status !== 'Đã huỷ' && (
                                <>
                                    <p className="text-gray-800 text-sm font-normal">Đã xác nhận</p>
                                    <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(getKeyUpdateItem('Xác nhận')[0])}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-start justify-start">
                        <div className="flex items-center">
                            <div className={`border p-4 rounded-full ${order?.statusShipping ? 'border-green-400' : 'border-gray-200'}`}>
                                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="plane-shipping"><g><rect width="15.39" height="15.66" x="44.03" y="43.86" fill="#ffcb74"></rect><polygon fill="#ffab40" points="54.46 48.91 51.72 46.98 48.96 48.91 48.96 43.85 54.46 43.85 54.46 48.91"></polygon><path fill="#999" d="M22.67,24.58,29,30.92l4.61-2.75,8.22-.09L56.1,14.42S63.75,9.06,57.42,5s-12.34,5.26-12.34,5.26L32,23.42l-6.64-2Z"></path><path fill="#393e46" d="M57.42,5l-5.61,5s-4.75-1.71-3.5-3.07S53.08,2.23,57.42,5Z"></path><polygon fill="#d6d6d6" points="46.56 14.22 56.88 31.25 51.75 36.25 41.05 20 46.56 14.22"></polygon><polygon fill="#d6d6d6" points="23.82 12.48 27.92 8.25 43.88 11.46 38.75 17 23.82 12.48"></polygon><path d="M44.59 26.73l7 9.89a1 1 0 0 0 .74.42h.08a1 1 0 0 0 .71-.29l4.48-4.48A1 1 0 0 0 57.74 31l-6.6-10.92 8.16-8.23a4.79 4.79 0 0 0 0-6.76c-3.21-3.2-7.73-2.83-11.52 1h0l-.56.56h0l-3.69 3.68L28.11 7.28a1 1 0 0 0-.9.28L22.76 12a1 1 0 0 0-.26 1 1 1 0 0 0 .71.71l13.41 3.57-4.69 4.69-6.2-1.55a1 1 0 0 0-.95.26l-3.09 3.08a1 1 0 0 0-.29.71 1 1 0 0 0 .29.71l6.66 6.66a1 1 0 0 0 1.27.12L34 29l7.8.18a1 1 0 0 0 .73-.3zM56 5.29l-3 3a1.92 1.92 0 0 1-2.7 0l-.94-1C51.17 5.6 53.66 4.4 56 5.29zm-30.6 6.9l2.84-2.84 13.59 2.7-3.57 3.57zm16 15L33.68 27a1.09 1.09 0 0 0-.58.17l-3.92 2.68-5.36-5.37 2-2L32 24a1 1 0 0 0 1-.26l15-15 1 1a3.91 3.91 0 0 0 5.52 0L57.72 6.4c.06 0 .12.09.18.15a2.72 2.72 0 0 1 .8 2 2.77 2.77 0 0 1-.81 2l-7.81 7.87-3-4.89a1 1 0 1 0-1.71 1L55.63 31.41l-3.1 3.09L42.1 19.72a1 1 0 1 0-1.64 1.16l3 4.19zM9.74 43.91a1 1 0 0 0 .71-.29L23.11 31a1 1 0 0 0-1.42-1.42L9 42.2a1 1 0 0 0 0 1.42A1 1 0 0 0 9.74 43.91zM18.53 50.13a1 1 0 0 0 .71.29 1 1 0 0 0 .7-.29L32.6 37.47a1 1 0 1 0-1.41-1.41L18.53 48.71A1 1 0 0 0 18.53 50.13zM28.21 32.13a1 1 0 0 0-1.42 0L3.22 55.69a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29L28.21 33.54A1 1 0 0 0 28.21 32.13zM39 37.61L18.41 58.16a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29L40.38 39A1 1 0 0 0 39 37.61zM58.7 41.86h-14A2.71 2.71 0 0 0 42 44.57V58.51a3 3 0 0 0 3 3H58.42a3 3 0 0 0 3-3V44.57A2.71 2.71 0 0 0 58.7 41.86zm-8.72 2h3.69V47l-1.24-.88a1 1 0 0 0-1.15 0L50 47zm9.44 14.65a1 1 0 0 1-1 1H45a1 1 0 0 1-1-1V44.57a.71.71 0 0 1 .71-.71H48v5a1 1 0 0 0 1.58.82l2.29-1.6 2.24 1.59a1 1 0 0 0 1 .08 1 1 0 0 0 .54-.89v-5h3a.71.71 0 0 1 .72.71z"></path></g></svg>
                            </div>
                            <div className={`w-[150px] h-[1px] ${order?.statusShipping ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="min-h-[100px]">
                            {order?.statusShipping && (
                                <>
                                    <p className="text-gray-800 text-sm font-normal">Giao cho DVVC</p>
                                    <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(getKeyUpdateItem('Đã gửi hàng')[0])}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-start">
                    <div className="flex flex-col items-start justify-start">
                        <div className="flex items-center">
                            <div className={`border p-4 rounded-full ${order?.statusShipping === 'Đã giao hàng' ? 'border-green-400' : 'border-gray-200'}`}>
                                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="box"><path fill="#ffd164" d="M45,12.94V40a5,5,0,0,1-5,5H8a5,5,0,0,1-5-5V12.94a4.945,4.945,0,0,1,.53-2.23L6.55,4.66A2.992,2.992,0,0,1,9.24,3H38.76a2.992,2.992,0,0,1,2.69,1.66l3.02,6.05A4.945,4.945,0,0,1,45,12.94Z"></path><path fill="#fff2b4" d="M29,27a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1H19a1,1,0,0,0-1,1V26a1,1,0,0,0,1.515.857L24,24.166l4.485,2.691A1,1,0,0,0,29,27Z"></path><path fill="#fdb441" d="M45,12.94V13H3v-.06a4.945,4.945,0,0,1,.53-2.23L6.55,4.66A2.992,2.992,0,0,1,9.24,3H38.76a2.992,2.992,0,0,1,2.69,1.66l3.02,6.05A4.945,4.945,0,0,1,45,12.94Z"></path><rect width="12" height="6" x="26" y="34" fill="#f9f6f6" rx="1"></rect><polygon fill="#f2e3a2" points="30 13 18.01 13 18.83 3 29.17 3 30 13"></polygon><path fill="#232323" d="M19,13H4a1,1,0,0,1,0-2H18.91a1.039,1.039,0,0,1,1.045,1A.962.962,0,0,1,19,13Z"></path><path fill="#232323" d="M30,13H18a1,1,0,0,1-.97-1.242l2-8A1,1,0,0,1,20,3h8a1,1,0,0,1,.97.758l2,8A1,1,0,0,1,30,13ZM19.281,11h9.438l-1.5-6H20.781Z"></path><path fill="#232323" d="M30,28a1.006,1.006,0,0,1-.555-.168L24,24.2l-5.445,3.63A1,1,0,0,1,17,27V12a1,1,0,0,1,1-1H30a1,1,0,0,1,1,1V27a1,1,0,0,1-1,1Zm-6-6a1,1,0,0,1,.555.168L29,25.132V13H19V25.132l4.445-2.964A1,1,0,0,1,24,22Z"></path><path fill="#232323" d="M40,45H8a5.006,5.006,0,0,1-5-5V12.944a5.028,5.028,0,0,1,.528-2.236l3.025-6.05A2.984,2.984,0,0,1,9.236,3H38.764a2.984,2.984,0,0,1,2.683,1.658l3.025,6.05A5.028,5.028,0,0,1,45,12.944V40A5.006,5.006,0,0,1,40,45ZM9.236,5a.994.994,0,0,0-.894.553L5.317,11.6A3,3,0,0,0,5,12.944V40a3,3,0,0,0,3,3H40a3,3,0,0,0,3-3V12.944a3,3,0,0,0-.317-1.341l-3.025-6.05A.994.994,0,0,0,38.764,5Z"></path><path fill="#232323" d="M44,13H33.09a1.039,1.039,0,0,1-1.045-1A.962.962,0,0,1,33,11H44a1,1,0,0,1,0,2Z"></path></svg>
                            </div>
                            <div className={`w-[150px] h-[1px] ${order?.statusShipping === 'Đã giao hàng' ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="min-h-[100px]">
                            {order?.statusShipping === 'Đã giao hàng' && (
                                <>
                                    <p className="text-gray-800 text-sm font-normal">Đã nhận hàng</p>
                                    <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(getKeyUpdateItem('Đã giao hàng')[0])}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-start">
                    <div className="flex flex-col items-start justify-start">
                        <div className="flex items-center">
                            <div className={`border p-4 rounded-full ${order?.rateDate === true ? 'border-green-400' : 'border-gray-200'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" id="star"><g fill="#fff" transform="translate(5 -1031.362)"><circle cx="8" cy="1044.362" r="13" fill="#ffa40b" fill-rule="evenodd"></circle><path fill="#ff7712" className="leading-normal indent-0 text-left no-underline decoration-solid decoration-black normal-case isolate mix-blend-normal list-none"
                                    d="M14.152 25.94a13 13 0 0 0 1.057-.13 13 13 0 0 0 1.268-.285 13 13 0 0 0 1.234-.408 13 13 0 0 0 1.185-.531 13 13 0 0 0 1.127-.647 13 13 0 0 0 1.057-.755 13 13 0 0 0 .977-.858 13 13 0 0 0 .886-.951 13 13 0 0 0 .786-1.035 13 13 0 0 0 .68-1.108 13 13 0 0 0 .566-1.17 13 13 0 0 0 .445-1.22 13 13 0 0 0 .32-1.26 13 13 0 0 0 .05-.328l-5.005-5.004c-.005-.005-.012-.006-.017-.012a1.183 1.183 0 0 0-.315-.199 3.325 3.325 0 0 0-.625-.209c-.465-.114-1.032-.2-1.605-.28-.012 0-.022-.001-.034-.003l-4.582-4.582c-.028-.029-.068-.05-.101-.076-.032-.026-.059-.053-.096-.075-.019-.01-.04-.018-.06-.027a.713.713 0 0 0-.301-.068c-.334 0-.504.174-.647.324-.142.15-.264.326-.39.53-.253.405-.51.916-.764 1.435-.253.519-.5 1.045-.71 1.453-.106.204-.203.38-.28.502-.046.072-.09.124-.11.148a1.2 1.2 0 0 1-.175.055 6.969 6.969 0 0 1-.567.102c-.455.066-1.035.128-1.61.199-.574.07-1.142.147-1.609.254-.233.053-.44.111-.628.197-.189.086-.412.188-.518.504-.106.315.01.531.11.713.098.181.23.352.384.535.19.224.415.462.658.705l2.102 2.102.039.054c.001.032.005.1-.002.184-.012.144-.04.342-.078.568-.078.453-.196 1.02-.307 1.586-.11.567-.213 1.132-.256 1.608-.02.237-.029.45-.005.656.01.094.027.195.062.297a.694.694 0 0 0 .147.242c.007.008.007.017.015.025l6.242 6.242z" color="#000" font-family="sans-serif" font-weight="400" transform="translate(-5 1031.362)"></path><path className="leading-normal indent-0 text-left no-underline decoration-black normal-case isolate-auto mix-blend-normal list-none"
                                        d="M78.804 1014.566c-.313 0-.471.179-.605.333a3.343 3.343 0 0 0-.366.545c-.237.418-.478.945-.715 1.48-.237.534-.468 1.075-.665 1.496-.099.21-.19.39-.262.516-.043.074-.084.126-.103.152-.029.012-.087.038-.165.058-.132.034-.317.07-.53.104-.427.068-.969.132-1.507.205-.538.072-1.07.151-1.507.261a2.864 2.864 0 0 0-.59.204c-.176.088-.384.194-.483.519-.099.325.01.546.103.733.092.187.214.363.359.551.289.376.671.79 1.062 1.203.39.412.788.82 1.092 1.156.151.167.28.318.367.432.05.067.083.127.1.155 0 .033.005.102-.001.19a7.936 7.936 0 0 1-.074.584c-.072.466-.184 1.051-.288 1.635-.103.583-.199 1.163-.239 1.653-.02.245-.027.466-.005.677.022.212.05.461.3.665.252.203.477.159.668.12.191-.04.381-.112.589-.205.415-.185.893-.456 1.371-.736.478-.28.955-.568 1.34-.781.192-.107.362-.194.489-.25.074-.031.135-.047.164-.055.03.01.09.025.165.059.125.057.294.148.484.257.382.22.855.517 1.329.806.474.288.947.567 1.36.76.206.096.395.172.586.215.19.042.415.09.669-.109.254-.199.285-.448.31-.659.025-.21.02-.432.005-.677a18.65 18.65 0 0 0-.215-1.657c-.095-.586-.198-1.172-.264-1.64a7.942 7.942 0 0 1-.065-.586c-.005-.087 0-.156.003-.19.016-.026.05-.086.102-.152.088-.113.219-.261.373-.426.308-.33.712-.731 1.109-1.137.396-.405.785-.813 1.08-1.183.147-.186.27-.36.366-.545.096-.185.208-.404.114-.731-.095-.327-.301-.436-.476-.528a2.905 2.905 0 0 0-.586-.214c-.435-.117-.967-.206-1.504-.288-.537-.082-1.077-.156-1.503-.231a6.253 6.253 0 0 1-.529-.114c-.077-.022-.135-.049-.163-.06-.019-.027-.06-.08-.101-.154a7.515 7.515 0 0 1-.254-.521c-.191-.424-.414-.97-.643-1.508a17.777 17.777 0 0 0-.693-1.492 3.362 3.362 0 0 0-.359-.55c-.131-.157-.287-.342-.6-.345zm-.009 1.17c.05.073.098.136.162.254.195.355.423.868.648 1.397.225.53.448 1.077.652 1.53.102.225.198.427.294.599.095.172.164.31.34.453.176.143.317.174.495.224.178.049.382.09.609.131.454.081.997.155 1.524.235.528.081 1.041.17 1.408.268.122.033.19.064.27.095-.049.076-.089.145-.17.248-.249.313-.623.71-1.013 1.107-.39.399-.795.801-1.124 1.153-.165.176-.31.34-.43.492-.119.152-.218.267-.287.495-.07.227-.053.384-.041.585.012.2.039.426.074.676.07.498.174 1.087.267 1.662.093.575.175 1.138.203 1.552.009.136.003.217 0 .31-.08-.027-.153-.048-.268-.101-.347-.162-.807-.43-1.272-.713-.466-.284-.94-.582-1.348-.817a7.042 7.042 0 0 0-.559-.296c-.169-.077-.299-.145-.518-.147-.219 0-.35.064-.52.138-.17.075-.358.173-.563.286-.41.227-.89.518-1.36.793-.47.275-.932.534-1.282.69-.116.052-.188.071-.27.097-.001-.093-.006-.174.005-.31.034-.413.124-.975.226-1.548.101-.573.214-1.16.291-1.657a8.72 8.72 0 0 0 .084-.675c.015-.2.034-.357-.032-.586-.066-.229-.163-.345-.28-.5a7.74 7.74 0 0 0-.423-.499c-.323-.358-.723-.767-1.107-1.172a16.142 16.142 0 0 1-.995-1.125c-.081-.105-.12-.174-.167-.251.08-.03.149-.06.27-.091.369-.093.884-.172 1.413-.243.528-.071 1.072-.135 1.527-.208.228-.036.433-.075.611-.121s.32-.075.498-.215.25-.277.347-.447c.098-.17.197-.37.302-.594.21-.449.442-.992.675-1.518a17.34 17.34 0 0 1 .668-1.385c.066-.117.114-.179.166-.252z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="matrix(1.06795 0 0 .97117 -76.11 50.762)"></path></g></svg>
                            </div>
                        </div>
                        <div className="min-h-[100px]">
                            {order?.statusShipping === 'Đã giao hàng' && (
                                <>
                                    <p className="text-gray-800 text-sm font-normal">Đánh giá</p>
                                </>
                            )}
                            {order?.rateDate === true && (
                                <>
                                    <p className="text-gray-800 text-sm font-normal">Đã đánh giá</p>
                                    <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(getKeyUpdateItem('rateDate')[0])}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                    </>
                )}
            </div>
            {!order?.statusShipping && order.status !== 'Đã huỷ' && (
                <div className="bg-white p-4 rounded-lg border-b border-gray-200 border-dashed">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-[12px] text-gray-400 font-normal">Nếu quá 3 ngày đơn hàng chưa được xác nhận và gửi đi thì đơn hàng sẽ tự động huỷ</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                                <div onClick={openModalAccept} className="flex items-center cursor-pointer justify-center px-4 py-2 bg-white rounded-md border border-primary/40 text-primary/70 hover:bg-primary/50 hover:text-white">
                                    <p className="font-normal text-sm">Huỷ đơn</p>
                                </div>
                        </div>
                    </div>

                </div>
            )}
            {order?.statusShipping === 'Đã giao hàng' && (
                <div className="bg-white p-4 rounded-lg border-b border-gray-200 border-dashed">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            {order?.statusShipping === 'Đã giao hàng' && checkRefuntOrder(order?.DeliveryTime) && order?.status !== 'Hoàn thành' && order?.status !== 'Hoàn hàng' && (
                                <p className="text-[12px] text-gray-400 font-normal">Nếu hàng nhận được có vấn đề, bạn có thể gửi yêu cầu Trả hàng/Hoàn tiền trước {formatDate(order?.DeliveryTime)}</p>
                            )}
                            {order?.statusShipping === 'Đã giao hàng' && order?.rateDate === false && (
                                <p className="text-[12px] text-gray-400 font-normal">Đánh giá sản phẩm để có trải nghiệm tốt hơn và nhận được 200 xu</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            {order?.statusShipping === 'Đã giao hàng' && order?.status === 'Đang vận chuyển' && (
                                <div onClick={() => handleUpdate('Hoàn thành')} className="flex items-center cursor-pointer justify-center px-4 py-2 bg-red-500 rounded-md border border-red-600">
                                    <p className="text-white font-normal text-sm">Xác nhận hoàn thành đơn hàng</p>
                                </div>
                            )}
                            {order?.rateDate === false && (
                                <div onClick={() => setOpenModal(true)} className="flex items-center cursor-pointer justify-center px-4 py-2 bg-primary/80 rounded-md border border-primary">
                                    <p className="text-white font-normal text-sm">Đánh Giá</p>
                                </div>
                            )}
                            {order?.statusShipping === 'Đã giao hàng' && checkRefuntOrder(order?.DeliveryTime) && order?.status !== 'Hoàn hàng' && order?.status !== 'Hoàn thành' && (
                                <div onClick={() => setOpenModalReturn(true)} className="flex items-center cursor-pointer justify-center px-4 py-2 rounded-md border border-gray-400">
                                    <p className="font-normal text-sm"> Yêu Cầu Trả Hàng / Hoàn Tiền</p>
                                </div>
                            )}
                            {order?.status === 'Hoàn hàng' && (
                                <Link to={`/me/purchase/return/${order?._id}`} className="flex w-fit my-2 items-center cursor-pointer justify-center px-4 py-2 rounded-md border border-gray-400">
                                    <p className="font-normal text-sm">Xem chi tiết yêu cầu hoàn hàng</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white p-4 rounded-lg border-b border-gray-200 border-dashed">
                <div className="flex items-start justify-between gap-2 h-full">
                    <div className="w-[29%] font-normal flex flex-col space-y-1">
                        <h3>Địa chỉ nhận hàng</h3>
                        <p className="text-sm">{order?.customerId?.name}</p>
                        <p className="text-[12px] text-gray-400">(84+) {order?.orderId?.address?.phoneNumber}</p>
                        <p className="text-[12px] text-gray-400">{order?.orderId?.address?.address}, {order?.orderId?.address?.ward}, {order?.orderId?.address?.district}, {order?.orderId?.address?.province}</p>
                    </div>
                    <div className="h-full w-[1px] bg-gray-200"></div>
                    <div className="w-[50%]">
                        <ol className="relative border-s border-gray-200">
                            {order?.status === 'Đã huỷ' && order.statusShipping !== 'Giao không thành công' && (
                                <>
                                {checkAuto('auto_cancel') ? (
                                <>
                                <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-box"><rect width="60" height="46" x="2" y="9" fill="#ffc239" rx="1"></rect><path fill="#ffd55d" d="M61,9H9V26.456A21.543,21.543,0,0,0,30.544,48H62V10A1,1,0,0,0,61,9Z"></path><rect width="14" height="18" x="25" y="9" fill="#e8e4d8"></rect><rect width="20" height="12" x="38" y="39" fill="#e8e4d8"></rect><rect width="2" height="8" x="53" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="50" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="47" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="44" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="41" y="41" fill="#7a7b7d"></rect><rect width="2" height="2" x="5" y="38" fill="#fff"></rect><rect width="10" height="2" x="9" y="38" fill="#fff"></rect><rect width="9" height="2" x="5" y="42" fill="#fff"></rect><rect width="3" height="2" x="16" y="42" fill="#fff"></rect><rect width="2" height="2" x="5" y="46" fill="#fff"></rect><rect width="10" height="2" x="9" y="46" fill="#fff"></rect><rect width="9" height="2" x="5" y="50" fill="#fff"></rect><rect width="3" height="2" x="16" y="50" fill="#fff"></rect></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('auto_cancel')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Đã huỷ</p>
                                    <p className="text-sm font-normal text-gray-500 ">Đơn hàng đã huỷ vì không có phản hồi từ shop</p>
                                </li>
                                </>
                            ): (
                                <>
                                 <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-box"><rect width="60" height="46" x="2" y="9" fill="#ffc239" rx="1"></rect><path fill="#ffd55d" d="M61,9H9V26.456A21.543,21.543,0,0,0,30.544,48H62V10A1,1,0,0,0,61,9Z"></path><rect width="14" height="18" x="25" y="9" fill="#e8e4d8"></rect><rect width="20" height="12" x="38" y="39" fill="#e8e4d8"></rect><rect width="2" height="8" x="53" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="50" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="47" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="44" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="41" y="41" fill="#7a7b7d"></rect><rect width="2" height="2" x="5" y="38" fill="#fff"></rect><rect width="10" height="2" x="9" y="38" fill="#fff"></rect><rect width="9" height="2" x="5" y="42" fill="#fff"></rect><rect width="3" height="2" x="16" y="42" fill="#fff"></rect><rect width="2" height="2" x="5" y="46" fill="#fff"></rect><rect width="10" height="2" x="9" y="46" fill="#fff"></rect><rect width="9" height="2" x="5" y="50" fill="#fff"></rect><rect width="3" height="2" x="16" y="50" fill="#fff"></rect></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('user_cancel')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Đã huỷ</p>
                                    <p className="text-sm font-normal text-gray-500 ">Bạn đã huỷ đơn hàng này</p>
                                </li>
                                </>
                            )}
                                </>
                            )}
                            {order?.statusShipping === 'Giao không thành công' ? (
                                 <li className="ms-5">
                                 <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                     <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-box"><rect width="60" height="46" x="2" y="9" fill="#ffc239" rx="1"></rect><path fill="#ffd55d" d="M61,9H9V26.456A21.543,21.543,0,0,0,30.544,48H62V10A1,1,0,0,0,61,9Z"></path><rect width="14" height="18" x="25" y="9" fill="#e8e4d8"></rect><rect width="20" height="12" x="38" y="39" fill="#e8e4d8"></rect><rect width="2" height="8" x="53" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="50" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="47" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="44" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="41" y="41" fill="#7a7b7d"></rect><rect width="2" height="2" x="5" y="38" fill="#fff"></rect><rect width="10" height="2" x="9" y="38" fill="#fff"></rect><rect width="9" height="2" x="5" y="42" fill="#fff"></rect><rect width="3" height="2" x="16" y="42" fill="#fff"></rect><rect width="2" height="2" x="5" y="46" fill="#fff"></rect><rect width="10" height="2" x="9" y="46" fill="#fff"></rect><rect width="9" height="2" x="5" y="50" fill="#fff"></rect><rect width="3" height="2" x="16" y="50" fill="#fff"></rect></svg>
                                 </div>
                                 <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('Giao hàng không thành công')[0])}</time>
                                 <p className="text-sm font-semibold text-gray-900 ">Đã huỷ</p>
                                 <p className="text-sm font-normal text-gray-500 ">Đơn hàng đã huỷ vì đơn vị vận chuyển không thể liên lạc với bạn</p>
                             </li>
                            ):(
                                <>
                                
                                </>
                            )
                                }
                            {order?.status === 'Hoàn thành' && (
                                <>
                                {checkAuto('auto_success') ? (
                                    <>
                                    <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-box"><rect width="60" height="46" x="2" y="9" fill="#ffc239" rx="1"></rect><path fill="#ffd55d" d="M61,9H9V26.456A21.543,21.543,0,0,0,30.544,48H62V10A1,1,0,0,0,61,9Z"></path><rect width="14" height="18" x="25" y="9" fill="#e8e4d8"></rect><rect width="20" height="12" x="38" y="39" fill="#e8e4d8"></rect><rect width="2" height="8" x="53" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="50" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="47" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="44" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="41" y="41" fill="#7a7b7d"></rect><rect width="2" height="2" x="5" y="38" fill="#fff"></rect><rect width="10" height="2" x="9" y="38" fill="#fff"></rect><rect width="9" height="2" x="5" y="42" fill="#fff"></rect><rect width="3" height="2" x="16" y="42" fill="#fff"></rect><rect width="2" height="2" x="5" y="46" fill="#fff"></rect><rect width="10" height="2" x="9" y="46" fill="#fff"></rect><rect width="9" height="2" x="5" y="50" fill="#fff"></rect><rect width="3" height="2" x="16" y="50" fill="#fff"></rect></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('auto_success')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Hoàn thành</p>
                                    <p className="text-sm font-normal text-gray-500 ">Đơn hàng đã tự đánh dấu là thành công</p>
                                </li>
                                    </>
                                ):(
                                    <>
                                     <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-box"><rect width="60" height="46" x="2" y="9" fill="#ffc239" rx="1"></rect><path fill="#ffd55d" d="M61,9H9V26.456A21.543,21.543,0,0,0,30.544,48H62V10A1,1,0,0,0,61,9Z"></path><rect width="14" height="18" x="25" y="9" fill="#e8e4d8"></rect><rect width="20" height="12" x="38" y="39" fill="#e8e4d8"></rect><rect width="2" height="8" x="53" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="50" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="47" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="44" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="41" y="41" fill="#7a7b7d"></rect><rect width="2" height="2" x="5" y="38" fill="#fff"></rect><rect width="10" height="2" x="9" y="38" fill="#fff"></rect><rect width="9" height="2" x="5" y="42" fill="#fff"></rect><rect width="3" height="2" x="16" y="42" fill="#fff"></rect><rect width="2" height="2" x="5" y="46" fill="#fff"></rect><rect width="10" height="2" x="9" y="46" fill="#fff"></rect><rect width="9" height="2" x="5" y="50" fill="#fff"></rect><rect width="3" height="2" x="16" y="50" fill="#fff"></rect></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('Hoàn thành')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Hoàn thành</p>
                                    <p className="text-sm font-normal text-gray-500 ">Bạn đã xác nhận đơn hàng hoàn thành</p>
                                </li>
                                    </>
                                )}
                                </>
                            )}
                            {order?.status === 'Hoàn hàng' && (
                                <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-box"><rect width="60" height="46" x="2" y="9" fill="#ffc239" rx="1"></rect><path fill="#ffd55d" d="M61,9H9V26.456A21.543,21.543,0,0,0,30.544,48H62V10A1,1,0,0,0,61,9Z"></path><rect width="14" height="18" x="25" y="9" fill="#e8e4d8"></rect><rect width="20" height="12" x="38" y="39" fill="#e8e4d8"></rect><rect width="2" height="8" x="53" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="50" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="47" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="44" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="41" y="41" fill="#7a7b7d"></rect><rect width="2" height="2" x="5" y="38" fill="#fff"></rect><rect width="10" height="2" x="9" y="38" fill="#fff"></rect><rect width="9" height="2" x="5" y="42" fill="#fff"></rect><rect width="3" height="2" x="16" y="42" fill="#fff"></rect><rect width="2" height="2" x="5" y="46" fill="#fff"></rect><rect width="10" height="2" x="9" y="46" fill="#fff"></rect><rect width="9" height="2" x="5" y="50" fill="#fff"></rect><rect width="3" height="2" x="16" y="50" fill="#fff"></rect></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('Hoàn hàng')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Trả hàng</p>
                                    <p className="text-sm font-normal text-gray-500 ">Bạn đã gửi yêu cầu trả hàng hoàn tiền</p>
                                </li>

                            )}
                            {order?.statusShipping === 'Đã giao hàng' && (
                                <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="delivery"><path fill="#c1272d" d="M439.139,327.699l-65.156,49.61c-0.915,1.14-2.535,2.727-5.477,5.12c-2.868,2.334-7.724,5.977-14.566,10.076
	c-16.815,10.076-46.41,23.39-85.309,23.39c-16.84,0-35.422-2.495-55.47-8.829c-1.701-0.534-6.82-1.287-19.288,2.117l0.398,1.978
	c0.718,3.544,0.008,7.165-2,10.185c-2.007,3.018-5.069,5.073-8.624,5.786l-86.073,17.331c-0.902,0.183-1.802,0.271-2.689,0.271
	c-6.314,0-11.985-4.45-13.286-10.879l-17.333-86.08c-1.469-7.343,3.299-14.508,10.627-15.976l26.67-5.373
	c-0.535-2.504-0.815-5.064-0.815-7.663V162.368c-3.828-3.171-6.12-7.924-6.12-13.016c0-4.506,1.756-8.751,4.945-11.954
	c0.374-0.374,0.77-0.723,1.175-1.059v-25.917c0-20.177,16.419-36.592,36.601-36.592h92.398c2.917-4.068,7.648-6.566,12.816-6.566
	h12.649c5.164,0,9.89,2.494,12.812,6.566h92.401c20.183,0,36.602,16.415,36.602,36.592v25.913c3.828,3.171,6.12,7.924,6.12,13.016
	c0,4.507-1.757,8.752-4.946,11.954c-0.374,0.374-0.769,0.721-1.174,1.057v140.841l14.853-11.31
	c9.865-7.517,24.01-5.604,31.535,4.267C450.926,306.043,449.005,320.189,439.139,327.699z"></path><path fill="#e6a9ab" d="M258.055,292.853c0.9-0.143,1.798-0.302,2.69-0.487c0.019-0.004,0.039-0.006,0.058-0.01v15.215l-22.416,3.3
	l-1.415,0.208v-18.723c0.018,0.004,0.036,0.006,0.054,0.01c0.895,0.185,1.796,0.346,2.699,0.489c0.233,0.037,0.468,0.066,0.702,0.1
	c0.692,0.101,1.386,0.191,2.083,0.267c0.263,0.029,0.526,0.055,0.79,0.08c0.719,0.069,1.439,0.123,2.161,0.165
	c0.205,0.012,0.41,0.027,0.615,0.037c0.935,0.045,1.873,0.074,2.813,0.074c0.94,0,1.877-0.029,2.812-0.074
	c0.206-0.01,0.411-0.025,0.616-0.037c0.721-0.042,1.44-0.096,2.158-0.165c0.265-0.025,0.53-0.052,0.794-0.081
	c0.693-0.076,1.383-0.165,2.071-0.266C257.578,292.921,257.817,292.891,258.055,292.853z M239.705,178.028
	c0.262-0.042,0.526-0.074,0.788-0.113c0.647-0.094,1.295-0.179,1.946-0.25c0.312-0.035,0.625-0.066,0.938-0.095
	c0.638-0.06,1.277-0.108,1.917-0.147c0.284-0.017,0.567-0.038,0.851-0.052c0.912-0.042,1.826-0.07,2.743-0.07
	c0.917,0,1.832,0.027,2.744,0.07c0.282,0.013,0.564,0.034,0.846,0.051c0.643,0.039,1.284,0.087,1.923,0.148
	c0.311,0.029,0.621,0.06,0.931,0.095c0.656,0.072,1.31,0.158,1.963,0.252c0.256,0.037,0.513,0.069,0.769,0.11
	c0.899,0.142,1.794,0.302,2.686,0.487c0.018,0.004,0.036,0.006,0.053,0.01v-12.258v-10.201v-13.428v-10.201V83.067
	c0-0.749-0.145-1.471-0.431-2.147c-0.881-2.106-2.902-3.454-5.16-3.454h-12.649c-2.258,0-4.28,1.348-5.152,3.434
	c-0.294,0.695-0.439,1.417-0.439,2.168v49.371v10.201v13.428v10.201v12.258c0.02-0.004,0.041-0.007,0.061-0.011
	C237.92,178.329,238.811,178.17,239.705,178.028z M231.699,190.668c0.594-0.228,1.195-0.445,1.802-0.651
	c9.909-3.338,20.867-3.338,30.775,0l0.009,0.003c19.461,6.602,32.536,24.854,32.536,45.424c0,1.928-0.115,3.837-0.339,5.717
	c-2.17,18.173-14.567,33.724-32.21,39.703c-7.429,2.502-15.455,3.126-23.176,1.876c-2.574-0.417-5.115-1.043-7.59-1.876
	c-19.47-6.597-32.551-24.85-32.551-45.42c0-2.108,0.145-4.19,0.412-6.24C203.628,211.877,215.183,197.007,231.699,190.668z
	 M283.925,254.671c0-8.717-7.092-15.809-15.809-15.809s-15.809,7.092-15.809,15.809s7.092,15.809,15.809,15.809
	S283.925,263.388,283.925,254.671z M216.85,261.039c-1.992,1.991-1.992,5.221,0,7.212c0.995,0.996,2.3,1.494,3.606,1.494
	c1.305,0,2.611-0.498,3.606-1.494l57.635-57.634c1.992-1.992,1.992-5.221,0-7.213c-1.99-1.992-5.221-1.992-7.212,0L216.85,261.039z
	 M213.851,216.213c0,8.717,7.092,15.809,15.809,15.809c8.716,0,15.808-7.092,15.808-15.809c0-8.717-7.092-15.808-15.808-15.808
	C220.942,200.405,213.851,207.497,213.851,216.213z M389.452,155.241c0.579-0.317,1.084-0.696,1.53-1.141
	c1.264-1.27,1.965-2.959,1.965-4.748c0-2.447-1.332-4.7-3.476-5.879l-0.002-0.001c-0.99-0.549-2.103-0.834-3.236-0.834H271.004
	v13.428h115.229C387.367,156.066,388.481,155.78,389.452,155.241z M418.063,300.008l-65.267,49.697
	c-0.836,0.638-1.603,1.408-2.278,2.288l-1.854,2.422l-3.01-0.487c-0.846-0.138-1.607-0.204-2.328-0.204h-56.78l-0.743-10.146
	l7.178-1.057c7.922-1.172,13.424-8.572,12.259-16.496c-0.564-3.842-2.591-7.232-5.706-9.548c-2.893-2.15-6.4-3.115-9.964-2.792
	c-0.274,0.025-0.548,0.041-0.823,0.081l-17.743,2.613v0l-4.177,0.614l-40.643,5.986l-1.118-0.838c-0.23,0.046-0.477,0.096-0.74,0.15
	c-0.069,0.014-0.147,0.031-0.218,0.046c-0.202,0.042-0.406,0.084-0.625,0.131c-0.089,0.019-0.187,0.04-0.279,0.06
	c-0.211,0.045-0.424,0.091-0.65,0.14c-0.114,0.025-0.236,0.052-0.353,0.078c-0.218,0.048-0.437,0.096-0.667,0.148
	c-0.134,0.03-0.276,0.063-0.414,0.094c-0.222,0.051-0.446,0.102-0.678,0.156c-0.152,0.035-0.311,0.073-0.467,0.11
	c-0.236,0.055-0.473,0.112-0.717,0.17c-0.16,0.038-0.324,0.079-0.488,0.118c-0.252,0.061-0.505,0.123-0.765,0.188
	c-0.171,0.042-0.346,0.086-0.52,0.13c-0.259,0.065-0.521,0.131-0.787,0.199c-0.187,0.048-0.378,0.097-0.569,0.147
	c-0.266,0.069-0.536,0.14-0.809,0.212c-0.197,0.052-0.396,0.105-0.595,0.159c-0.278,0.074-0.558,0.151-0.842,0.229
	c-0.204,0.056-0.408,0.112-0.615,0.17c-0.285,0.079-0.575,0.161-0.866,0.243c-0.214,0.061-0.429,0.122-0.645,0.184
	c-0.295,0.085-0.593,0.172-0.893,0.261c-0.217,0.064-0.434,0.127-0.653,0.193c-0.304,0.091-0.612,0.185-0.92,0.279
	c-0.224,0.068-0.447,0.136-0.674,0.206c-0.312,0.097-0.628,0.197-0.944,0.297c-0.224,0.071-0.446,0.141-0.672,0.214
	c-0.328,0.105-0.66,0.215-0.991,0.324c-0.219,0.072-0.437,0.143-0.657,0.217c-0.347,0.116-0.697,0.237-1.047,0.357
	c-0.208,0.071-0.414,0.141-0.623,0.213c-0.387,0.135-0.777,0.274-1.167,0.414c-0.173,0.062-0.345,0.122-0.518,0.185
	c-0.494,0.18-0.99,0.364-1.487,0.551c-0.072,0.027-0.142,0.053-0.214,0.08c-0.57,0.216-1.141,0.437-1.712,0.663
	c-0.144,0.057-0.289,0.117-0.433,0.175c-0.423,0.17-0.847,0.34-1.27,0.515c-0.212,0.088-0.424,0.18-0.636,0.269
	c-0.355,0.15-0.711,0.299-1.065,0.453c-0.235,0.102-0.469,0.208-0.704,0.312c-0.33,0.146-0.66,0.291-0.988,0.441
	c-0.249,0.113-0.497,0.23-0.746,0.346c-0.31,0.144-0.621,0.288-0.929,0.436c-0.259,0.124-0.516,0.251-0.773,0.377
	c-0.296,0.145-0.592,0.29-0.886,0.438c-0.262,0.132-0.523,0.267-0.783,0.402c-0.285,0.147-0.571,0.295-0.853,0.446
	c-0.262,0.139-0.521,0.281-0.78,0.423c-0.276,0.151-0.552,0.303-0.826,0.457c-0.261,0.147-0.52,0.296-0.778,0.446
	c-0.267,0.154-0.532,0.31-0.796,0.467c-0.257,0.154-0.512,0.309-0.765,0.465c-0.259,0.159-0.515,0.32-0.77,0.482
	c-0.252,0.16-0.502,0.321-0.75,0.484c-0.249,0.163-0.495,0.328-0.739,0.494c-0.246,0.167-0.492,0.335-0.734,0.505
	c-0.238,0.167-0.473,0.337-0.707,0.507c-0.24,0.175-0.479,0.349-0.715,0.527c-0.08,0.06-0.157,0.122-0.237,0.183l2.346,11.653
	l9.591,47.604c6.866-1.83,12.666-2.748,17.353-2.748c2.717,0,5.058,0.308,7.017,0.926c45.624,14.413,82.988,7.317,106.301-1.173
	c24.819-9.039,39.805-21.514,42.953-24.658l0.156-0.83l2.125-1.456l65.195-49.641c5.395-4.106,6.444-11.841,2.339-17.243
	C431.189,296.948,423.455,295.901,418.063,300.008z M108.304,155.23l0.002,0.001c0.99,0.549,2.102,0.834,3.235,0.834h115.23v-13.428
	h-115.23c-1.134,0-2.247,0.285-3.218,0.825c-0.58,0.317-1.086,0.696-1.529,1.14c-1.265,1.271-1.966,2.96-1.966,4.75
	C104.829,151.799,106.161,154.052,108.304,155.23z"></path></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem(order?.statusShipping)[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Đã nhận hàng</p>
                                    <p className="text-sm font-normal text-gray-500 ">Đơn hàng giao thành công</p>
                                </li>
                            )}
                            {order?.status !== 'Chờ xác nhận' && order?.status !== 'Xác nhận' && order?.statusShipping && (
                                <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-truck"><defs><linearGradient id="c" x1="49" x2="49" y1="20" y2="48" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d6d6d6"></stop><stop offset="1" stop-color="#a1a1a1"></stop></linearGradient><linearGradient id="d" x1="46.44" x2="46.44" y1="24" y2="34" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#42bfff"></stop><stop offset="1" stop-color="#1174ac"></stop></linearGradient><linearGradient id="e" x1="21" x2="21" y1="11" y2="48" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffc033"></stop><stop offset="1" stop-color="#ef8e2e"></stop></linearGradient><linearGradient id="a" x1="48" x2="48" y1="41" y2="53" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#002237"></stop><stop offset="1" stop-color="#003352"></stop></linearGradient><linearGradient id="f" x1="14" x2="14" ></linearGradient><linearGradient id="b" x1="12.5" x2="15.5" y1="47" y2="47" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#000406"></stop><stop offset="1" stop-color="#001521"></stop></linearGradient><linearGradient id="g" x1="46.5" x2="49.5" ></linearGradient></defs><path fill="url(#c)" d="M56,32h-.22L53,20.76A1,1,0,0,0,52,20H38a1,1,0,0,0-1,1V47a1,1,0,0,0,1,1H56a5,5,0,0,0,5-5V37A5,5,0,0,0,56,32Z"></path><path fill="url(#d)" d="M51.85,32.76l-2-8a1,1,0,0,0-1-.76H42a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h8.88A1,1,0,0,0,51.85,32.76Z"></path><path fill="url(#e)" d="M38,11H4a1,1,0,0,0-1,1V43a5,5,0,0,0,5,5H38a1,1,0,0,0,1-1V12A1,1,0,0,0,38,11Z"></path><circle cx="48" cy="47" r="6" fill="url(#a)"></circle><circle cx="14" cy="47" r="6" fill="url(#f)"></circle><circle cx="14" cy="47" r="1.5" fill="url(#b)"></circle><circle cx="48" cy="47" r="1.5" fill="url(#g)"></circle><rect width="36" height="2" x="3" y="37" fill="#b2500d"></rect></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('Đã gửi hàng')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Đang giao hàng</p>
                                    <p className="text-sm font-normal text-gray-500 ">Bạn sẽ nhận được hàng từ 3 - 5 ngày</p>
                                </li>
                            )}
                            {order?.status !== 'Chờ xác nhận' && order?.statusShipping && (
                                <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" id="delivery-address"><g><path fill="#cd3650" d="M48.2,1A34.13,34.13,0,0,0,36.76,67.28L48.2,95,59.64,67.28A34.13,34.13,0,0,0,48.2,1Zm0,58.12a24,24,0,1,1,24-24A24,24,0,0,1,48.2,59.12Z"></path><path fill="#ff4f50" d="M45.94,1.08A31.46,31.46,0,0,0,36,61.45a15.64,15.64,0,0,1,3.54,2.11l5.23,4.1a5.59,5.59,0,0,0,6.92,0c5.65-4.43,6.41-5.21,8.85-6.24A31.47,31.47,0,0,0,45.94,1.08Zm2.26,58a24,24,0,1,1,24-24A24,24,0,0,1,48.2,59.12Z"></path><path fill="#ff776e" d="M24.05,23a27,27,0,0,1,48.29,0,1.28,1.28,0,0,0,1.13.71h0A1.27,1.27,0,0,0,74.66,22a28.46,28.46,0,0,0-52.93,0A1.27,1.27,0,0,0,24.05,23Z"></path><rect width="36.5" height="36.5" x="29.95" y="16.87" fill="#fe901e" rx="2.06"></rect><rect width="36.5" height="33.79" x="29.95" y="16.87" fill="#febd1e" rx="2.06"></rect><path fill="#fedb32" d="M62.63 26.64V45.55a1.3 1.3 0 01-1.29 1.3H35.06a1.29 1.29 0 01-1.28-1.3V26.64a1.28 1.28 0 011.28-1.29H61.34A1.29 1.29 0 0162.63 26.64zM66.45 18.9v3.52a1.85 1.85 0 00-1.85-1.85H31.8A1.85 1.85 0 0030 22.42V18.9a2 2 0 012-2H64.43A2 2 0 0166.45 18.9z"></path><polygon fill="#dcf0ff" points="54.48 31.43 48.2 29.14 41.92 31.43 41.92 16.88 54.48 16.88 54.48 31.43"></polygon><polygon fill="#fff" points="54.48 25.35 54.48 31.43 48.2 29.14 41.92 31.43 41.92 25.35 54.48 25.35"></polygon><rect width="12.55" height="3.7" x="41.93" y="16.88" fill="#fff"></rect><rect width="7.56" height="8.15" x="29.95" y="40.24" fill="#63799a"></rect><path fill="#6392bd" d="M37.51,40.25v6.6H35.06a1.29,1.29,0,0,1-1.28-1.3v-5.3Z"></path><path fill="#302d3d" d="M48,0A35.13,35.13,0,0,0,35.8,68.07L47.09,95.38a1,1,0,0,0,1.83,0L60.21,68.07A35.13,35.13,0,0,0,48,0Zm11.1,66.34a1,1,0,0,0-.58.56L48,92.38,37.48,66.9a1,1,0,0,0-.57-.56,33.11,33.11,0,1,1,22.2,0Z"></path><path fill="#302d3d" d="M67.26,19.18a3.12,3.12,0,0,0-3.3-3.3,25,25,0,0,0-31.91,0,3.11,3.11,0,0,0-3.29,3.3,25,25,0,0,0,0,31.88,3.13,3.13,0,0,0,3.33,3.32,24.93,24.93,0,0,0,31.83,0,3.14,3.14,0,0,0,3.34-3.32A25,25,0,0,0,67.26,19.18Zm-6.66-3.3H35.41A23,23,0,0,1,60.6,15.88Zm-17.88,2H53.29V30c-5-1.84-5-1.86-5.28-1.86s0-.08-5.29,1.86Zm-12,23.36h5.56V47.4H30.76Zm-2-18.69V47.7A22.94,22.94,0,0,1,28.76,22.55Zm6.69,31.83H60.57A23,23,0,0,1,35.45,54.38Zm-3.6-2a1.1,1.1,0,0,1-1.09-1.11V49.4h6.56a1,1,0,0,0,1-1V40.24a1,1,0,0,0-1-1H30.76V19a1.09,1.09,0,0,1,1.09-1.1h8.87V31.43a1,1,0,0,0,1.35.94L48,30.21,54,32.37a1,1,0,0,0,1.34-.94V17.88h8.87a1.1,1.1,0,0,1,1.1,1.1V51.27a1.11,1.11,0,0,1-1.1,1.11ZM67.26,22.55a23,23,0,0,1,0,25.15Z"></path><path fill="#302d3d" d="M62.05 39.24H57.76a1 1 0 000 2h4.29a1 1 0 000-2zM62.05 43.32H57.76a1 1 0 000 2h4.29a1 1 0 000-2zM62.05 47.4H57.76a1 1 0 000 2h4.29a1 1 0 000-2z"></path></g></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('Đã gửi hàng')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Gửi hàng thành công</p>
                                    <p className="text-sm font-normal text-gray-500 ">Đã gửi hàng cho đơn vị vận chuyển</p>
                                </li>
                            )}
                            {order?.status !== 'Chờ xác nhận' && order?.status !== 'Đã huỷ' && (
                                <li className="ms-5">
                                    <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery-box"><rect width="60" height="46" x="2" y="9" fill="#ffc239" rx="1"></rect><path fill="#ffd55d" d="M61,9H9V26.456A21.543,21.543,0,0,0,30.544,48H62V10A1,1,0,0,0,61,9Z"></path><rect width="14" height="18" x="25" y="9" fill="#e8e4d8"></rect><rect width="20" height="12" x="38" y="39" fill="#e8e4d8"></rect><rect width="2" height="8" x="53" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="50" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="47" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="44" y="41" fill="#7a7b7d"></rect><rect width="2" height="8" x="41" y="41" fill="#7a7b7d"></rect><rect width="2" height="2" x="5" y="38" fill="#fff"></rect><rect width="10" height="2" x="9" y="38" fill="#fff"></rect><rect width="9" height="2" x="5" y="42" fill="#fff"></rect><rect width="3" height="2" x="16" y="42" fill="#fff"></rect><rect width="2" height="2" x="5" y="46" fill="#fff"></rect><rect width="10" height="2" x="9" y="46" fill="#fff"></rect><rect width="9" height="2" x="5" y="50" fill="#fff"></rect><rect width="3" height="2" x="16" y="50" fill="#fff"></rect></svg>
                                    </div>
                                    <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(getKeyUpdateItem('Xác nhận')[0])}</time>
                                    <p className="text-sm font-semibold text-gray-900 ">Đang chuẩn bị</p>
                                    <p className="text-sm font-normal text-gray-500 ">Người bán đang chuẩn bị hàng</p>
                                </li>
                            )}
                            <li className="ms-5">
                                <div className="absolute w-fit h-fit p-2 bg-gray-100 rounded-full mt-1.5 -start-[18px] border border-white">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="confirm-order"><path fill="#f9a825" d="M5 12a1 1 0 0 0-1 1.21L6.68 25.63A3 3 0 0 0 9.62 28H16V12zM26.8 18.7L28 13.21A1 1 0 0 0 27 12H16V28h3.54a6 6 0 1 0 7.26-9.3z"></path><path fill="#ffee58" d="M4.5 9a2.5 2.5 0 0 0 0 5H16V9zM27.5 9H16v5H27.5a2.5 2.5 0 0 0 0-5z"></path><path fill="#f57f17" d="M25.88,2.73a2.56,2.56,0,0,0-3.53,0L16,9l-3.33,3.29L11,14h7.18l.3-.29L23.15,9l2.73-2.73a2.51,2.51,0,0,0,0-3.54ZM24.46,4.85,20.32,9l-3,3H15.81l3-3,4.91-4.85a.5.5,0,1,1,.7.7Z"></path><circle cx="24" cy="24" r="6" fill="#ff6f00"></circle><path fill="#f9a825" d="M23.53,26.71a1,1,0,0,1-.7-.29l-1.57-1.54a1,1,0,0,1,1.4-1.43l.86.84,1.8-1.85a1,1,0,0,1,1.44,1.39l-2.51,2.58a1,1,0,0,1-.71.3Z"></path><path fill="#fdd835" d="M11 18H10a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM15 16H14a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM19 18H18a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM11 21H10a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM15 19H14a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2z"></path><path fill="#fbc02d" d="M5,12a1,1,0,0,0-1,1.21L6.68,25.63A3,3,0,0,0,9.62,28H16V12Z"></path><path fill="#f9a825" d="M26.8,18.7,28,13.21A1,1,0,0,0,27,12H16V28h3.54a6,6,0,1,0,7.26-9.3Z"></path><path fill="#fff176" d="M4.5,9a2.5,2.5,0,0,0,0,5H16V9Z"></path><path fill="#ffee58" d="M27.5,9H16v5H27.5a2.5,2.5,0,0,0,0-5Z"></path><path fill="#f57f17" d="M25.88,2.73a2.56,2.56,0,0,0-3.53,0L16,9l-3.33,3.29L11,14h7.18l.3-.29L23.15,9l2.73-2.73a2.51,2.51,0,0,0,0-3.54ZM24.46,4.85,20.32,9l-3,3H15.81l.19-.19L18.85,9l4.91-4.85a.5.5,0,1,1,.7.7Z"></path><circle cx="24" cy="24" r="6" fill="#ff6f00"></circle><path fill="#fdd835" d="M23.53,26.71a1,1,0,0,1-.7-.29l-1.57-1.54a1,1,0,0,1,1.4-1.43l.86.84,1.8-1.85a1,1,0,0,1,1.44,1.39l-2.51,2.58a1,1,0,0,1-.71.3Z"></path><path fill="#ffee58" d="M11 18H10a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM15 16H14a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2z"></path><path fill="#fdd835" d="M19,18H18a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Z"></path><path fill="#ffee58" d="M11 21H10a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM15 19H14a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2z"></path><path fill="#f9a825" d="M16,9v5H11l1.71-1.71Z"></path></svg>
                                </div>
                                <time className="mb-1 text-[12px] font-normal leading-none text-gray-400 ">{formatDateAndTime(order?.created)}</time>
                                <p className="text-sm font-semibold text-gray-900 ">Đơn hàng đã được đặt</p>
                                <p className="text-sm font-normal text-gray-500 ">Đặt hàng thành công</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <ItemDetail item={order} />
            <ModalRating openModal={openModal} onClose={() => setOpenModal(false)} items={order} refecth={refetch} setToast={setToast} />
            <ModalReturn openModal={openModalReturn} onClose={() => setOpenModalReturn(false)} items={order} refecth={refetch} setToast={setToast} />
        </>
    )
}

export default OrderDetail