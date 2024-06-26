import React, { useState, useCallback, useEffect } from "react";
import { useLoginMutation , useRegisterMutation } from "../../services/authApi";
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
  const [login , { data: loginData , isLoading: loginLoading, isSuccess: loginSuccess, isError: isError, error: loginError }] = useLoginMutation();
  const [register, { data: registerData, isLoading: registerLoading, isSuccess: registerSuccess, isError: registerError, error: registerErrorObject }] = useRegisterMutation();
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if(formData.name && formData.phone && formData.password && formData.confirmPassword){
        register({name: formData.name, phone: formData.phone, password: formData.password});
      }
    } else {
      if(formData.phone && formData.password){
        login({phone: formData.phone, password: formData.password});
        console.log();
      }
    }
  }, [formData, isRegister]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  }, []);

  useEffect(() => {
    resetForm();
  }, [isRegister, resetForm]);
  useEffect(() => {
    if (loginSuccess || registerSuccess) {
      console.log('Login successful:', loginData);
      console.log('register successful:', registerData);
    } else if (loginError || registerError) {
      console.error('Login failed:', loginError);
      console.error('register failed:', registerError);
    }
  }, [loginSuccess, loginError, loginData, loginError, registerSuccess, registerError, registerData, registerErrorObject]);
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <div className="flex items-start justify-between w-[800px] h-fit">
          <div className="p-10 w-[60%] flex items-start justify-start">
            <div className="space-y-4 flex flex-col items-start justify-start">
              <h3 className="text-2xl font-bold">Xin chào</h3>
              <p className="text-md font-light">Đăng nhập hoặc đăng ký</p>
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <>
                    <div className="my-2 block">
                      <span className="text-md font-light">Họ và tên</span>
                    </div>
                    <input
                      className="p-2 w-full border-solid border-b-2 border-gray-300 outline-none"
                      name="name"
                      placeholder="Họ và tên"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}
                <div className="my-2 block">
                  <span className="text-md font-light">Số điện thoại</span>
                </div>
                <input
                  className="p-2 w-full border-solid border-b-2 border-gray-300 outline-none"
                  name="phone"
                  placeholder="+84 123 456 789"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <div className="my-2 block">
                  <span className="text-md font-light">Mật Khẩu</span>
                </div>
                <input
                  className="p-2 w-full border-solid border-b-2 border-gray-300 outline-none"
                  name="password"
                  placeholder="********"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {isRegister && (
                  <>
                    <div className="my-2 block">
                      <span className="text-md font-light">Nhập lại mật khẩu</span>
                    </div>
                    <input
                      className="p-2 w-full border-solid border-b-2 border-gray-300 outline-none"
                      name="confirmPassword"
                      placeholder="********"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}
                <div className="flex border-2 my-4 border-blue-200 text-white bg-primary hover:opacity-80 rounded-2xl p-2 w-full">
                  <button type="submit" className="flex-1 text-xl rounded-xl font-extrabold">
                    {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                  </button>
                </div>
              </form>
              <div className="flex justify-between text-sm font-light">
                {isRegister ? (
                  <>
                    Bạn đã có tài khoản?&nbsp;
                    <button onClick={() => setIsRegister(false)} className="text-primary hover:underline">
                      Đăng Nhập Ngay
                    </button>
                  </>
                ) : (
                  <>
                    Bạn chưa có tài khoản?&nbsp;
                    <button onClick={() => setIsRegister(true)} className="text-primary hover:underline">
                      Đăng ký ngay
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-[50%] bg-blue-200 flex items-center min-h-[600px] justify-center">
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
