import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./SubscribeForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import sprite from "../../../assets/icons/sprite.svg";
import { useAuth } from "../../../hooks/useAuth";
import { addSubscribe } from "../../../API/subscribeAPI";
import { toast } from "react-toastify";
const validateEmail = (value) => {
    let error;
    if (!value) {
        error = "Wprowadź adres e-mail.";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Nieprawidłowy adres e-mail.";
    }
    return error;
};
const onSubmit = async (values, { setSubmitting }) => {
    try {
        await addSubscribe({ email: values.email });
        toast.success("Subscription activated");
        setSubmitting(true);
    }
    catch (error) {
        toast.error("You already have subscriptions");
        return error;
    }
    finally {
        setSubmitting(false);
    }
};
const SubscribeForm = () => {
    const { user } = useAuth();
    const initialValues = {
        email: user.email || "",
    };
    return (_jsx(Formik, { initialValues: initialValues, onSubmit: onSubmit, children: ({ isSubmitting, isValid }) => (_jsxs(Form, { className: css.form, children: [_jsx("div", { className: css.inputContainer, children: _jsxs("label", { children: [_jsxs("div", { className: css.inputBox, children: [_jsx("svg", { className: css.iconEmail, children: _jsx("use", { href: sprite + `#icon-emai` }) }), _jsx(Field, { type: "email", id: "email", name: "email", placeholder: "Enter your email adreess", validate: validateEmail, className: css.inputEmail })] }), _jsx(ErrorMessage, { name: "email", component: "div", className: css.inputError })] }) }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: isSubmitting || !isValid, className: css.btnSubscribe, children: "Subscribe" }) })] })) }));
};
export default SubscribeForm;
