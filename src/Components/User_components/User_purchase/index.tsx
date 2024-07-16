import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCarSide,
  faEye,
  faMessage,
  faSearch,
  faShop,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

const ComponentUserPurchase: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between ps-4 pe-4 sticky mb-3 top-0 z-10 shadow bg-white ease-in-out duration-300 ">
        <Link
          to="#"
          className=" text-base pb-3 pt-3 active:text-primary hover:text-primary duration-300 active:border-b-primary"
        >
          Tất cả
        </Link>
        <Link
          to="#"
          className=" text-base pb-3 pt-3 active:text-primary hover:text-primary duration-300 active:border-b-primary"
        >
          Chờ thanh toán
        </Link>
        <Link
          to="#"
          className=" text-base pb-3 pt-3 active:text-primary hover:text-primary duration-300 active:border-b-primary"
        >
          Vận chuyển
        </Link>
        <Link
          to="#"
          className=" text-base pb-3 pt-3 active:text-primary hover:text-primary duration-300 active:border-b-primary"
        >
          Chờ giao hàng
        </Link>
        <Link
          to="#"
          className=" text-base pb-3 pt-3 active:text-primary hover:text-primary duration-300 active:border-b-primary"
        >
          Hoàn thành
        </Link>
        <Link
          to="#"
          className=" text-base pb-3 pt-3 active:text-primary hover:text-primary duration-300 active:border-b-primary"
        >
          Đã hủy
        </Link>
        <Link
          to="#"
          className=" text-base pb-3 pt-3 active:text-primary hover:text-primary duration-300 active:border-b-primary"
        >
          Trả hàng/Hoàn tiền
        </Link>
      </div>
      <div className="purchase-search flex items-center ps-4 pe-4 bg-gray-200 rounded-sm">
        <div className=" font-thin">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          className="outline-none bg-gray-200 rounded-lg ml-3 p-2 flex-grow text-[14px] font-light border-none w-full"
          type="search"
          placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
        />
      </div>
      <div className="flex items-center justify-between ms-4 me-4 mt-6 border-b pb-3">
        <div className="flex items-center justify-between">
          <div className=" text-sm me-4 font-light name-shop">
            <FontAwesomeIcon className="pe-1" icon={faStore} />
            shop-techtribe
          </div>
          <div className=" text-sm me-4 font-light chat-shop pt-1 pb-1 ps-3 pe-3 border bg-primary rounded text-white">
            <FontAwesomeIcon className="pe-1 text-xs" icon={faMessage} />
            Chat
          </div>
          <div className=" text-sm me-4 font-light view-shop border rounded p-1">
            <FontAwesomeIcon className="pe-1 text-xs" icon={faEye} />
            View shop
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm me-4 font-light name-shop text-green-400 border-r pe-2">
            <FontAwesomeIcon className="pe-1" icon={faCarSide} />
            Đơn hàng đang được giao (đã hoàn thành)
          </div>
          <div className=" uppercase text-base font-normal text-primary">
            (trạng thái)
          </div>
        </div>
      </div>

      <div className="flex justify-between  p-4 border-b">
        <div className="flex">
          <div className="img w-20 h-20 me-3">
            <img
              src="https://down-vn.img.susercontent.com/file/1cee94a6fed95144d2674dad1f8b035c_tn"
              alt=""
            />
          </div>
          <div className="desc text-left">
            <div className="product-name font-normal">
              Bút tạo khối che khuyết Lameila Geometry Play 101 Stick POS2
            </div>
            <div className="classification font-light text-gray-500 text-sm">
              Phân loại hàng: A10K2-1_#01
            </div>
            <div className="quantity font-light text-base">x1</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" line-through text-sm font-light pe-2 border-r">
            Giá cũ
          </div>
          <div className="ps-2 text-primary font-normal text-sm">Giá mới</div>
        </div>
      </div>

      <div className="p-4 mt-7 border-b-8">
        <div className=" font-normal text-right">
          <FontAwesomeIcon className="text-primary pe-1" icon={faAward} />
          Thành tiền: <span className=" text-xl text-primary"> 9.000đ</span>
        </div>
        <div className="text-right mt-6 mb-3">
          <button className=" text-base bg-primary hover:bg-blue-600 text-white font-light py-2 mr-2 rounded w-[160px]">
            Mua lại
          </button>
          <button className=" text-base bg-transparent hover:bg-blue-100 text-black font-light py-2 border border-gray-300 rounded w-[160px]">
            Liên hệ người bán
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentUserPurchase;
