import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { getToken } from "src/utils/localStorage/token";
import { RiCoupon3Fill } from "react-icons/ri";
import { useCreateCategoryMutation } from "src/redux/rtkQuery/category";
import {
  useCreateCategoryDetailMutation,
  useGetcategoryDetailByIdCategoryQuery,
} from "src/redux/rtkQuery/categoryDetail";
import { createCategoryDetail } from "src/utils/types/categoryDetail";
import { FaAngleRight, FaArrowAltCircleRight } from "react-icons/fa";
import AdminModalAddSpecifiCategory from "./modal_add_specifi";

interface AdminCategoryDetailDataToCreate {
  name: string;
  id_category: string;
}

interface modalCreateAdminVoucherProps {
  id_category: string;
  name_category: string;
  name_category_detail: string;
  openModalCreateCategoryDetail: boolean;
  handleClose: () => void;
  //   handleRefetch: () => void
}

const AdminModalAddCategoryDetailChildren: React.FC<
  modalCreateAdminVoucherProps
> = ({
  id_category,
  openModalCreateCategoryDetail,
  handleClose,
  name_category,
  name_category_detail,
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

  const [idCategoryDetailchild, setIdCategoryDetailChild] =
    useState<string>("");
  const [nameCategoryDetailchild, setNameCategoryDetailChild] =
    useState<string>("");

  const [openModalAddSpecifi, setOpenModalAddSpecifi] = useState(false);
  const handleOpenAddSpecifi = () => setOpenModalAddSpecifi(true);
  const handleCloseAddSpecifi = () => setOpenModalAddSpecifi(false);

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

  if (!openModalCreateCategoryDetail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-5xl animate__bounceInDown animate__animated max-h-[42rem] overflow-y-scroll overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 bg-emerald-500 text-white uppercase text-center py-4">
          TechTribe-Ecommerce add category detail childred
        </h2>
        <div className="p-6 ">
          <div className="flex items-center mb-4">
            <div className="text-xs text-gray-400 me-1">Danh mục:</div>
            <span className="text-base text-black">{name_category}</span>
            <span className="mx-2">
              <FaAngleRight />
            </span>
            <span className="text-sm text-gray-700 ">
              {name_category_detail}
            </span>
          </div>
          {categoryDetails && categoryDetails.length > 0 ? (
            <div>
              <table className="table-auto w-full mt-4">
                <thead>
                  <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
                    <th className=" p-2">Tên ngành hàng chi tiết</th>
                    <th className=" p-2">Đường dẫn</th>
                    <th className=" p-2 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryDetails.map((category) => (
                    <tr className="font-mono border-b border-dashed">
                      <td className="p-2 flex justify-start items-center">
                        <p className="items-start font-bold">
                          {category.name}{" "}
                        </p>
                      </td>
                      <td className="p-2 text-gray-500 font-light w-4/12">
                        <p className="items-start">{category.slug}</p>
                      </td>
                      <td className="p-2 text-gray-500 font-light text-center">
                        <button
                          onClick={() => (
                            handleOpenAddSpecifi(),
                            setIdCategoryDetailChild(category._id),
                            setNameCategoryDetailChild(category.name)
                          )}
                          className="text-xs rounded min-w-32 text-amber-500 bg-amber-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2"
                        >
                          + Thông số
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="my-4 flex justify-between items-center">
                <div className="min-w-64">
                  <label className="block text-base font-medium text-gray-700 mb-1 ">
                    Tên ngành hàng chi tiết
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Nhập tên ngành..."
                    className="w-full p-2 border rounded text-black"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                Danh mục này hiện không có danh mục con, bạn có muốn thêm danh mục con hoặc thêm thông số cho danh mục: {name_category_detail}
              </div>
              <div className="my-4 flex justify-between items-center">
                <div className="min-w-64">
                  <label className="block text-base font-medium text-gray-700 mb-1 ">
                    Tên ngành hàng chi tiết
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Nhập tên ngành..."
                    className="w-full py-2 border rounded text-black"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>
              </div>
            <button
              onClick={() => (
                handleOpenAddSpecifi(),
                setIdCategoryDetailChild(id_category),
                setNameCategoryDetailChild(name_category_detail)
              )}
              className="text-xs rounded min-w-32 text-amber-500 bg-amber-200 bg-opacity-80 cursor-pointe duration-200 py-1 px-2"
            >
              + Thêm thông số
            </button>
            
            </div>
          )}

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
      <AdminModalAddSpecifiCategory
        id_category={idCategoryDetailchild}
        name_category={nameCategoryDetailchild}
        openModalCreateCategoryDetail={openModalAddSpecifi}
        handleClose={handleCloseAddSpecifi}
      />
    </div>
  );
};

export default AdminModalAddCategoryDetailChildren;
