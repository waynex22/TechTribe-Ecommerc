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
import { FaEye } from "react-icons/fa";
import { useCreateSpecifiDetailMutation, useGetSpecifiDetailByIdSpecifiQuery } from "src/redux/rtkQuery/specifications";
import AdminFormUpdateSpecifi from "./form_update_specifi_detail";

interface AdminSpecifiDetailDataToCreate {
  name: string;
  id_specification: string;
}

interface modalCreateAdminVoucherProps {
  id_specifi: string;
  name_specifi: string;
  openModalCreateCategoryDetail: boolean;
  handleClose: () => void;
  //   handleRefetch: () => void
}

const AdminModalAddSpecifiDetail: React.FC<modalCreateAdminVoucherProps> = ({
  id_specifi,
  openModalCreateCategoryDetail,
  handleClose,
  name_specifi,
  //   handleRefetch
}) => {
  const [adminSpecifiDetailDataToCreate, setAdminSpecifiDetailDataToCreate] =
    useState<AdminSpecifiDetailDataToCreate>({
      id_specification: '',
      name: "",
    });
  const { data: specifiDetails, refetch } = useGetSpecifiDetailByIdSpecifiQuery(id_specifi);

  // Validate min date
  const [createSpecifiDetail] = useCreateSpecifiDetailMutation();
  const [token, setToken] = useState<string | null>('')
  const [errors, setErrors] = useState({
    name: "",
  });
  const [idSpecifiDetail, setIdSpecifi] = useState<string>('');
  const [nameSpecifiDetail, setnameSpecifi] = useState<string>('');
  const [openFormUpdate, setOpenFormUpdate] = useState(false);
  const handleOpenFormUpdate= () => setOpenFormUpdate(true);
  const handleCloseFormUpdate = () => setOpenFormUpdate(false);

  
  useEffect(() => {
    const token = getToken("access_token");
    setToken(token)
    
  },[token])

  // Method
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminSpecifiDetailDataToCreate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setAdminSpecifiDetailDataToCreate((prevData) => ({
      ...prevData,
      id_specification: id_specifi,
    }));
  }, [id_specifi]);

  // const resetDataToCreate = () => {
  //   setAdminCategoryDetailDataToCreate((prevData) => ({
  //     ...prevData,
  //     name: "",
  //   }));
  // };

  const handleSubmitCreateCategory = async () => {
    try {
      if (validate() && token) {
        const response = await createSpecifiDetail(
          {data: adminSpecifiDetailDataToCreate, token: token}
        ).unwrap();
        if (response.status === 201) {
          toast.success(response.message);
          //   handleClose();
          refetch();
        } else {
          toast.warning(response.message);
          //   handleClose();
        }
      } else if (!validate()) {
        toast.warning(
          "Vui lòng nhập đầy đủ các trường cần thiết trước khi nhấn tạo thông số chi tiết !"
        );
      }
    } catch (error) {
      console.log("error at create admin specifi", error);
    }
  };

  useEffect(() => {
    console.log(
      "adminCategoryDetailDataToCreate",
      adminSpecifiDetailDataToCreate
    );
    console.log("categoryDetails", specifiDetails);
    console.log("id_specifi", id_specifi);

    console.log("token", token);
  }, [adminSpecifiDetailDataToCreate, specifiDetails]);

  // Validate modal
  const validate = () => {
    let tempErrors = {
      name: "",
    };

    if (adminSpecifiDetailDataToCreate.name == "")
      tempErrors.name = "Tên danh mục không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  if (!openModalCreateCategoryDetail) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white rounded-lg w-full max-w-4xl animate__bounceInDown animate__animated max-h-[36rem] overflow-y-scroll overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 bg-emerald-500 text-white uppercase text-center py-4">
            TechTribe-Ecommerce add Specification Detail
          </h2>
          <div className="p-6 ">
            <div className="text-xs text-gray-400 mb-4">
              Thuộc thông số: {""}
              <span className="text-sm text-black">{name_specifi}</span>
            </div>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
                  <th className=" p-2">Tên ngành hàng chi tiết</th>
                  <th className=" p-2 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {specifiDetails
                  ? specifiDetails.map((specifiDetail) => (
                      <tr className="font-mono border-b border-dashed">
                        <td className="p-2 flex justify-start items-center">
                          <p className="items-start font-bold">
                            {specifiDetail.name}
                          </p>
                        </td>
                        <td className="p-2 text-gray-500 font-light text-center">
                            <button onClick={() => (setnameSpecifi(specifiDetail.name),handleOpenFormUpdate(), setIdSpecifi(specifiDetail._id))} className="text-xs rounded min-w-32 text-amber-500 bg-amber-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2">
                               Sửa thông số
                            </button>
                        </td>
                      </tr>
                    ))
                  : null}
                  <AdminFormUpdateSpecifi name_specifi={nameSpecifiDetail} handleRefetch={refetch} id_specifi={idSpecifiDetail} openModalCreateVoucher={openFormUpdate} handleClose={handleCloseFormUpdate}/>
              </tbody>
            </table>
            <div className="my-4 flex justify-between items-center">
              <div className="min-w-64">
                <label className="block text-base font-medium text-gray-700 mb-1 ">
                  Thêm thông số chi tiết
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Nhập danh mục..."
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
    </>
  );
};

export default AdminModalAddSpecifiDetail;
