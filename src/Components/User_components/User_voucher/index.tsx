import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLock, faTicket } from "@fortawesome/free-solid-svg-icons";

const ComponentUserVoucher: React.FC = () => {
  return (
    <div>
      <div className="m-4 flex justify-between">
        <div className="title text-left ">
          <div className="text-lg font-normal pb-1">Kho voucher</div>
        </div>
        <div className="flex items-center text-sm justify-between ">
          <div className=" text-primary pe-2 border-r">Tìm thêm voucher</div>
          <div className=" text-primary pe-2 ps-2 border-r">
            Xem lịch sử voucher
          </div>
          <div className="ps-2 font-light">Tìm hiểu</div>
        </div>
      </div>
      <div className="m-4 bg-gray-200 rounded-sm border-b">
        <div className="flex items-center justify-center py-7 m-auto">
          <div className="me-4">Mã Voucher</div>
          <input
            className="appearance-none block bg-white text-gray-700 border border-white rounded py-3 px-4 me-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[450px]"
            id="grid-last-name"
            type="text"
            placeholder="Nhập mã voucher tại đây"
          />
          <button
            className="shadow text-xl bg-primary hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            type="button"
          >
            Lưu
          </button>
        </div>
      </div>
      <div className="title text-left m-4 border-b">
        <div className="text-lg font-normal pb-1">Tất cả voucher</div>
      </div>
      <div className="grid grid-cols-12 gap-4 m-4">
        <div className=" col-span-6">
          <div className="flex items-center border rounded-sm shadow ">
            <div className="w-28 h-28 bg-primary flex flex-col items-center justify-center text-white border-dotted border-l-8">
              <FontAwesomeIcon className="text-3xl" icon={faTicket} />
              <div className="mt-2">TechTribe</div>
            </div>
            <div className="text-left ps-4">
              <div className=" font-normal">Giảm 12% Giảm tối đa ₫150k</div>
              <div className=" text-sm font-normal pb-2">Đơn Tối Thiểu ₫1tr</div>
              <div className=" text-xs font-light">
                <FontAwesomeIcon className="pe-2" icon={faClock} />
                Có hiệu lực từ: 29.06.2024
              </div>
            </div>
            <div className=" ml-10 text-right text-xs p-2 border rounded border-primary text-primary">
                Dùng ngay
            </div>
          </div>
        </div>
        <div className=" col-span-6">
          <div className="flex items-center border rounded-sm shadow ">
            <div className="w-28 h-28 bg-primary flex flex-col items-center justify-center text-white border-dotted border-l-8">
              <FontAwesomeIcon className="text-3xl" icon={faTicket} />
              <div className="mt-2">TechTribe</div>
            </div>
            <div className="text-left ps-4">
              <div className=" font-normal">Giảm 12% Giảm tối đa ₫150k</div>
              <div className=" text-sm font-normal pb-2">Đơn Tối Thiểu ₫1tr</div>
              <div className=" text-xs font-light">
                <FontAwesomeIcon className="pe-2" icon={faClock} />
                Có hiệu lực từ: 29.06.2024
              </div>
            </div>
            <div className=" ml-10 text-right text-xs p-2 border rounded border-primary text-primary">
                Dùng ngay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentUserVoucher;
