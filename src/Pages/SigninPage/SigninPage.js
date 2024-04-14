import { jsx as _jsx } from "react/jsx-runtime";
import AuthForm from "../../components/AuthForm/AuthForm";
import css from "./SigninPage.module.css";
const SigninPage = () => {
    return (_jsx("main", { className: css.background, children: _jsx("div", { className: css.flex, children: _jsx(AuthForm, {}) }) }));
};
export default SigninPage;
