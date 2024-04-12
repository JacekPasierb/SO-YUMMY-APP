import React from "react";
import css from "./RegisterPage.module.css";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
const RegisterPage = () => {
    return (React.createElement("main", { className: css.background },
        React.createElement("div", { className: css.flex },
            React.createElement(AuthForm, null))));
};
export default RegisterPage;
