import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@react-hook/media-query";
import { toast } from "react-toastify";

import { validate } from "./RegisterFormValidations";
import { register } from "../../redux/auth/operations";
import { AppDispatch } from "src/redux/store";

import icons from "../../assets/icons/sprite.svg";
import styles from "./RegisterForm.module.css";
import { getResponsiveLogo } from "../../helpers/helpers";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isRetina = window.devicePixelRatio > 1;

  const logoSrc = getResponsiveLogo(isDesktop,isTablet,isRetina);
  
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const result = await dispatch(register(values));
      if (register.fulfilled.match(result)) {
        toast.info("Verification link sent to email. Check your mail.");
        resetForm();
        navigate("/signin");
      } else {
        toast.error("Registration failed.");
      }
    } catch (err: any) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const renderField = (
    name: keyof FormValues,
    type: string,
    placeholder: string,
    iconId: string
  ) => (
    <div className={`${styles.inputWithIcon} ${styles[`${name}Input`]}`}>
      <svg className={styles.inputIcon}>
        <use href={`${icons}#icon-${iconId}`} />
      </svg>
      
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={styles.inputRegister}
        autoComplete={name === "password" ? "current-password" : "off"}
      />
      
      <ErrorMessage
        name={name}
        component="div"
        className={styles.inputError}
      />
    </div>
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.formRegister}>
          <img src={logoSrc} alt="Logo" className={styles.logo} />
          <h2 className={styles.titleRegister}>Registration</h2>
          
          <div className={styles.boxInput}>
            {renderField("name", "text", "Name", "user-01")}
            {renderField("email", "email", "Email", "mail-01")}
            {renderField("password", "password", "Password", "lock-02")}
          </div>

          <button 
            type="submit" 
            className={styles.btnRegister}
          >
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
