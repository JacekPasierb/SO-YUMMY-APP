import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./UserLogoModal.module.css";
import BtnLogout from "../BtnLogout/BtnLogout";
import BtnEditProfile from "../BtnEditProfile/BtnEditProfile";
const UserLogoModal = () => {
    const handleModalClick = (event) => {
        // Zapobiegaj propagacji kliknięć z wnętrza modala na zewnątrz
        event.stopPropagation();
    };
    return (_jsxs("div", { onClick: handleModalClick, className: css.userModal, children: [_jsx(BtnEditProfile, {}), " ", _jsx(BtnLogout, {})] }));
};
export default UserLogoModal;
