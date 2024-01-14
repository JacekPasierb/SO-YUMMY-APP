import React, { useEffect, useRef } from "react";
import css from "./UserInfoModal.module.css";
import close from "../../../images/X.png";
import sprite from "../../../assets/icons/sprite.svg";
import { Field, Formik, Form } from "formik";
import { validate } from "./UserInfoModalValidatin";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

const UserInfoModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useAuth();
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
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

  const handleSubmit = async (values,{resetForm}) => {
    dispatch(
      updateUser({
        name: values.name
      })
    );
    toast.info("Verification link sent to email. Check your mail.");
    resetForm();
  };
  return (
    <div ref={modalRef} className={css.editProfileModal}>
      <img
        src={close}
        alt="ikona zamykająca modal"
        className={css.iconClose}
        onClick={onClose}
      />
      <Formik
        initialValues={{ name: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.logoBackground}>
            <svg className={css.iconPicture}>
              <use href={sprite + `#icon-Icon`}></use>
            </svg>
            <button type="button" className={css.btnAdd}>
              <svg className={css.iconPlus}>
                <use href={sprite + `#icon-plus`}></use>
              </svg>
            </button>
          </div>
          <div className={css.inputUsername}>
            <svg className={css.iconUser}>
              <use href={sprite + `#icon-Icon`}></use>
            </svg>

            <Field
              name="name"
              type="text"
              placeholder={user.name}
              className={css.input}
            />

            <svg className={css.iconEdit}>
              <use href={sprite + `#icon-edit-01`}></use>
            </svg>
          </div>
          <button type="submit" className={css.btnSave}>
            Save changes
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserInfoModal;
