import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validate } from "./RegisterFormValidations";
import css from "./RegisterForm.module.css";
import icons from "../../assets/icons/sprite.svg";
import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import { useMediaQuery } from "@react-hook/media-query";
import logo1x from "../../images/LogoMobile1x.png";
import logo2x from "../../images/LogoMobile2x.png";
import logoTablet1x from "../../images/LogoTablet1x.png";
import logoTablet2x from "../../images/LogoTablet2x.png";
import logoDesktop1x from "../../images/LogoDesctop1x.png";
import logoDesktop2x from "../../images/LogoDesctop2x.png";
const RegisterForm = () => {
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
        // Default image for smaller screens
        logoSrc = isRetina ? logo2x : logo1x;
    }
    const dispatch = useDispatch();
    const handleSubmit = async (values, { resetForm }) => {
        dispatch(register({
            name: values.name,
            email: values.email,
            password: values.password,
        }));
        toast.info("Verification link sent to email. Check your mail.");
        resetForm();
    };
    return (_jsx(Formik, { initialValues: { name: "", email: "", password: "" }, validate: validate, onSubmit: handleSubmit, children: ({ errors, touched, setFieldTouched, setFieldValue }) => (_jsxs(Form, { className: css.formRegister, autoComplete: "off", children: [_jsx("img", { src: logoSrc, className: css.imggg }), _jsx("h2", { className: css.titleRegister, children: "Registration" }), _jsxs("div", { className: css.boxInput, children: [_jsxs("div", { className: `${css.inputWithIcon} ${touched.name && errors.name ? css.errorInputWithIcon : ""}`, children: [_jsx("svg", { className: `${css.inputIcon} ${touched.name && errors.name ? css.errorInputIcon : ""}`, children: _jsx("use", { href: icons + `#icon-user-01` }) }), _jsx(Field, { type: "name", name: "name", placeholder: "Name", className: css.inputRegister, onBlur: () => setFieldTouched("name", true) }), touched.name && errors.name && (_jsx("img", { src: errorIcon, alt: "Error Icon", className: css.additionalErrorIcon })), touched.name && !errors.name && (_jsx("img", { src: successIcon, alt: "Success Icon", className: css.additionalSuccessIcon })), _jsx(ErrorMessage, { name: "name", component: "div", className: css.inputError })] }), _jsxs("div", { className: `${css.inputWithIcon} ${touched.email && errors.email ? css.errorInputWithIcon : ""}`, children: [_jsx("svg", { className: `${css.inputIcon} ${touched.email && errors.email ? css.errorInputIcon : ""}`, children: _jsx("use", { href: icons + `#icon-mail-01` }) }), _jsx(Field, { type: "email", name: "email", placeholder: "Email", className: css.inputRegister, onBlur: () => setFieldTouched("email", true) }), " ", touched.email && errors.email && (_jsx("img", { src: errorIcon, alt: "Error Icon", className: css.additionalErrorIcon })), touched.email && !errors.email && (_jsx("img", { src: successIcon, alt: "Success Icon", className: css.additionalSuccessIcon })), _jsx(ErrorMessage, { name: "email", component: "div", className: css.inputError })] }), _jsxs("div", { className: `${css.inputWithIcon} ${touched.password && errors.password
                                ? css.errorInputWithIcon
                                : ""}`, children: [_jsx("svg", { className: `${css.inputIcon} ${touched.password && errors.password ? css.errorInputIcon : ""}`, children: _jsx("use", { href: icons + `#icon-lock-02` }) }), _jsx(Field, { type: "password", name: "password", placeholder: "Password", className: css.inputRegister, onBlur: () => setFieldTouched("password", true) }), touched.password && errors.password && (_jsx("img", { src: errorIcon, alt: "Error Icon", className: css.additionalErrorIcon })), touched.password && !errors.password && (_jsx("img", { src: successIcon, alt: "Success Icon", className: css.additionalSuccessIcon })), _jsx(ErrorMessage, { name: "password", component: "div", className: css.inputError })] })] }), _jsx("button", { type: "submit", className: css.btnRegister, children: "Sign up" })] })) }));
};
export default RegisterForm;
