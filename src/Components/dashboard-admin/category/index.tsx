import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  AdminVoucherDataToGet,
  useDeleteAdminVoucherMutation,
  useGetAllVoucherAdminQuery,
} from "src/redux/rtkQuery/admin";
import { toast } from "react-toastify";
import { useGetcategoryQuery } from "src/redux/rtkQuery/category";
import AdminModalAddCategory from "./modal_add_category";
import AdminModalAddCategoryDetail from "./modal_add_category-detail";
import AdminCategoryDetail from "./category-detail";
import AdminCategoryComponentIsLoading from "./admin_category_isLoading";

const AdminCategoryComponent: React.FC = () => {
  const [idCategory, setIdCategory] = useState<string>("");
  const [nameCategory, setNameCategory] = useState<string>("");
  // Category
  const [openModal, setOpenModalCreCate] = useState(false);
  const handleOpen = () => setOpenModalCreCate(true);
  const handleClose = () => setOpenModalCreCate(false);
  // category detail
  const [openModalDetail, setOpenModalCreCateDetail] = useState(false);
  const handleOpenDetail = () => setOpenModalCreCateDetail(true);
  const handleCloseDetail = () => setOpenModalCreCateDetail(false);

  const { data: categorys, refetch, isLoading } = useGetcategoryQuery();
  const handleRefetch = () => {
    refetch();
  };

  if(isLoading) return <AdminCategoryComponentIsLoading/>
  return (
    <div className="max-h-screen overflow-y-scroll">
      <div className=" mt-2 ms-2 flex items-center mb-4 text-gray-100 ">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
        <div className="text-gray-700">/</div>
        <div className="ms-2 text-gray-700">Category</div>
      </div>
      <div className="flex  justify-end pe-2">
        <button
          onClick={handleOpen}
          className="rounded p-6 text-green-500 bg-green-200 bg-opacity-80 hover:text-green-600 text-base cursor-pointe duration-200 me-2 py-1"
        >
          + Thêm danh mục ngành hàng chính
        </button>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className=" p-2">Tên ngành hàng</th>
            <th className=" p-2">Đường dẫn</th>
            <th className=" p-2 text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {categorys
            ? categorys.map((category) => (
                <tr className="font-mono border-b border-dashed">
                  <td className="px-4 py-2 flex justify-start items-center">
                    <div className=" overflow-hidden me-2 ">
                      <img
                        className=" w-16 h-16 rounded-lg object-cover border"
                        src={category.thumbnail}
                        alt=""
                      />
                    </div>
                    <p className="items-start font-bold">{category.name}</p>
                  </td>
                  <td className="p-2 text-gray-500 font-light">
                    {category.slug}
                  </td>
                  <td className="p-2 text-gray-500 font-light text-center">
                    <button
                      onClick={() => (
                        setIdCategory(category._id),
                        setNameCategory(category.name),
                        handleOpenDetail()
                      )}
                      className="text-xs rounded min-w-16 text-green-500 bg-green-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2"
                    >
                      <span className="flex items-center"> <FaEye className="me-2"/>  Danh mục chi tiết </span>
                    </button>
                  </td>
                </tr>
              ))
            : null}
          <AdminModalAddCategory
            openModalCreateVoucher={openModal}
            handleClose={handleClose}
            handleRefetch={handleRefetch}
          />
          <AdminModalAddCategoryDetail
            id_category={idCategory}
            name_category={nameCategory}
            openModalCreateCategoryDetail={openModalDetail}
            handleClose={handleCloseDetail}
          />
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryComponent;
