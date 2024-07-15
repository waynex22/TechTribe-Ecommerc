import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface Province {
  code: number;
  name: string;
}

interface District {
  code: number;
  name: string;
}

interface Ward {
  code: number;
  name: string;
}

const AddressForm: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
      .then(response => {
        setProvinces(response.data.data.data);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${selectedProvince}&limit=-1`)
        .then(response => {
          setDistricts(response.data.data.data);
          setWards([]);
          setSelectedDistrict('');
          setSelectedWard('');
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${selectedDistrict}&limit=-1`)
        .then(response => {
          setWards(response.data.data.data);
        })
        .catch(error => {
          console.error('Error fetching wards:', error);
        });
    }
  }, [selectedDistrict]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="province-select">Tỉnh/Thành phố</InputLabel>
        <Select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value as string)}
          label="Tỉnh/Thành phố"
          inputProps={{
            name: 'province',
            id: 'province-select',
          }}
        >
          {provinces.map((province) => (
            <MenuItem key={province.code} value={province.code}>
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="district-select">Quận/Huyện</InputLabel>
        <Select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value as string)}
          label="Quận/Huyện"
          inputProps={{
            name: 'district',
            id: 'district-select',
          }}
          disabled={!selectedProvince}
        >
          {districts.map((district) => (
            <MenuItem key={district.code} value={district.code}>
              {district.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="ward-select">Phường/Xã</InputLabel>
        <Select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value as string)}
          label="Phường/Xã"
          inputProps={{
            name: 'ward',
            id: 'ward-select',
          }}
          disabled={!selectedDistrict}
        >
          {wards.map((ward) => (
            <MenuItem key={ward.code} value={ward.code}>
              {ward.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default AddressForm;
