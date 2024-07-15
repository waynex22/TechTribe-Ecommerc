import React from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";

const HeaderSeller: React.FC  = () => {
    return (
        <div className="">
            <div className=" fixed flex justify-between w-screen bg-white shadow-sm border-b z-20">
                <div className=" ">
                    <img className="w-10 " src="public/logo-nontext.png" alt="" />
                </div>
                <div className=" flex gap-2 items-center">
                    <div className=" px-2 flex gap-1 items-center text-xl border-r">
                        <div className="  relative group">
                            <div className="p-4 hover:bg-gray-100 cursor-pointer">
                                <TfiMoreAlt />
                            </div>
                            <div className="group-hover:block absolute hidden -right-[150px] top-full pt-2">
                                <div className="bg-white w-[300px] text-sm font-normal rounded-md shadow-lg p-4">
                                    <div className=" grid grid-cols-3 gap-4">
                                        <div className=" flex flex-col gap-1 items-center">
                                            <img className=" w-16 " src="https://img.icons8.com/?size=100&id=67582&format=png&color=000000" alt="" />
                                            <p>Tất cả</p>
                                        </div>
                                        <div className=" flex flex-col gap-1 items-center">
                                            <img className=" w-16 "  src="https://img.icons8.com/?size=100&id=114624&format=png&color=000000" alt="" />
                                            <p>Tất cả sản phẩm</p>
                                        </div>
                                        <div className=" flex flex-col gap-1 items-center">
                                            <img className=" w-16 " src="https://img.icons8.com/?size=100&id=12381&format=png&color=000000" alt="" />
                                            <p>Kênh Makerting</p>
                                        </div>
                                        <div className=" flex flex-col gap-1 items-center">
                                            <img className=" w-16 " src="https://img.icons8.com/?size=100&id=64014&format=png&color=000000" alt="" />
                                            <p>Số dư TK</p>
                                        </div>
                                        <div className=" flex flex-col gap-1 items-center">
                                            <img className=" w-16 " src="https://img.icons8.com/?size=100&id=KdWQjPvteDje&format=png&color=000000" alt="" />
                                            <p>Phân tích bán hàng</p>
                                        </div>
                                        <div className=" flex flex-col gap-1 items-center">
                                            <img className=" w-16 " src="https://img.icons8.com/?size=100&id=ZGqV6cHUtDmj&format=png&color=000000" alt="" />
                                            <p>Thiết lập Shop</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" relative group">
                            <div className="p-4 hover:bg-gray-100 cursor-pointer">
                                <IoMdNotifications />
                            </div>
                            <div className="group-hover:block absolute hidden -right-[120px] top-full pt-2">
                                <div className="  bg-white w-[350px] rounded-md shadow-lg">
                                    <div className=" py-2 px-4 flex justify-between text-xs font-normal">
                                        <p>Thông báo gần đây</p>
                                        <p>Đánh dấu đã đọc</p>
                                    </div>
                                    <div className=" max-h-[350px] overflow-y-auto px-4 py-2 border-y flex flex-col gap-2">
                                        <div className=" flex gap-2">
                                            <img className=" w-10 h-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s" alt="" />
                                            <div className=" hover:text-primary cursor-pointer">
                                                <p className=" text-base text-left">Tittle</p>
                                                <p className=" font-normal text-left text-sm">description description description description descriptiondescription</p>
                                                <p className="font-normal text-left text-xs">12:00 20/22/2024</p>
                                            </div>
                                        </div>
                                        <div className=" flex gap-2">
                                            <img className=" w-10 h-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s" alt="" />
                                            <div className=" hover:text-primary cursor-pointer">
                                                <p className=" text-base text-left">Tittle</p>
                                                <p className=" font-normal text-left text-sm">description description description description descriptiondescription</p>
                                                <p className="font-normal text-left text-xs">12:00 20/22/2024</p>
                                            </div>
                                        </div>
                                        <div className=" flex gap-2">
                                            <img className=" w-10 h-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s" alt="" />
                                            <div className=" hover:text-primary cursor-pointer">
                                                <p className=" text-base text-left">Tittle</p>
                                                <p className=" font-normal text-left text-sm">description description description description descriptiondescription</p>
                                                <p className="font-normal text-left text-xs">12:00 20/22/2024</p>
                                            </div>
                                        </div>
                                        <div className=" flex gap-2">
                                            <img className=" w-10 h-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s" alt="" />
                                            <div className=" hover:text-primary cursor-pointer">
                                                <p className=" text-base text-left">Tittle</p>
                                                <p className=" font-normal text-left text-sm">description description description description descriptiondescription</p>
                                                <p className="font-normal text-left text-xs">12:00 20/22/2024</p>
                                            </div>
                                        </div>
                                        <div className=" flex gap-2">
                                            <img className=" w-10 h-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s" alt="" />
                                            <div className=" hover:text-primary cursor-pointer">
                                                <p className=" text-base text-left">Tittle</p>
                                                <p className=" font-normal text-left text-sm">description description description description descriptiondescription</p>
                                                <p className="font-normal text-left text-xs">12:00 20/22/2024</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className=" text-primary text-base py-2">Xem tất cả thông báo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" relative group">
                        <div className="p-4 flex gap-2 items-center hover:bg-gray-100 cursor-pointer">
                            <img className=" w-7 h-7 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s" alt="" />
                            <p>Luffy </p>
                            <p className=" text-xl"><FaAngleDown /></p>
                        </div>
                        <div className=" absolute hidden group-hover:block top-full right-0 p-2">
                            <div className="bg-white w-[250px] rounded-lg shadow-lg">
                                <div className=" flex flex-col py-2 gap-2 items-center">
                                    <img className=" w-12 h-12 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s" alt="" />
                                    <p>Luffy </p>
                                </div>
                                <div className=" text-left font-normal">
                                    <div className=" border-y py-2">
                                        <p className="p-1 px-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                            <CiShop></CiShop>Hồ sơ shop
                                        </p>
                                        <p className="p-1 px-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                            <CiSettings />
                                            Thiết lập shop
                                        </p>
                                    </div>
                                    <div className=" py-1">
                                        <p className="p-1 px-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                            <AiOutlineLogout />
                                            Đăng xuất
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSeller;
