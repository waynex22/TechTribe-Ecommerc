import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faTransgender,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { useUpdateUserMutation } from "../../../redux/rtkQuery/user_customers";
import { jwtDecode } from "jwt-decode";


interface UserInfo {
  name: string;
  birthDate: Date | null;
  gender: string;
  photo: File | null;
}

const ComponentUserAccountProfile: React.FC = () => {
  
  const [accessToken, setAccessToken] = useState<string>('');
  const [infoUserFormToken, setInfoUserFormToken] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    const getAccessToken = localStorage.getItem('access_token');
  
    console.log(getAccessToken);
  
    if (getAccessToken !== null) {
      setAccessToken(getAccessToken);
    }
  }, []);
  
  useEffect(() => {
    if (accessToken !== '') {
      const decodeToken = jwtDecode(accessToken) as { [key: string]: any };
      setInfoUserFormToken(decodeToken)
      console.log(decodeToken);
    }
  }, [accessToken]);
  


  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    birthDate: null,
    gender: "",
    photo: null,
  });

  const handleNameChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | { name?: string | undefined; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name!]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileImage = e.target.files ? e.target.files[0] : null;
    setUserInfo({ ...userInfo, photo: fileImage });
    if (fileImage) {
      const url = URL.createObjectURL(fileImage); // Tạo URL dựa trên file
      //   setImage(file);
      setImageUrl(url); // Lưu URL vào state để hiển thị xem trước
    }
  };

  const [updateUser] = useUpdateUserMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    const formData = new FormData();
    formData.append('name', userInfo.name)
    formData.append('birthDate', userInfo.birthDate ? userInfo.birthDate.toISOString().split('T')[0] : '');
    formData.append('gender', userInfo.gender);
    if (userInfo.photo) {
      formData.append('photo', userInfo.photo);
    }
    try {
      const response = await updateUser(formData).unwrap();
      console.log(response);
      
    }catch(error) {
      console.error('Error updating user info:', error);
    }

  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const currentDay = new Date();

  const handleBirthDayChange = (date: Date | null) => {
    setUserInfo({ ...userInfo, birthDate: date });
  };


  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setUserInfo({ ...userInfo, gender: value });
  };
  console.log(userInfo);

  return (
    <div className="p-6">
      <div className="title text-left pb-4">
        <div className="text-lg font-normal pb-1">Hồ Sơ Của Tôi</div>
        <div className=" font-light text-sm">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <hr />
      <div className=" grid grid-cols-12 gap-4">
        <div className=" col-span-8 ps-10 pe-10 mt-8 border-r">
          <form action="">
            <table>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Tên đăng nhập
                </td>
                <td className=" text-sm ps-8 pb-5 text-left font-normal">
                  {infoUserFormToken !== null ? infoUserFormToken.username : ""}
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Tên
                </td>
                <td className="text-sm font-normal ps-8 pb-5 text-left">
                  <TextField
                    label="Nhập tên của bạn"
                    name="name"
                    value={userInfo.name}
                    onChange={handleNameChange}
                    fullWidth
                    sx={{width: 300}}
                  />
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Email
                </td>
                <td className=" text-sm font-normal ps-8 pb-5 text-left">
                  {/* {data.user.email} */}
                  anpt@fpt.edu.vn
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Số điện thoại
                </td>
                <td className=" text-sm font-normal ps-8 pb-5 text-left">
                {infoUserFormToken !== null ? infoUserFormToken.phone : ""}
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Giới tính
                </td>
                <div className="flex items-center ps-8 pb-5 text-left">
                  <Select
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleGenderChange}
                    sx={{width: 120}}
                  >
                    <MenuItem value="male">
                      Nam{" "}
                      <FontAwesomeIcon
                        icon={faMars}
                        className="text-base text-gray-700 ms-2"
                      />
                    </MenuItem>
                    <MenuItem value="female">
                      Nữ{" "}
                      <FontAwesomeIcon
                        icon={faVenus}
                        className="text-base text-gray-700 ms-2"
                      />
                    </MenuItem>
                    <MenuItem value="other">
                      Khác{" "}
                      <FontAwesomeIcon
                        icon={faTransgender}
                        className="text-base text-gray-700 ms-2"
                      />
                    </MenuItem>
                  </Select>
                </div>
              </tr>

              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Ngày sinh
                </td>

                <td className=" text-sm font-normal ps-8 pb-5 text-left">
                  <div className="box-DOB">
                    <DatePicker
                      selected={userInfo.birthDate}
                      onChange={handleBirthDayChange}
                      showYearDropdown
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày sinh"
                      customInput={
                        <TextField sx={{width: 300}} label="DD/MM/YYYY" fullWidth margin="none" />
                      }
                    />
                  </div>
                  {/* Check ngày sinh */}
                  {userInfo.birthDate !== null ? (
                    currentDay <= userInfo.birthDate ? (
                      <div className="text-red-500 text-sm font-normal block mt-2">
                        Ngày không hợp lệ, vui lòng chỉnh lại ngày
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </td>
              </tr>

              <tr>
                <td></td>
                <td className="text-sm font-normal ps-8 pb-5 text-left">
                  <button
                    onChange={handleSubmit}
                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            </table>
          </form>
        </div>

        <div className=" col-span-4">
          <div className="flex flex-col items-center mt-10">
            {infoUserFormToken !== null ? (
              <div className=" border rounded-full w-24 h-24 overflow-hidden">
                {imageUrl ? (
                  
                  <img
                  className="w-full h-full object-cover"
                  src={imageUrl}
                  alt="Preview"
                />
                ) : (
                  <img
                  className="w-full h-full object-cover"
                  src={infoUserFormToken.avata}
                  />
                )}
              </div>
            ) : ""}
            {/* {!imageUrl && (
              <div className=" border rounded-full w-24 h-24 overflow-hidden"></div>
            )}
            {imageUrl && (
              <div className=" border rounded-full w-24 h-24 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={imageUrl}
                  alt="Preview"
                />
              </div>
            )} */}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="upload-img-user-profile"
              hidden
              onChange={handlePhotoChange}
            />
            <label
              className=" border rounded bg-blue-500 text-white p-2 mt-2 cursor-pointer hover:bg-blue-600 duration-200"
              htmlFor="upload-img-user-profile"
            >
              Chọn ảnh
            </label>
            <div className="mt-4 text-left">
              <div className="text-gray-500 text-sm font-light mb-1">
                Dụng lượng file tối đa 1 MB
              </div>
              <div className="text-gray-500 text-sm font-light">
                Định dạng:.JPEG, .PNG
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentUserAccountProfile;
