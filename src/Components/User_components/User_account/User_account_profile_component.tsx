import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const ComponentUserAccountProfile: React.FC = () => {
  const [dob, setDob] = useState<Date | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const currentDay = new Date();

  const handleDateChange = (date: Date | null) => {
    setDob(date);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // Tạo URL dựa trên file
      //   setImage(file);
      // Lưu file vào state
      setImageUrl(url); // Lưu URL vào state để hiển thị xem trước
    }
  };

  const elementDate = document.querySelector(
    ".react-datepicker__input-container"
  ) as HTMLElement | null;

  console.log(elementDate);

  if (elementDate) {
    const elementInputDate = elementDate.querySelector(
      "input"
    ) as HTMLElement | null;
    elementInputDate?.classList.add("p-4");
  }

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
                <td className=" text-sm font-normal ps-8 pb-5 text-left">
                  Tên user
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Tên
                </td>
                <td className="text-sm font-normal ps-8 pb-5 text-left">
                  <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Email
                </td>
                <td className=" text-sm font-normal ps-8 pb-5 text-left">
                  Tên user
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Số điện thoại
                </td>
                <td className=" text-sm font-normal ps-8 pb-5 text-left">
                  Tên user
                </td>
              </tr>
              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Giới tính
                </td>
                <div className="flex items-center ps-8 pb-5 text-left">
                  <input
                    className="mr-1 leading-tight"
                    type="radio"
                    value="Nam"
                  ></input>
                  <span className="mr-4 text-sm font-normal">Nam</span>

                  <input
                    className="mr-1 leading-tight"
                    type="radio"
                    value="Nữ"
                  ></input>
                  <span className="mr-4 text-sm font-normal">Nữ</span>

                  <input
                    className="mr-1 leading-tight"
                    type="radio"
                    value="Khác"
                  ></input>
                  <span className="mr-4 text-sm font-normal">Khác</span>
                </div>
              </tr>

              <tr>
                <td className=" text-base font-normal text-gray-600 pb-5 text-right">
                  Ngày sinh
                </td>

                <td className=" text-sm font-normal ps-8 pb-5 text-left">
                  <div className="box-DOB">
                    <DatePicker
                      selected={dob}
                      onChange={handleDateChange}
                      showYearDropdown
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày sinh"
                    />
                  </div>
                  {/* Check ngày sinh */}
                  {dob !== null ? (
                    currentDay <= dob ? (
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
                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Sign Up
                  </button>
                </td>
              </tr>
            </table>
          </form>
        </div>

        <div className=" col-span-4">
          <div className="flex flex-col items-center mt-10">
            {!imageUrl && (
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
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="upload-img-user-profile"
              hidden
              onChange={handleImageChange}
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
