import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminModalCreateVoucher from "./modal_create_voucher";

const AdminVoucherComponent: React.FC = () => {
  const [setOpenModal, setOpenModalsetOpenModal] = useState(false);
  const handleOpen = () => setOpenModalsetOpenModal(true);
  const handleClose = () => setOpenModalsetOpenModal(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className=" mt-2 ms-2 flex items-center mb-4 text-gray-100 ">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
        <div className="text-gray-700">/</div>
        <div className="ms-2 text-gray-700">Voucher</div>
      </div>
      <div className="flex  justify-end pe-2">
        <button onClick={handleOpen} className="rounded p-6 text-green-500 bg-green-200 bg-opacity-80 hover:text-green-600 text-base cursor-pointe duration-200 ms-2 py-1">
          + Tạo voucher
        </button>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className="px-4 py-2">Tên voucher</th>
            <th className="px-4 py-2">Mã voucher</th>
            <th className="px-4 py-2">Kiểu voucher</th>
            <th className="px-4 py-2">Ngày bắt đầu</th>
            <th className="px-4 py-2">Ngày kết thúc</th>
            <th className="px-4 py-2 text-center">Mô tả</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 font-light"> Mã vận chuyển </td>
            <td className="px-4 py-2 font-light uppercase"> vanchuyen123 </td>
            <td className="px-4 py-2 font-light"> Giảm giá</td>
            <td className="px-4 py-2 font-light"> 12/12/2024</td>
            <td className="px-4 py-2 font-light"> 15/12/2024</td>
            <td className="px-4 py-2 font-light">
              {" "}
              Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé!Giảm 15% Đơn Tối
              Thiểu ₫60k Giảm tối đa ₫20k{" "}
            </td>
            <td className="px-4 py-2 font-light text-center">
              <button className="rounded min-w-16 text-amber-500 bg-amber-200 bg-opacity-80 hover:text-amber-600 hover:bg-amber-400 text-sm cursor-pointe duration-200 ms-2 py-1">
                Ban
              </button>
            </td>
          </tr>
          <AdminModalCreateVoucher openModalCreateVoucher ={setOpenModal} handleClose={handleClose}/>
        </tbody>
        {/* <tbody>
          {shops?.map(shop => (
            <tr key={shop._id} className="border-b text-gray-700 text-left font-mono">
              <td className="px-4 py-2 flex justify-start items-center">
                <div className=" overflow-hidden me-2 ">
                  <img className=" w-16 h-16 rounded-full object-cover border"
                    src={shop.thumbnail}
                    alt=""
                  />
                </div>
                <p className="items-start font-bold">{shop.name}</p>
              </td>
              <td className="px-4 py-2 font-light"> {shop.countFollower}</td>
              <td className="px-4 py-2 font-light"> {shop.description}</td>
              <td className="px-4 py-2 font-light">{shop.start}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => (handleOpen(), setIdShop(shop._id))} className="rounded min-w-16 text-amber-500 bg-amber-200 bg-opacity-80 hover:text-amber-600 hover:bg-amber-400 text-sm cursor-pointe duration-200 ms-2 py-1">
                  Ban
                </button>
              </td>
            </tr>
          ))}
          <AdminFormBanShopComponent openFormBanShop={openFormBanShop} id_shop= {idShop} handleClose={handleClose}   />
        </tbody> */}
      </table>
    </div>
  );
};

export default AdminVoucherComponent;
