export const validationConfig = {
    name: {
      required: 'Tên Tài Khoản không được trống.',
    },
    email: {
      required: 'Email không được trống.',
      invalid: 'Email không hợp lệ.',
    },
    password: {
      required: 'Mật khẩu không được trống.',
      minLength: 'Mật khẩu phải chứa ít nhất 6 ký tự.',
    },
    confirmPassword: {
      match: 'Mật khẩu không khớp.',
    },
  };
  export interface ValidationConfig {
    name: {
      required: string;
    };
    email: {
      required: string;
      invalid: string;
    };
    password: {
      required: string;
      minLength: string;
    };
    confirmPassword: {
      match: string;
    };
  }
  
  interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
  
  export const validateForm = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    validationConfig: ValidationConfig
  ): FormErrors => {
    let errors: FormErrors = {};
  
    if (!name.trim()) {
      errors.name = validationConfig.name.required;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = validationConfig.email.required;
    } else if (!emailRegex.test(email)) {
      errors.email = validationConfig.email.invalid;
    }
  
    if (!password.trim()) {
      errors.password = validationConfig.password.required;
    } else if (password.length < 6) {
      errors.password = validationConfig.password.minLength;
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = validationConfig.confirmPassword.match;
    }
  
    return errors;
  };