import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../../../Components/auth/authModal";
import { useDispatch } from "react-redux";
import { useGetInfoUserMutation, useRefreshTokenMutation } from "../../../services/authApi";
import { logout } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);

  const [refreshToken] = useRefreshTokenMutation();
  const [getUser] = useGetInfoUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const refreshTokenFromStorage = localStorage.getItem('refresh_token');
    const token = localStorage.getItem('access_token');

    if (token && refreshTokenFromStorage && !user) {
      refreshToken(refreshTokenFromStorage)
        .then(() => {
          getUser();
        })
        .catch((error) => {
          console.error('Error refreshing token:', error);
        });
    } else {
      getUser();
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
      <div className="h-[72px] bg-white text-center">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <img src="logo-nontext.png" className="w-[60px] h-[60px]" alt="" />
          </Link>
          <div className="flex items-center border border-gray-300 rounded-lg w-[900px] min-w-[400px]">
            <span className="pl-5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0a7.5 7.5 0 1 0-10.607-10.607 7.5 7.5 0 0 0 10.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="100% bạn muốn mua gì ?"
              className="rounded-lg ml-3 p-1 flex-grow text-[14px] font-light border-none outline-transparent"
            />
            <div className="w-[1px] h-[24px] bg-gray-300 mx-2"></div>
            <button className="pr-2 text-blue-500 text-[14px] mr-3">
              Tìm kiếm
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div>
              <div className="flex mx-2 text-primary hover:bg-blue-200 p-2 rounded-lg ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 mx-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link to="/" className="text-[14px]">
                  Trang chủ
                </Link>
              </div>
            </div>
            {user ? (
              <div onClick={() => setMenuOpen(!isMenuOpen)} className="flex mx-2 text-primary hover:bg-blue-200 p-2 rounded-lg cursor-pointer">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/027/312/306/non_2x/portrait-of-a-dj-with-headphone-isolated-essential-workers-avatar-icons-characters-for-social-media-and-networking-user-profile-website-and-app-3d-render-illustration-png.png"
                  alt="User Avatar"
                  className="w-[20px] h-[20px] rounded-full object-cover"
                />
                <div className="text-[14px] mx-2">Ngọc Khải</div>
              </div>
            ) : (
              <div className="flex items-center justify-center cursor-pointer">
                <div
                  onClick={() => handleOpenModal()}
                  className="flex mx-2 text-primary hover:bg-blue-200 p-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 mx-2"
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
                    <div className="flex flex-col pb-4 justify-center items-center">
                    </div>
                    <div className="flex justify-center items-center hover:underline transition duration-150 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                        />
                      </svg>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 w-full text-sm text-white"
                      >
                        Thông tin tài khoản
                      </Link>
                    </div>
                    <div className="flex justify-center items-center hover:underline transition duration-150 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                        />
                      </svg>
                      <Link
                        to="/mytickets"
                        className="block px-4 py-2 w-full text-sm text-white"
                      >
                        Đơn hàng của tôi
                      </Link>
                    </div>
                    <div className="flex justify-center items-center hover:underline transition duration-150 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>
                      <div onClick={handleLogout} className="block px-4 py-2 w-full text-sm text-white">
                        Đăng xuất
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <AuthModal show={showModal} onClose={handleCloseModal}></AuthModal>
            <div className="flex items-center justify-center">
              <div className="flex mx-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 relative"
                >
                  <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z" />
                  <path
                    fillRule="evenodd"
                    d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute w-[12px] h-[12px] top-[30px] ml-3 rounded-full bg-red-500 text-white text-[8px]">
                  0
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-[1px] bg-gray-400 h-[24px] mx-2"></div>
              <div className="flex items-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 relative"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute w-[12px] h-[12px] top-[30px] ml-4 rounded-full bg-red-500 text-white text-[8px]">
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-secondary text-white h-[60%] flex items-center justify-center">
          Hello
        </div>
      </div>
    </>
  );
};
export default Header;
