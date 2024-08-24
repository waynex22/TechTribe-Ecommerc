import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFollowMutation } from "src/redux/rtkQuery/shop";
import { setOpen, setShopSelected } from "src/redux/slices/chatSlice";
import { ToastProps } from "src/Type";
import Toast from "../toast/Toast";
import { useGetRatingByIdShopQuery } from "src/redux/rtkQuery/product-review";

interface Props {
    shop: any,
    refecth: () => void,
    countProduct: number
}
const InfoShop: React.FC<Props> = ({ shop , refecth , countProduct }) => {
    const { user } = useSelector((state: any) => state.auth);
    const [toast, setToast] = useState<ToastProps | null>(null);
    const [follow] = useFollowMutation();
    const dispatch = useDispatch();
    const {data: ratingShop} = useGetRatingByIdShopQuery(shop?._id);
    const handleSetToast = (toast: any) => {
        setToast({ ...toast, message: toast.message, type: toast.type, onClose: () => setToast(null) });
    }
    const handleChatClick = (shopId: string, shopName: string) => {
      if (!user) {
        handleSetToast({ message: 'Bạn cần đăng nhập để chat', type: "error" });
      } else {
        dispatch(setShopSelected({ shopId, shopName }));
        dispatch(setOpen(true));
      }
    };
    const handleFollow = async () => {
        if(!user) {
            handleSetToast({ message: ' bạn cần đăng nhập để theo dõi', type: "error" });
        }else{
            await follow({ customerId: user?.sub, shopId: shop?._id }).unwrap()
            refecth()
        }
    }
    return (
        <>
       {toast && <Toast message={toast.message} type={toast.type} onClose={toast.onClose} />}
            <div className="rounded-lg grid grid-cols-3 gap-10  p-4 bg-white">
                <div className="col-span-1 rounded-lg overflow-hidden bg-[url('https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-3840x2160-8324.png')] bg-cover bg-center">
                    <div className="bg-gray-800/10 backdrop-blur-[2px] p-4">
                        <div className="flex items-center justify-start gap-2 ">
                            <img
                                src={shop?.thumbnail}
                                alt=""
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-white">{shop?.name}</h2>
                                <p className="text-[12px] text-gray-200 ">{shop?.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-sm text-white mt-2 w-[80%] mx-auto">
                            { shop && shop?.follows?.includes(user?.sub) ? (
                                <>
                                    <button onClick={handleFollow} className="w-full py-1 border border-solid border-primary rounded-md flex items-center justify-center gap-2 text-primary">
                                        <p>Đang theo</p>
                                    </button>
                                </>
                            ) : (
                                <>
                                <button onClick={handleFollow} className="w-full py-1 border border-solid border-white rounded-md flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <p>Theo dõi</p>
                                    </button>
                                </>
                            )}

                            <button onClick={() => handleChatClick(shop?._id, shop?.name)} className="w-full py-1 border border-solid border-white rounded-md flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <p>CHAT</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex items-center gap-2">
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="online-store"><g><path fill="#f7fcff" d="M3 3h58v58H3z"></path><path fill="#facf5b" d="M18.916 33.795h26.526v.276l-4.421 12.25-16.947 1.934-5.158-14.46z"></path><path fill="#f0af4c" d="M27.1 42.965 23.827 33.8h-4.911l5.158 14.46 16.947-1.934 1.279-3.539-13.091 1.494a2 2 0 0 1-2.109-1.316Z"></path><path fill="#d7e6ef" d="M6 43V3H3v58h58v-3H21A15 15 0 0 1 6 43Z"></path><path fill="#eb2335" d="M3 3h58v8H3z"></path><path fill="#c02027" d="M6 3H3v8h58V8H11a5 5 0 0 1-5-5Z"></path><path fill="#545a6d" d="M3.161 11h9.344a.161.161 0 0 1 .161.161v10.006A4.833 4.833 0 0 1 7.833 26 4.833 4.833 0 0 1 3 21.167V11.161A.161.161 0 0 1 3.161 11Z"></path><path fill="#44394a" d="M10.833 24A4.833 4.833 0 0 1 6 19.167V11H3.161a.161.161 0 0 0-.161.161v10.006a4.831 4.831 0 0 0 8.817 2.733 4.837 4.837 0 0 1-.984.1Z"></path><path fill="#545a6d" d="M12.828 11h9.344a.161.161 0 0 1 .161.161v10.006A4.833 4.833 0 0 1 17.5 26a4.833 4.833 0 0 1-4.833-4.833V11.161a.161.161 0 0 1 .161-.161Z"></path><path fill="#44394a" d="M15.667 20.167V11h-2.839a.161.161 0 0 0-.161.161v10.006a4.81 4.81 0 0 0 7.756 3.825 4.828 4.828 0 0 1-4.756-4.825Z"></path><path fill="#545a6d" d="M22.494 11h9.344a.161.161 0 0 1 .161.161v10.006A4.833 4.833 0 0 1 27.167 26a4.833 4.833 0 0 1-4.833-4.833V11.161a.161.161 0 0 1 .16-.161zm9.667 0h9.344a.161.161 0 0 1 .161.161v10.006A4.833 4.833 0 0 1 36.833 26 4.833 4.833 0 0 1 32 21.167V11.161a.161.161 0 0 1 .161-.161zm9.667 0h9.344a.161.161 0 0 1 .161.161v10.006A4.833 4.833 0 0 1 46.5 26a4.833 4.833 0 0 1-4.833-4.833V11.161a.161.161 0 0 1 .161-.161zm9.666 0h9.344a.161.161 0 0 1 .161.161v10.006A4.833 4.833 0 0 1 56.167 26a4.833 4.833 0 0 1-4.833-4.833V11.161a.161.161 0 0 1 .16-.161z"></path><path fill="#44394a" d="M25.333 20.167V11h-2.839a.161.161 0 0 0-.161.161v10.006a4.81 4.81 0 0 0 7.757 3.825 4.829 4.829 0 0 1-4.757-4.825zm9.667 0V11h-2.839a.161.161 0 0 0-.161.161v10.006a4.81 4.81 0 0 0 7.757 3.825A4.829 4.829 0 0 1 35 20.167zm9.667 0V11h-2.839a.161.161 0 0 0-.161.161v10.006a4.81 4.81 0 0 0 7.756 3.825 4.828 4.828 0 0 1-4.756-4.825zm9.666 0V11h-2.839a.161.161 0 0 0-.161.161v10.006a4.81 4.81 0 0 0 7.757 3.825 4.829 4.829 0 0 1-4.757-4.825z"></path><circle cx="32" cy="38" r="1"></circle><path d="M61 2H3a1 1 0 0 0-1 1v58a1 1 0 0 0 1 1h58a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-1 19.167a3.834 3.834 0 0 1-7.667 0V12H60Zm-9.667 0a3.833 3.833 0 0 1-7.666 0V12h7.666Zm-9.666 0a3.834 3.834 0 0 1-7.667 0V12h7.667Zm-9.667 0a3.834 3.834 0 0 1-7.667 0V12H31Zm-9.667 0a3.833 3.833 0 1 1-7.666 0V12h7.666Zm-9.666 0a3.834 3.834 0 0 1-7.667 0V12h7.667ZM4 4h56v6H4Zm0 56V25.553a5.818 5.818 0 0 0 8.667-1.124 5.828 5.828 0 0 0 9.666 0 5.829 5.829 0 0 0 9.667 0 5.829 5.829 0 0 0 9.667 0 5.828 5.828 0 0 0 9.666 0A5.818 5.818 0 0 0 60 25.553V60Z"></path><circle cx="15" cy="7" r="1"></circle><circle cx="11" cy="7" r="1"></circle><circle cx="7" cy="7" r="1"></circle><path d="M26 8h12a1 1 0 0 0 0-2H26a1 1 0 0 0 0 2zm25 0h5a1 1 0 0 0 0-2h-5a1 1 0 0 0 0 2zm5.663 46.042a1 1 0 0 0 1-1V38.389a1 1 0 1 0-2 0v14.653a1 1 0 0 0 1 1z"></path><circle cx="56.663" cy="57.042" r="1"></circle><path d="M45.442 32.77H19.417l-1.03-2.986a1.081 1.081 0 0 0-.945-.674H14.5a1 1 0 1 0 0 2h2.234l7.136 20.7a1.057 1.057 0 0 0 .948.674h16.203a1 1 0 0 0 0-2h-15.5l-.466-1.354 16.079-1.84a1 1 0 0 0 .83-.661L46.385 34.1a1 1 0 0 0-.943-1.333Zm-5.156 12.6-15.9 1.815L21.565 39H29a1 1 0 0 0 0-2h-8.125l-.769-2.23h23.922L43.241 37H35a1 1 0 0 0 0 2h7.535Z"></path><circle cx="26.653" cy="56.268" r="1.842"></circle><circle cx="39.179" cy="56.268" r="1.842"></circle></g></svg>
                        <div className="flex items-center gap-1 font-normal">
                            <p className="text-sm text-gray-700">Sản phẩm:</p>
                            <p className="text-sm text-blue-500">{countProduct}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-10">
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="championship"><path fill="#98db7c" d="M31 11.2a1 1 0 0 0-.21-.83A1 1 0 0 0 30 10H2a1 1 0 0 0-.77.37 1 1 0 0 0-.23.83L2 16l-1 4.8a1 1 0 0 0 .21.83A1 1 0 0 0 2 22h28a1 1 0 0 0 .77-.37 1 1 0 0 0 .23-.83L30 16Z"></path><path fill="#82d361" d="M3 20.8 4 16l-1-4.8a1 1 0 0 1 .21-.83A1 1 0 0 1 4 10H2a1 1 0 0 0-.77.37 1 1 0 0 0-.23.83L2 16l-1 4.8a1 1 0 0 0 .21.83A1 1 0 0 0 2 22h2a1 1 0 0 1-.77-.37A1 1 0 0 1 3 20.8zM6 16a10.94 10.94 0 0 0 1.79 6h18.42a11 11 0 0 0 0-12H7.79A10.94 10.94 0 0 0 6 16z"></path><circle cx="16" cy="16" r="11" fill="#ff9838"></circle><path fill="#ff8709" d="M6 17a11 11 0 0 1 18.25-8.25 11 11 0 1 0-15.5 15.5A10.92 10.92 0 0 1 6 17Z"></path><path fill="#fff5f5" d="M21.91 14.5a1.85 1.85 0 0 0-1.76-1.28h-1.83l-.57-1.74a1.84 1.84 0 0 0-3.5 0l-.57 1.74h-1.83a1.85 1.85 0 0 0-1.09 3.34l1.48 1.07-.56 1.74a1.83 1.83 0 0 0 .67 2.06 1.8 1.8 0 0 0 1.08.36 1.91 1.91 0 0 0 1.09-.35L16 20.36l1.48 1.08a1.85 1.85 0 0 0 2.84-2.07l-.56-1.74 1.48-1.07a1.83 1.83 0 0 0 .67-2.06Z"></path><path fill="#efe2dd" d="M11.09 15.5a1.85 1.85 0 0 1 1.76-1.28h1.83l.57-1.74A1.82 1.82 0 0 1 17 11.21a2 2 0 0 1 .69.14 1.83 1.83 0 0 0-3.44.13l-.57 1.74h-1.83a1.85 1.85 0 0 0-1.09 3.34l.46.33a1.81 1.81 0 0 1-.13-1.39zm8.23-1.28h1.83a1.93 1.93 0 0 1 .69.15 1.83 1.83 0 0 0-1.69-1.15H19zm-6.64 6.15.56-1.74-1.07-.77-.49 1.51a1.83 1.83 0 0 0 .67 2.06 1.44 1.44 0 0 0 .39.2 1.81 1.81 0 0 1-.06-1.26z"></path></svg>
                        <div className="flex items-center gap-1 font-normal">
                            <p className="text-sm text-gray-700">Tham gia :</p>
                            <p className="text-sm text-blue-500">1 năm trước</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex items-center gap-2">
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="follower"><path fill="#7c8c97" d="M19.34,53H7.75A1.75,1.75,0,0,1,6,51.22v-3.9a4.48,4.48,0,0,1,2.93-4.23l6.24-2.24,6.69,4.28Z"></path><path fill="#feccba" d="M20.9,38.65V40.8a2.87,2.87,0,0,1-5.74,0V38.65Z"></path><path fill="#ffded4" d="M10.39,29.05v2.51a7.65,7.65,0,1,0,15.29,0V29.05L18,25.56Z"></path><path fill="#8d9ca7" d="M20.74,19.39l-3,1.84L18,28a11.69,11.69,0,0,0,7.65,1.08V26.54A7.63,7.63,0,0,0,20.74,19.39Z"></path><path fill="#7c8c97" d="M18 18.9a7.63 7.63 0 00-7.64 7.64v2.51s8.32 2.19 13.72-7.16a7.62 7.62 0 00-6.08-3zM44.66 53H56.25A1.75 1.75 0 0058 51.22v-3.9a4.48 4.48 0 00-2.93-4.23l-6.24-2.24-6.69 4.28z"></path><path fill="#feccba" d="M43.1,38.65V40.8a2.87,2.87,0,0,0,5.74,0V38.65Z"></path><path fill="#ffded4" d="M53.61,29.05v2.51a7.65,7.65,0,1,1-15.29,0V29.05L46,25.56Z"></path><path fill="#8d9ca7" d="M43.26,19.39l3,1.84L46,28a11.69,11.69,0,0,1-7.65,1.08V26.54A7.63,7.63,0,0,1,43.26,19.39Z"></path><path fill="#7c8c97" d="M46,18.9a7.63,7.63,0,0,1,7.64,7.64v2.51s-8.32,2.19-13.72-7.16a7.62,7.62,0,0,1,6.08-3Z"></path><path fill="#d7e5eb" d="M27.44 53l1.38-5.81-4.19-7.73-3.84 1.38A5.51 5.51 0 0017.19 46v4.79A2.15 2.15 0 0019.35 53zM39.49 39.43L34.7 46.57l2 6.4h8a2.16 2.16 0 002.16-2.16V46a5.55 5.55 0 00-3.6-5.23z"></path><path fill="#62d9fa" d="M39.49,39.43l-4-1.45-7.06.07-3.84,1.38L27.44,53h9.24Z"></path><path fill="#c3d1db" d="M39.49,39.43l-1,1.45A5.56,5.56,0,0,1,41.9,46v4.79A2.16,2.16,0,0,1,39.74,53h4.91a2.16,2.16,0,0,0,2.16-2.16V46a5.55,5.55,0,0,0-3.6-5.23Z"></path><path fill="#0acffb" d="M35.53,38,30.74,38l3.84,1.4,3.72,1.36a5.73,5.73,0,0,1,.83.39l.36-1.75Z"></path><path fill="#feccba" d="M35.53,35.35V38a3.53,3.53,0,0,1-7.06,0V35.35Z"></path><path fill="#ffded4" d="M22.58,23.53v3.08a9.42,9.42,0,1,0,18.83,0V23.53L32,19.23Z"></path><path fill="#7c8c97" d="M35.33,11.63,31.61,13.9,32,22.2a14.46,14.46,0,0,0,9.41,1.33V20.44a9.39,9.39,0,0,0-6.08-8.81Z"></path><path fill="#8d9ca7" d="M32,11a9.39,9.39,0,0,0-9.42,9.41v3.09s10.25,2.7,16.9-8.81A9.38,9.38,0,0,0,32,11Z"></path><path d="M55.41,42.15l-5.57-2v-.9a8.62,8.62,0,0,0,4.78-7.69v-5a8.64,8.64,0,0,0-12.38-7.79,10.38,10.38,0,0,0-20.49,0A8.63,8.63,0,0,0,9.38,26.54v5a8.62,8.62,0,0,0,4.78,7.69v.9l-5.57,2A5.48,5.48,0,0,0,5,47.32v3.9A2.75,2.75,0,0,0,7.75,54h48.5A2.75,2.75,0,0,0,59,51.22v-3.9A5.48,5.48,0,0,0,55.41,42.15ZM47.84,40.8a1.87,1.87,0,0,1-1.09,1.68,6.43,6.43,0,0,0-2.65-2.33V40a7.88,7.88,0,0,0,3.74,0ZM19.35,52a1.16,1.16,0,0,1-1.16-1.16V46a4.52,4.52,0,0,1,2.94-4.27l2.75-1L26.21,52Zm2.24-25.3a10.71,10.71,0,0,0,.14,1.4,11.67,11.67,0,0,1-1.45-.31A15.75,15.75,0,0,0,21.59,26.67Zm2-.06V24.69a14.22,14.22,0,0,0,1.61.09A16.4,16.4,0,0,0,32,23.27a15.69,15.69,0,0,0,8.44,1.43v1.91a8.42,8.42,0,1,1-16.83,0Zm18.82.06a15.84,15.84,0,0,0,1.32,1.09,11.45,11.45,0,0,1-1.46.31A9.22,9.22,0,0,0,42.4,26.67Zm-2-6.23v2.25A13.61,13.61,0,0,1,34.17,22a19.38,19.38,0,0,0,5.26-5.45A8.25,8.25,0,0,1,40.41,20.44ZM42.1,39.28v0l-5.57-2V36a10.13,10.13,0,0,0,1.52-.9A8.59,8.59,0,0,0,42.1,39.28Zm-12.63-2.6A10,10,0,0,0,32,37a10.16,10.16,0,0,0,2.53-.35V38a2.53,2.53,0,0,1-5.06,0ZM26,35.06a9.92,9.92,0,0,0,1.52.89v1.4l-5.57,2v-.07A8.61,8.61,0,0,0,26,35.06Zm-.17,5,2-.71a4.44,4.44,0,0,0,8.51,0l2.07.75L35.86,52H28.25Zm14.45.69,2.64,1A4.55,4.55,0,0,1,45.81,46v4.79A1.16,1.16,0,0,1,44.65,52H37.91ZM46,38.21a6.59,6.59,0,0,1-6.28-4.64,10.59,10.59,0,0,0,2.06-3.41,12.82,12.82,0,0,0,4.17-1.11,13.09,13.09,0,0,0,5.47,1.23c.48,0,.87,0,1.23-.06v1.34A6.67,6.67,0,0,1,46,38.21Zm6.65-11.67V28.2c-1.74.23-6.32.26-10.21-4.44V21a6.58,6.58,0,0,1,10.21,5.55ZM32,12a8.35,8.35,0,0,1,6.22,2.8C33,23.25,25.88,23,23.58,22.7V20.44A8.42,8.42,0,0,1,32,12ZM18,19.9A6.62,6.62,0,0,1,21.58,21v2.78c-3.88,4.7-8.46,4.67-10.2,4.44V26.54A6.66,6.66,0,0,1,18,19.9ZM11.38,31.56V30.22c.36,0,.75.06,1.23.06a13.09,13.09,0,0,0,5.47-1.23,12.82,12.82,0,0,0,4.17,1.11,10,10,0,0,0,2.06,3.41A6.59,6.59,0,0,1,18,38.21,6.67,6.67,0,0,1,11.38,31.56ZM18,40.21A8.94,8.94,0,0,0,19.9,40v.19a6.39,6.39,0,0,0-2.65,2.31,1.87,1.87,0,0,1-1.09-1.68V40A8.94,8.94,0,0,0,18,40.21Zm-11,11v-3.9A3.49,3.49,0,0,1,9.26,44l5.16-1.85a3.82,3.82,0,0,0,2,2.11A6.64,6.64,0,0,0,16.19,46v4.79A3.2,3.2,0,0,0,16.42,52H7.75A.76.76,0,0,1,7,51.22Zm50,0a.76.76,0,0,1-.75.75H47.57a3,3,0,0,0,.24-1.16V46a6.65,6.65,0,0,0-.27-1.73,3.87,3.87,0,0,0,2-2.11L54.74,44A3.49,3.49,0,0,1,57,47.32Z"></path></svg>
                        <div className="flex items-center gap-1 font-normal">
                            <p className="text-sm text-gray-700">Người theo dõi:</p>
                            <p className="text-sm text-blue-500">{shop?.count_follower}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-10">
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="review"><defs><linearGradient id="a" x1="10" x2="54" y1="31.5" y2="31.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ed1c24"></stop><stop offset="1" stop-color="#f9ed32"></stop></linearGradient></defs><path fill="url(#a)" d="M21,14h0a2,2,0,0,1-2-2V8a2,2,0,0,1,2-2h0a2,2,0,0,1,2,2v4A2,2,0,0,1,21,14Zm13-2V8a2,2,0,0,0-2-2h0a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h0A2,2,0,0,0,34,12Zm11,0V8a2,2,0,0,0-2-2h0a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h0A2,2,0,0,0,45,12Zm9,11V44.58l-1.83,1.83a2,2,0,0,1-1.41.59H48a4,4,0,0,0-4,4v2.39a2,2,0,0,1-.89,1.67l-.09.07L40.81,57H13a3,3,0,0,1-3-3V23ZM49.52,35.38a2.78,2.78,0,0,0-2.25-1.89l-1.43-.2a.78.78,0,0,1-.59-.43l-.65-1.32A2.77,2.77,0,0,0,42.12,30h0a2.78,2.78,0,0,0-2.49,1.55L39,32.87a.76.76,0,0,1-.56.42l-1.45.2a2.71,2.71,0,0,0-1.58.83s-.08-.07-.1-.12l-.71-1.43a2.94,2.94,0,0,0-5.26,0l-.7,1.43a.81.81,0,0,1-.12.14,2.73,2.73,0,0,0-1.6-.85l-1.43-.2a.78.78,0,0,1-.59-.43l-.65-1.32A2.76,2.76,0,0,0,21.74,30h0a2.74,2.74,0,0,0-2.46,1.54l-.67,1.33a.76.76,0,0,1-.56.42l-1.46.2A2.77,2.77,0,0,0,15,38.21l1.06,1a.74.74,0,0,1,.22.67l-.25,1.44a2.77,2.77,0,0,0,2.73,3.24,2.71,2.71,0,0,0,1.29-.32l1.3-.68a.81.81,0,0,1,.71,0l1.3.68a3.25,3.25,0,0,0,2.46.14,2.91,2.91,0,0,0,4.24,2.11l1.42-.74a.88.88,0,0,1,.86,0l1.42.74a2.91,2.91,0,0,0,3.08-.22A2.87,2.87,0,0,0,38,44.44a3.24,3.24,0,0,0,2.42-.15l1.31-.68a.77.77,0,0,1,.71,0l1.3.68a2.71,2.71,0,0,0,1.29.32,2.77,2.77,0,0,0,2.73-3.24l-.25-1.43a.76.76,0,0,1,.23-.69l1-1A2.75,2.75,0,0,0,49.52,35.38Zm4.48,12V49a8,8,0,0,1-8,8H43.9l.37-.31A4,4,0,0,0,46,53.39V51a2,2,0,0,1,2-2h2.76a4.06,4.06,0,0,0,2.83-1.17ZM26.11,41.88a.91.91,0,0,0-.26-.83L24.7,39.94a2.9,2.9,0,0,1,.64-4.65l-.18,0a2.79,2.79,0,0,1-2.09-1.54l-.64-1.3a.75.75,0,0,0-.7-.43h0a.74.74,0,0,0-.68.43l-.66,1.32a2.78,2.78,0,0,1-2.07,1.52l-1.47.2a.73.73,0,0,0-.61.53.72.72,0,0,0,.19.78l1.05,1a2.76,2.76,0,0,1,.8,2.43L18,41.71a.76.76,0,0,0,.3.75.77.77,0,0,0,.83.06l1.29-.68a2.71,2.71,0,0,1,2.58,0l1.29.67A1.75,1.75,0,0,0,26.1,42Zm9.78.88a.89.89,0,0,1,0-.32l0-.23a2.9,2.9,0,0,1,.84-2.59l1.14-1.11a.93.93,0,0,0,.24-1,.91.91,0,0,0-.75-.63l-1.58-.23-.19,0a.59.59,0,0,1-.13,0l-.07,0a2.91,2.91,0,0,1-1.82-1.49l-.7-1.44a.92.92,0,0,0-.84-.51.91.91,0,0,0-.83.51l-.71,1.44a2.94,2.94,0,0,1-1.88,1.51l0,0H28.4a1.29,1.29,0,0,1-.21.06l-1.58.23a.93.93,0,0,0-.51,1.59l1.14,1.11a2.9,2.9,0,0,1,.84,2.59l-.27,1.58a.93.93,0,0,0,1.35,1L30.58,44a2.91,2.91,0,0,1,2.72,0l1.42.74a.93.93,0,0,0,1.35-1ZM47,35.47l-1.45-.2a2.79,2.79,0,0,1-2.09-1.54l-.65-1.3a.74.74,0,0,0-.68-.43h0a.75.75,0,0,0-.7.43l-.65,1.31a2.77,2.77,0,0,1-2.07,1.53l-.16,0a2.87,2.87,0,0,1,1.38,1.65,2.92,2.92,0,0,1-.74,3L38,41.05a1,1,0,0,0-.27.83l0,.13a1.74,1.74,0,0,0,1.73.51l1.31-.68a2.71,2.71,0,0,1,2.58,0l1.29.67a.77.77,0,0,0,1.12-.81l-.25-1.44a2.79,2.79,0,0,1,.81-2.47l1-1a.72.72,0,0,0,.19-.78A.73.73,0,0,0,47,35.47ZM51,10H47v2a4,4,0,0,1-8,0V10H36v2a4,4,0,0,1-8,0V10H25v2a4,4,0,0,1-8,0V10H13a3,3,0,0,0-3,3v6H54V13A3,3,0,0,0,51,10Z"></path></svg>
                        <div className="flex items-center gap-1 font-normal">
                            <p className="text-sm text-gray-700">Đánh giá:</p>
                            <p className="text-sm text-blue-500">{ratingShop?.rating}</p>
                            <p>({ratingShop?.listReview.length} đánh giá)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoShop;