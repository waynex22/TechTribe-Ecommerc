import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { getToken } from "src/utils/localStorage/token";
import {
  useCreateCategoryDetailMutation,
  useGetcategoryDetailByIdCategoryQuery,
} from "src/redux/rtkQuery/categoryDetail";

interface AdminCategoryDetailDataToCreate {
  name: string;
  id_category: string;
}

interface modalCreateAdminVoucherProps {
  id_category: string;
  name_category: string;
  //   openModalCreateCategoryDetail: boolean;
  //   handleClose: () => void;
  //   handleRefetch: () => void
}

const AdminCategoryDetail: React.FC<modalCreateAdminVoucherProps> = ({
  id_category,
  //   openModalCreateCategoryDetail,
  //   handleClose,
  name_category,
  //   handleRefetch
}) => {
  const [adminCategoryDetailDataToCreate, setAdminCategoryDetailDataToCreate] =
    useState<AdminCategoryDetailDataToCreate>({
      id_category: id_category,
      name: "",
    });
  const { data: categoryDetails, refetch } =
    useGetcategoryDetailByIdCategoryQuery(id_category);

  // Validate min date
  const [createCategoryDetail] = useCreateCategoryDetailMutation();
  const token = getToken("access_token");
  const [errors, setErrors] = useState({
    name: "",
  });

  // Method
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCategoryDetailDataToCreate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setAdminCategoryDetailDataToCreate((prevData) => ({
      ...prevData,
      id_category: id_category,
    }));
  }, [id_category]);

  const resetDataToCreate = () => {
    setAdminCategoryDetailDataToCreate((prevData) => ({
      ...prevData,
      name: "",
    }));
  };

  const handleSubmitCreateCategory = async () => {
    try {
      if (validate()) {
        const response = await createCategoryDetail(
          adminCategoryDetailDataToCreate
        ).unwrap();
        if (response.status === 201) {
          toast.success(response.message);
          //   handleClose();
          refetch();
          resetDataToCreate();
        } else {
          toast.warning(response.message);
          //   handleClose();
        }
      } else if (!validate()) {
        toast.warning(
          "Vui lòng nhập đầy đủ các trường cần thiết trước khi nhấn tạo danh mục chi tiết !"
        );
      }
    } catch (error) {
      console.log("error at create admin voucher", error);
    }
  };

  useEffect(() => {
    console.log(
      "adminCategoryDetailDataToCreate",
      adminCategoryDetailDataToCreate
    );
    console.log("token", token);
  }, [adminCategoryDetailDataToCreate]);

  // Validate modal
  const validate = () => {
    let tempErrors = {
      name: "",
    };

    if (adminCategoryDetailDataToCreate.name == "")
      tempErrors.name = "Tên danh mục không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  //   if (!openModalCreateCategoryDetail) return null;

  return (
    <div className="p-6 ">
      <div className="text-xs text-gray-400 mb-4">
        Danh mục:
      </div>
      <div className="flex flex-col items-start">
        {categoryDetails
          ? categoryDetails.map((category) => (
              <tr key={category._id} className="font-mono border-b border-dashed">
                <td className="p-2 flex justify-start items-center">
                  <p className="items-start font-bold">{category.name}</p>
                </td>
              </tr>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminCategoryDetail;
