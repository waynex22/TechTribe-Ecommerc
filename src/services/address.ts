import axios from 'axios';

const BASE_URL = 'https://provinces.open-api.vn/api';

export const getProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/p/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const getDistrictsByProvince = async (provinceId :string) => {
  try {
    const response = await axios.get(`${BASE_URL}/p/${provinceId}?depth=2`);
    return response.data.districts; 
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const getWardsByDistrict = async (districtId :string) => {
  try {
    const response = await axios.get(`${BASE_URL}/d/${districtId}?depth=2`);
    return response.data.wards; 
  } catch (error) {
    console.error('Error fetching wards:', error);
    throw error;
  }
};
