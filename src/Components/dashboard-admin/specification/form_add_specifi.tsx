import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { getToken } from "src/utils/localStorage/token";
import { RiCoupon3Fill } from "react-icons/ri";
import { useCreateCategoryMutation } from "src/redux/rtkQuery/category";
import { useCreateSpecifiMutation } from "src/redux/rtkQuery/specifications";

interface AdminSpectifiDataToCreate {
  name: string;
}

interface modalCreateAdminVoucherProps {
  openModalCreateVoucher: boolean;
  handleClose: () => void;
  handleRefetch: () => void;
}

const AdminFormAddSpecifi: React.FC<modalCreateAdminVoucherProps> = ({
  openModalCreateVoucher,
  handleClose,
  handleRefetch,
}) => {
  const [adminSpecifiDataToCreate, setAdminSpecifiDataToCreate] =
    useState<AdminSpectifiDataToCreate>({
      name: "",
    });

  // Validate min date
  const [createSpecifi] = useCreateSpecifiMutation();
  const token = getToken("access_token");
  const [errors, setErrors] = useState({
    name: "",
  });

  // Method
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminSpecifiDataToCreate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitCreateCategory = async () => {
    try {
      if (validate() ) {
        const response = await createSpecifi(adminSpecifiDataToCreate).unwrap();
        if (response.status === 201) {
          toast.success(response.message);
          // handleClose();
          handleRefetch();
        } else if (response.status === 400) {
          toast.error(response.message);
        } else {
          toast.warning(response.message);
          // handleClose();
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
    console.log("adminSpecifiDataToCreate", adminSpecifiDataToCreate);
    console.log("token", token);
  }, [adminSpecifiDataToCreate]);

  // Validate modal
  const validate = () => {
    let tempErrors = {
      name: "",
    };

    if (adminSpecifiDataToCreate.name == "")
      tempErrors.name = "Tên danh mục không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  if (!openModalCreateVoucher) return null;

  return (
    <div className="w-full max-w-xl px-2 animate__backInDown animate__animated overflow-hidden me-2">
      <div className="">
        <div className=" flex items-center">
          
          <div className="min-w-64 me-2">
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Nhập tên thông số..."
              className="w-full p-1 text-sm border rounded text-black active:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmitCreateCategory}
              className=" cursor-pointer px-4 py-1 me-1 bg-green-100 duration-300 text-green-500 hover:text-green-600 rounded flex items-center"
            >
              Tạo <RiCoupon3Fill className="ms-1" />
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-1 me-1 bg-gray-300 hover:bg-gray-400 duration-300 text-white rounded mr-2"
            >
              Hủy X
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminFormAddSpecifi;
