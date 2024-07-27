import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../../../Components/auth/authModal";
import { useDispatch } from "react-redux";
import {
  useGetInfoUserMutation,
  useRefreshTokenMutation,
} from "../../../redux/rtkQuery/auth";
import { logout } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import Search from "../../../Components/subComponent/search";
import { ToastProps } from "../../../Type";
import Toast from "../../../Components/toast/Toast";
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { cart } = useSelector((state: any) => state.cart);
  const [refreshToken] = useRefreshTokenMutation();
  const [getUser] = useGetInfoUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleCartClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!user) {
      event.preventDefault();
      setShowModal(true);
    }
  }
  const [toast, setToast] = useState<ToastProps | null>(null);
  const handleSetToast = (toast: ToastProps) => {
    setToast({ ...toast, message: toast.message, type: toast.type , onClose: () => setToast(null) });
  }
  useEffect(() => {
    const refreshTokenFromStorage = localStorage.getItem("refresh_token");
    const token = localStorage.getItem("access_token");
    if (token && refreshTokenFromStorage && !user) {
      refreshToken(refreshTokenFromStorage)
        .then(() => {
          getUser();
        })
        .catch((error) => {
          console.error("Error refreshing token:", error);
        });
    } else {
      logout();
    }
  }, [getUser, refreshToken]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  return (
    <>
      <div className="bg-white text-center">
      {toast && <Toast message={toast.message} type={toast.type} onClose={toast.onClose} />}
        <div className="md:container md:mx-auto flex items-center justify-between py-2">
          <Link to="/">
            <img src="logo-nontext.png" className="w-[60px] h-[60px]" alt="" />
          </Link>
          <Search />
          <div className="flex items-center justify-center">
            <div>
              <Link to='/'>
                <div className="flex mx-2 text-primary hover:bg-blue-200 p-2 rounded-lg ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[14px]">
                    Trang chủ
                  </span>
                </div>
              </Link>
            </div>
            {user ? (
              <div
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="flex mx-2 text-primary hover:bg-blue-200 p-2 rounded-lg cursor-pointer"
              >
                <div className="flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[14px]">Tài khoản</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center cursor-pointer">
                <div
                  onClick={() => handleOpenModal()}
                  className="flex mx-2 text-gray-400 hover:bg-blue-200 p-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.536-4.464a.75.75 0 1 0-1.061-1.061 3.5 3.5 0 0 1-4.95 0 .75.75 0 0 0-1.06 1.06 5 5 0 0 0 7.07 0ZM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5Zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[14px]">Tài khoản</span>
                </div>
              </div>
            )}
            {isMenuOpen && (
              <div className="origin-top-right absolute right-[100px] mt-[200px] w-56 z-50 backdrop-blur-md bg-primary/40 rounded-2xl p-4">
                <div className="rounded-2xl">
                  <div
                    className="cursor-pointer text-white"
                    onMouseLeave={handleMenuClose}
                  >
                    <div className="flex flex-col pb-4 justify-center items-center"></div>
                    <div className="flex justify-center items-center hover:underline transition duration-150 ease-in-out">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 w-full text-sm text-white"
                      >
                        Thông tin tài khoản
                      </Link>
                    </div>
                    <div className="flex justify-center items-center hover:underline transition duration-150 ease-in-out">
                      <Link
                        to="/orders"
                        className="block px-4 py-2 w-full text-sm text-white"
                      >
                        Đơn hàng của tôi
                      </Link>
                    </div>
                    <div className="flex justify-center items-center hover:underline transition duration-150 ease-in-out">
                      <div
                        onClick={handleLogout}
                        className="block px-4 py-2 w-full text-sm text-white"
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <AuthModal show={showModal} onClose={handleCloseModal} setToast={handleSetToast}></AuthModal>
            <div className="flex items-center justify-center">
              <div className="flex mx-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-6 relative"
                >
                  <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z" />
                  <path
                    fillRule="evenodd"
                    d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute w-[12px] h-[16px] top-[20px] ml-4 rounded-full bg-red-500 text-white text-[12px]">
                  5
                </div>
              </div>
            </div>
            <div className="w-[1px] bg-gray-300 h-[22px] mx-2"></div>
            <Link to='/checkout/cart' onClick={handleCartClick}>
              <div className="flex items-center justify-center">
                <div className="flex items-center text-primary ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-6 relative"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                    {cart?.cart?.cartItems && 
                    <div className="absolute w-[12px] h-[16px] top-[20px] ml-4 rounded-full bg-red-500 text-white text-[12px]">
                    {cart?.cart?.cartItems?.length}
                  </div>
                    }
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-4 w-full h-[1px] bg-gray-200"></div>
        <div className="flex items-center justify-start container mx-auto py-2 gap-x-6">
          <div className="flex items-center gap-x-2 cursor-pointer hover:opacity-80 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-light-normal">Hàng chính hãng</span>
          </div>
          <div className="w-[1px] h-4 bg-gray-200"></div>
          <div className="flex items-center gap-x-2 cursor-pointer hover:opacity-80 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 0 0 1.029.696l3.471-1.388 3.472 1.388a.75.75 0 0 0 .556 0l3.472-1.388 3.471 1.388a.75.75 0 0 0 1.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0 0 12 1.5Zm-.97 6.53a.75.75 0 1 0-1.06-1.06L7.72 9.22a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h3.065a1.875 1.875 0 0 1 0 3.75H12a.75.75 0 0 0 0 1.5h1.125a3.375 3.375 0 1 0 0-6.75h-3.064l.97-.97Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-sm font-light-normal">Đổi trả 30 ngày</span>
          </div>
          <div className="w-[1px] h-4 bg-gray-200"></div>
          <div className="flex items-center gap-x-2 cursor-pointer hover:opacity-80 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-light-normal">Voucher mỗi ngày</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
