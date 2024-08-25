import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
// import AddressSelector from "./address_form_select";
import axios from "axios";

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

interface AddressDataInModal {
  fullName: string;
  phoneNumber: string;
  address: string;
  addressType: boolean;
  province: string;
  district: string;
  ward: string;
}

interface District {
  DistrictID: number;
  DistrictName: string;
}

interface Ward {
  WardCode: string;
  WardName: string;
}

interface Province {
  ProvinceID: number;
  ProvinceName: string;
}

interface AddressModalProps {
  openBoxUpdateAddress: boolean;
  handleClose: () => void;
  dataAddressById: AddressDataInModal | undefined;
  handleSubmit: (addressData: AddressDataInModal) => void;
  errors: {
    fullName?: string;
    phoneNumber?: string;
    address?: string;
  };
  onAddressChangeToUpdate: (province: string, district: string, ward: string) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  openBoxUpdateAddress,
  handleClose,
  dataAddressById,
  handleSubmit,
  onAddressChangeToUpdate,
}) => {
  const [addressDataToUpdate, setAddressDataToUpdate] = useState<AddressDataInModal>({
    fullName: "",
    phoneNumber: "",
    address: "",
    addressType: false,
    province: "",
    district: "",
    ward: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    province: "",
    district: "",
    ward: "",
  });
  const validateFormUpdate = () => {
    let tempErrors = { fullName: "", phoneNumber: "", address: "" , province: "", district: "", ward: ""};
    const phoneNumberPattern = /^[0-9]{10}$/;

    if (!addressDataToUpdate.fullName)
      tempErrors.fullName = "Họ và tên không được để trống";
    if (!addressDataToUpdate.phoneNumber)
      tempErrors.phoneNumber = "Số điện thoại không được để trống";
    else if (!phoneNumberPattern.test(addressDataToUpdate.phoneNumber))
      tempErrors.phoneNumber = "Số điện thoại không hợp lệ";
    if (!addressDataToUpdate.address)
      tempErrors.address = "Địa chỉ không được để trống";
    if (!addressDataToUpdate.province)
      tempErrors.province = "Địa chỉ tỉnh/thành phó không được để trống";
    if (!addressDataToUpdate.district)
      tempErrors.district = "Địa chỉ quận/huyện không được để trống";
    if (!addressDataToUpdate.ward)
      tempErrors.ward = "Địa chỉ xã/phường không được để trống";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  useEffect(() => {
    if (dataAddressById) {
      setAddressDataToUpdate({
        fullName: dataAddressById.fullName || "",
        phoneNumber: dataAddressById.phoneNumber || "",
        address: dataAddressById.address || "",
        province: dataAddressById.province || "",
        district: dataAddressById.district || "",
        ward: dataAddressById.ward || "",
        addressType: dataAddressById.addressType || false,
      });
    }
  }, [dataAddressById]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressDataToUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(addressDataToUpdate);

  const handleAddressTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAddressType: boolean | null
  ) => {
    if (newAddressType !== null) {
      setAddressDataToUpdate((prevData) => ({
        ...prevData,
        addressType: newAddressType,
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFormUpdate()) {
      handleSubmit(addressDataToUpdate);
      setSelectedProvinceToUpdate("")
      setSelectedDistrict("")
      setSelectedWard("")
    } else {
      console.log("Validation failed");
    }
  };

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvinceToUpdate, setSelectedProvinceToUpdate] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            "Content-Type": "application/json",
            Token: "994b9477-4b2f-11ef-9f89-7a771078d22b",
          },
        }
      );
      setProvinces(response.data.data);
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvinceToUpdate) {
      const fetchDistricts = async () => {
        const province = provinces.find(
          (p) => p.ProvinceName === selectedProvinceToUpdate
        );
        const response = await axios.post(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
          { province_id: province?.ProvinceID },
          {
            headers: {
              "Content-Type": "application/json",
              Token: "994b9477-4b2f-11ef-9f89-7a771078d22b",
            },
          }
        );
        setDistricts(response.data.data);
      };

      fetchDistricts();
    }
  }, [selectedProvinceToUpdate, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const district = districts.find(
          (d) => d.DistrictName === selectedDistrict
        );
        const response = await axios.post(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
          { district_id: district?.DistrictID },
          {
            headers: {
              "Content-Type": "application/json",
              Token: "994b9477-4b2f-11ef-9f89-7a771078d22b",
            },
          }
        );
        setWards(response.data.data);
      };

      fetchWards();
    }
  }, [selectedDistrict, districts]);

  useEffect(() => {
    onAddressChangeToUpdate(selectedProvinceToUpdate, selectedDistrict, selectedWard);
  }, [selectedProvinceToUpdate, selectedDistrict, selectedWard, onAddressChangeToUpdate]);

  useEffect(() => {
    setAddressDataToUpdate((prevData) => ({
      ...prevData,
      province: selectedProvinceToUpdate,
      district: selectedDistrict,
      ward: selectedWard,
    }));
  },[selectedProvinceToUpdate, selectedDistrict, selectedWard])

  const addressValue = addressDataToUpdate.province +","+ addressDataToUpdate.district + "," + addressDataToUpdate.ward

  return (
    <Modal
      open={openBoxUpdateAddress}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={openBoxUpdateAddress}>
        <Box component="form" onSubmit={handleFormSubmit} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông tin địa chỉ
          </Typography>
          <div className="flex justify-between items-center">
            <TextField
              margin="normal"
              fullWidth
              label="Họ và tên"
              name="fullName"
              value={addressDataToUpdate.fullName}
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
              value={addressDataToUpdate.phoneNumber}
              onChange={handleChange}
              sx={{ ml: 1 }}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </div>
          <TextField
            margin="normal"
            fullWidth
            label="Địa chỉ cụ thể"
            name="address"
            value={addressDataToUpdate.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />

          <TextField 
            margin="normal"
            fullWidth
            label="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            name="address"
            value= {addressValue}
            />

          <Box sx={{ display: "flex" }}>
            <FormControl fullWidth margin="normal" sx={{ mr: 2 }}>
              <InputLabel>Tỉnh/Thành phố</InputLabel>
              <Select
                value={addressDataToUpdate.province|| selectedProvinceToUpdate}
                onChange={(e) => {
                  setSelectedProvinceToUpdate(e.target.value as string)
                  setSelectedDistrict("");
                  setWards([]);
                  setSelectedWard("");
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {provinces.map((province) => (
                  <MenuItem
                    key={province.ProvinceID}
                    value={province.ProvinceName}
                  >
                    {province.ProvinceName}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.province && <FormHelperText sx={{color: 'red'}}>{errors.province}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth margin="normal" sx={{}}>
              <InputLabel>Quận/Huyện</InputLabel>
              <Select
                value={addressDataToUpdate.district || selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value as string);
                  setSelectedWard("");
                }}
                disabled={!selectedProvinceToUpdate}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {districts.map((district) => (
                  <MenuItem
                    key={district.DistrictID}
                    value={district.DistrictName}
                  >
                    {district.DistrictName}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.district && <FormHelperText sx={{color: 'red'}} >{errors.province}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth margin="normal" sx={{ ml: 2 }}>
              <InputLabel>Phường/Xã</InputLabel>
              <Select
                value={addressDataToUpdate.ward || selectedWard}
                onChange={(e) => {
                  setSelectedWard(e.target.value as string);
                }}
                disabled={!selectedDistrict}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {wards.map((ward) => (
                  <MenuItem key={ward.WardCode} value={ward.WardName}>
                    {ward.WardName}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.ward && <FormHelperText sx={{color: 'red'}}>{errors.ward}</FormHelperText>}
            </FormControl>
          </Box>
          <Typography sx={{ mt: 2, mb: 1 }}>Loại địa chỉ</Typography>
          <ToggleButtonGroup
            value={addressDataToUpdate.addressType}
            exclusive
            onChange={handleAddressTypeChange}
            aria-label="Loại địa chỉ"
            fullWidth
          >
            <ToggleButton value={false} aria-label="Văn phòng">
            Văn phòng
            </ToggleButton>
            <ToggleButton value={true} aria-label="Nhà riêng">
            Nhà riêng
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Cập nhật địa chỉ
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddressModal;
