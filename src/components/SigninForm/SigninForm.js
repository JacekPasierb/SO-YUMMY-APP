import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./SigninForm.module.css";
import icons from "../../assets/icons/sprite.svg";
import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import logo1x from "../../images/LogoMobile1x.png";
import logo2x from "../../images/LogoMobile2x.png";
import logoTablet1x from "../../images/LogoTablet1x.png";
import logoTablet2x from "../../images/LogoTablet2x.png";
import logoDesktop1x from "../../images/LogoDesctop1x.png";
import logoDesktop2x from "../../images/LogoDesctop2x.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useMediaQuery } from "@react-hook/media-query";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { selectError } from "../../redux/auth/selectors";
import { validate } from "./SigninFormValidations";
const SigninForm = () => {
    const isTablet = useMediaQuery("(min-width: 768px)");
    const isDesctop = useMediaQuery("(min-width: 1200px)");
    const isRetina = window.devicePixelRatio > 1;
    let logoSrc;
    if (isDesctop) {
        logoSrc = isRetina ? logoDesktop2x : logoDesktop1x;
    }
    else if (isTablet) {
        logoSrc = isRetina ? logoTablet2x : logoTablet1x;
    }
    else {
        logoSrc = isRetina ? logo2x : logo1x;
    }
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const navigate = useNavigate();
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const result = await dispatch(logIn({
                email: values.email,
                password: values.password,
            }));
            if (logIn.fulfilled.match(result)) {
                resetForm();
                navigate("/");
            }
            else {
                toast.error("Login failed");
            }
        }
        catch (err) {
            console.error(err.message);
        }
    };
    return (_jsx("div", { children: _jsx(Formik, { initialValues: { email: "", password: "" }, validate: validate, onSubmit: handleSubmit, children: ({ errors, touched, setFieldTouched, setFieldValue }) => (_jsxs(Form, { className: css.formRegister, autoComplete: "off", children: [_jsx("img", { src: logoSrc, className: css.imggg }), _jsx("h2", { className: css.titleRegister, children: "Sign In" }), _jsxs("div", { className: css.boxInput, children: [_jsxs("div", { className: `${css.inputWithIcon} ${touched.email && errors.email ? css.errorInputWithIcon : ""}`, children: [_jsx("svg", { className: `${css.inputIcon} ${touched.email && errors.email ? css.errorInputIcon : ""}`, children: _jsx("use", { href: icons + `#icon-mail-01` }) }), _jsx(Field, { type: "email", name: "email", placeholder: "Email", className: css.inputRegister, onBlur: () => setFieldTouched("email", true), autoComplete: "off" }), touched.email && errors.email && (_jsx("img", { src: errorIcon, alt: "Error Icon", className: css.additionalErrorIcon })), touched.email && !errors.email && (_jsx("img", { src: successIcon, alt: "Success Icon", className: css.additionalSuccessIcon })), _jsx(ErrorMessage, { name: "email", component: "div", className: css.inputError })] }), _jsxs("div", { className: `${css.inputWithIcon} ${touched.password && errors.password
                                    ? css.errorInputWithIcon
                                    : ""}`, children: [_jsx("svg", { className: `${css.inputIcon} ${touched.password && errors.password
                                            ? css.errorInputIcon
                                            : ""}`, children: _jsx("use", { href: icons + `#icon-lock-02` }) }), _jsx(Field, { type: "password", name: "password", placeholder: "Password", autoComplete: "current-password", className: css.inputRegister, onBlur: () => setFieldTouched("password", true) }), touched.password && errors.password && (_jsx("img", { src: errorIcon, alt: "Error Icon", className: css.additionalErrorIcon })), touched.password && !errors.password && (_jsx("img", { src: successIcon, alt: "Success Icon", className: css.additionalSuccessIcon })), _jsx(ErrorMessage, { name: "password", component: "div", className: css.inputError })] })] }), _jsx("button", { type: "submit", className: css.btnRegister, children: "Sign up" })] })) }) }));
};
export default SigninForm;
