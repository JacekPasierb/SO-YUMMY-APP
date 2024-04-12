import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import css from "./SigninPage.module.css";
const SigninPage = () => {
    return (React.createElement("main", { className: css.background },
        React.createElement("div", { className: css.flex },
            React.createElement(AuthForm, null))));
};
export default SigninPage;
