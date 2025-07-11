import {TFunction} from "i18next";

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

export const validate = (values: FormValues, t: TFunction): FormErrors => {
  const errors: FormErrors = {};

  // Email validation
  if (!values.email) {
    errors.email = t("emailRequired");
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = t("invalidEmail");
  }

  // Password validation
  if (!values.password) {
    errors.password = t("passwordRequired");
  }
  return errors;
};
