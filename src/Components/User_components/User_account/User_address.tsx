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
import { useEffect, useState } from "react";
import React from "react";
// import AddressForm from "./address_form_select";
import "animate.css";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "../../../redux/rtkQuery/user_customers";
import { useGetAddressByIdCustomerMutation } from "../../../redux/rtkQuery/user_customers";
import { useDeleteAddressMutation } from "../../../redux/rtkQuery/user_customers";
import { useSetDefaultAddressMutation } from "../../../redux/rtkQuery/user_customers";
import { useGetAddressByIdMutation } from "../../../redux/rtkQuery/user_customers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressModal from "./User_address_update_modal";
// import AddressSelector from "./address_form_select";
import AddressSelectorAdd from "./address_form_select";

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
  addressType: boolean;
  province: string;
  district: string;
  ward: string;
  customerId: string;
}

interface AddressDataInModal {
  fullName: string;
  phoneNumber: string;
  address: string;
  addressType: boolean;
  province: string;
  district: string;
  ward: string;
}

interface addressData {
  _id: string;
  customerId: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  addressType: boolean;
  isDefault: boolean;
  __v: number;
}
const ComponentUserAddress: React.FC = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenBoxUpdateAddress = () => setOpenBoxUpdateAddress(true);
  const handleCloseBoxUpdateAddress = () => setOpenBoxUpdateAddress(false);

  const handleOpenBoxConfirm = () => setOpenBoxConfirm(true);
  const handleCloseBoxConfirm = () => setOpenBoxConfirm(false);

  const handleCloseBoxConfirmDefaultAddress = () =>
    setOpenBoxConfirmDefaultAddress(false);

  const handleOpenBoxConfirmDefaultAddress = () =>
    setOpenBoxConfirmDefaultAddress(true);

  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');

  const [selectedProvinceToUpdate, setSelectedProvinceToUpdate] = useState<string>('');
  const [selectedDistrictToUpdate, setSelectedDistrictToUpdate] = useState<string>('');
  const [selectedWardToUpdate, setSelectedWardToUpdate] = useState<string>('');

  const handleAddressChange = (
    province: string,
    district: string,
    ward: string
  ) => {
    setSelectedProvince(province);
    setSelectedDistrict(district);
    setSelectedWard(ward);
  };

  const handleAddressChangeToUpdate = (
    province: string,
    district: string,
    ward: string
  ) => {
    setSelectedProvinceToUpdate(province);
    setSelectedDistrictToUpdate(district);
    setSelectedWardToUpdate(ward);
  };
  const [idAddressToDel, setIdAddressToDel] = useState<string>("");
  const [idAddressToSetDefault, setIdAddressToDefault] = useState<string>("");
  const [idCustomer, setIdCustomer] = useState<string>("");
  const [decodeToken, setDecodeToken] = useState<{ [key: string]: any } | null>(
    null
  );
  const [dataAddress, setDataAddress] = useState<addressData[]>([]);
  const [dataAddressByIdInModal, setDataAddressInModal] =
    useState<AddressDataInModal>();
  const [dataAddressById, setDataAddressById] = useState<addressData>();
  const [dataAddressToAdd, setDataAddressToAdd] = useState<FormData>();

  // Của form cập nhật
  useEffect(() => {
    if (dataAddressById) {
      setDataAddressInModal({
        fullName: dataAddressById.fullName || "",
        phoneNumber: dataAddressById.phoneNumber || "",
        address: dataAddressById.address || "",
        addressType: dataAddressById.addressType || false,
        province: dataAddressById.province || "",
        district: dataAddressById.district || "",
        ward: dataAddressById.ward || "",
      });
    }
  }, [dataAddressById]);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const [addAddress] = useAddAddressMutation();
  const [getAddress] = useGetAddressByIdCustomerMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();
  const [getAddressByID] = useGetAddressByIdMutation();
  const [open, setOpen] = useState(false);
  const [openBoxConfirm, setOpenBoxConfirm] = useState(false);
  const [openBoxUpdateAddress, setOpenBoxUpdateAddress] = useState(false);
  const [openBoxConfirmDefaultAddress, setOpenBoxConfirmDefaultAddress] =
    useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    address: "",
    addressType: false,
    province: "",
    district: "",
    ward: "",
    customerId: idCustomer,
  });

  const handleGetAddressById = async (addressId: string) => {
    try {
      const result = await getAddressByID({ addressId: addressId }).unwrap();
      console.log(result);
      setDataAddressById(result);
    } catch (error) {
      console.error("Failed to fetch address data", error);
    }
  };

  const handleGetIdAddressToDel = (idAddress: string) => {
    setIdAddressToDel(idAddress);
  };

  const handleGetIdAddressToSetDefault = (idAddress: string) => {
    setIdAddressToDefault(idAddress);
  };

  const addressData = {
    fullName: formData.fullName,
    phoneNumber: formData.phoneNumber,
    address: formData.address,
    addressType: formData.addressType,
    province: selectedProvince,
    district: selectedDistrict,
    ward: selectedWard,
    customerId: idCustomer,
  };

  useEffect(() => {
    if(dataAddressToAdd) {
      setDataAddressToAdd({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        addressType: formData.addressType,
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
        customerId: idCustomer,
      });
    }
  }, [selectedProvince, selectedDistrict, selectedWard, formData]);

  const setDefaultAddressData = {
    customerId: idCustomer,
    addressId: idAddressToSetDefault,
  };
  useEffect(() => {
    const getAccessToken = localStorage.getItem("access_token");
    setAccessToken(getAccessToken);
    if (getAccessToken !== null) {
      const decodeToken = jwtDecode(getAccessToken) as { [key: string]: any };
      setDecodeToken(decodeToken);
      if (decodeToken !== null) {
        setIdCustomer(decodeToken.sub);
      }
    }
  }, []);
  const getDataAddress = async () => {
    try {
      const response = await getAddress({ idCustomer });
      // const sortedAddress = [...response.data].sort((a: addressData, b:addressData) => +b.isDefault - +a.isDefault)
      // setDataAddress(sortedAddress);
      setDataAddress(response.data);
    } catch (error) {
      console.error("Failed to fetch address data", error);
    }
  };
  useEffect(() => {
    if (idCustomer) {
      getDataAddress();
    }
  }, [idCustomer]);

  // // Debugging output
  // useEffect(() => {
  //   console.log("Tỉnh:", selectedProvince);
  //   console.log("Quận/Huyện:", selectedDistrict);
  //   console.log("Phường/Xã:", selectedWard);
  // }, [selectedProvince, selectedDistrict, selectedWard]);

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



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
    }));
  };

  const handleAddressTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAddressType: false | true | null
  ) => {
    if (newAddressType !== null) {
      setFormData((prevData) => ({
        ...prevData,
        addressType: newAddressType,
      }));
    }
  };

  // console.log("dataAddressToAdd", addressData);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (validate() && accessToken !== null) {
        handleClose();
        const response = await addAddress({
          addressData: addressData,
          token: accessToken,
        }).unwrap();
        console.log(response);
        if (response.status === 201) {
          toast.success(response.message);
        }
        getDataAddress();
      } else {
        console.log("Validation failed");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
    console.log("dataAddressToAdd", addressData);
  };

  const [updateAddress] = useUpdateAddressMutation();
  const [addressIdToUpdate, setAddressIdToUpdate] = useState<string>("");
  const handleSubmitUpdate = async (dataAddress: AddressDataInModal) => {
    try {
      // if (validateFormUpdate()) {
      handleCloseBoxUpdateAddress();
      const response = await updateAddress({
        addressId: addressIdToUpdate,
        addressData: dataAddress,
      });
      console.log("response update data: ", response);
      toast.success(response.data.address.message);
      getDataAddress();
      // } else {
      //   console.log("Validation failed");
      // }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
    console.log(dataAddress);
    console.log(idCustomer);
  };

  
  const handleDeleteAddress = async (idAddress: string) => {
    try {
      const result = await deleteAddress({ idAddress }).unwrap();
      console.log(result);
      toast.success(result.message);
      getDataAddress();
    } catch (error) {
      console.error("Error delete address:", error);
    }
  };

  const handleSetDefaultAddress = async () => {
    try {
      const result = await setDefaultAddress(setDefaultAddressData).unwrap();
      console.log(result);
      toast.success(result.message);
      getDataAddress();
    } catch (error) {
      console.error("Error set default address:", error);
    }
  };
  return (
    <>
    <div className="p-4 bg-white rounded-lg min-h-[600px]">
    <div className="flex items-center justify-between border-b">
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

      {dataAddress !== null ? (
        dataAddress.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between mx-6 mb-6 border-b pb-4"
          >
            <div>
              <div className="flex items-center">
                <div className="font-normal text-lg pe-2 border-r">
                  {item.fullName}
                </div>

                <div className="font-light text-gray-500 text-sm ps-2 ">
                  {item.phoneNumber}
                </div>
              </div>
              <div className="font-light text-gray-500 text-sm py-1">
                {item.address}
              </div>

              <div className="font-light text-gray-500 text-sm pb-1">
                {item.ward}, {item.district}, {item.province}
              </div>

              {item.isDefault == true ? (
                <div>
                  <button
                    className="shadow duration-300 cursor-text text-primary border border-primary font-normal text-sm py-1 px-2 rounded-sm"
                    type="button"
                  >
                    Mặc định
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-end flex-col">
              <div className="flex items-center justify-between">
                <div
                  className="text-primary font-medium text-base pe-2 cursor-pointer hover:text-blue-500"
                  onClick={() => (
                    handleGetAddressById(item._id),
                    handleOpenBoxUpdateAddress(),
                    setAddressIdToUpdate(item._id)
                  )}
                >
                  Cập nhật
                </div>
                {item.isDefault === false ? (
                  <div
                    onClick={() => (
                      handleOpenBoxConfirm(), handleGetIdAddressToDel(item._id)
                    )}
                    className="text-primary font-medium text-base ps-2 cursor-pointer border-l"
                  >
                    Xóa
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {item.isDefault === true ? (
                  <button
                    className=" disabled shadow duration-300 cursor-not-allowed my-2 text-gray-400 border border-gray-400 font-normal text-sm py-1 px-2 rounded-sm"
                    type="button"
                  >
                    Thiết lập mặc định
                  </button>
                ) : (
                  <button
                    onClick={() => (
                      handleGetIdAddressToSetDefault(item._id),
                      handleOpenBoxConfirmDefaultAddress()
                    )}
                    className="shadow duration-300 hover:bg-slate-100 my-2 text-black border border-gray-500 font-normal text-sm py-1 px-2 rounded-sm"
                    type="button"
                  >
                    Thiết lập mặc định
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No addresses found.</div>
      )}

      {/* Box modal add address */}

      <div>
        {/* Box add address */}
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
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Số điện thoại"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  sx={{ ml: 1 }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </div>
              <AddressSelectorAdd onAddressChange={handleAddressChange} />
              <TextField
                margin="normal"
                fullWidth
                label="Địa chỉ cụ thể"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />

              <Typography sx={{ mt: 2, mb: 1 }}>Loại địa chỉ</Typography>
              <ToggleButtonGroup
                value={formData.addressType}
                exclusive
                onChange={handleAddressTypeChange}
                aria-label="Loại địa chỉ"
                fullWidth
              >
                <ToggleButton value={false} aria-label="Nhà riêng">
                  Nhà riêng
                </ToggleButton>
                <ToggleButton value={true} aria-label="Văn phòng">
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

        {/* Update modal */}
        <AddressModal
          openBoxUpdateAddress={openBoxUpdateAddress}
          handleClose={handleCloseBoxUpdateAddress}
          dataAddressById={dataAddressByIdInModal}
          handleSubmit={handleSubmitUpdate}
          errors={errors}
          onAddressChangeToUpdate={handleAddressChangeToUpdate}
        />

        {/* Box confirm delete address */}
        <Modal
          open={openBoxConfirm}
          onClose={handleCloseBoxConfirm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
        >
          <Fade in={openBoxConfirm}>
            <Box
              component="form"
              onSubmit={() => handleDeleteAddress(idAddressToDel)}
              sx={style}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Bạn có chắc muốn xóa địa chỉ này ?
              </Typography>
              <ToggleButtonGroup
                value=""
                exclusive
                aria-label="Loại địa chỉ"
                fullWidth
                sx={{ mt: 4 }}
              >
                <ToggleButton
                  value="Trở về"
                  aria-label="Trở về"
                  onClick={handleCloseBoxConfirm}
                >
                  Trở về
                </ToggleButton>
                <ToggleButton
                  color="primary"
                  value="Xóa"
                  aria-label="Xóa"
                  onClick={() => (
                    handleDeleteAddress(idAddressToDel), handleCloseBoxConfirm()
                  )}
                >
                  Xóa
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Fade>
        </Modal>

        {/* Box confirm set default address */}
        <Modal
          open={openBoxConfirmDefaultAddress}
          onClose={handleCloseBoxConfirmDefaultAddress}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
        >
          <Fade in={openBoxConfirmDefaultAddress}>
            <Box
              component="form"
              onSubmit={() => handleCloseBoxConfirm()}
              sx={style}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Bạn có chắc muốn đặt địa chỉ này thành mặc định ?
              </Typography>
              <ToggleButtonGroup
                value=""
                exclusive
                aria-label="Loại địa chỉ"
                fullWidth
                sx={{ mt: 4 }}
              >
                <ToggleButton
                  value="Trở về"
                  aria-label="Trở về"
                  onClick={handleCloseBoxConfirmDefaultAddress}
                >
                  Trở về
                </ToggleButton>
                <ToggleButton
                  color="primary"
                  value="Đặt"
                  aria-label="Đặt"
                  onClick={() => (
                    handleCloseBoxConfirmDefaultAddress(),
                    handleSetDefaultAddress()
                  )}
                >
                  Đặt
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
    </>
  );
};

export default ComponentUserAddress;
