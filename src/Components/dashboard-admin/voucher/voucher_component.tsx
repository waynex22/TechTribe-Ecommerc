import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminModalCreateVoucher from "./modal_create_voucher";
import {
  AdminVoucherDataToGet,
  useDeleteAdminVoucherMutation,
  useGetAllVoucherAdminQuery,
} from "src/redux/rtkQuery/admin";
import { toast } from "react-toastify";

const AdminVoucherComponent: React.FC = () => {
  const today = new Date();
  const [setOpenModal, setOpenModalsetOpenModal] = useState(false);
  const handleOpen = () => setOpenModalsetOpenModal(true);
  const handleClose = () => setOpenModalsetOpenModal(false);
  const { data: adminvouchers, refetch } = useGetAllVoucherAdminQuery({
    refetchOnMountOrArgChange: true,
  });
  const [expiredVoucher, setExpiredVoucher] = useState<AdminVoucherDataToGet[]>(
    []
  );
  const [validVoucher, setValidVoucher] = useState<AdminVoucherDataToGet[]>(
    []
  );
  const [deleteAdminVoucher] = useDeleteAdminVoucherMutation();

  const handleRefetch = () => {
    refetch();
  };

  const expired: AdminVoucherDataToGet[] = [];
  const valid: AdminVoucherDataToGet[] = [];

  // useEffect(() => {
  //   setExpiredVoucher(expired)
  // },[expired])

  useEffect(() => {
    // console.log("ExpiredVoucher",expiredVoucher);
    console.log("expired", expired);
  }, [expiredVoucher]);

  useEffect(() => {
    const validAdminVoucher = adminvouchers?.filter((voucher) => {
      console.log(voucher);
      const timeEnd = new Date(voucher["time_end"]);
      if (timeEnd < today) {
        // try {
        //   await deleteAdminVoucher(voucher._id)
        // }catch(error) {
        //   console.log("Lỗi khi xóa admin voucher",error)
        // }
        expired.push(voucher);
        return false;
      }else {
        valid.push(voucher)
      }
      setExpiredVoucher(expired);
      setValidVoucher(valid); 
      return true;
    });
  },[adminvouchers]);
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
        <button
          onClick={handleOpen}
          className="rounded p-6 text-green-500 bg-green-200 bg-opacity-80 hover:text-green-600 text-base cursor-pointe duration-200 me-2 py-1"
        >
          + Tạo voucher
        </button>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className=" p-2">Tên voucher</th>
            <th className=" p-2">Mã voucher</th>
            <th className=" p-2 w-24">Kiểu voucher</th>
            <th className=" p-2">Ngày bắt đầu</th>
            <th className=" p-2">Ngày kết thúc</th>
            <th className=" p-2">Phần trăm giảm</th>
            <th className=" p-2">Mức giảm tối đa</th>
            <th className=" p-2 text-center">Giá trị đơn hàng tối thiểu</th>
            <th className=" p-2 text-center">Đã nhận/Còn lại</th>
            <th className=" p-2 text-center w-36">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {validVoucher && validVoucher.length > 0
            ? validVoucher.map((adminvoucher) => (
                <tr className="font-mono border-b border-dashed">
                  <td className="p-2 text-primary font-light">
                    
                    {adminvoucher.name}
                  </td>
                  <td className="p-2  font-semibold"> {adminvoucher.code} </td>
                  <td className="p-2 text-primary font-light">
                    
                    {adminvoucher.type}
                  </td>
                  <td className="p-2 text-primary font-light">
                    
                    {adminvoucher.time_start.toString()}
                  </td>
                  <td className="p-2 text-primary font-light">
                    
                    {adminvoucher.time_end.toString()}
                  </td>
                  <td className="p-2 text-primary font-light">
                    
                    <span className="text-primary">
                      {adminvoucher.percent}%
                    </span>
                  </td>
                  <td className="p-2 text-primary font-light">
                    
                    <span className="text-primary">
                      {adminvoucher.maximum_reduction}₫
                    </span>
                  </td>
                  <td className="p-2 text-gray-500 font-light text-center">
                    
                    <span className="text-primary">
                      
                      {adminvoucher.minimum_order_value}₫
                    </span>
                  </td>
                  <td className="p-2 text-gray-500 font-light text-center">
                    
                    <span className="text-primary">
                      {adminvoucher.id_customer.length}/
                      {adminvoucher.maximum_total_usage}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-light text-center">
                    <button className="text-xs rounded min-w-16 text-green-500 bg-green-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2">
                      Đang diễn ra
                    </button>
                  </td>
                </tr>
              ))
            : null }
            {expiredVoucher.map((adminvoucher) => (
                <tr className="font-mono border-b border-dashed text-gray-500">
                  <td className="p-2  font-light">
                    
                    {adminvoucher.name}
                  </td>
                  <td className="p-2  font-semibold"> {adminvoucher.code} </td>
                  <td className="p-2  font-light">
                    
                    {adminvoucher.type}
                  </td>
                  <td className="p-2  font-light">
                    
                    {adminvoucher.time_start.toString()}
                  </td>
                  <td className="p-2  font-light">
                    
                    {adminvoucher.time_end.toString()}
                  </td>
                  <td className="p-2  font-light">
                    
                    <span className="">
                      {adminvoucher.percent}%
                    </span>
                  </td>
                  <td className="p-2  font-light">
                    
                    <span className="">
                      {adminvoucher.maximum_reduction}₫
                    </span>
                  </td>
                  <td className="p-2 text-gray-500 font-light text-center">
                    
                    <span className="">
                      
                      {adminvoucher.minimum_order_value}₫
                    </span>
                  </td>
                  <td className="p-2 text-gray-500 font-light text-center">
                    
                    <span className="">
                      {adminvoucher.id_customer.length}/
                      {adminvoucher.maximum_total_usage}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-light text-center">
                    <button className="text-xs rounded min-w-16 text-orange-500 bg-orange-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2">
                      Đã kết thúc
                    </button>
                  </td>
                </tr>
              ))}
          <AdminModalCreateVoucher
            openModalCreateVoucher={setOpenModal}
            handleClose={handleClose}
            handleRefetch={handleRefetch}
          />
        </tbody>
      </table>
    </div>
  );
};

export default AdminVoucherComponent;
