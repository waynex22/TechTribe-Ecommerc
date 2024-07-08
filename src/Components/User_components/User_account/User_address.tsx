import React from "react";

const ComponentUserAddress: React.FC = () => {
  return (
    <>
      <div className=" flex items-center justify-between p-6 border-b">
        <div className="text-lg font-normal">Địa chỉ của tôi</div>
        <div>
          <button
            className="shadow bg-primary hover:bg-blue-400 duration-300 focus:shadow-outline focus:outline-none text-white font-normal text-base py-2 px-4 rounded-sm"
            type="button"
          >
            + Thêm địa chỉ mới
          </button>
        </div>
      </div>

      <div className="text-xl font-normal p-6">Tất cả địa chỉ</div>

      <div className="flex items-center justify-between mx-6 mb-6 border-b pb-4">
        <div>
          <div className="flex items-center">
            <div className="font-normal text-lg pe-2 border-r">Phạm Thế An</div>

            <div className="font-light text-gray-500 text-sm ps-2 ">
              0987014964
            </div>
          </div>
          <div className="font-light text-gray-500 text-sm py-1">
            166/5, Trường Chinh Phường Hòa An, Quận Cẩm Lệ, Đà Nẵng
          </div>

          <div>
            <button
              className="shadow duration-300 cursor-text text-primary border border-primary font-normal text-sm py-1 px-2 rounded-sm"
              type="button"
            >
              Mặc định
            </button>
          </div>
        </div>

        <div className="flex items-end flex-col">
            <div className="text-primary font-medium text-base">
                Cập nhật
            </div>
            <div>
            <button
              className="shadow duration-300 hover:bg-slate-100 my-2 text-black border border-gray-500 font-normal text-sm py-1 px-2 rounded-sm"
              type="button"
            >
              Thiết lập mặc định
            </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default ComponentUserAddress;
