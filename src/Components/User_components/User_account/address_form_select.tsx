import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem, FormControl, Select, InputLabel, Box } from '@mui/material';

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

interface AddressSelectorProps {
  onAddressChange: (province: string, district: string, ward: string) => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ onAddressChange }) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        headers: {
          'Content-Type': 'application/json',
          'Token': '994b9477-4b2f-11ef-9f89-7a771078d22b',
        },
      });
      setProvinces(response.data.data);
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const province = provinces.find(p => p.ProvinceName === selectedProvince);
        const response = await axios.post(
          'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
          { province_id: province?.ProvinceID },
          {
            headers: {
              'Content-Type': 'application/json',
              'Token': '994b9477-4b2f-11ef-9f89-7a771078d22b',
            },
          }
        );
        setDistricts(response.data.data);
      };

      fetchDistricts();
    }
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const district = districts.find(d => d.DistrictName === selectedDistrict);
        const response = await axios.post(
          'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
          { district_id: district?.DistrictID },
          {
            headers: {
              'Content-Type': 'application/json',
              'Token': '994b9477-4b2f-11ef-9f89-7a771078d22b',
            },
          }
        );
        setWards(response.data.data);
      };

      fetchWards();
    }
  }, [selectedDistrict, districts]);

  useEffect(() => {
    onAddressChange(selectedProvince, selectedDistrict, selectedWard);
  }, [selectedProvince, selectedDistrict, selectedWard, onAddressChange]);

  return (
    <Box sx={{display: "flex"}}>
      <FormControl fullWidth margin="normal" sx={{ mr: 2 }}>
        <InputLabel>Tỉnh/Thành phố</InputLabel>
        <Select
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value as string);
            setSelectedDistrict('');
            setWards([]);
            setSelectedWard('');
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
            <MenuItem key={province.ProvinceID} value={province.ProvinceName}>
              {province.ProvinceName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" sx={{  }}>
        <InputLabel>Quận/Huyện</InputLabel>
        <Select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value as string);
            setSelectedWard('');
          }}
          disabled={!selectedProvince}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          {districts.map((district) => (
            <MenuItem key={district.DistrictID} value={district.DistrictName}>
              {district.DistrictName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" sx={{ ml: 2 }}>
        <InputLabel>Phường/Xã</InputLabel>
        <Select
          value={selectedWard}
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
      </FormControl>
    </Box>
  );
};

export default AddressSelector;
