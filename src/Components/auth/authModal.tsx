import React, { useState, useCallback, useEffect } from "react";
import { useGetInfoUserMutation, useLoginMutation, useRegisterMutation } from "../../services/authApi";
import { setLoginByToken } from "../../utils/localStorage/token";
interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

interface FormData {
  name?: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onClose }) => {
  const [getUser] = useGetInfoUserMutation();
  const [
    login,
    {
      data: loginData,
      isSuccess: loginSuccess,
      isError: LoginError,
    },
  ] = useLoginMutation();
  const [
    register,
    {
      data: registerData,
      isSuccess: registerSuccess,
      isError: registerError,
      error: registerErrorObject,
    },
  ] = useRegisterMutation();
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isRegister) {
        if (
          formData.name &&
          formData.phone &&
          formData.password &&
          formData.confirmPassword
        ) {
          register({
            name: formData.name,
            phone: formData.phone,
            password: formData.password,
          });
        }
      } else {
        if (formData.phone && formData.password) {
          login({ phone: formData.phone, password: formData.password });
        }
      }
    },
    [formData, isRegister]
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  }, []);

  useEffect(() => {
    resetForm();
  }, [isRegister, resetForm]);
  useEffect(() => {
    if (loginSuccess) {
      if (loginData) {
        setLoginByToken(loginData);
        getUser();
        onClose();
      }
    } else if (LoginError) {
      console.error("Login failed:", LoginError);
    }
  }, [
    loginSuccess,
    LoginError,
    loginData,
    registerSuccess,
    registerError,
    registerData,
    registerErrorObject,
  ]);
  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center z-50">
      <div className="bg-white mt-[100px] rounded-2xl relative shadow-xl transform transition-all w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-gray-500 bg-white rounded-full z-58 absolute top-[-10px] right-[-10px] cursor-pointer"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <div className="flex items-start justify-between w-[800px] h-fit">
          <div className="p-10 w-[60%] flex items-start justify-start">
            <div className="space-y-4 flex flex-col items-start justify-start">
              <h3 className="text-2xl font-bold">Xin chào</h3>
              <p className="text-md font-light-bold">Đăng nhập hoặc đăng ký</p>
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <>
                    <div className="w-72 my-4">
                      <div className="relative w-full min-w-[200px] h-10">
                        <input
                          className="peer focus:outline-0 w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0  disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          placeholder=""
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}   
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                          Họ và tên
                        </label>
                      </div>
                    </div>
                  </>
                )}
                <div className="w-72 my-4">
                      <div className="relative w-full min-w-[200px] h-10">
                        <input
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          placeholder=""
                          name="phone"
                          type="number"
                          value={formData.phone}
                          onChange={handleChange}   
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                          Số điện thoại
                        </label>
                      </div>
                    </div>
                    <div className="w-72 my-4">
                      <div className="relative w-full min-w-[200px] h-10">
                        <input
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          placeholder=""
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}   
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                          Mật khẩu
                        </label>
                      </div>
                    </div>
                {isRegister && (
                  <>
                    <div className="w-72 my-4">
                      <div className="relative w-full min-w-[200px] h-10">
                        <input
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          placeholder=""
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}   
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                          Nhập lại mật khẩu
                        </label>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex border-2 my-4 border-blue-200 text-white bg-primary hover:opacity-80 rounded-2xl p-2 w-full">
                  <button
                    type="submit"
                    className="flex-1 text-xl rounded-xl font-extrabold"
                  >
                    {isRegister ? "Đăng ký" : "Đăng nhập"}
                  </button>
                </div>
              </form>
              <div className="flex justify-between text-sm font-light">
                {isRegister ? (
                  <>
                    Bạn đã có tài khoản?&nbsp;
                    <button
                      onClick={() => setIsRegister(false)}
                      className="text-primary hover:underline"
                    >
                      Đăng Nhập Ngay
                    </button>
                  </>
                ) : (
                  <>
                    Bạn chưa có tài khoản?&nbsp;
                    <button
                      onClick={() => setIsRegister(true)}
                      className="text-primary hover:underline"
                    >
                      Đăng ký ngay
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-[50%] bg-blue-200 flex items-center min-h-[500px] justify-center">
            <img
              src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
              className="w-[300px] h-fit object-cover"
              alt="Auth Modal Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthModal);
