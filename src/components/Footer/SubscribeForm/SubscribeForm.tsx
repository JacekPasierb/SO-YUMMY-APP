import React, { FC } from "react";
import css from "./SubscribeForm.module.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import sprite from "../../../assets/icons/sprite.svg";
import { useAuth } from "../../../hooks/useAuth";
import { addSubscribe } from "../../../API/subscribeAPI";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
}

const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "Wprowadź adres e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Nieprawidłowy adres e-mail.";
  }
  return error;
};

const onSubmit = async (
  values: FormValues,
  { setSubmitting }: FormikHelpers<FormValues>
) => {
  try {
    await addSubscribe({ email: values.email });
    toast.success("Subscription activated");
    setSubmitting(true);
  } catch (error) {
    toast.error("You already have subscriptions");
    return error;
  }finally{
    setSubmitting(false)
  }
};

const SubscribeForm: FC = () => {
  const { user } = useAuth();

  const initialValues: FormValues = {
    email: user.email || "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }) => (
        <Form className={css.form}>
          <div className={css.inputContainer}>
            <label>
              <div className={css.inputBox}>
                <svg className={css.iconEmail}>
                  <use href={sprite + `#icon-emai`}></use>
                </svg>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email adreess"
                  validate={validateEmail}
                  className={css.inputEmail}
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className={css.inputError}
              />
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={css.btnSubscribe}
            >
              Subscribe
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubscribeForm;
