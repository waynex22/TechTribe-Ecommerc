import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAddAddressMutation, useGetAddressByIdCustomerMutation } from 'src/redux/rtkQuery/user_customers';
import { useSelector } from 'react-redux';
import { ToastProps } from 'src/Type';
import Toast from 'src/Components/toast/Toast';
import Spinner from 'src/Components/spinner/Spinner';

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

const CheckOutAddress: React.FC = () => {
    const {user} = useSelector((state: any) => state.auth);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [addAddress] = useAddAddressMutation();
    const [wards, setWards] = useState<Ward[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedWard, setSelectedWard] = useState<string>('');
    const [toast , setToast] = useState<ToastProps | null>(null);
    const [loading , setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState<string | any>(null);
    const [addressData, setAddressData] = useState({
        customerId: user?.sub,
        fullName: '',
        phoneNumber: '',
        province: '',
        district: '',
        ward: '',
        address: '',
        addressType: true,
        isDefautl: true,
    });
    const history = useNavigate();
    const handleSetToast = (toast: any) => {
        setToast({ ...toast, message: toast.message, type: toast.type, onClose: () => setToast(null) });
    }
    useEffect(() => {
        const getAccessToken = localStorage.getItem("access_token");
        setAccessToken(getAccessToken);
      }, []);
    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!addressData.fullName) newErrors.fullName = 'Họ tên là bắt buộc';
        if (!addressData.phoneNumber) newErrors.phoneNumber = 'Điện thoại là bắt buộc';
        if (!selectedProvince) newErrors.province = 'Vui lòng chọn Tỉnh/Thành phố';
        if (!selectedDistrict) newErrors.district = 'Vui lòng chọn Quận/Huyện';
        if (!selectedWard) newErrors.ward = 'Vui lòng chọn Phường/Xã';
        if (!addressData.address) newErrors.address = 'Địa chỉ là bắt buộc';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
        if (name === 'province') {
            setSelectedProvince(value);
            setSelectedDistrict('');
            setSelectedWard('');
            setDistricts([]);
            setWards([]);
        } else if (name === 'district') {
            setSelectedDistrict(value);
            setSelectedWard('');
            setWards([]);
        } else if (name === 'ward') {
            setSelectedWard(value);
        }
    };
    const handleSubmit = async () => {
        setLoading(true);
        if (validate()) {
            const response = await addAddress({
                addressData: addressData,
                token: accessToken,
              }).unwrap();
              if (response.status === 201) {
                handleSetToast({ type: 'success', message: 'Thêm địa chỉ thành công' });
                setLoading(false);
                setTimeout(() => {
                    history('/checkout/cart')
                },1500)
              }
        } else {
            setLoading(false);
            console.log('Validation failed');
        }
    };
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
    return (
        <>
        <Spinner loading={loading} />
        {toast && <Toast message={toast.message} type={toast.type} onClose={toast.onClose} />}
            <div className="w-full mx-auto bg-white p-4 rounded-md">
                <div className="grid grid-cols-1 gap-4 w-1/2 mx-auto">
                    <div className="flex justify-between items-center min-h-[40px]">
                        <label className="text-gray-600 font-nomal text-sm">Họ tên</label>
                        <div className="w-1/2">
                            <input
                                type="text"
                                className={`px-2 py-1 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-md w-full`}
                                name="fullName"
                                value={addressData.fullName}
                                onChange={handleOnChange}
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center min-h-[40px]">
                        <label className="text-gray-600 font-nomal text-sm">Điện thoại di động</label>
                        <div className="w-1/2">
                        <input
                            type="text"
                            className={`px-2 py-1 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-md w-full`}
                            name="phoneNumber"
                            value={addressData.phoneNumber}
                            onChange={handleOnChange}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                    </div>
                    </div>

                    <div className="flex justify-between items-center min-h-[40px]">
                        <label className="text-gray-600 font-nomal text-sm">Tỉnh/Thành phố</label>
                        <div className="w-1/2">
                        <select
                            name="province"
                            className={`px-2 py-1 border ${errors.province ? 'border-red-500' : 'border-gray-200'} rounded-md w-full`}
                            value={selectedProvince}
                            onChange={handleOnChange}
                        >
                            <option>Chọn Tỉnh/Thành phố</option>
                            {provinces.map(province => (
                                <option key={province.ProvinceID} value={province.ProvinceName}>
                                    {province.ProvinceName}
                                </option>
                            ))}
                        </select>
                        {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                    </div>
                    </div>

                    <div className="flex justify-between items-center min-h-[40px]">
                        <label className="text-gray-600 font-nomal text-sm">Quận/Huyện</label>
                        <div className="w-1/2">
                        <select
                            name="district"
                            className={`px-2 py-1 border ${errors.district ? 'border-red-500' : 'border-gray-200'} rounded-md w-full`}
                            value={selectedDistrict}
                            onChange={handleOnChange}
                            disabled={!selectedProvince}
                        >
                            <option>Chọn Quận/Huyện</option>
                            {districts.map(district => (
                                <option key={district.DistrictID} value={district.DistrictName}>
                                    {district.DistrictName}
                                </option>
                            ))}
                        </select>
                        {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                    </div>
                    </div>

                    <div className="flex justify-between items-center min-h-[40px]">
                        <label className="text-gray-600 font-nomal text-sm">Phường/Xã</label>
                        <div className="w-1/2">
                        <select
                            name="ward"
                            className={`px-2 py-1 border ${errors.ward ? 'border-red-500' : 'border-gray-200'} rounded-md w-full`}
                            value={selectedWard}
                            onChange={handleOnChange}
                            disabled={!selectedDistrict}
                        >
                            <option>Chọn Phường/Xã</option>
                            {wards.map(ward => (
                                <option key={ward.WardCode} value={ward.WardName}>
                                    {ward.WardName}
                                </option>
                            ))}
                        </select>
                        {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward}</p>}
                    </div>
                    </div>

                    <div className="flex justify-between items-center min-h-[40px]">
                        <label className="text-gray-600 font-nomal text-sm">Địa chỉ</label>
                        <div className="w-1/2">
                        <input
                            type="text"
                            className={`px-2 py-1 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-md w-full`}
                            name="address"
                            value={addressData.address}
                            onChange={handleOnChange}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-nomal text-sm">Loại địa chỉ</label>
                        <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center">
                                <input onChange={() => setAddressData({ ...addressData, addressType: true })} type="radio" name="addressType" className="mr-2" checked={addressData.addressType} />
                                Nhà riêng / Chung cư
                            </label>
                            <label className="flex items-center">
                                <input onChange={() => setAddressData({ ...addressData, addressType: false })} type="radio" name="addressType" className="mr-2" checked={!addressData.addressType} />
                                Cơ quan / Công ty
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <Link to='/checkout/cart'>
                            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Hủy bỏ</button>
                        </Link>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md">Tiếp tục</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckOutAddress;
