import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd";
import { UpdateCartPayload, useGetCartMeQuery, useUpdateCartMutation } from "../../redux/rtkQuery/cart";
import { useSelector } from "react-redux";
import Toast from "../toast/Toast";
import { ToastProps } from "../../Type";
import ModalAccept from "../modal/ModalAccept";
interface CartItemProps {
  itemCart: any;
}
const CartItem: React.FC<CartItemProps> = ({itemCart}) => {
  const { user } = useSelector((state: any) => state.auth);
  const { productPriceId , quantity} = itemCart;
  const { refetch } = useGetCartMeQuery(user?.sub);
  const [updateCart] = useUpdateCartMutation();
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const handleSetToast = (toast: any) => {
    setToast({ ...toast, message: toast.message, type: toast.type, onClose: () => setToast(null) });
  }
  const handleUpdateCart = async (customerId: string, quantity: number) => {
    const payload: UpdateCartPayload = {
      customerId: customerId,
      productPriceId: productPriceId?._id,
      quantity: quantity,
    };

    const updateCartAction = async () => {
      if (payload) {
        try {
          const res: any = await updateCart(payload).unwrap();
          if (res?.statusCode === 299) {
            handleSetToast({ message: res.message, type: "success" });
          } else {
            refetch();
          }
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      }
    };

    if (itemCart.quantity === 1 && quantity === -1) {
      setIsModalOpen(true);
      setModalAction(() => updateCartAction);
    } else {
      await updateCartAction();
    }
  };

  const handleConfirm = async () => {
    if (modalAction) {
      await modalAction();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-start ">
      <ModalAccept
        isOpen={isModalOpen}
        message="Bạn muốn xoá sản phẩm này khỏi giỏ hàng ?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={toast.onClose} />}
        <div className="w-full">
          <div className="h-[40px] w-full flex items-center justify-start p-2 gap-x-2 ">
            <input
              type="checkbox"
              className="w-5 h-5 outline-none rounded-md border-solid border-[1px] border-gray-300 focus:ring-0 checked:bg-secondary transition-all duration-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
            <Link to={`shop/${productPriceId?.id_product[0]?.id_shop[0]?._id}`} className="text-sm font-light-medium">
              {productPriceId?.id_product[0]?.id_shop[0]?.name}
            </Link>
          </div>
          <div className="h-[120px] w-full flex items-center justify-start">
            <div className=" w-[50%] flex items-center justify-start p-2 gap-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 focus:ring-0 rounded-md border-solid border-[1px] border-gray-300 checked:bg-secondary transition-all duration-300"
              />
              <div className="flex items-center justify-start p-2 gap-x-2">
                <img
                  src={`http://localhost:8080/uploads/${productPriceId?.id_product[0]?.thumbnails[0]}`}
                  className="object-cover w-[80px] h-[80px]"
                  alt=""
                />
                <div className="flex flex-col ">
                  <Link to={`/product/${productPriceId?.id_product[0]?._id}`} className="text-sm font-light-nomal">
                    {productPriceId?.id_product[0]?.name}
                  </Link>
                  <span className="text-[12px] font-light text-gray-400">
                    {productPriceId?.id_color[0]?.value} {productPriceId?.id_size[0]?.value ? `, ${productPriceId?.id_size[0]?.value}` : ''}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[20%] flex items-center justify-start p-2 gap-x-2">
              <div className="flex items-center justify-start relative w-fit">
                <span className=" text-sm w-fit font-bold">{formatNumberVnd(productPriceId?.price)}</span>
                <div className="text-[10px] underline font-light-bold absolute right-[-12px] top-[-6px]">
                  đ
                </div>
              </div>
            </div>
            <div className="w-[20%] flex items-center justify-start p-2 gap-x-2">
            <div className="flex items-center my-2 space-x-1 mb-4">
                  <button onClick={() => handleUpdateCart(user?.sub, -1)}
                    className="px-[10px] py-[3px] text-center border border-gray-400 "
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-10 px-1 py-[3px] text-center border border-gray-400 outline-none"
                  />
                  <button onClick={() => handleUpdateCart(user?.sub, 1)}
                    className="px-[10px] py-[3px] border border-gray-400 "
                  >
                    +
                  </button>
                </div>
            </div>
            <div className="w-[20%] flex items-center justify-start p-2 gap-x-2">
            <div className="flex items-center justify-start text-red-600 relative w-fit">
                <span className=" text-md w-fit font-bold">{formatNumberVnd(productPriceId?.price * quantity)}</span>
                <div className="text-[12px] underline font-light-bold absolute right-[-12px] top-[-6px]">
                  đ
                </div>
              </div>
            </div>
            <div className="w-[5%] flex items-center justify-start p-2 gap-x-2 cursor-pointer">
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
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200">

        </div>
    </>
  );
};
export default CartItem;
