import React from "react";

const ComponentUserAccountNotify: React.FC = () => {
  return (
    <div>
      <div className="title text-left m-4 border-b ">
        <div className="text-lg font-normal pb-1">Thông báo</div>
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
              Trạng thái vận chuyển (Đang giao | Đã hoàn thành)
            </div>
            <div className="classification font-light text-gray-500 text-sm">
              Đơn hàng <b className=" font-semibold text-base">mã đơn hàng</b>{" "}
              trạng thái (đang giao | đã hoàn thành)
            </div>
            <div className="quantity font-light text-sm mt-1">
              Thời gian (14:20 25/06/2024)
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" text-sm font-light p-2 border rounded">
            Đánh giá sản phẩm
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentUserAccountNotify;
