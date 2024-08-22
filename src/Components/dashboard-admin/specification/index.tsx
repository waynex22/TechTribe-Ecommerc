import React, { useEffect, useState } from "react";
import { FaEye, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetspecificationsQuery } from "src/redux/rtkQuery/specifications";
import AdminModalAddSpecifiDetail from "./modal_add_specifi_detail";
import AdminModalAddSpecifi from "./modal_add_specifi";
import 'animate.css';
import AdminFormAddSpecifi from "./form_add_specifi";

const AdminSpectificationComponent: React.FC = () => {
  const [idSpecifi, setIdSpecifi] = useState<string>("");
  const [nameSpecifi, setNameSpecifi] = useState<string>("");
  // Category
  const [openModal, setOpenModalCreCate] = useState(false);
  const handleOpen = () => setOpenModalCreCate(true);
  const handleClose = () => setOpenModalCreCate(false);
  // category detail
  const [openModalDetail, setOpenModalCreCateDetail] = useState(false);
  const handleOpenDetail = () => setOpenModalCreCateDetail(true);
  const handleCloseDetail = () => setOpenModalCreCateDetail(false);

  const { data: spectifications, refetch } = useGetspecificationsQuery();
  const handleRefetch = () => {
    refetch();
  };

  return (
    <div className="max-h-screen overflow-y-auto overflow-x-hidden">
      <div className=" mt-2 ms-2 flex items-center mb-4 text-gray-100 ">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
        <div className="text-gray-700">/</div>
        <div className="ms-2 text-gray-700">Spectification</div>
      </div>
      <div className="flex  justify-end pe-2">
      <AdminFormAddSpecifi openModalCreateVoucher={openModal} handleClose={handleClose} handleRefetch={handleRefetch}/>
        {!openModal ?
        (<button
        onClick={handleOpen}
        className="animate__animated animate__backInRight rounded p-6 text-green-500 bg-green-200 bg-opacity-80 hover:text-green-600 text-base cursor-pointe duration-200 me-2 py-1"
        >
          + Thêm thông số
        </button>):(
          <button
          onClick={handleOpen}
          className="animate__animated animate__backOutRight rounded p-6 text-green-500 bg-green-200 bg-opacity-80 hover:text-green-600 text-base cursor-pointe duration-200 me-2 py-1"
          >
            + Thêm thông số
          </button>
        )}
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className=" p-2">Tên ngành hàng</th>
            <th className=" p-2 text-right pe-10">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="max-h-screen overflow-y-scroll">
          {spectifications
            ? spectifications.map((spectification) => (
                <tr className="font-mono border-b border-dashed">
                  <td className="px-4 py-2 flex justify-start items-center">
                    <p className="items-start font-bold">{spectification.name}</p>
                  </td>
                  <td className="p-2 text-gray-500 font-light text-right">
                    <button
                      onClick={() => (
                        setIdSpecifi(spectification._id),
                        setNameSpecifi(spectification.name),
                        handleOpenDetail()
                      )}
                      className="text-xs rounded min-w-16 text-green-500 bg-green-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2"
                    >
                      <span className="flex items-center"> <FaEye className="me-2"/>  Thông số chi tiết </span>
                    </button>
                  </td>
                </tr>
              ))
            : null}
            {/* <AdminModalAddSpecifi openModalCreateVoucher={openModal} handleClose={handleClose}/> */}
            <AdminModalAddSpecifiDetail handleClose={handleCloseDetail} id_specifi={idSpecifi} name_specifi={nameSpecifi} openModalCreateCategoryDetail={openModalDetail} />
        </tbody>
      </table>
    </div>
  );
};

export default AdminSpectificationComponent;
