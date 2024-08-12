import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useGetBanShopByIdShopQuery,
  useGetCheckStatusBanShopQuery,
  useUpdateBanShopMutation,
} from "src/redux/rtkQuery/admin";
import "animate.css";
import BanTimeDisplay from "./banTime";
import { FaBan } from "react-icons/fa";

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

interface banShopDataInFormBanShop {
  banStartDate: Date;
  banEndDate: Date;
  reasonBan: string;
}

interface formBanShopProps {
  id_shop: string;
  openFormBanShop: boolean;
  handleClose: () => void;
  //   handleSubmit: (banShopData: banShopDataInFormBanShop) => void;
  //   handleOnChange: (
  //     banStartDate: Date,
  //     banEndDate: Date,
  //     reasonBan: string
  //   ) => void;
}

interface banShopForAdmin {
  id_banShopForAdmin: string;
  id_shop: string;
  banStartDate: Date;
  banEndDate: Date;
  numberOfBan: number;
  reasonBan: string;
}

interface banShopData {
  banStartDate: Date | "";
  banEndDate: Date | "";
  reasonBan: string;
}

const AdminFormBanShopComponent: React.FC<formBanShopProps> = ({
  id_shop,
  openFormBanShop,
  handleClose,
  //   handleSubmit,
  //   handleOnChange,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [shopData, setShopData] = useState<banShopForAdmin>();
  const [idShop, setIdShop] = useState<string>();
  const [banShopData, setBanShopData] = useState<banShopData>({
    banStartDate: "",
    banEndDate: "",
    reasonBan: "",
  });

  let minEndDateString = "";

  if (banShopData.banStartDate) {
    const minEndDate = new Date(banShopData.banStartDate);
    minEndDate.setDate(minEndDate.getDate() + 1);
    minEndDateString = minEndDate?.toISOString().split("T")[0];
  }

  const [errors, setErrors] = useState({
    banStartDate: "",
    banEndDate: "",
    reasonBan: "",
  });
  const [updateBanShop] = useUpdateBanShopMutation();

  const handleChangeReasonBan = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBanShopData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBanShopData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async () => {
    try {
      if (validate()) {
        const response = await updateBanShop({
          banShopData: banShopData,
          id_shop: id_shop,
        }).unwrap();
        console.log(response);
        handleClose();
      }
    } catch (error) {
      console.log("error at handleSubmitUpdate ", error);
    }
  };

  const {
    data: shop,
    isLoading,
    error,
  } = useGetBanShopByIdShopQuery(id_shop, { skip: !id_shop });

  const { data: status } = useGetCheckStatusBanShopQuery(id_shop, {
    skip: !id_shop,
  });

  useEffect(() => {
    console.log("ID Shop:", id_shop);
    console.log("Data:", shop);
    console.log("banShopData", banShopData);
    console.log("Status ban", status);
    console.log("Errors validate", errors);
  }, [id_shop, banShopData, errors]);

  const validate = () => {
    let tempErrors = { banStartDate: "", banEndDate: "", reasonBan: "" };

    if (banShopData.banStartDate == "")
      tempErrors.banStartDate = "Ngày bắt đầu cấm không được để trống !";
    if (banShopData.banEndDate == "")
      tempErrors.banEndDate = "Ngày kết thúc cấm không được để trống  !";
    // if(banShopData.banEndDate >= banShopData.banStartDate )
    //   tempErrors.banEndDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu !";
    if (!banShopData.reasonBan)
      tempErrors.reasonBan = "Lý do cấm không được để trống !";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  if (!openFormBanShop) return null;

  return status?.isBanned == false ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate__bounceInDown animate__animated">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Bạn có muốn thêm lệnh cấm cho cửa hàng này ?
        </h2>

        <textarea
          onChange={handleChangeReasonBan}
          name="reasonBan"
          className="w-full p-2 border rounded text-black"
          placeholder="Lý do cấm cửa hàng"
        ></textarea>
        {errors.reasonBan ? (
          <p className="text-red-500 text-sm mb-4"> {errors.reasonBan}</p>
        ) : null}

        <div className="mb-4 flex items-center">
          Số lần đã vi phạm:{" "}
          <p className="text-red-500 ms-2"> {shop?.numberOfBan} lần </p>
        </div>

        <div className="mb-4 ">
          <label className="block text-base font-medium text-gray-700 mb-1 ">
            Ngày bắt đầu
          </label>
          <input
            min={today}
            name="banStartDate"
            onChange={handleChangeDate}
            type="date"
            className="w-full p-2 border rounded text-black"
          />
          <div className="text-black">
            {/* Ngày bắt đầu: {shop?.banStartDate.toISOString()} */}
          </div>
          {errors.banStartDate ? (
            <p className="text-red-500 text-sm mb-4">{errors.banStartDate}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-1">
            Ngày kết thúc
          </label>
          <input
            min={minEndDateString}
            name="banEndDate"
            onChange={handleChangeDate}
            type="date"
            className="w-full p-2 border rounded text-black"
          />
          {/* <div>Ngày kết thúc: {shop?.banEndDate.toISOString()}</div> */}
          {errors.banEndDate ? (
            <p className="text-red-500 text-sm mb-4">{errors.banEndDate}</p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 duration-300 text-white rounded mr-2"
          >
            Hủy X
          </button>
          <button
            onClick={() => {
              handleSubmitUpdate();
            }}
            className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 duration-300 text-white rounded flex items-center"
          >
            Cấm <FaBan className="ms-1" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl animate__bounceInDown animate__animated">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Cửa hàng đã bị cấm
        </h2>

        <label className="block text-base font-medium text-gray-700 mb-1 ">
          Lý do bị cấm:
        </label>
        <textarea
          className="w-full p-2 border rounded mb-4 text-black"
          placeholder="Lý do cấm cửa hàng"
          value={shop?.reasonBan}
        ></textarea>
        
        <div className="mb-4 flex items-center">
          Số lần đã vi phạm:{" "}
          <p className="text-red-500 ms-2"> {shop?.numberOfBan} lần </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          {/* <label className="block text-base font-medium text-gray-700 mb-1 ">
            Ngày bắt đầu
          </label>
          <input type="date" className="w-full p-2 border rounded text-black" /> */}
          <div className="text-black">
            Ngày bắt đầu lệnh cấm:
            <p>{shop?.banStartDate.toString()}</p>
          </div>
          <div>
            Ngày kết thúc lệnh cấm:
            <p className="block">{shop?.banEndDate.toString()}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-1">
            Thời gian còn lại :{" "}
            {Math.floor(status?.remainingBanTime / (1000 * 60 * 60 * 24))} ngày{" "}
            {Math.floor(
              (status?.remainingBanTime % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            )}{" "}
            giờ
            {/* <BanTimeDisplay remainingBanTime = {status?.remainingBanTime}/> */}
          </label>
          {/* <input type="date" className="w-full p-2 border rounded text-black" /> */}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 duration-300 text-white rounded mr-2"
          >
            Hủy
          </button>
          <button className="  cursor-not-allowed px-4 py-2 bg-gray-500 duration-300 text-white rounded">
            Cấm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFormBanShopComponent;
