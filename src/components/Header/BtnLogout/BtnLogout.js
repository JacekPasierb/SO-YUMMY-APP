import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./BtnLogout.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogoutModalOpen } from "../../../redux/global/globalSelectors";
import { setIsLogoutModalOpen } from "../../../redux/global/globalSlice";
const BtnLogout = () => {
    const isLogoutModalOpen = useSelector(selectIsLogoutModalOpen);
    const dispatch = useDispatch();
    const handleLogoutModalClick = () => isLogoutModalOpen
        ? dispatch(setIsLogoutModalOpen(false))
        : dispatch(setIsLogoutModalOpen(true));
    return (_jsxs(_Fragment, { children: [_jsxs("button", { type: "button", onClick: handleLogoutModalClick, className: css.logoutBtn, children: ["Log out", _jsx("svg", { className: css.icon, children: _jsx("use", { href: sprite + `#icon-arrow-right` }) })] }), isLogoutModalOpen && _jsx(LogoutModal, { onClose: handleLogoutModalClick })] }));
};
export default BtnLogout;
