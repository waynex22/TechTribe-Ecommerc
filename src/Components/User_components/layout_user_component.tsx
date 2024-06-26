import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClipboard,
  faCoins,
  faPen,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link } from "react-router-dom";
const LayoutUserComponent: React.FC = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="grid  grid-cols-12 gap-4 max-w-[1200px] m-auto pt-5 pb-8">
        <div className="col-span-2">
          <div className="flex pb-3 items-center">
            <div className="text-2xl border border-gray-300 rounded-full w-14 h-14 relative">
              <div className="text-2xl absolute overflow-hidden h-full w-full block">
                <img
                  src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col justify-center ps-4">
              <div className=" text-left">Ten user</div>
              <a href="/user" className=" font-light text-sm text-gray-500">
                <FontAwesomeIcon icon={faPen} /> Sửa hồ sơ
              </a>
            </div>
          </div>
          <hr />
          <div className=" mt-7">
            <div className="your-account mb-3">
              <Link to="account/profile" className="flex items-center">
                <div className="text-xl text-primary pb-2">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <span className="text-gray-700 text-sm ps-2 hover:text-primary">
                  Tài Khoản Của Tôi
                </span>
              </Link>
              <div className=" text-left ps-7">
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/profile">Hồ Sơ</Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/payment">Ngân Hàng</Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/address">Địa chỉ </Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/password">Đổi Mật Khẩu</Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/notification">Cài Đặt Thông Báo</Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/privacy">
                    Những Thiết Lập Riêng Tư
                  </Link>
                </div>
              </div>
            </div>
            <div className="your-purchase mb-3">
              <Link to="purchase/" className="flex items-center">
                <div className="text-xl text-primary">
                  <FontAwesomeIcon icon={faClipboard} />
                </div>
                <span className="text-gray-700 text-sm ps-2 hover:text-primary">
                  Đơn Mua
                </span>
              </Link>
            </div>
            <div className="your-notification mb-3">
              <Link to="notification/order" className="flex items-center pb-1">
                <div className="text-xl text-primary">
                  <FontAwesomeIcon icon={faBell} />
                </div>
                <span className="text-gray-700 text-sm ps-2 hover:text-primary">
                  Thông Báo
                </span>
              </Link>
              <div className=" text-left ps-7">
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="notification/order">Cập Nhật Đơn Hàng</Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/payment">Khuyến Mãi</Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/address">Cập Nhật Ví</Link>
                </div>
                <div className="hover:text-primary active:text-primary text-sm text-gray-700 font-normal pb-2">
                  <Link to="account/password">Cập Nhật Shopee</Link>
                </div>
              </div>
            </div>
            <div className="your-voucher-wallet mb-3">
              <Link to="voucher-wallet/" className="flex items-center">
                <div className="text-xl text-primary">
                  <FontAwesomeIcon icon={faTicket} />
                </div>
                <span className="text-gray-700 text-sm ps-2 hover:text-primary">
                  Kho Voucher
                </span>
              </Link>
            </div>
            <div className="your-coin mb-3">
              <Link to="coin/" className="flex items-center">
                <div className="text-xl text-primary">
                  <FontAwesomeIcon icon={faCoins} />
                </div>
                <span className="text-gray-700 text-sm ps-2 hover:text-primary">
                  TechTriber Coin
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-10 shadow-md bg-white rounded">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutUserComponent;
