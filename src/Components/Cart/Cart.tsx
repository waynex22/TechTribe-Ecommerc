import { useSelector } from "react-redux";
import { useGetCartMeQuery } from "../../redux/rtkQuery/cart";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd";

const Cart: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const {data: cart ,isLoading} = useGetCartMeQuery(user?.sub);
  const [total, setTotal] = useState(0);
  useEffect(() => { 
    const totalCart = cart?.cartItems.reduce(
      (acc: any, item: any) => acc + item.quantity * item.productPriceId?.price,0)
    setTotal(totalCart);
  },[cart?.cartItems]);
  console.log(cart);
  
  // console.log(total);
  if(isLoading) return <div>Loading</div>
  return (
    <>
      <div className="my-5">
        {cart?.cartItems.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center py-10 rounded-lg bg-white">
              <img
                src="	https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png"
                alt=""
                className="object-cover w-[150px] h-[150px]"
              />
              <span className="text-lg font-light-nomal">Giỏ hàng trống</span>
              <span className="text-sm font-light">
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </span>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-8 gap-5">
          <div className="col-span-6 h-fit">
            <div className="bg-white rounded-md flex items-center justify-start">
              <div className="w-[50%] flex items-center justify-start p-2 gap-x-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 outline-none rounded-md border-solid border-[1px] focus:ring-0 border-gray-300 checked:bg-secondary transition-all duration-300"
                />
                <span className="text-sm font-light">Tất cả (0 sản phẩm) </span>
              </div>
              <div className="w-[20%] flex items-center justify-start p-2 gap-x-2">
                <span className="text-sm font-light text-gray-500">
                  Đơn giá
                </span>
              </div>
              <div className="w-[20%] flex items-center justify-start p-2 gap-x-2">
                <span className="text-sm font-light text-gray-500">
                  Số lượng
                </span>
              </div>
              <div className="w-[20%] flex items-center justify-start p-2 gap-x-2">
                <span className="text-sm font-light text-gray-500">
                  Thành tiền
                </span>
              </div>
              <div className="w-[5%] flex items-center justify-start p-2 gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 font-light text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-white mt-5 rounded-md flex flex-col items-start justify-start col-span-6 h-fit overflow-hidden">
              {cart?.cartItems.map((item: any, index: number) => (
                <CartItem itemCart={item} key={index} />
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-white rounded-md h-fit p-4">
              <h3 className="text-sm ">2T Khuyễn mãi</h3>
              <div className="flex items-center justify-start gap-4 mt-4 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
                <span className="text-sm font-light text-primary">
                  Chọn hoặc nhập mã khuyến mãi
                </span>
              </div>
            </div>
            <div className="bg-white rounded-md mt-5  ">
              <div className="flex items-center justify-between p-4">
                <span className="font-light text-sm text-gray-400">
                  Tạm tính
                </span>
                <div className="flex items-center justify-start relative w-fit text-gray-700">
                  <span className=" text-sm w-fit font-bold">{formatNumberVnd(total)}</span>
                  <div className="text-[10px] underline font-light-bold absolute right-[-8px] top-[-6px]">
                    đ
                  </div>
                  <div className="h-[1px] w-full bg-gray-900"></div>
                </div>
              </div>
              <div className="flex items-start justify-between p-4">
                <span className="font-light text-sm text-gray-400">
                  Tổng tiền
                </span>
                <div className="flex flex-col items-end justify-end">
                <div className="text-red-600 relative w-fit">
                  <span className=" text-md w-fit font-bold">{formatNumberVnd(total)}</span>
                  <div className="text-[12px] underline font-light-bold absolute right-[-8px] top-[-6px]">
                    đ
                  </div>
                </div>
                <span className="text-[10px] font-light text-gray-400">( Đã bao gồm VAT nếu có )</span>
                </div> 
              </div>
            </div>
            <div className="bg-red-500 rounded-md mt-5 p-4 text-center cursor-pointer">
                <span className="text-white text-md font-light-bold">Đặt hàng</span>
            </div>
          </div>
        </div>
        )}
        
      </div>
    </>
  );
};
export default Cart;
