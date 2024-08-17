import { useState } from "react";
import { useUpdateSubOrderDtoMutation } from "../../redux/rtkQuery/order";
import { Order } from "../../utils/types/order";
import Spinner from "../spinner/Spinner";
interface Props {
    subOrder?: Order,
    refecth: () => void
}
const PaymentMethod: React.FC<Props> = ({ subOrder , refecth }) => {
    const [loading, setLoading] = useState(false);
    const [update] = useUpdateSubOrderDtoMutation();
    const paymentMethods = [
        { id: 'cash', name: 'Thanh toán khi nhận hàng'},
        { id: 'wallet', name: 'Qua ví TTPAY'},
    ];
    const handleSelectPayment = async (method: string) => {
        setLoading(true);
        const payload = {
            id: subOrder?._id,
            methodPayment: method
        }
        try {
            await update(payload);
            refecth();
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    }
    return (
        <>
        <Spinner loading={loading} />
            <div className="bg-white p-4 h-fit rounded-lg">
                <h2>Chọn hình thức thanh toán</h2>
                <div className="space-y-8 my-4">
                    {paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center">
                            <input
                                type="radio"
                                id={method.id}
                                name="paymentMethod"
                                value={method.id}
                                checked={method.name === subOrder?.methodPayment}
                                onChange={() => handleSelectPayment(method.name)}
                                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                            />
                            <label htmlFor={method.id} className="ml-3 text-sm font-medium text-gray-700 flex gap-2 items-center">
                                {method.name === 'Thanh toán khi nhận hàng' ? (
                                    <>
                                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="rupee"><circle cx="28" cy="34" r="7" fill="#f4eaea"></circle><path fill="#be7e4e" d="M37.29,47,18.83,58.35a.994.994,0,0,1-1.37-.33L10.68,47Z"></path><polygon fill="#af5f28" points="37.29 47 32.41 50 12.53 50 10.68 47 37.29 47"></polygon><path fill="#f4eaea" d="M43.03,47,17.85,62.48a.994.994,0,0,1-1.37-.33L7.16,47h3.52l6.78,11.02a.994.994,0,0,0,1.37.33L37.29,47Z"></path><path fill="#be7e4e" d="M48.92 17.54L51.05 21H41.39l6.16-3.79A.994.994 0 0 1 48.92 17.54zM58.35 32.88a.994.994 0 0 1-.33 1.37L55 36.11V27.43z"></path><path fill="#f4eaea" d="M62.48 33.87a.994.994 0 0 1-.33 1.37L55 39.64V36.11l3.02-1.86a.994.994 0 0 0 .33-1.37L55 27.43V22a.975.975 0 0 0-.17-.56l.17.27zM54.56 21l.27.44A1.022 1.022 0 0 0 54 21H51.05l-2.13-3.46a.994.994 0 0 0-1.37-.33L41.39 21H35.67l12.86-7.91a.994.994 0 0 1 1.37.33z"></path><path fill="#f4eaea" d="M55,39.64V46a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V22a1,1,0,0,1,1-1H54a1.022,1.022,0,0,1,.83.44A.975.975,0,0,1,55,22V39.64ZM52,43V25a1,1,0,0,0-1-1H5a1,1,0,0,0-1,1V43a1,1,0,0,0,1,1H51A1,1,0,0,0,52,43Z"></path><polygon fill="#c1aeae" points="57 34.88 57 38.41 55 39.64 55 36.11 57 34.88"></polygon><polygon fill="#af5f28" points="57 30.68 57 34.88 55 36.11 55 27.43 57 30.68"></polygon><path fill="#c1aeae" d="M57 24.96v5.72l-2-3.25V22a.975.975 0 0 0-.17-.56l.17.27zM54.83 21.44A1.022 1.022 0 0 0 54 21H51.05l-1.23-2h3.51l1.23 2z"></path><polygon fill="#c1aeae" points="44.64 19 41.39 21 35.67 21 38.92 19 44.64 19"></polygon><polygon fill="#af5f28" points="51.05 21 41.39 21 44.64 19 49.82 19 51.05 21"></polygon><path fill="#be7e4e" d="M51,24H5a1,1,0,0,0-1,1V43a1,1,0,0,0,1,1H51a1,1,0,0,0,1-1V25A1,1,0,0,0,51,24ZM10.5,38A3.5,3.5,0,1,1,14,34.5,3.5,3.5,0,0,1,10.5,38ZM28,41a7,7,0,0,1,0-14,7.077,7.077,0,0,1,2.73.55h.01A7.005,7.005,0,0,1,28,41Zm17.5-3A3.5,3.5,0,1,1,49,34.5,3.5,3.5,0,0,1,45.5,38Z"></path><polygon fill="#c1aeae" points="43.03 47 38.15 50 32.41 50 37.29 47 43.03 47"></polygon><polygon fill="#c1aeae" points="12.53 50 9.01 50 7.16 47 10.68 47 12.53 50"></polygon><path fill="#6d342e" d="M22.03,47a3.5,3.5,0,0,1-6.47,2.21A3.438,3.438,0,0,1,15.07,47"></path><circle cx="10.5" cy="34.5" r="3.5" fill="#6d342e"></circle><circle cx="45.5" cy="34.5" r="3.5" fill="#6d342e"></circle><path fill="#472b3c" d="M22.03,47a3.5,3.5,0,0,1-6.47,2.21A3.438,3.438,0,0,1,15.07,47"></path><circle cx="10.5" cy="34.5" r="3.5" fill="#472b3c"></circle><circle cx="45.5" cy="34.5" r="3.5" fill="#472b3c"></circle><path fill="#472b3c" d="M22.03,47a3.5,3.5,0,0,1-6.47,2.21A3.438,3.438,0,0,1,15.07,47"></path><circle cx="10.5" cy="34.5" r="3.5" fill="#472b3c"></circle><circle cx="45.5" cy="34.5" r="3.5" fill="#472b3c"></circle><path fill="#472b3c" d="M22.03,47a3.5,3.5,0,0,1-6.47,2.21A3.438,3.438,0,0,1,15.07,47"></path><circle cx="10.5" cy="34.5" r="3.5" fill="#472b3c"></circle><circle cx="45.5" cy="34.5" r="3.5" fill="#472b3c"></circle><path fill="#472b3c" d="M63.328,33.344,50.756,12.9a2,2,0,0,0-2.751-.657l-8.528,5.243a1,1,0,1,0,1.046,1.7l8.529-5.243L52.775,20H51.609l-1.833-2.981a2,2,0,0,0-2.752-.657L41.107,20H2a2,2,0,0,0-2,2V46a2,2,0,0,0,2,2h8.121L16.6,58.542a1.984,1.984,0,0,0,1.24.9,2.015,2.015,0,0,0,.468.055,1.975,1.975,0,0,0,1.043-.3l14.168-8.709a1,1,0,1,0-1.046-1.7L18.308,57.5,12.468,48H14.6A4,4,0,0,0,22.5,48h17L17.328,61.625,9.852,49.468a1,1,0,0,0-1.7,1.048l7.477,12.156a2,2,0,0,0,2.75.657L43.313,48H54a2,2,0,0,0,2-2V40.2l6.672-4.1a2,2,0,0,0,.656-2.752ZM48.072,18.066,49.261,20H44.926ZM54,46H2V22H54Zm2-15.031L57.5,33.4,56,34.321Zm0,6.883V36.668L58.542,35.1a2,2,0,0,0,.657-2.75L56,27.147v-1.9l5.625,9.147Z"></path><path fill="#472b3c" d="M5,45H51a2,2,0,0,0,2-2V25a2,2,0,0,0-2-2H5a2,2,0,0,0-2,2V43A2,2,0,0,0,5,45ZM5,25H51V43H5Z"></path><path fill="#472b3c" d="M31.152,26.65c-.02-.01-.039-.019-.061-.028a8.377,8.377,0,1,0,.061.028ZM28,40a6,6,0,1,1,6-6A6.006,6.006,0,0,1,28,40Z"></path><path fill="#472b3c" d="M31,29H25a1,1,0,0,0,0,2h4.761a4.959,4.959,0,0,1-.537,1H25a1,1,0,0,0,0,2h2.006a11.578,11.578,0,0,1-2.322,1.051,1,1,0,0,0-.055,1.878l5,2a1,1,0,1,0,.742-1.858l-2.761-1.1A9.719,9.719,0,0,0,30.182,34H31a.993.993,0,0,0,.45-1.881A5.474,5.474,0,0,0,32,30,1,1,0,0,0,31,29Z"></path></svg>
                                    </>
                                ): (
                                    <>
                                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="wallet"><linearGradient id="a" x1="30.243" x2="461.117" y1="40.563" y2="471.437" gradientTransform="matrix(1 0 0 -1 0 512)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4eaeff"></stop><stop offset="1" stop-color="#5df5ff"></stop></linearGradient><path fill="url(#a)" d="M413.226,318.026c-34.186,0-62.026-27.841-62.026-62.026c0-34.186,27.84-62.026,62.026-62.026c72.468,0.05,73.746-0.186,78.134,0.107V88.907c0-24.107-19.626-43.786-43.787-43.786H43.787c-24.16,0-43.787,19.68-43.787,43.786v334.187c0,24.107,19.626,43.787,43.787,43.787h403.786c24.16,0,43.787-19.681,43.787-43.787V317.92C488.853,318.087,485.694,317.977,413.226,318.026z M236.2,397.531c0,8.823-7.177,16-16,16H69.334c-8.823,0-16-7.177-16-16V295.672c0-8.823,7.177-16,16-16H220.2c8.823,0,16,7.177,16,16V397.531z M225.534,295.672v101.859c0,2.943-2.393,5.333-5.333,5.333H69.334c-2.94,0-5.333-2.39-5.333-5.333V295.672c0-2.943,2.393-5.333,5.333-5.333H220.2C223.14,290.338,225.534,292.73,225.534,295.672z M488.96,204.64h-75.733c-28.32,0-51.36,23.04-51.36,51.36s23.04,51.36,51.36,51.36h75.733c12.693,0,23.04-10.347,23.04-23.04v-56.64C511.999,214.987,501.653,204.64,488.96,204.64z M416.02,279.443c-12.907,0-23.406-10.5-23.406-23.406c0-12.948,10.5-23.485,23.406-23.485c12.907,0,23.406,10.536,23.406,23.485C439.427,268.943,428.927,279.443,416.02,279.443z M428.761,256.036c0,7.026-5.717,12.739-12.739,12.739c-7.024,0-12.739-5.713-12.739-12.739c0-7.068,5.717-12.817,12.739-12.817C423.044,243.219,428.761,248.969,428.761,256.036z"></path></svg>
                                    </>
                                )}
                                {method.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default PaymentMethod;