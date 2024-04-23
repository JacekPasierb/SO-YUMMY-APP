import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./ThemeToggler.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/global/globalSelectors";
import { setTheme } from "../../../redux/global/globalSlice";
import { Formik, Form, Field } from "formik";
const ThemeToggler = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);
    const handleChange = () => {
        if (theme === "light") {
            dispatch(setTheme("dark"));
        }
        else {
            dispatch(setTheme("light"));
        }
    };
    useEffect(() => {
        const saveTheme = localStorage.getItem("theme") || "light";
        dispatch(setTheme(saveTheme));
    }, []);
    return (_jsx(Formik, { initialValues: { theme: theme }, onSubmit: () => { }, children: _jsx(Form, { children: _jsxs("label", { className: css.switch, children: [_jsx(Field, { type: "checkbox", name: "theme", value: theme, checked: theme === "dark", onChange: handleChange, className: css.switchInput }), _jsx("span", { className: css.switchSlider })] }) }) }));
};
export default ThemeToggler;
