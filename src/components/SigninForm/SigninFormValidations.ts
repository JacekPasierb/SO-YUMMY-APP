interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 16;

export const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  } else if (values.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `Password must be less than ${PASSWORD_MAX_LENGTH} characters`;
  }
  return errors;
};
