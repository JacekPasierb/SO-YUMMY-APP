import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./MenuModal.module.css";
import close from "../../../images/X.png";
import Logo from "../Logo/Logo";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
const MenuModal = ({ onClose }) => {
    return (_jsx("div", { className: css.backgroundMenuModal, children: _jsxs("div", { className: ` ${css.container} ${css.menuModal}`, children: [_jsxs("div", { className: css.headModal, children: [_jsx(Logo, {}), _jsx("img", { src: close, alt: "ikona zamykaj\u0105ca modal", className: css.iconClose, onClick: onClose })] }), _jsx(NavigationMobile, { onClose: onClose }), _jsx("div", { className: css.switcher, children: _jsx(ThemeToggler, {}) })] }) }));
};
export default MenuModal;
