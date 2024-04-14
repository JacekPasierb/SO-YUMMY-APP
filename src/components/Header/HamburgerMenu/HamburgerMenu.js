import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import menu from "../../../images/menuIkona.png";
import css from "./HamburgerMenu.module.css";
import MenuModal from "../MenuModal/MenuModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsMenuModalOpen } from "../../../redux/global/globalSelectors";
import { setIsMenuModalOpen } from "../../../redux/global/globalSlice";
const HamburgerMenu = () => {
    const isMenuModalOpen = useSelector(selectIsMenuModalOpen);
    const dispatch = useDispatch();
    const handleMenuModalClick = () => {
        isMenuModalOpen
            ? dispatch(setIsMenuModalOpen(false))
            : dispatch(setIsMenuModalOpen(true));
    };
    return (_jsxs(_Fragment, { children: [_jsx("img", { src: menu, alt: "menu Ikona", width: "40", height: "40", onClick: handleMenuModalClick, className: css.menuIcon }), isMenuModalOpen && _jsx(MenuModal, { onClose: handleMenuModalClick })] }));
};
export default HamburgerMenu;
