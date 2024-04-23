import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./WelcomePage.module.css";
import logo from "../../images/logo.png";
import AuthNav from "../../components/AuthNav/AuthNav";
const WelcomePage = () => {
    return (_jsx("div", { className: css.background, children: _jsxs("div", { className: css.boxContainer, children: [_jsx("img", { src: logo, alt: "logo", className: css.iconLogo }), _jsxs("div", { className: css.boxSection, children: [_jsxs("div", { className: css.boxText, children: [_jsx("h1", { className: css.title, children: "Welcome to the app!" }), _jsx("p", { className: css.description, children: "This app offers more than just a collection of recipes - it is designed to be your very own digital cookbook. You can easily save and retrieve your own recipes at any time." })] }), _jsx(AuthNav, {})] })] }) }));
};
export default WelcomePage;
