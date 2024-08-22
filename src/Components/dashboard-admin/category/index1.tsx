import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  AdminVoucherDataToGet,
  useDeleteAdminVoucherMutation,
  useGetAllVoucherAdminQuery,
} from "src/redux/rtkQuery/admin";
import { toast } from "react-toastify";
import { useGetcategoryQuery } from "src/redux/rtkQuery/category";
import AdminModalAddCategory from "./modal_add_category";
import AdminCategoryDetail from "./category-detail";

const AdminCategory1Component: React.FC = () => {
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

  const { data: categorys, refetch } = useGetcategoryQuery();
  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    console.log("setIdCategory", idCategory);
  });

  return (
    <div className="">
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
      <div className="flex flex-row items-start  w-full mt-4">
        <div className="flex flex-col border-r border-dotted max-h-screen overflow-y-scroll">
          <h3 className="ps-4">Danh mục</h3>
          {categorys
            ? categorys.map((category) => (
                <div className="font-mono border-b border-dashed">
                  <div className="px-4 py-2 flex items-center justify-between">
                    <div className=" overflow-hidden me-2 ">
                      <img
                        className=" w-16 h-16 rounded-lg object-cover border"
                        src={category.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <p className="items-start font-bold">{category.name}</p>
                      <p className=" text-gray-500 font-light">
                        {category.slug}
                      </p>
                    </div>
                    <div className="p-2 text-gray-500 font-light text-center items-end">
                      <button
                        onClick={() => (
                          setIdCategory(category._id),
                          setNameCategory(category.name),
                          handleOpenDetail()
                        )}
                        className="text-xs rounded min-w-16 text-green-500 bg-green-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2"
                      >
                        + Thêm danh mục con
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : null}
          <AdminModalAddCategory
            openModalCreateVoucher={openModal}
            handleClose={handleClose}
            handleRefetch={handleRefetch}
          />
        </div>
        <div className="items-start">
          <h3 className="ps-4">Chi tiết danh mục</h3>
          <AdminCategoryDetail
            id_category={idCategory}
            name_category={nameCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCategory1Component;
