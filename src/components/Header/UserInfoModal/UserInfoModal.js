import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./UserInfoModal.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import { validate } from "./UserInfoModalValidatin";
import { useAuth } from "../../../hooks/useAuth";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";
export const DEFAULT_AVATAR = "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg";
const UserInfoModal = ({ onClose }) => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [imageDataUrl, setImageDataUrl] = useState(user.avatar);
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        const handleClickOutside = (event) => {
            if (modalRef.current &&
                !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);
    const handleSubmit = async (values) => {
        const userData = {
            name: values.name ? values.name : user.name,
            avatar: values.avatar || user.avatar,
        };
        dispatch(updateUser(userData));
        toast.success("Succes, Update profile !");
        onClose();
    };
    return (_jsxs("div", { ref: modalRef, className: css.editProfileModal, children: [_jsx(IconCloseModal, { onClose: onClose }), _jsx(Formik, { initialValues: { avatar: "", name: user.name || "" }, validate: validate, onSubmit: handleSubmit, children: ({ setFieldValue }) => (_jsxs(Form, { className: css.form, children: [_jsx("label", { htmlFor: "avatar", className: css.btnChoose, children: imageDataUrl ? (_jsx("div", { className: css.logoBackground, children: _jsx("img", { src: imageDataUrl, alt: "avatar", style: {
                                        borderRadius: "50% ",
                                        width: "100%",
                                        height: "100%",
                                    } }) })) : (_jsx("div", { className: css.logoBackground, children: _jsx("svg", { className: css.iconPicture, children: _jsx("use", { href: sprite + `#icon-Icon` }) }) })) }), _jsx("input", { type: "file", accept: "image/*", id: "avatar", name: "avatar", onChange: (event) => {
                                const file = event.target.files && event.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        if (event.target) {
                                            if (typeof event.target.result === "string") {
                                                setImageDataUrl(event.target.result);
                                            }
                                            setFieldValue("avatar", event.target.result);
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }, className: css.inputFile }), _jsxs("div", { className: css.inputUsername, children: [_jsx("svg", { className: css.iconUser, children: _jsx("use", { href: sprite + `#icon-Icon` }) }), _jsx(Field, { name: "name", type: "text", placeholder: user.name, className: css.input }), _jsx("svg", { className: css.iconEdit, children: _jsx("use", { href: sprite + `#icon-edit-01` }) })] }), _jsx("button", { type: "submit", className: css.btnSave, children: "Save changes" })] })) })] }));
};
export default UserInfoModal;
