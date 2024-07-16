import {
  faArrowAltCircleRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ComponentUserCoin: React.FC = () => {
  return (
    <div className="p-4">
      <div className=" my-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <div className="flex items-center me-4">
            <img
              className=" w-12 h-12"
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/coins/75efaf1b556a8e2fac6a.png"
              alt=""
            />
            <div className=" text-yellow-400 text-xl ps-2">1000</div>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-yellow-400 text-lg">Xu đang có</div>
            <div className="text-base font-light">
              1000 Shopee Xu sẽ hết hạn vào 31-07-2024
              <FontAwesomeIcon
                className="text-sm font-light ms-1"
                icon={faChevronRight}
              />
            </div>
          </div>
        </div>
        <div className="text-yellow-400 text-lg font-normal">
          Nhận thêm xu!
          <FontAwesomeIcon className="ms-2 text-sm" icon={faChevronRight} />
        </div>
      </div>

      <div className="">
        <div className="text-xl p-4 text-left border-b border-primary w-full text-primary">
          Tất cả lịch sử
        </div>
      </div>

      <div className="flex justify-between border-b">
        <div className="flex my-4">
          <div className="img w-20 h-20 me-3">
            <img
              src="https://down-vn.img.susercontent.com/file/1cee94a6fed95144d2674dad1f8b035c_tn"
              alt=""
            />
          </div>
          <div className="desc text-left">
            <div className="product-name font-normal">Tên sản phẩm</div>
            <div className="classification font-light text-gray-500 text-sm">
              Đã sử dụng Techtribe xu để thanh toán
            </div>
            <div className="quantity font-light text-sm mt-1">
              Thời gian (14:20 25/06/2024)
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" text-lg font-normal ">
            -400
          </div>
        </div>
      </div>

      <div className="flex justify-between border-b">
        <div className="flex my-4">
          <div className="img w-20 h-20 me-3">
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/coins/75efaf1b556a8e2fac6a.png"
              alt=""
            />
          </div>
          <div className="desc text-left">
            <div className="product-name font-normal">Quà tặng Techtribe xu</div>
            <div className="classification font-light text-gray-500 text-sm">
              Nhận Techtribe xu thành công
            </div>
            <div className="quantity font-light text-sm mt-1">
              Thời gian (14:20 25/06/2024)
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" text-lg font-normal text-yellow-400 ">
            +400
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentUserCoin;
