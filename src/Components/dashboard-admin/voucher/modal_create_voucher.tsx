import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { FaBan } from "react-icons/fa";
import { toast } from "react-toastify";
import { getToken } from "src/utils/localStorage/token";
import {
  useCreateAdminVoucherMutation,
  useGetAllVoucherAdminQuery,
} from "src/redux/rtkQuery/admin";
import { RiCoupon3Fill } from "react-icons/ri";

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

interface AdminVoucherDataToCreate {
  type: string;

  name: string;

  code: string;

  time_start: Date | "";

  time_end: Date | "";

  percent: number;

  maximum_reduction: number;

  minimum_order_value: number;

  maximum_total_usage: number;

  is_public: boolean;
}

interface modalCreateAdminVoucherProps {
  openModalCreateVoucher: boolean;
  handleClose: () => void;
  handleRefetch: () => void
}

// interface banShopForAdmin {
//   id_banShopForAdmin: string;
//   id_shop: string;
//   banStartDate: Date;
//   banEndDate: Date;
//   numberOfBan: number;
//   reasonBan: string;
// }

// interface banShopData {
//   banStartDate: Date | "";
//   banEndDate: Date | "";
//   reasonBan: string;
// }

const AdminModalCreateVoucher: React.FC<modalCreateAdminVoucherProps> = ({
  openModalCreateVoucher,
  handleClose,
  handleRefetch
}) => {
  const [adminVoucherDataToCreate, setAdminVoucherDataToCreate] =
    useState<AdminVoucherDataToCreate>({
      type: "Hoàn tiền",

      name: "",

      code: "",

      time_start: "",

      time_end: "",

      percent: 0,

      maximum_reduction: 0,

      minimum_order_value: 0,

      maximum_total_usage: 0,

      is_public: false,
    });

  // Validate min date
  const today = new Date().toISOString().split("T")[0];
  let minEndDateString = "";

  if (adminVoucherDataToCreate.time_start) {
    const minEndDate = new Date(adminVoucherDataToCreate.time_start);
    minEndDate.setDate(minEndDate.getDate() + 1);
    minEndDateString = minEndDate?.toISOString().split("T")[0];
  }
  const [createAdminVoucher] = useCreateAdminVoucherMutation();
  const token = getToken("access_token");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: "",

    code: "",

    time_start: "",

    time_end: "",

    percent: "",

    maximum_reduction: "",

    minimum_order_value: "",

    maximum_total_usage: "",
  });

  // Method

  const handleChangeIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminVoucherDataToCreate((prevData) => ({
      ...prevData,
      is_public: isPublic,
      [name]: value,
    }));
  };

  const handleSubmitCreateAdminVoucher = async () => {
    try {
      if (token !== null && validate()) {
        const response = await createAdminVoucher({
          data: adminVoucherDataToCreate,
          token: token,
        }).unwrap();
        if (response.status === 201) {
          toast.success(response.message);
          handleClose();
          handleRefetch()
        } else if (response.status === 400) {
          toast.error(response.message);
        } else {
          toast.warning(response.message);
          handleClose();
        }
      } else if (!validate()) {
        toast.warning(
          "Vui lòng nhập đầy đủ các trường cần thiết trước khi nhấn tạo voucher !"
        );
      } else if (token == null) {
        toast.warning("Token rỗng !!!");
      }
    } catch (error) {
      console.log("error at create admin voucher", error);
    }
  };

  useEffect(() => {
    console.log("AdminVoucherDataToCreate", adminVoucherDataToCreate);
    console.log("token", token);
  }, [adminVoucherDataToCreate]);

  // Validate modal
  const validate = () => {
    let tempErrors = {
      name: "",

      code: "",

      time_start: "",

      time_end: "",

      percent: "",

      maximum_reduction: "",

      minimum_order_value: "",

      maximum_total_usage: "",
    };

    if (adminVoucherDataToCreate.name == "")
      tempErrors.name = "Tên voucher không được để trống !";
    if (adminVoucherDataToCreate.code == "")
      tempErrors.code = "Mã voucher không được để trống !";
    if (!adminVoucherDataToCreate.percent)
      tempErrors.percent = "Phần trăm giảm không được để trống !";
    if (adminVoucherDataToCreate.percent > 100)
      tempErrors.percent = "Phần trăm giảm không được lớn hơn 100%";
    if (adminVoucherDataToCreate.percent < 0)
      tempErrors.percent = "Phần trăm giảm phải lớn hơn 0";
    if (!adminVoucherDataToCreate.maximum_reduction)
      tempErrors.maximum_reduction = "Giảm tối đa không được để trống !";
    if (!adminVoucherDataToCreate.minimum_order_value)
      tempErrors.minimum_order_value =
        "Giá trị đơn hàng tối thiểu không được để trống !";
    if (!adminVoucherDataToCreate.maximum_total_usage)
      tempErrors.maximum_total_usage = "Số lượng sử dụng không được để trống";
    if (!adminVoucherDataToCreate.time_start)
      tempErrors.time_start = "Ngày bắt đầu không được để trống !";
    if (!adminVoucherDataToCreate.time_end)
      tempErrors.time_end = "Ngày kết thúc không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  if (!openModalCreateVoucher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-xl animate__bounceInDown animate__animated overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 bg-emerald-500 text-white uppercase text-center py-4">
          TechTribe-Ecommerce create voucher
        </h2>
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="min-w-64">
              <label className="block text-base font-medium text-gray-700 mb-1 ">
                Tên voucher
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Nhập tên voucher..."
                className="w-full p-2 border rounded text-black"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="min-w-64">
              <label className="block text-base font-medium text-gray-700 mb-1 ">
                Mã voucher
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="code"
                placeholder="Nhập mã voucher..."
                className="w-full p-2 border rounded text-black"
              />
              {errors.code && (
                <p className="text-red-500 text-xs">{errors.code}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="mb-4 min-w-64">
              <label className="block text-base font-medium text-gray-700 mb-1 ">
                Ngày bắt đầu
              </label>
              <input
                min={today}
                onChange={handleChange}
                type="date"
                name="time_start"
                className=" w-full p-2 border rounded text-black"
              />
              {errors.time_start && (
                <p className="text-red-500 text-xs">{errors.time_start}</p>
              )}
            </div>
            <div className="mb-4 min-w-64">
              <label className="block text-base font-medium text-gray-700 mb-1 ">
                Ngày kết thúc
              </label>
              <input
                min={minEndDateString}
                onChange={handleChange}
                type="date"
                name="time_end"
                className=" w-full p-2 border rounded text-black"
              />
              {errors.time_end && (
                <p className="text-red-500 text-xs">{errors.time_end}</p>
              )}
            </div>
          </div>
          <p className="block text-base font-medium text-gray-700 mb-1 ">
            Kiểu voucher
          </p>
          <div className="mb-4 text-sm flex justify-between">
            <div className="mb-4 text-sm flex items-start">
              <div className="me-2">
                <input
                  onChange={handleChange}
                  className=" duration-300"
                  type="radio"
                  name="type"
                  value="Hoàn tiền"
                ></input>
                <label className="ms-1">Hoàn tiền</label>
              </div>
              <div className="me-2">
                <input
                  onChange={handleChange}
                  className=" duration-300"
                  type="radio"
                  name="type"
                  value="Hoàn xu"
                ></input>
                <label className="ms-1">Hoàn xu</label>
              </div>
            </div>
            <div className="items-end">
              <div className="">
                <label className="me-2">Công khai voucher</label>
                <input
                  onChange={handleChangeIsPublic}
                  checked={isPublic}
                  className="duration-300 rounded-sm outline-none"
                  type="checkbox"
                  name="is_public"
                ></input>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="max-w-24">
              {!errors.percent ? (
                <input
                  onChange={handleChange}
                  placeholder="% Giảm"
                  type="number"
                  min={0}
                  max={100}
                  name="percent"
                  className="w-full p-2 border rounded text-black text-xs"
                />
              ) : (
                <input
                  onChange={handleChange}
                  placeholder="% Giảm"
                  type="number"
                  min={0}
                  max={100}
                  name="percent"
                  className="w-full p-2 rounded text-black text-xs border-red-500 border-2"
                />
              )}
            </div>
            <div className="max-w-32">
              {!errors.maximum_reduction ? (
                <input
                  onChange={handleChange}
                  placeholder="Giảm tối đa"
                  type="number"
                  min={0}
                  name="maximum_reduction"
                  className="w-full p-2 border rounded text-black text-xs"
                />
              ) : (
                <input
                  onChange={handleChange}
                  placeholder="Giảm tối đa"
                  type="number"
                  min={0}
                  name="maximum_reduction"
                  className="w-full p-2 rounded text-black text-xs border-2 border-red-500"
                />
              )}
            </div>
            <div className="max-w-36">
              {!errors.minimum_order_value ? (
                <input
                  onChange={handleChange}
                  placeholder="Đơn hàng tối thiểu"
                  type="number"
                  min={0}
                  name="minimum_order_value"
                  className="w-full p-2 border rounded text-black text-xs"
                />
              ) : (
                <input
                  onChange={handleChange}
                  placeholder="Đơn hàng tối thiểu"
                  type="number"
                  min={0}
                  name="minimum_order_value"
                  className="w-full p-2 border-2 border-red-500 rounded text-black text-xs"
                />
              )}
            </div>
            <div className="max-w-32">
              {!errors.maximum_total_usage ? (
                <input
                  onChange={handleChange}
                  placeholder="Lượt dùng tối đa"
                  type="number"
                  min={0}
                  name="maximum_total_usage"
                  className="w-full p-2 border rounded text-black text-xs"
                />
              ) : (
                <input
                  onChange={handleChange}
                  placeholder="Lượt dùng tối đa"
                  type="number"
                  min={0}
                  name="maximum_total_usage"
                  className="w-full p-2 border-2 border-red-500 rounded text-black text-xs"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 duration-300 text-white rounded mr-2"
            >
              Hủy X
            </button>
            <button
              onClick={handleSubmitCreateAdminVoucher}
              className=" cursor-pointer px-4 py-2 bg-green-100 duration-300 text-green-500 hover:text-green-600 rounded flex items-center"
            >
              Tạo <RiCoupon3Fill className="ms-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModalCreateVoucher;
