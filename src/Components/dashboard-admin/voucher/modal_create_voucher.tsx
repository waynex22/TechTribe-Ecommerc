import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { FaBan } from "react-icons/fa";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface banShopDataInFormBanShop {
  banStartDate: Date;
  banEndDate: Date;
  reasonBan: string;
}

interface formBanShopProps {
  openModalCreateVoucher: boolean;
  handleClose: () => void;
  //   handleSubmit: (banShopData: banShopDataInFormBanShop) => void;
  //   handleOnChange: (
  //     banStartDate: Date,
  //     banEndDate: Date,
  //     reasonBan: string
  //   ) => void;
}

interface banShopForAdmin {
  id_banShopForAdmin: string;
  id_shop: string;
  banStartDate: Date;
  banEndDate: Date;
  numberOfBan: number;
  reasonBan: string;
}

interface banShopData {
  banStartDate: Date | "";
  banEndDate: Date | "";
  reasonBan: string;
}

const AdminModalCreateVoucher: React.FC<formBanShopProps> = ({
  openModalCreateVoucher,
  handleClose,
  //   handleOnChange,
}) => {
  //   useEffect(() => {
  //     console.log("ID Shop:", id_shop);
  //     console.log("Data:", shop);
  //     console.log("banShopData", banShopData);
  //     console.log("Status ban", status);
  //     console.log("Errors validate", errors);
  //   }, [id_shop, banShopData, errors]);

  //   const validate = () => {
  //     let tempErrors = { banStartDate: "", banEndDate: "", reasonBan: "" };

  //     if (banShopData.banStartDate == "")
  //       tempErrors.banStartDate = "Ngày bắt đầu cấm không được để trống !";
  //     if (banShopData.banEndDate == "")
  //       tempErrors.banEndDate = "Ngày kết thúc cấm không được để trống  !";
  //     // if(banShopData.banEndDate >= banShopData.banStartDate )
  //     //   tempErrors.banEndDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu !";
  //     if (!banShopData.reasonBan)
  //       tempErrors.reasonBan = "Lý do cấm không được để trống !";
  //     setErrors(tempErrors);
  //     return Object.values(tempErrors).every((x) => x === "");
  //   };

  if (!openModalCreateVoucher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl animate__bounceInDown animate__animated">
        <h2 className="text-xl font-semibold mb-4 text-green-500 uppercase text-center">
          Modal create voucher
        </h2>

        <div className="mb-4 flex justify-between items-center">
          <div className="min-w-64">
            <label className="block text-base font-medium text-gray-700 mb-1 ">
              Tên voucher
            </label>
            <input
              type="text"
              min={0}
              name="name"
              placeholder="Nhập tên voucher..."
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div className="min-w-64">
            <label className="block text-base font-medium text-gray-700 mb-1 ">
              Mã voucher
            </label>
            <input
              type="text"
              min={0}
              name="minimum_order_value"
              placeholder="Nhập mã voucher..."
              className="w-full p-2 border rounded text-black uppercase"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="mb-4 min-w-64">
            <label className="block text-base font-medium text-gray-700 mb-1 ">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              name="time_start"
              className=" w-full p-2 border rounded text-black"
            />
          </div>
          <div className="mb-4 min-w-64">
            <label className="block text-base font-medium text-gray-700 mb-1 ">
              Ngày kết thúc
            </label>
            <input
              type="date"
              name="time_end"
              className=" w-full p-2 border rounded text-black"
            />
          </div>
        </div>
          <p className="block text-base font-medium text-gray-700 mb-1 ">
            Kiểu voucher
          </p>
        <div className="mb-4 text-sm flex items-start">
          <div className="me-2">
            <input className=" duration-300" type="radio" id="html" name="type" value="Hoàn tiền"></input>
            <label className="ms-1" htmlFor="html">
              Hoàn tiền
            </label>
          </div>
          <div className="me-2">
            <input className=" duration-300" type="radio" id="css" name="type" value="Hoàn xu"></input>
            <label className="ms-1" htmlFor="css">
              Hoàn xu
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="max-w-24">
            <input
              placeholder="% Giảm"
              type="number"
              min={0}
              max={100}
              name="percent"
              className="w-full p-2 border rounded text-black text-xs"
            />
          </div>
          <div className="max-w-32">
            <input
              placeholder="Giảm tối thiểu"
              type="number"
              min={0}
              name="maximum_reduction"
              className="w-full p-2 border rounded text-black text-xs"
            />
          </div>
          <div className="max-w-36">
            <input
              placeholder="Đơn hàng tối thiểu"
              type="number"
              min={0}
              name="minimum_order_value"
              className="w-full p-2 border rounded text-black text-xs"
            />
          </div>
          <div className="max-w-32">
            <input
              placeholder="Lượt dùng tối đa"
              type="number"
              min={0}
              name="maximum_total_usage"
              className="w-full p-2 border rounded text-black text-xs"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 duration-300 text-white rounded mr-2"
          >
            Hủy X
          </button>
          <button className="  cursor-not-allowed px-4 py-2 bg-gray-500 duration-300 text-white rounded flex items-center">
            Cấm <FaBan className="ms-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModalCreateVoucher;
