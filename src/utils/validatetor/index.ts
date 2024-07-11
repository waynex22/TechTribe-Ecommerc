export const validationConfig = {
    name: {
      required: 'Tên không được trống.',
    },
    phone: {
      required: 'Số điện thoại không được trống.',
      invalid: 'Số điện thoại không hợp lệ.',
    },
    password: {
      required: 'Mật khẩu không được trống.',
      minLength: 'Mật khẩu phải chứa ít nhất 6 ký tự.',
    },
    confirmPassword: {
      match: 'Mật khẩu không khớp.',
    },
  };
  export interface FormData {
    name?: string;
    phone: string;
    password: string;
    confirmPassword?: string;
  }
  export interface ValidationConfig {
    name: {
      required: string;
    };
    phone: {
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
  
  export interface FormErrors {
    name?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }
  export const validateForm = (FormData: FormData): FormErrors => {
    let errors: FormErrors = {};
  
    if (!FormData.name?.trim()) {
      errors.name = validationConfig.name.required;
    }
  
    const phoneRegex = /^(?:\+84|0[35789])\d{8,9}$/;
    if (!FormData.phone.trim()) {
      errors.phone = validationConfig.phone.required;
    } else if (!phoneRegex.test(FormData.phone)) {
      errors.phone = validationConfig.phone.invalid;
    }
  
    if (!FormData.password.trim()) {
      errors.password = validationConfig.password.required;
    } else if (FormData.password.length < 6) {
      errors.password = validationConfig.password.minLength;
    }
  
    if (FormData.password !== FormData.confirmPassword) {
      errors.confirmPassword = validationConfig.confirmPassword.match;
    }
  
    return errors;
  };