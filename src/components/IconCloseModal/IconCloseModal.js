import { jsx as _jsx } from "react/jsx-runtime";
import css from "./IconCloseModal.module.css";
import close from "../../images/X.png";
const IconCloseModal = ({ onClose }) => {
    return (_jsx("img", { src: close, alt: "ikona zamykaj\u0105ca modal", className: css.iconClose, onClick: onClose }));
};
export default IconCloseModal;
