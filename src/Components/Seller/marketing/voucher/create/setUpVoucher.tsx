import React from "react";
import { typeCreateVoucher } from "../../../../../utils/types/voucher";
import { FormErrorsVoucher } from "../../../../../utils/validatetor/createVoucher";

const SetUpVoucher = ({
  formCreateVoucher,
  onHandleFormCrate,
  isExpired,
  errForm,
}: {
  formCreateVoucher: typeCreateVoucher;
  onHandleFormCrate: (key: string, value: string | number | Date) => void;
  isExpired?: "active" | "finished";
  errForm: FormErrorsVoucher;
}) => {
  return (
    <div className=" p-6 bg-white rounded shadow-md font-normal my-6">
      <h4 className=" text-xl py-1">Thiết lập mã giảm giá</h4>
      <div className=" py-4 flex flex-col gap-6 text-sm">
        <div className=" flex gap-2 items-center">
          <div className=" w-[200px] text-right">
            <p>Loại Voucher:</p>
          </div>
          <div className="  ">
            {!isExpired ? (
              <div className=" flex gap-4 items-center">
                <div className=" flex gap-2 items-center">
                  <input
                    onChange={() => onHandleFormCrate("type", "price")}
                    checked={formCreateVoucher.type === "price"}
                    type="radio"
                    name="type"
                    id="typePrice"
                    className={` cursor-pointer `}
                  />
                  <label htmlFor="typePrice" className=" cursor-pointer">
                    Khuyến mãi
                  </label>
                </div>
                <div className=" flex gap-2 items-center">
                  <input
                    onChange={() => onHandleFormCrate("type", "coin")}
                    checked={formCreateVoucher.type === "coin"}
                    type="radio"
                    name="type"
                    id="typeCoin"
                    className=" cursor-pointer"
                  />
                  <label htmlFor="typeCoin" className=" cursor-pointer">
                    Hoàn xu
                  </label>
                </div>
              </div>
            ) : (
              <div className=" flex gap-4 items-center">
                <div className=" flex gap-2 items-center">
                  <input
                    checked={formCreateVoucher.type === "price"}
                    type="radio"
                    name="type"
                    id="typePrice"
                    className={` cursor-not-allowed`}
                  />
                  <label
                    htmlFor=""
                    className="  cursor-not-allowed text-gray-600"
                  >
                    Khuyến mãi
                  </label>
                </div>
                <div className=" flex gap-2 items-center">
                  <input
                    checked={formCreateVoucher.type === "coin"}
                    type="radio"
                    name="type"
                    id="typeCoin"
                    className="  cursor-not-allowed"
                  />
                  <label
                    htmlFor=""
                    className="  text-gray-600 cursor-not-allowed"
                  >
                    Hoàn xu
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex gap-2">
          <div className=" w-[200px] text-right py-1">
            <p>Mức giảm:</p>
          </div>
          <div className="  ">
            <div className=" w-[600px] relative">
              <div
                className={` relative border  w-full rounded px-0.5 flex gap-1 items-center ${
                  isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                } ${errForm.percent && "border-red-500"}`}
              >
                <div className=" w-[200px] px-4 border-r text-gray-600">
                  <p className=""> Giảm theo phần trăm</p>
                </div>
                <input
                  onChange={(e) =>
                    onHandleFormCrate(e.target.name, Number(e.target.value))
                  }
                  type="number"
                  readOnly={isExpired === "finished"}
                  value={formCreateVoucher.percent}
                  min={1}
                  max={50}
                  name="percent"
                  className={`w-full flex-1 ${
                    isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                  }`}
                />
                <div className=" px-4 border-l w-[100px] text-gray-600">
                  <p className=""> %GIẢM</p>
                </div>
              </div>
              <p className=" text-red-600 pt-1 text-xs"> {errForm.percent} </p>
            </div>
          </div>
        </div>
        <div className=" flex gap-2">
          <div className=" w-[200px] text-right py-1">
            <p>Mức giảm tối đa:</p>
          </div>
          <div className="  ">
            <div className=" w-[600px] relative">
              <div
                className={` relative border  w-full rounded px-0.5 flex gap-1 items-center ${
                  isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                } ${errForm.maximum_reduction && "border-red-500"}`}
              >
                <input
                  onChange={(e) =>
                    onHandleFormCrate(e.target.name, Number(e.target.value))
                  }
                  type="number"
                  readOnly={isExpired === "finished"}
                  value={formCreateVoucher.maximum_reduction}
                  name="maximum_reduction"
                  className={`w-full flex-1 ${
                    isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
              <p className=" text-red-600 pt-1 text-xs">
                {" "}
                {errForm.maximum_reduction}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className=" flex gap-2">
          <div className=" w-[200px] text-right py-1">
            <p>Giá trị đơn hàng tối thiểu:</p>
          </div>
          <div className="  ">
            <div className=" w-[600px] relative">
              <div
                className={` relative border  w-full rounded px-0.5 flex gap-1 items-center ${
                  isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                } ${errForm.minimum_order_value && "border-red-500"}`}
              >
                <input
                  onChange={(e) =>
                    onHandleFormCrate(e.target.name, Number(e.target.value))
                  }
                  type="number"
                  readOnly={isExpired === "finished"}
                  value={formCreateVoucher.minimum_order_value}
                  name="minimum_order_value"
                  className={`w-full flex-1 ${
                    isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
            <p className=" text-red-600 pt-1 text-xs">
              {" "}
              {errForm.minimum_order_value}{" "}
            </p>
          </div>
        </div>
        <div className=" flex gap-2">
          <div className=" w-[200px] text-right py-1">
            <p>Tổng lượt sử dụng tối đa:</p>
          </div>
          <div className="  ">
            <div className=" w-[600px] relative">
              <div
                className={` relative border  w-full rounded px-0.5 flex gap-1 items-center ${
                  isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                } ${errForm.maximum_total_usage && "border-red-500"}`}
              >
                <input
                  onChange={(e) =>
                    onHandleFormCrate(e.target.name, Number(e.target.value))
                  }
                  type="number"
                  readOnly={isExpired === "finished"}
                  value={formCreateVoucher.maximum_total_usage}
                  name="maximum_total_usage"
                  className={`w-full flex-1 ${
                    isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
            <p className=" text-red-600 pt-1 text-xs">
              {" "}
              {errForm.maximum_total_usage}{" "}
            </p>
          </div>
        </div>
        <div className=" flex gap-2">
          <div className=" w-[200px] text-right py-1">
            <p>Tổng lượt sử dụng tối đa:</p>
          </div>
          <div className="  ">
            <div className=" w-[600px] relative">
              <div
                className={` relative border  w-full rounded px-0.5 flex gap-1 items-center ${
                  isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                } ${errForm.number_of_uses && "border-red-500"}`}
              >
                <input
                  onChange={(e) =>
                    onHandleFormCrate(e.target.name, Number(e.target.value))
                  }
                  type="number"
                  readOnly={isExpired === "finished"}
                  value={formCreateVoucher.number_of_uses}
                  name="number_of_uses"
                  className={`w-full flex-1 ${
                    isExpired === "finished" && "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
            <p className=" text-red-600 pt-1 text-xs">
              {" "}
              {errForm.number_of_uses}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUpVoucher;
