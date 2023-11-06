import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { validate } from "./RegisterFormValidations";

const RegisterForm = () => {
  return (
    <div>
      <Formik initialValues={{ name: "", email: "", password: "" }} validate={validate}>
        <Form>
          <Field type="name" name="name" />
          <ErrorMessage name="name" component="div" />
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
