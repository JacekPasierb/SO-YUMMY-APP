import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./Header.module.css";
import "react-toastify/dist/ReactToastify.css";
import UserLogo from "./UserLogo/UserLogo";
import Logo from "./Logo/Logo";
import { lazy } from "react";
import Media from "react-media";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Navigation from "./Navigation/Navigation";
const ThemeToggler = lazy(() => import("./ThemeToggler/ThemeToggler"));
const Header = () => {
    return (_jsx("header", { children: _jsx(Media, { queries: {
                small: "(max-width: 768px)",
                medium: "(min-width: 768px) and (max-width: 1200px)",
                large: "(min-width: 1200px)",
            }, children: (matches) => (_jsxs(_Fragment, { children: [matches.small && (_jsx("div", { className: css.header, children: _jsxs("div", { className: `${css.container} ${css.headerBox}`, children: [_jsx(Logo, {}), _jsxs("div", { className: css.mobileBox, children: [_jsx(UserLogo, {}), _jsx(HamburgerMenu, {})] })] }) })), matches.medium && (_jsx("div", { className: css.header, children: _jsxs("div", { className: `${css.container} ${css.headerBox}`, children: [_jsx(Logo, {}), _jsxs("div", { className: css.mobileBox, children: [_jsx(UserLogo, {}), _jsx(HamburgerMenu, {})] })] }) })), matches.large && (_jsx("div", { className: css.header, children: _jsxs("div", { className: `${css.container} ${css.headerBox}`, children: [_jsx(Logo, {}), _jsx(Navigation, {}), _jsx(UserLogo, {}), _jsx(ThemeToggler, {})] }) }))] })) }) }));
};
export default Header;
