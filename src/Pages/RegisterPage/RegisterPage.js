import { jsx as _jsx } from "react/jsx-runtime";
import css from "./RegisterPage.module.css";
import AuthForm from "../../components/AuthForm/AuthForm.js";
const RegisterPage = () => {
    return (_jsx("main", { className: css.background, children: _jsx("div", { className: css.flex, children: _jsx(AuthForm, {}) }) }));
};
export default RegisterPage;
