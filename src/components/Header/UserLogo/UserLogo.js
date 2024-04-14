import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./UserLogo.module.css";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import { selectIsUserLogoModalOpen } from "../../../redux/global/globalSelectors";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogoutModalOpen, setIsUserLogoModalOpen, } from "../../../redux/global/globalSlice";
import { useAuth } from "../../../hooks/useAuth";
export const DEFAULT_AVATAR = "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg";
const UserLogo = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);
    const handleLogoClick = () => {
        if (isUserLogoModalOpen) {
            dispatch(setIsUserLogoModalOpen(false));
            dispatch(setIsLogoutModalOpen(false));
        }
        else {
            dispatch(setIsUserLogoModalOpen(true));
        }
    };
    return (_jsxs("div", { className: css.boxAvatar, onClick: handleLogoClick, children: [_jsx("img", { src: user.avatar || DEFAULT_AVATAR, alt: "avatar", width: "34", height: "34", className: css.boxAvatar__avatar }), _jsx("span", { className: css.boxAvatar__username, children: user.name }), isUserLogoModalOpen && _jsx(UserLogoModal, {})] }));
};
export default UserLogo;
