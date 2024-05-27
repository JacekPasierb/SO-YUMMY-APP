import css from "./UserInfoModal.module.css";
import sprite from "../../../assets/icons/sprite.svg";

import { Field, Formik, Form, FormikValues } from "formik";
import { toast } from "react-toastify";

import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import { AppDispatch } from "src/redux/store";

import { validate } from "./UserInfoModalValidatin";
import { useAuth } from "../../../hooks/useAuth";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg";

interface UserInfoModalRequest {
  onClose: () => void;
}

// interface User {
//   name: string;
//   email: string | null;
//   avatar: string | null;
// }

// interface Data {
//   isLoggedIn: boolean;
//   isRefreshing: boolean;
//   user: User;
//   token: string;
// }

const UserInfoModal: FC<UserInfoModalRequest> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const [imageDataUrl, setImageDataUrl] = useState(user.avatar);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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
  interface UserData {
    name: string;
    avatar: string;
  }
  const handleSubmit = async (values: FormikValues) => {
    const userData: UserData = {
      name: values.name ? values.name : user.name,
      avatar: values.avatar || user.avatar,
    };
    dispatch(updateUser(userData));

    toast.success("Succes, Update profile !");
    onClose();
  };
  return (
    <div ref={modalRef} className={css.editProfileModal}>
      <IconCloseModal onClose={onClose} />

      <Formik
        initialValues={{ avatar: "", name: user.name || "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <label htmlFor="avatar" className={css.btnChoose}>
              {imageDataUrl ? (
                <div className={css.logoBackground}>
                  <img
                    src={imageDataUrl}
                    alt="avatar"
                    style={{
                      borderRadius: "50% ",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              ) : (
                <div className={css.logoBackground}>
                  <svg className={css.iconPicture}>
                    <use href={sprite + `#icon-Icon`}></use>
                  </svg>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="avatar"
              name="avatar"
              onChange={(event) => {
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
              }}
              className={css.inputFile}
            />

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
        )}
      </Formik>
    </div>
  );
};

export default UserInfoModal;
