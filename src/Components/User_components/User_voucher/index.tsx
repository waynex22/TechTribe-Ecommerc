import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLock, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Box, TextField, Typography } from "@mui/material";

const ComponentUserVoucher: React.FC = () => {
  const [codeVoucher, setCodeVoucer] = useState("");
  const [errorVoucher, setErrorVoucher] = useState("");
  const validate = () => {
    let tempErrors = { errorVoucher: "" };

    if (!codeVoucher)
      tempErrors.errorVoucher = "Mã Voucher không được để trống";

    setErrorVoucher(tempErrors.errorVoucher);
    return tempErrors.errorVoucher === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeVoucer(e.target.value);
  };
  console.log(codeVoucher);

  const handleSubmit = async (e: React.FormEvent) => {
    const formData = new FormData();
    formData.append("codeVoucher", codeVoucher);
    try {
      if (validate()) {
        console.log(formData);
      } else {
        console.log("Validation failed");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div>
      <div className="m-4 flex justify-between">
        <div className="title text-left ">
          <div className="text-lg font-normal pb-1">Kho voucher</div>
        </div>
        <div className="flex items-center text-sm justify-between ">
          <div className=" text-primary pe-2 border-r">Tìm thêm voucher</div>
          <div className=" text-primary pe-2 ps-2 border-r">
            Xem lịch sử voucher
          </div>
          <div className="ps-2 font-light">Tìm hiểu</div>
        </div>
      </div>
      <div className="m-4 bg-gray-200 rounded-sm border-b">
        <div className="flex items-center justify-center py-7 m-auto">
          <div className="">Mã Voucher</div>
          {/* <input
            className="appearance-none block bg-white text-gray-700 border border-white rounded py-3 px-4 me-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[450px]"
            id="grid-last-name"
            type="text"
            placeholder="Nhập mã voucher tại đây"
          /> */}
          <Box sx={{position: "relative" }}>
            <TextField
              label="Nhập mã voucher tại đây"
              name="voucher"
              value={codeVoucher}
              onChange={handleChange}
              error={Boolean(errorVoucher)}
              // helperText={errorVoucher}
              fullWidth
              sx={{ width: 450, mx: 2, borderRadius: 1, position: "relative" }}
            />
            <Box sx={{ height: 20, position: "absolute", bottom: -20, left: 15 }}>
              {errorVoucher && (
                <Typography variant="caption" color="error" sx={{animation: "linear", animationDuration: 1000, fontSize: 12}}>
                  {errorVoucher}
                </Typography>
              )}
            </Box>
          </Box>
          <button
            onClick={handleSubmit}
            className="shadow text-xl bg-primary hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            type="button"
          >
            Lưu
          </button>
        </div>
      </div>
      <div className="title text-left m-4 border-b">
        <div className="text-lg font-normal pb-1">Tất cả voucher</div>
      </div>
      <div className="grid grid-cols-12 gap-4 m-4">
        <div className=" col-span-6">
          <div className="flex items-center border rounded-sm shadow ">
            <div className="w-28 h-28 bg-primary flex flex-col items-center justify-center text-white border-dotted border-l-8">
              <FontAwesomeIcon className="text-3xl" icon={faTicket} />
              <div className="mt-2">TechTribe</div>
            </div>
            <div className="text-left ps-4">
              <div className=" font-normal">Giảm 12% Giảm tối đa ₫150k</div>
              <div className=" text-sm font-normal pb-2">
                Đơn Tối Thiểu ₫1tr
              </div>
              <div className=" text-xs font-light">
                <FontAwesomeIcon className="pe-2" icon={faClock} />
                Có hiệu lực từ: 29.06.2024
              </div>
            </div>
            <div className=" ml-10 text-right text-xs p-2 border rounded border-primary text-primary">
              Dùng ngay
            </div>
          </div>
        </div>
        <div className=" col-span-6">
          <div className="flex items-center border rounded-sm shadow ">
            <div className="w-28 h-28 bg-primary flex flex-col items-center justify-center text-white border-dotted border-l-8">
              <FontAwesomeIcon className="text-3xl" icon={faTicket} />
              <div className="mt-2">TechTribe</div>
            </div>
            <div className="text-left ps-4">
              <div className=" font-normal">Giảm 12% Giảm tối đa ₫150k</div>
              <div className=" text-sm font-normal pb-2">
                Đơn Tối Thiểu ₫1tr
              </div>
              <div className=" text-xs font-light">
                <FontAwesomeIcon className="pe-2" icon={faClock} />
                Có hiệu lực từ: 29.06.2024
              </div>
            </div>
            <div className=" ml-10 text-right text-xs p-2 border rounded border-primary text-primary">
              Dùng ngay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentUserVoucher;
