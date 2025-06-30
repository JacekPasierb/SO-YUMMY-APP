import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { useAuth } from "../../../hooks/useAuth";
import { addSubscribe } from "../../../API/subscribeAPI";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./SubscribeForm.module.css";
import { useTranslation } from "react-i18next";

interface FormValues {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const SubscribeForm: React.FC = () => {
  const { user } = useAuth();
const {t}=useTranslation();
  const initialValues: FormValues = {
    email: user?.email || "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await addSubscribe({ email: values.email });
      toast.success(t("newsletterSubscribed"));
      resetForm();
    } catch (error) {
      toast.error(t("newsletterAlreadySubscribed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              <div className={styles.inputBox}>
                <svg className={styles.iconEmail} aria-hidden="true">
                  <use href={`${sprite}#icon-email`} />
                </svg>
                <Field
                  type="email"
                  name="email"
                  placeholder={t("enterEmail")}
                  className={styles.inputEmail}
                  aria-label="Email subscription"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid }
            className={styles.subscribeButton}
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? t("subscribing") : t("subscribe")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SubscribeForm;
