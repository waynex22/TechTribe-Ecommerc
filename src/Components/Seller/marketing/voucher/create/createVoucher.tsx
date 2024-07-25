import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { typeCreateVoucher } from "../../../../../utils/types/voucher";
import InfomartionVoucher from "./infomartion";
import SetUpVoucher from "./setUpVoucher";
import ApplicableVoucherProduct from "./applicableProduct";
import { useAppSelector } from "../../../../../redux/hook";
import { SelectShop } from "../../../../../redux/features/shop";
import requestApi from "../../../../../helper/api";
import { toast } from "react-toastify";
import {
  FormErrorsVoucher,
  validateFormVoucher,
} from "../../../../../utils/validatetor/createVoucher";

const CreateVoucherComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shop = useAppSelector(SelectShop);
  const searchParams = new URLSearchParams(location.search);
  const caseNumber = searchParams.get("case");
  const [formCreateVoucher, setFormCreateVoucher] = useState(
    {} as typeCreateVoucher
  );
  const [errForm, setErrForm] = useState({} as FormErrorsVoucher);
  const [isSubmit, setIsSubmit] = useState(false);


  useEffect(() => {
    if (isSubmit && caseNumber) setErrForm(validateFormVoucher({...formCreateVoucher, case: caseNumber}));
  }, [caseNumber, formCreateVoucher, isSubmit]);


  useEffect(() => {
    const now = new Date();
    const dateStart = new Date(now.getTime() + 60 * 10 * 1000);
    const dateEnd = new Date(now.getTime() + 60 * 10 * 1000 + 60 * 60 * 1000);
    setFormCreateVoucher((prev) => {
      return {
        ...prev,
        time_end: dateEnd,
        time_start: dateStart,
        type: "price",
        number_of_uses: 1,
      };
    });
  }, []);


  const handleFormCrate = (
    key: string,
    value: string | number | Date | string[]
  ) => {
    if (key === "code" && typeof value === "string")
      if (!/^[A-Za-z0-9]+$/.test(value)) return;
    if (key === "percent" && typeof value == "number")
      if (value > 50) value = 50;
    setFormCreateVoucher((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const submitForm = () => {
    setIsSubmit(true);
    if(caseNumber){
      const err = validateFormVoucher({...formCreateVoucher, case: caseNumber});
      if (Object.keys(err).length > 0) {
        if (err.code || err.name || err.time_end || err.time_start)
          window.scrollTo({ top: 1, behavior: "smooth" });
        return;
      }
    }

    const formData = { ...formCreateVoucher };
    formData.code = (
      shop.name.slice(0, 4) + formCreateVoucher.code
    ).toUpperCase();
    requestApi("voucher", "POST", formData, "application/json")
      .then((data) => {
        console.log(data);
        if (data.data.message) {
          toast.warn("Mã voucher không được trùng nhau!");
        } else {
          toast.success("Tạo thành công");
          navigate("/seller/marketing/vouchers");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi khi tạo");
      });
  };
  const leaveCreateDiscount = () => {};
  return (
    <>
      {caseNumber && (
        <InfomartionVoucher
          errForm={errForm}
          caseNumber={caseNumber}
          formCreateVoucher={formCreateVoucher}
          onHandleFormCrate={handleFormCrate}
        />
      )}
      <SetUpVoucher
        errForm={errForm}
        formCreateVoucher={formCreateVoucher}
        onHandleFormCrate={handleFormCrate}
      />
      {caseNumber && (
        <ApplicableVoucherProduct
          errForm={errForm}
          caseNumber={caseNumber}
          formCreateVoucher={formCreateVoucher}
          onHandleFormCrate={handleFormCrate}
        />
      )}
      <div className="flex flex-row-reverse gap-4 items-center text-sm my-4">
        {!Object.keys(errForm).length ? (
          <button
            onClick={() => submitForm()}
            className=" px-4 py-2 rounded bg-primary bg-opacity-70 text-white font-semibold hover:bg-opacity-100 hover:shadow-md"
          >
            Xác nhận
          </button>
        ) : (
          <button className=" px-4 py-2 rounded bg-primary bg-opacity-70 text-white font-semibold cursor-not-allowed ">
            Xác nhận
          </button>
        )}
        <button
          onClick={() => leaveCreateDiscount()}
          className=" bg-white px-4 py-2 rounded border text-gray-700 hover:shadow-md hover:bg-gray-100"
        >
          Hủy
        </button>
      </div>
    </>
  );
};

export default CreateVoucherComponent;
