import React, { ChangeEvent, useEffect, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { getToken } from "src/utils/localStorage/token";
import {
  useGetSpecificationsByIdQuery,
  useUpdateSpecificationsMutation,
} from "src/redux/rtkQuery/categoryDetail";
import {
  updateSpecifications,
} from "src/utils/types/categoryDetail";
import { useGetspecificationsQuery } from "src/redux/rtkQuery/specifications";


interface modalCreateAdminVoucherProps {
  id_category: string;
  name_category: string;
  openModalCreateCategoryDetail: boolean;
  handleClose: () => void;
}

const AdminModalAddSpecifiCategory: React.FC<modalCreateAdminVoucherProps> = ({
  id_category,
  name_category,
  openModalCreateCategoryDetail,
  handleClose,
}) => {
  const [updateSpecificationData, setUpdateSpecificationData] =
    useState<updateSpecifications>({
      _id: id_category,
      specifications: [],
    });

  const { data: specifications } = useGetspecificationsQuery();
  const { data: ArrSpecification, refetch  } = useGetSpecificationsByIdQuery(id_category);

  const [updateSpecification] = useUpdateSpecificationsMutation();
  const token = getToken("access_token");
  const [errors, setErrors] = useState({
    specifications: "",
  });

  const handleAddSpecifications = (_id: string) => {
    setUpdateSpecificationData((prevData) => {
      const { specifications } = prevData;
      if (specifications.includes(_id)) {
        return {
          ...prevData,
          specifications: specifications.filter((specId) => specId !== _id),
        };
      } else {
        return {
          ...prevData,
          specifications: [...specifications, _id],
        };
      }
    });
  };

  const handleRemoveSpecification = (_id: string) => {
    setUpdateSpecificationData((prevData) => {
      return {
        ...prevData,
        specifications: prevData.specifications.filter(
          (specId) => specId !== _id
        ),
      };
    });
  };

  // Method
  useEffect(() => {
    setUpdateSpecificationData((prevData) => ({
      ...prevData,
     _id: id_category,
    }));
  }, [id_category]);

  const resetDataToCreate = () => {
    setUpdateSpecificationData((prevData) => ({
      ...prevData,
      specifications: []
    }));
  };

  const handleSubmitCreateCategory = async () => {
    try {
      if (validate()) {
        const response = await updateSpecification(
          updateSpecificationData
        ).unwrap();
        if (response.status === 200) {
          toast.success(response.message);
          refetch();
          handleClose();
          resetDataToCreate();
        } else {
          toast.warning(response.message);
            handleClose();
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
    console.log("updateSpecificationData", updateSpecificationData);
  }, [updateSpecificationData, specifications,id_category]);

  // Validate modal
  const validate = () => {
    let tempErrors = {
      specifications: "",
    };

    if (updateSpecificationData.specifications.length === 0)
      tempErrors.specifications = "Tên danh mục không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  if (!openModalCreateCategoryDetail) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white rounded-lg w-full max-w-4xl animate__bounceInDown animate__animated max-h-[36rem] overflow-y-scroll overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 bg-emerald-500 text-white uppercase text-center py-4">
            TechTribe-Ecommerce add specifications
          </h2>
          <div className="p-6 ">
          <h3 className="ps-2">
            Tên danh mục:{""} {name_category}
          </h3>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
                  <th className=" p-2">Tên thông số</th>
                  <th className=" p-2 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {specifications
                  ? specifications.map((specification) => (
                      <tr className="font-mono border-b border-dashed">
                        <td className="p-2 flex justify-start items-center">
                          <p className="items-start font-bold">
                            {specification.name}
                          </p>
                        </td>
                        <td className="p-2 text-gray-500 font-light text-center">
                          {ArrSpecification?.includes(specification._id) ? (
                            <button className="text-xs cursor-not-allowed rounded min-w-36 text-gray-500 bg-gray-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2">
                              <span className="">
                                Thêm vào danh mục
                              </span>
                            </button>
                          ) : updateSpecificationData.specifications.includes(
                              specification._id
                            ) ? (
                            <button
                              onClick={() =>
                                handleRemoveSpecification(specification._id)
                              }
                              className="text-xs rounded min-w-36 text-red-500 bg-red-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2"
                            >
                              <span className=" text-center">
                                Xóa khỏi danh mục
                              </span>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleAddSpecifications(specification._id)
                              }
                              className="text-xs rounded min-w-36 text-green-500 bg-green-200 bg-opacity-80 cursor-pointe duration-200 ms-2 py-1 px-2"
                            >
                              <span className="">
                                + Thêm vào danh mục
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                onClick={() => (resetDataToCreate(),handleClose())}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 duration-300 text-white rounded mr-2"
              >
                Hủy X
              </button>
              <button
                onClick={() => (handleSubmitCreateCategory())}
                className=" cursor-pointer px-4 py-2 bg-green-100 duration-300 text-green-500 hover:text-green-600 rounded flex items-center"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModalAddSpecifiCategory;
