import {
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import AddressForm from "./address_form_select";
import "animate.css";
import { useAddAddressMutation } from "../../../services/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface FormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  addressType: "home" | "office";
}
const ComponentUserAddress: React.FC = () => {
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const [addAddress] = useAddAddressMutation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    address: "",
    addressType: "home",
  });

  const validate = () => {
    let tempErrors = { fullName: "", phoneNumber: "", address: "" };
    const phoneNumberPattern = /^[0-9]{10}$/;

    if (!formData.fullName)
      tempErrors.fullName = "Họ và tên không được để trống";
    if (!formData.phoneNumber)
      tempErrors.phoneNumber = "Số điện thoại không được để trống";
    else if (!phoneNumberPattern.test(formData.phoneNumber))
      tempErrors.phoneNumber = "Số điện thoại không hợp lệ";
    if (!formData.address) tempErrors.address = "Địa chỉ không được để trống";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAddressType: "home" | "office" | null
  ) => {
    if (newAddressType !== null) {
      setFormData((prevData) => ({
        ...prevData,
        addressType: newAddressType,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (validate()) {
        handleClose();
        const response = await addAddress(formData).unwrap();
        console.log(response);
      } else {
        console.log("Validation failed");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
    console.log(formData);
  };
  return (
    <>
      <div className=" flex items-center justify-between p-6 border-b">
        <div className="text-lg font-normal">Địa chỉ của tôi</div>
        <div>
          <button
            onClick={handleOpen}
            className=" flex items-center shadow bg-primary hover:bg-blue-400 duration-300 focus:shadow-outline focus:outline-none text-white font-normal text-base py-2 px-4 rounded-sm"
            type="button"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-white font-normal text-base pe-2"
            />
            Thêm địa chỉ mới
          </button>
        </div>
      </div>

      <div className="text-xl font-normal p-6">Tất cả địa chỉ</div>

      <div className="flex items-center justify-between mx-6 mb-6 border-b pb-4">
        <div>
          <div className="flex items-center">
            <div className="font-normal text-lg pe-2 border-r">Phạm Thế An</div>

            <div className="font-light text-gray-500 text-sm ps-2 ">
              0987014964
            </div>
          </div>
          <div className="font-light text-gray-500 text-sm py-1">
            166/5, Trường Chinh Phường Hòa An, Quận Cẩm Lệ, Đà Nẵng
          </div>

          <div>
            <button
              className="shadow duration-300 cursor-text text-primary border border-primary font-normal text-sm py-1 px-2 rounded-sm"
              type="button"
            >
              Mặc định
            </button>
          </div>
        </div>

        <div className="flex items-end flex-col">
          <div className="text-primary font-medium text-base">Cập nhật</div>
          <div>
            <button
              className="shadow duration-300 hover:bg-slate-100 my-2 text-black border border-gray-500 font-normal text-sm py-1 px-2 rounded-sm"
              type="button"
            >
              Thiết lập mặc định
            </button>
          </div>
        </div>
      </div>

      {/* Box modal add address */}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
        >
          <Fade in={open}>
            <Box component="form" onSubmit={handleSubmit} sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Thông tin địa chỉ
              </Typography>
              <div className="flex justify-between items-center">
                <TextField
                  margin="normal"
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  sx={{ mr: 1 }}
                  error= {!!errors.fullName}
                  helperText= {errors.fullName}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Số điện thoại"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  sx={{ ml: 1 }}
                  error= {!!errors.phoneNumber}
                  helperText= {errors.phoneNumber}
                />
              </div>
              {/* <AddressForm/> */}
              <TextField
                margin="normal"
                fullWidth
                label="Địa chỉ cụ thể"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error= {!!errors.address}
                helperText= {errors.address}
              />
              <Typography sx={{ mt: 2, mb: 1 }}>Loại địa chỉ</Typography>
              <ToggleButtonGroup
                value={formData.addressType}
                exclusive
                onChange={handleAddressTypeChange}
                aria-label="Loại địa chỉ"
                fullWidth
              >
                <ToggleButton value="home" aria-label="Nhà riêng">
                  Nhà riêng
                </ToggleButton>
                <ToggleButton value="office" aria-label="Văn phòng">
                  Văn phòng
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Thêm địa chỉ
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default ComponentUserAddress;
