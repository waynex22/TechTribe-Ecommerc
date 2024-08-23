import React, { useEffect, useState } from 'react'
import { getDistrictsByProvince, getProvinces, getWardsByDistrict } from '../../../../services/address'
import { IoClose } from 'react-icons/io5'
import { typeAddressShop } from '../../../../utils/types/shop'

type address = { name: string, code: string }

const SelectAddress = ({ onHandlePopup, addressProfile, onHandleFormAddress }: {
    onHandlePopup: () => void
    addressProfile: typeAddressShop
    onHandleFormAddress: (address: typeAddressShop) => void
}) => {
    const [provinces, setProvinces] = useState([] as address[])
    const [districts, setDistricts] = useState([] as address[])
    const [wards, setWards] = useState([] as address[])
    const [listShow, setListShow] = useState([] as address[])
    const [nameShow, setNameShow] = useState('')
    const [formAddress, setFormAddress] = useState({} as typeAddressShop)

    useEffect(() => { setNameShow('') }, [])

    useEffect(() => {
        if(addressProfile._id)
            setFormAddress(addressProfile)
        fetchProvinces();
    }, [addressProfile]);

    useEffect(() => {
        if (addressProfile.province && provinces.length > 0) {
            const province = provinces.find(province => province.name === addressProfile.province)
            if (province)
                fetchDistrict(province.code)
        }

    }, [addressProfile, provinces])

    useEffect(() => {
        if (districts.length > 0 && addressProfile.district) {
            const district = districts.find(district => district.name === addressProfile.district)
            if (district)
                fetchWard(district.code)
        }
    }, [addressProfile.district, districts])


    const handleNameShow = (value: string) => {
        setNameShow(value)
        if (value === 'province' && provinces.length > 0) {
            setListShow(provinces)
        }
        if (value === 'district' && districts.length > 0) {
            setListShow(districts)
        }
        if (value === 'ward' && wards.length > 0) {
            setListShow(wards)
        }
    }
    const handleListShow = (key: string, name: string) => {
        if (key === 'province') {
            setListShow(provinces.filter(address => address.name.toLowerCase().includes(name.toLowerCase())))
            setFormAddress((prev) => {
                return { ...prev, province: name, district: '', ward: '', address: '' }
            })
        }
        if (key === 'district') {
            setListShow(districts.filter(address => address.name.toLowerCase().includes(name.toLowerCase())))
            setFormAddress((prev) => {
                return { ...prev, district: name, ward: '', address: '' }
            })
        }
        if (key === 'ward') {
            setListShow(wards.filter(address => address.name.toLowerCase().includes(name.toLowerCase())))
            setFormAddress((prev) => {
                return { ...prev, ward: name, address: '' }
            })
        }
        if (key === 'address') {
            setFormAddress((prev) => {
                return { ...prev, address: name }
            })
        }
    }
    const handleValueAddress = (key: string, name: string) => {
        setNameShow('')
        if (key === 'province') {
            const province = provinces.find(item => item.name === name)
            if (province) {
                fetchDistrict(province.code);
            }
            setFormAddress((prev) => {
                return { ...prev, province: name, district: '', ward: '', address: '' }
            })
        }
        if (key === 'district') {
            const district = districts.find(item => item.name === name)
            if (district) {
                fetchWard(district.code);
            }
            setFormAddress((prev) => {
                return { ...prev, district: name, ward: '', address: '' }
            })
        }
        if (key === 'ward') {
            const ward = wards.find(item => item.name === name)
            if (ward) {
                fetchWard(ward.code);
            }
            setFormAddress((prev) => {
                return { ...prev, ward: name, address: '' }
            })
        }
    }

    const fetchProvinces = async () => {
        try {
            const data = await getProvinces();
            setProvinces(data);
        } catch (err) {
            console.error('Error fetching provinces:', err);
        }
    };

    const fetchDistrict = async (code: string) => {
        try {
            const data = await getDistrictsByProvince(code);
            setDistricts(data);
            setWards([])
        } catch (err) {
            console.error('Error fetching provinces:', err);
        }
    };
    const fetchWard = async (code: string) => {
        try {
            const data = await getWardsByDistrict(code);
            setWards(data);
        } catch (err) {
            console.error('Error fetching provinces:', err);
        }
    };

    const onConfirm = () => {
        onHandleFormAddress(formAddress)
    }
    return (
        <div className=' relative'>
            <p className=' absolute top-0 right-0 text-xl cursor-pointer' onClick={onHandlePopup}> <IoClose /> </p>
            <p className=' py-2 text-lg font-semibold'>Chọn địa chỉ</p>
            <div className=' py-6 flex gap-6 flex-col'>
                <div className=' border-2 border-dotted py-2 px-4 rounded cursor-pointer relative'>
                    <input
                        value={formAddress.province}
                        onChange={(e) => handleListShow(e.target.name, e.target.value)}
                        onClick={() => handleNameShow('province')}
                        name='province'
                        type="text"
                        placeholder='Chọn tỉnh/thành phố'
                        className=' text-gray-700 w-full'
                    />
                    {nameShow === 'province' &&
                        <div className=' absolute top-[55px] left-0 w-full max-h-[300px] z-10 border shadow bg-white rounded boder overflow-y-auto'>
                            {listShow.length > 0 &&
                                listShow.map(item => {
                                    return <p
                                        key={item.code}
                                        onClick={() => handleValueAddress('province', item.name)}
                                        className=' p-2 border-b'>
                                        {item.name}
                                    </p>
                                })
                            }
                        </div>
                    }
                </div>
                {formAddress.province && districts.length > 0 ?
                    <div className=' border-2 border-dotted py-2 px-4 rounded cursor-pointer relative'>
                        <input
                            value={formAddress.district || ''}
                            onChange={(e) => handleListShow(e.target.name, e.target.value)}
                            onClick={() => handleNameShow('district')}
                            name='district'
                            type="text"
                            placeholder='Chọn quận/ huyện'
                            className=' text-gray-700 w-full'
                        />
                        {nameShow === 'district' &&
                            <div className=' absolute top-[55px] left-0 w-full max-h-[300px] z-10 border shadow bg-white rounded boder overflow-y-auto'>
                                {listShow.length > 0 &&
                                    listShow.map(item => {
                                        return <p
                                            key={item.code}
                                            onClick={() => handleValueAddress('district', item.name)}
                                            className=' p-2 border-b'>
                                            {item.name}
                                        </p>
                                    })
                                }
                            </div>
                        }
                    </div> :
                    <div className=' border-2 border-dotted py-4 px-4 rounded relative bg-gray-50 cursor-not-allowed'>
                        <p className=' text-gray-700 '>Chọn quận/ huyện</p>
                    </div>
                }
                {formAddress.district && wards.length > 0 ?
                    <div className=' border-2 border-dotted py-2 px-4 rounded cursor-pointer relative'>
                        <input
                            value={formAddress.ward || ''}
                            onChange={(e) => handleListShow(e.target.name, e.target.value)}
                            onClick={() => handleNameShow('ward')}
                            name='ward'
                            type="text"
                            placeholder='Chọn xã/ phường'
                            className=' text-gray-700 w-full'
                        />
                        {nameShow === 'ward' &&
                            <div className=' absolute top-[55px] left-0 w-full max-h-[300px] z-10 border shadow bg-white rounded boder overflow-y-auto'>
                                {listShow.length > 0 &&
                                    listShow.map(item => {
                                        return <p
                                            key={item.code}
                                            onClick={() => handleValueAddress('ward', item.name)}
                                            className=' p-2 border-b'>
                                            {item.name}
                                        </p>
                                    })
                                }
                            </div>
                        }
                    </div> :
                    <div className=' border-2 border-dotted py-4 px-4 rounded relative bg-gray-50 cursor-not-allowed'>
                        <p className=' text-gray-700 '>Chọn xã/ phường</p>
                    </div>
                }
                {formAddress.ward ?
                    <div className=' border-2 border-dotted py-2 px-4 rounded'>
                        <input
                            value={formAddress.address || ''}
                            onChange={(e) => handleListShow(e.target.name, e.target.value)}
                            name='address'
                            type="text"
                            placeholder='Số nhà/ thôn/ xóm'
                            className=' text-gray-700 w-full'
                        />
                    </div> :
                    <div className=' border-2 border-dotted py-4 px-4 rounded relative bg-gray-50 cursor-not-allowed'>
                        <p className=' text-gray-700 '>Số nhà/ thôn/ xóm</p>
                    </div>
                }

                <div className=' flex flex-row-reverse gap-4'>
                    {formAddress.address ?
                        <p onClick={onConfirm} className=' cursor-pointer px-4 py-2 rounded border hover:bg-opacity-80 bg-primary text-white font-semibold'>
                            Xác nhận
                        </p> :
                        <p className=' cursor-not-allowed px-4 py-2 rounded border bg-opacity-80 bg-primary text-white font-semibold'>
                            Xác nhận
                        </p>
                    }
                    <p onClick={onHandlePopup} className=' cursor-pointer px-4 py-2 rounded border hover:bg-gray-100'>Hủy</p>
                </div>
            </div>

        </div>
    )
}

export default SelectAddress