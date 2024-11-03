interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 12;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 12;

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name?.trim()) {
    errors.name = "Name is required";
  } else if (
    values.name.length < NAME_MIN_LENGTH ||
    values.name.length > NAME_MAX_LENGTH
  ) {
    errors.name = `Name must be ${NAME_MIN_LENGTH} to ${NAME_MAX_LENGTH} characters`;
  }

  // Email validation
  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!values.password?.trim()) {
    errors.password = "Password is required";
  } else if (
    values.password.length < PASSWORD_MIN_LENGTH ||
    values.password.length > PASSWORD_MAX_LENGTH
  ) {
    errors.password = `Password must be ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters`;
  }

  return errors;
};

// Optional: Export constants for reuse
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_REGEX,
} as const;
