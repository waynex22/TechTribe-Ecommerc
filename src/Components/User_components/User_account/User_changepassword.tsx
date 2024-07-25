import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useUpdatePasswordUserMutation } from "../../../redux/rtkQuery/user_customers";

const ComponentUserChangePassword: React.FC = () => {
 
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [updatePasswordUser] = useUpdatePasswordUserMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ old_password, setOldPassword] = useState("");
  const [ new_password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    old_password: "",
    new_password: "",
    confirmPassword: "",
  });

  const passwordData = {
    old_password: old_password,
    new_password: new_password
  }

  useEffect(() => {
    const getAccessToken = localStorage.getItem('access_token');
    setAccessToken(getAccessToken);
  },[])

  const validate = () => {
    let tempErrors = { old_password: "", new_password: "", confirmPassword: "" };

    if (!old_password)
      tempErrors.old_password = "Mật khẩu cũ không được để trống";
    if (!new_password)
      tempErrors.new_password = "Mật khẩu mới không được để trống";
    if (new_password.length < 6  )
      tempErrors.new_password = "Mật khẩu mới phải có ít nhất 6 ký tự!";
    if (!confirmPassword)
      tempErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    if (new_password !== confirmPassword) {
        tempErrors.new_password = "Mật khẩu mới và xác nhận mật khẩu không trùng";
        tempErrors.confirmPassword = "Mật khẩu mới và xác nhận mật khẩu không trùng";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangeOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("oldPassword", old_password);
    // formData.append("newPassword", new_password);
    // formDate.append("confirmPassword", confirmPassword);
    // console.log(formData);
    try {
      if (validate() && accessToken !== null) {
        const response = await updatePasswordUser({passworData: passwordData, token: accessToken}).unwrap();
        console.log(response);
      } else {
        console.log("Validation failed");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };
  return (
    <>
      <div className="mx-6 border-b py-6">
        <div className="text-xl font-normal">Đổi mật khẩu</div>
        <div className="text-lg text-gray-500 font-light mt-1">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
      </div>

      <div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            type={showOldPassword ? "text" : "password"}
            label="Mật khẩu cũ"
            variant="outlined"
            error= {!!errors.old_password}
            helperText= {errors.old_password}
            //   fullWidth
            onChange={handleChangeOldPassword}
            sx={{ my: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowOldPassword} edge="end">
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={showNewPassword ? "text" : "password"}
            label="Mật khẩu mới"
            variant="outlined"
            onChange={handleChangeNewPassword}
            error= {!!errors.new_password}
            helperText= {errors.new_password}
            //   fullWidth
            sx={{ my: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowNewPassword} edge="end">
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={showConfirmPassword ? "text" : "password"}
            label="Xác nhận mật khẩu"
            variant="outlined"
            onChange={handleChangeConfirmPassword}
            error= {!!errors.confirmPassword}
            helperText= {errors.confirmPassword}
            //   fullWidth
            sx={{ my: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Đổi mật khẩu
          </Button>
        </Box>
      </div>
    </>
  );
};

export default ComponentUserChangePassword;
