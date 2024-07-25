import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Modal,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface AddressDataInModal {
  fullName: string;
  phoneNumber: string;
  address: string;
  addressType: string;
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
}

const AddressModal: React.FC<AddressModalProps> = ({
  openBoxUpdateAddress,
  handleClose,
  dataAddressById,
  handleSubmit,
  errors,
}) => {
  const [addressData, setAddressData] = useState<AddressDataInModal>({
    fullName: '',
    phoneNumber: '',
    address: '',
    addressType: 'Nhà riêng',
  });

  useEffect(() => {
    if (dataAddressById) {
      setAddressData({
        fullName: dataAddressById.fullName || '',
        phoneNumber: dataAddressById.phoneNumber || '',
        address: dataAddressById.address || '',
        addressType: dataAddressById.addressType || 'Nhà riêng',
      });
    }
  }, [dataAddressById]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleAddressTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAddressType: string | null
  ) => {
    if (newAddressType !== null) {
      setAddressData((prevData) => ({
        ...prevData,
        addressType: newAddressType,
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(addressData);
  };

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
              value={addressData.fullName}
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
              value={addressData.phoneNumber}
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
            value={addressData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <Typography sx={{ mt: 2, mb: 1 }}>Loại địa chỉ</Typography>
          <ToggleButtonGroup
            value={addressData.addressType}
            exclusive
            onChange={handleAddressTypeChange}
            aria-label="Loại địa chỉ"
            fullWidth
          >
            <ToggleButton value="Nhà riêng" aria-label="Nhà riêng">
              Nhà riêng
            </ToggleButton>
            <ToggleButton value="Văn phòng" aria-label="Văn phòng">
              Văn phòng
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
