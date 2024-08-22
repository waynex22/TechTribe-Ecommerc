import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { getToken } from "src/utils/localStorage/token";
import { RiCoupon3Fill } from "react-icons/ri";
import { useCreateCategoryMutation } from "src/redux/rtkQuery/category";

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

interface AdminCategoryDataToCreate {
  name: string;
}

interface modalCreateAdminVoucherProps {
  openModalCreateVoucher: boolean;
  handleClose: () => void;
  handleRefetch: () => void;
}

const AdminModalAddCategory: React.FC<modalCreateAdminVoucherProps> = ({
  openModalCreateVoucher,
  handleClose,
  handleRefetch,
}) => {
  const [adminCategoryDataToCreate, setAdminCategoryDataToCreate] =
    useState<AdminCategoryDataToCreate>({
      name: "",
    });
  const [fileToUpdate, setFileToUpdate] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Validate min date
  const [createCategory] = useCreateCategoryMutation();
  const token = getToken("access_token");
  const [errors, setErrors] = useState({
    name: "",
    thumbnail: "",
  });

  // Method
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCategoryDataToCreate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileImage = e.target.files?.[0];
    if (fileImage) {
      setFileToUpdate(fileImage);
      const url = URL.createObjectURL(fileImage); // Tạo URL dựa trên file
      //   setImage(file);
      setImageUrl(url); // Lưu URL vào state để hiển thị xem trước
    }
  };

  const handleSubmitCreateCategory = async () => {
    try {
      if (validate() && fileToUpdate) {
        const formdata = new FormData();
        formdata.append("name", adminCategoryDataToCreate.name);
        formdata.append("thumbnail", fileToUpdate);

        const response = await createCategory(formdata).unwrap();
        if (response.status === 201) {
          toast.success(response.message);
          handleClose();
          handleRefetch();
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
    console.log("adminCategoryDataToCreate", adminCategoryDataToCreate);
    console.log("token", token);
    console.log("fileToUpdate", fileToUpdate);
  }, [adminCategoryDataToCreate, fileToUpdate]);

  // Validate modal
  const validate = () => {
    let tempErrors = {
      name: "",
      thumbnail: "",
    };

    if (adminCategoryDataToCreate.name == "")
      tempErrors.name = "Tên danh mục không được để trống !";
    if (fileToUpdate === null)
      tempErrors.thumbnail = "Hình ảnh danh mục không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  if (!openModalCreateVoucher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-xl animate__bounceInDown animate__animated overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 bg-emerald-500 text-white uppercase text-center py-4">
          TechTribe-Ecommerce add category
        </h2>
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="min-w-64">
              <label className="block text-base font-medium text-gray-700 mb-1 ">
                Tên danh mục
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Nhập tên danh mục..."
                className="w-full p-2 border rounded text-black"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

          </div>
            <div className="flex items-center ">
              <div>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="upload-img-user-profile"
                  hidden
                  onChange={handlePhotoChange}
                />
                <label
                  className=" text-xs rounded bg-blue-100 text-primary p-2 mt-2 cursor-pointer hover:bg-blue-200 duration-200 me-2"
                  htmlFor="upload-img-user-profile"
                >
                  + Chọn ảnh danh mục
                </label>
                {errors.thumbnail && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.thumbnail}
                  </p>
                )}
              </div>
              <div className="rounded-lg w-24 h-24 overflow-hidden p-1">
                {imageUrl && (
                  <img
                    className="w-full h-full object-cover"
                    src={imageUrl}
                    alt="Preview"
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
              onClick={handleSubmitCreateCategory}
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

export default AdminModalAddCategory;
