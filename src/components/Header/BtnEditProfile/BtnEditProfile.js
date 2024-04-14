import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./BtnEditProfile.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserInfoModalOpen } from "../../../redux/global/globalSelectors";
import { setIsUserInfoModalOpen } from "../../../redux/global/globalSlice";
const BtnEditProfile = () => {
    const isUserInfoModalOpen = useSelector(selectIsUserInfoModalOpen);
    const dispatch = useDispatch();
    const handleModalClick = () => {
        isUserInfoModalOpen
            ? dispatch(setIsUserInfoModalOpen(false))
            : dispatch(setIsUserInfoModalOpen(true));
    };
    return (_jsxs(_Fragment, { children: [_jsxs("button", { type: "button", onClick: handleModalClick, className: css.editProfile, children: ["Edit profile", _jsx("svg", { className: css.icon, children: _jsx("use", { href: sprite + `#icon-edit-01` }) })] }), isUserInfoModalOpen && _jsx(UserInfoModal, { onClose: handleModalClick })] }));
};
export default BtnEditProfile;
