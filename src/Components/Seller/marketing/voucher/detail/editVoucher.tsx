import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import {
  fetchVoucherByID,
  SelectVoucher,
} from "../../../../../redux/features/voucher";
import { Link, useNavigate } from "react-router-dom";
import { SelectShop } from "../../../../../redux/features/shop";
import { typeCreateVoucher } from "../../../../../utils/types/voucher";
import requestApi from "../../../../../helper/api";
import { toast } from "react-toastify";
import InfomartionVoucher from "../create/infomartion";
import SetUpVoucher from "../create/setUpVoucher";
import ApplicableVoucherProduct from "../create/applicableProduct";
import { FormErrorsVoucher, validateFormVoucher } from "../../../../../utils/validatetor/createVoucher";
import { transNameShopForVoucher } from "../../../../../utils/fortmartNumberVnd/string";

const EditVoucher = ({ idVoucher }: { idVoucher: string }) => {
  const dispatch = useAppDispatch();
  const voucher = useAppSelector(SelectVoucher);
  useEffect(() => {
    dispatch(fetchVoucherByID(idVoucher));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idVoucher]);

  const navigate = useNavigate();
  const shop = useAppSelector(SelectShop);
  const [caseNumber, setCaseNumber] = useState("1");
  const [formCreateVoucher, setFormCreateVoucher] = useState(
    {} as typeCreateVoucher
  );
  const [isExpired, setIsExprired] = useState(
    "active" as "active" | "finished"
  );
  const [errForm, setErrForm] = useState({} as FormErrorsVoucher);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (isSubmit) setErrForm(validateFormVoucher(formCreateVoucher));
  }, [formCreateVoucher, isSubmit]);

  useEffect(() => {
    if (voucher._id) {
      setFormCreateVoucher({
        ...voucher,
        code: removePrefixCODE(voucher.code, transNameShopForVoucher(shop.name)),
        time_start: new Date(voucher.time_start),
        time_end: new Date(voucher.time_end),
      });
      if (voucher.id_product.length > 0) setCaseNumber("2");
      else setCaseNumber("1");
    }
  }, [shop.name, voucher]);
  useEffect(() => {
    const dateNow = new Date();
    const endDate = new Date(formCreateVoucher.time_end);
    if (dateNow > endDate) {
      setIsExprired("finished");
    } else {
      setIsExprired("active");
    }
  }, [formCreateVoucher.time_end]);
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
    const err = validateFormVoucher(formCreateVoucher);
    if (Object.keys(err).length > 0) {
      if (err.code || err.name || err.time_end || err.time_start)
        window.scrollTo({ top: 1, behavior: "smooth" });
      return;
    }

    const formData = { ...formCreateVoucher };
    formData.code = (
      transNameShopForVoucher(shop.name) + formCreateVoucher.code
    ).toUpperCase();
    requestApi(`voucher/${voucher._id}`, "PATCH", formData, "application/json")
      .then((data) => {
        console.log(data);
        if (data.data.message) {
          toast.warn(data.data.message);
        } else {
          toast.success("Sửa thành công");
          navigate("/seller/marketing/vouchers");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi khi sửa");
      });
  };
  const leaveCreateDiscount = () => { };
  return (
    <>
      {voucher._id && formCreateVoucher && (
        <>
          <InfomartionVoucher
            errForm={errForm}
            caseNumber={caseNumber}
            formCreateVoucher={formCreateVoucher}
            onHandleFormCrate={handleFormCrate}
            isExpired={isExpired}
          />
          <SetUpVoucher
            errForm={errForm}
            formCreateVoucher={formCreateVoucher}
            onHandleFormCrate={handleFormCrate}
            isExpired={isExpired}
          />
          <ApplicableVoucherProduct
            errForm={errForm}
            listProduct={voucher.id_product}
            caseNumber={caseNumber}
            formCreateVoucher={formCreateVoucher}
            onHandleFormCrate={handleFormCrate}
            isExpired={isExpired}
          />
        </>
      )}
      {isExpired === "active" ? (
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
      ) : (
        <div className="flex flex-row-reverse gap-4 items-center text-sm my-4">
          <Link
            to={"/seller/marketing/vouchers"}
            className=" bg-white px-4 py-2 rounded border text-gray-700 hover:shadow-md hover:bg-gray-100"
          >
            Thoát
          </Link>
        </div>
      )}
    </>
  );
};
function removePrefixCODE(mainString: string, prefix: string) {
  if (mainString.startsWith(prefix.toUpperCase())) {
    return mainString.slice(prefix.toLowerCase().length);
  }
  return mainString; // Trả về chuỗi gốc nếu không bắt đầu bằng prefix
}

export default EditVoucher;
