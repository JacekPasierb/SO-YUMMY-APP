import { useTranslation } from "react-i18next";

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
const {t}=useTranslation();
  if (!values.name?.trim()) {
    errors.name = t("nameRequired");
  } else if (
    values.name.length < NAME_MIN_LENGTH ||
    values.name.length > NAME_MAX_LENGTH
  ) {
    errors.name = t("nameLength", {
      min: NAME_MIN_LENGTH,
      max: NAME_MAX_LENGTH,
    });  }

  // Email validation
  if (!values.email?.trim()) {
    errors.email = t("emailRequired");
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email =t("invalidEmail");
  }

  // Password validation
  if (!values.password?.trim()) {
    errors.password =t("passwordRequired");
  } else if (
    values.password.length < PASSWORD_MIN_LENGTH ||
    values.password.length > PASSWORD_MAX_LENGTH
  ) {
    errors.password = t("passwordLength", {
      min: PASSWORD_MIN_LENGTH,
      max: PASSWORD_MAX_LENGTH,
    });  }

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
