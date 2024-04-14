import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./LogoutModal.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/auth/operations";
import { setIsLogoutModalOpen, setIsUserLogoModalOpen, } from "../../../redux/global/globalSlice";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";
import { toast } from "react-toastify";
const LogoutModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await dispatch(logOut());
            dispatch(setIsLogoutModalOpen(false));
            dispatch(setIsUserLogoModalOpen(false));
            toast.success("Logged out successfully !");
        }
        catch (error) {
            console.error("Error during logout:", error);
        }
    };
    return (_jsxs("div", { className: css.logoutModal, children: [_jsx(IconCloseModal, { onClose: onClose }), _jsx("p", { className: css.logoutText, children: "Are you sure you want to log out?" }), _jsxs("div", { className: css.btnsBox, children: [_jsx("button", { type: "button", onClick: handleLogout, className: `${css.btn} ${css.btnLogout}`, children: "Log out" }), _jsx("button", { type: "button", onClick: onClose, className: `${css.btn} ${css.btnCancel}`, children: "Cancel" })] })] }));
};
export default LogoutModal;
