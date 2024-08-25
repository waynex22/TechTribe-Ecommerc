import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { getToken } from "src/utils/localStorage/token";
import { RiCoupon3Fill } from "react-icons/ri";
import { useCreateCategoryMutation } from "src/redux/rtkQuery/category";

interface AdminSpectifiDataToCreate {
  name: string;
}

interface modalCreateAdminVoucherProps {
  openModalCreateVoucher: boolean;
  handleClose: () => void;
  // handleRefetch: () => void;
}

const AdminModalAddSpecifi: React.FC<modalCreateAdminVoucherProps> = ({
  openModalCreateVoucher,
  handleClose,
  // handleRefetch,
}) => {
  const [adminCategoryDataToCreate, setAdminCategoryDataToCreate] =
    useState<AdminSpectifiDataToCreate>({
      name: "",
    });

  // Validate min date
  const [createCategory] = useCreateCategoryMutation();
  const token = getToken("access_token");
  const [errors, setErrors] = useState({
    name: "",
  });

  // Method
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCategoryDataToCreate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmitCreateCategory = async () => {
    // try {
    //   if (validate() ) {
    //     const response = await createCategory().unwrap();
    //     if (response.status === 201) {
    //       toast.success(response.message);
    //       handleClose();
    //       handleRefetch();
    //     } else if (response.status === 400) {
    //       toast.error(response.message);
    //     } else {
    //       toast.warning(response.message);
    //       handleClose();
    //     }
    //   } else if (!validate()) {
    //     toast.warning(
    //       "Vui lòng nhập đầy đủ các trường cần thiết trước khi nhấn tạo voucher !"
    //     );
    //   } else if (token == null) {
    //     toast.warning("Token rỗng !!!");
    //   }
    // } catch (error) {
    //   console.log("error at create admin voucher", error);
    // }
  };

  useEffect(() => {
    console.log("adminCategoryDataToCreate", adminCategoryDataToCreate);
    console.log("token", token);
  }, [adminCategoryDataToCreate]);

  // Validate modal
  const validate = () => {
    let tempErrors = {
      name: "",
    };

    if (adminCategoryDataToCreate.name == "")
      tempErrors.name = "Tên danh mục không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  if (!openModalCreateVoucher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-xl animate__bounceInDown animate__animated overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 bg-emerald-500 text-white uppercase text-center py-4">
          TechTribe-Ecommerce add Specification
        </h2>
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="min-w-64">
              <label className="block text-base font-medium text-gray-700 mb-1 ">
                Tên thông số
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Nhập tên thông số..."
                className="w-full p-2 border rounded text-black"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
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
              onClick={handleSubmitCreateCategory}
              className=" cursor-pointer px-4 py-2 bg-green-100 duration-300 text-green-500 hover:text-green-600 rounded flex items-center"
            >
              Tạo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModalAddSpecifi;
