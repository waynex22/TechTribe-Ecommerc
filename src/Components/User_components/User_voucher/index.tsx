import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLock, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useGetAdminVoucherMutation, useGetVoucherWalletQuery } from "src/redux/rtkQuery/user_customers";
import { jwtDecode } from "jwt-decode";
import DetailAdminVoucherComponent from "./detailAdminVoucherComponent";
import { toast } from "react-toastify";

interface voucherData {
  _id: string;
  id_shop: string;
  id_product: [];
  type: string;
  name: string;
  code: string;
  time_start: Date;
  time_end: Date;
  percent: number;
  maximum_reduction: number;
  minimum_order_value: number;
  maximum_total_usage: number;
  number_of_uses: number;
  created: Date;
  __v: number;
}

const ComponentUserVoucher: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [infoUserFormToken, setInfoUserFormToken] = useState<{
    [key: string]: any;
  } | null>(null);
  const [idCustomer, setIdCustomer] = useState<string>("");
  const [id_Customer, setId_Customer] = useState<{ [key: string]: any } | null>({
    id_customer: ''
  })

  const [resultGetVoucher, setResultGetVoucher] = useState<{ [key: string]: any } | null>({
    response: '',
    status: 0,
    message: "",
    name: ""
  })
  const [codeVoucher, setCodeVoucher] = useState("");
  const [errorVoucher, setErrorVoucher] = useState("");
  const [getAdminVoucher] = useGetAdminVoucherMutation()
  useEffect(() => {
    const getAccessToken = localStorage.getItem("access_token");

    console.log(getAccessToken);

    if (getAccessToken !== null) {
      setAccessToken(getAccessToken);
    }
  }, []);
  const decodeToken = () => {
    if (accessToken !== "") {
      const decodeToken = jwtDecode(accessToken) as { [key: string]: any };
      // setInfoUserFormToken(decodeToken);
      setIdCustomer(decodeToken?.sub);
      setId_Customer(decodeToken?.sub)
    }
  };
  useEffect(() => {
    if (accessToken !== null) {
      decodeToken();
    }
  }, [accessToken]);
  useEffect(() => {
    console.log("voucherWallet", voucherWallet);
    console.log("resultGetVoucher",resultGetVoucher);
    console.log("id_customer ",id_Customer);
    
  }, [idCustomer,resultGetVoucher,id_Customer]);

  const { data: voucherWallet, refetch } = useGetVoucherWalletQuery(idCustomer);

  const validate = () => {
    let tempErrors = { errorVoucher: "" };

    if (!codeVoucher)
      tempErrors.errorVoucher = "Mã Voucher không được để trống";

    setErrorVoucher(tempErrors.errorVoucher);
    return tempErrors.errorVoucher === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeVoucher(e.target.value);
  };
  console.log(codeVoucher);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (validate() && codeVoucher && idCustomer) {
        const result = await getAdminVoucher({code: codeVoucher, id_customer: id_Customer});
        refetch();
        if(result.data.status === 200) {
          toast.success(result.data.message)
        }else {
          toast.error(result.data.message)
        }
      } else {
        console.log("Validation failed");
      }
      
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  // const getAllVoucher = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/voucher");
  //     console.log(response);

  //     setVoucherData(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getAllVoucher();
  // }, []);

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
          <Box sx={{ position: "relative" }}>
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
            <Box
              sx={{ height: 20, position: "absolute", bottom: -20, left: 15 }}
            >
              {errorVoucher && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    animation: "linear",
                    animationDuration: 1000,
                    fontSize: 12,
                  }}
                >
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
      </div>
      {voucherWallet?.wallet_warehouse ? (
        <DetailAdminVoucherComponent
          voucherIds={voucherWallet?.wallet_warehouse}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ComponentUserVoucher;
