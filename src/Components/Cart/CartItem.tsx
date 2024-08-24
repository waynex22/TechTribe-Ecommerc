import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd";
import { UpdateCartPayload, useGetCartMeQuery, useGetCartSelectQuery, useRemoveChildItemMutation, useUpdateCartMutation, useUpdateCartSelectMutation } from "../../redux/rtkQuery/cart";
import { useSelector } from "react-redux";
import Toast from "../toast/Toast";
import { ToastProps } from "../../Type";
import ModalAccept from "../modal/ModalAccept";
import Spinner from "../spinner/Spinner";
import { checkDiscount } from "src/utils/checkDiscount";
import { discountPrice } from "src/utils/getMinMax/getMinMaxPrice";
import CountDown from "../Clock/CountDown";
interface CartItemProps {
  itemCart: any;
}
const CartItem: React.FC<CartItemProps> = ({ itemCart }) => {
  const { user } = useSelector((state: any) => state.auth);
  const { productPriceId, quantity ,discountDetailId } = itemCart;
  const { refetch } = useGetCartMeQuery(user?.sub);
  const [updateCart] = useUpdateCartMutation();
  const { data: cartSelect, refetch: refetchCartSelect } = useGetCartSelectQuery(user?.sub);
  const [updateCartSelect] = useUpdateCartSelectMutation();
  const [removeChildItem] = useRemoveChildItemMutation();
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      refetchCartSelect();
    }
  }, [user, refetchCartSelect]);
  const handleSetToast = (toast: any) => {
    setToast({ ...toast, message: toast.message, type: toast.type, onClose: () => setToast(null) });
  }
  const handleUpdateCart = async (customerId: string, quantity: number) => {
    if(isDiscount){
      if(discountDetailId.limit_customer !== "Không giới hạn" && quantity === 1){
        const checkQuantityLimit = itemCart.quantity + 1 > discountDetailId.limit_customer;
        if(checkQuantityLimit){
          handleSetToast({ message: 'Bạn chỉ có thể mua tối đa ('+discountDetailId.limit_customer+') sản phẩm này với chương trình khuyến mãi!', type: "error" });
          return
        }
      }
    }
    const payload: UpdateCartPayload = {
      customerId: customerId,
      shopId: productPriceId.id_product[0].id_shop[0]._id,
      items: {
        productPriceId: productPriceId._id,
        quantity: quantity
      }
    };

    const updateCartAction = async () => {
      if (payload) {
        setLoading(true);
        try {
          const res: any = await updateCart(payload).unwrap();
          if (res?.status === 299) {
            handleSetToast({ message: res.message, type: "success" });
          } else {
            refetch();
          }
        } catch (error) {
          console.error('Error adding product to cart:', error);
        } finally {
          setLoading(false);
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
  const handleRemoveChildItem = async () => {
    setLoading(true);
    const payload = {
      customerId: user?.sub,
      productPriceId: productPriceId._id,
      shopId: productPriceId.id_product[0].id_shop[0]._id
    }
    await removeChildItem(payload);
    refetch();
    setLoading(false);
  }
  const handleConfirm = async () => {
    if (modalAction) {
      await modalAction();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSelectdProduct = async (productPriceId: any) => {
    if(productPriceId.stock === 0 || quantity > productPriceId.stock || quantity < 0 ) return;
    const payload: any = {
      customerId: user?.sub,
      productPriceId: productPriceId._id,
    }
    if (payload) {
      try {
        await updateCartSelect(payload).unwrap();
        refetchCartSelect();
      } catch (error) {
        console.error('Error adding product to cart:', error);
      } finally {
      }
    }
  }
  useEffect(() => {
    if(itemCart?.discountDetailId){
      setIsDiscount(checkDiscount(itemCart?.discountDetailId?.id_discount?.time_start, itemCart?.discountDetailId?.id_discount?.time_end));
    }
  }, [discountDetailId]);
  return (
    <>
      <Spinner loading={loading} />
      <div className="w-full flex items-center justify-start ">
        <ModalAccept
          isOpen={isModalOpen}
          message="Bạn muốn xoá sản phẩm này khỏi giỏ hàng ?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={toast.onClose} />}
        <div className="w-full">
          <div className={`h-[120px] w-full flex items-center justify-start ${productPriceId.stock === 0 || productPriceId.stock < itemCart?.quantity ? 'opacity-50' : ''}`}>
            <div className="w-[50%] flex items-center justify-start p-2 gap-x-2">
              <input
                onChange={() => handleSelectdProduct(productPriceId)}
                checked={cartSelect?.listProductSelect?.some((item: any) => (item._id == productPriceId?._id)) ? true : false}
                type="checkbox"
                className="w-5 h-5 focus:ring-0 rounded-md border-solid border-[1px] border-gray-300 checked:bg-secondary transition-all duration-300"
              />
              <div className="flex items-center justify-start p-2 gap-x-2">
              {productPriceId?.id_color[0]?.thumbnail ? (
                                    <>
                                        <img src={`http://localhost:8080/uploads/${productPriceId?.id_color[0]?.thumbnail}`} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                    </>
                                ) : (
                                    <>
                                        <img src={`http://localhost:8080/uploads/${productPriceId?.id_product[0]?.thumbnails[0]}`} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                    </>
                                )}
                <div className="flex flex-col ">
                  {isDiscount && itemCart?.discountDetailId ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-light text-red-600">
                        Sản phẩm khuyến mãi
                      </span>
                    </div>
                  ) : (
                    <>
                    {isDiscount == false && itemCart?.discountDetailId && <span className="text-[10px] font-light line-through text-red-600">
                      Chương trình khuyến mãi đã kết thúc
                    </span>}
                    </>
                  )}
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
              {isDiscount ? (
                <>
                  <div className="flex flex-col items-center justify-start relative">
                    <span className="text-sm font-light-nomal">
                      {formatNumberVnd(discountPrice(productPriceId?.price, discountDetailId?.percent))}
                    </span>
                    <div className="text-[10px] underline font-light-bold absolute right-[-12px] top-[-6px]">
                      đ
                    </div>
                    <del className="text-gray-400 text-sm">{formatNumberVnd(productPriceId?.price)}đ</del>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-start relative w-fit">
                    <span className=" text-sm w-fit font-bold">{formatNumberVnd(productPriceId?.price)}</span>
                    <div className="text-[10px] underline font-light-bold absolute right-[-12px] top-[-6px]">
                      đ
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-[20%]  p-2 gap-x-2 relative">
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
              <div className="absolute left-2 bottom-0">
                <p className="text-gray-800 font-light text-[12px]">{productPriceId.stock === 0 ? 'Hết hàng' : `Còn ${productPriceId.stock}`}</p>
              </div>
            </div>
            <div className="w-[20%] flex items-center justify-start p-2 gap-x-2">
              {isDiscount ? (
                <>
                  <div className="flex flex-col items-center justify-start relative">
                    <span className="text-md font-light-nomal text-red-600">
                      {formatNumberVnd(discountPrice(productPriceId?.price, discountDetailId?.percent) * quantity)}
                    </span>
                    <div className="text-[12px] underline font-light-bold absolute right-[-12px] top-[-6px] text-red-600">
                      đ
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-start relative w-fit">
                    <span className=" text-md w-fit font-bold text-red-600">{formatNumberVnd(productPriceId?.price * quantity)}</span>
                    <div className="text-[12px] underline font-light-bold absolute right-[-12px] top-[-6px] text-red-600">
                      đ
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-[5%] flex items-center justify-start p-2 gap-x-2 cursor-pointer">
              <svg onClick={() => handleRemoveChildItem()}
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
