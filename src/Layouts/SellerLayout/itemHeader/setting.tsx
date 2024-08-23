import React from 'react'
import { FaAngleDown } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/authSlice";
import { useAppDispatch } from '../../../redux/hook';
import { TypeShop } from '../../../utils/types/shop';

const SettingComponetHeader = ({ shop, nameShowItem, setShowItem }: {
    shop: TypeShop
    nameShowItem: string
    setShowItem: React.Dispatch<React.SetStateAction<string>>
}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogou = () => {
        dispatch(logout())
        navigate('/')
    }
    const setNameShow = () => {
        setShowItem(prev => prev !== 'setting' ? 'setting' : '')
    }
    return (
        <>
            <div className=" relative group">
                <div onClick={() => setNameShow()} className="p-4 flex gap-2 items-center hover:bg-gray-100 cursor-pointer">
                    <img className=" w-7 h-7 rounded-full object-cover" src={shop.thumbnail} alt="" />
                    <p>{shop.name}  </p>
                    <p className=" text-xl"><FaAngleDown /></p>
                </div>
                {
                    nameShowItem === 'setting' &&
                    <div className=" absolute top-full right-0 p-2">
                        <div className="bg-white w-[250px] border rounded-lg shadow-lg">
                            <div className=" flex flex-col py-2 gap-2 items-center">
                                <img className=" w-12 h-12 rounded-full object-cover" src={shop.thumbnail} alt="" />
                                <p> {shop.name} </p>
                            </div>
                            <div className=" text-left font-normal">
                                <div className=" border-y py-2">
                                    <Link to={'/seller/settings/profile'} className="p-1 px-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                        <CiShop></CiShop>Hồ sơ shop
                                    </Link>
                                    <Link to={'/seller/settings/profile'} className="p-1 px-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                        <CiSettings />
                                        Thiết lập shop
                                    </Link>
                                </div>
                                <div className=" py-1">
                                    <p onClick={() => handleLogou()} className="p-1 px-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                        <AiOutlineLogout />
                                        Đăng xuất
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default SettingComponetHeader