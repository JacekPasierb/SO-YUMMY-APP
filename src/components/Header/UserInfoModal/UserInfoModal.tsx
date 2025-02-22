import React, {FC, useEffect, useRef, useState} from "react";
import {Field, Formik, Form, FormikValues, FormikHelpers} from "formik";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {updateUser} from "../../../redux/auth/operations";
import {AppDispatch} from "src/redux/store";
import {validate} from "./UserInfoModalValidation";
import {useAuth} from "../../../hooks/useAuth";
import IconCloseModal from "../../IconCloseModal/IconCloseModal";
import styles from "./UserInfoModal.module.css";
import sprite from "../../../assets/icons/sprite.svg";

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg";

interface UserInfoModalProps {
  onClose: () => void;
  id?: string;
}

interface FormValues {
  name: string;
  avatar: string;
}

interface UserData {
  name: string;
  avatar: string;
}

const UserInfoModal: FC<UserInfoModalProps> = ({
  onClose,
  id = "user-info-modal",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const {user} = useAuth();
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

  const handleSubmit = async (
    values: FormValues,
    {setSubmitting}: FormikHelpers<FormValues>
  ) => {
    const errors = validate(values); // Pobieramy błędy
    console.log("eer", errors);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errorMessage) => {
        toast.error(errorMessage);
      });
      setSubmitting(false);
      return;
    }

    const userData: UserData = {
      name: values.name ? values.name : user.name,
      avatar: values.avatar ?? user.avatar ?? DEFAULT_AVATAR,
    };
    try {
      await dispatch(updateUser(userData)).unwrap();
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error("Failed to update profile. Please try again.", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      ref={modalRef}
      className={styles.userInfoModal}
      id={id}
      role="dialog"
      aria-labelledby="user-info-title"
      aria-modal="true"
    >
      <IconCloseModal onClose={onClose} />

      <Formik
        initialValues={{avatar: user.avatar || "", name: user.name || ""}}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({setFieldValue, values, isSubmitting, errors,touched}) => {
useEffect(() => {
  Object.entries(errors).forEach(([field, errorMessage]) => {
    if (
      touched[field as keyof typeof touched] && 
      typeof errorMessage === "string"
    ) {
      toast.error(errorMessage);
    }
  });
}, [errors, touched]); 

          return (
            <Form className={styles.userInfoModal__form}>
              <label
                htmlFor="avatar"
                className={styles.userInfoModal__avatarLabel}
              >
                {imageDataUrl ? (
                  <div className={styles.userInfoModal__avatarPreview}>
                    <img
                      src={imageDataUrl}
                      alt="User avatar"
                      style={{
                        borderRadius: "50% ",
                        width: "100%",
                        height: "100%",
                      }}
                      className={styles.userInfoModal__avatarImage}
                    />
                  </div>
                ) : (
                  <div className={styles.userInfoModal__avatarPlaceholder}>
                    <svg className={styles.userInfoModal__iconPicture}>
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
                className={styles.userInfoModal__inputFile}
                aria-label="Upload avatar"
                disabled={isSubmitting}
              />

              <div className={styles.userInfoModal__inputWrapper}>
                <svg className={styles.userInfoModal__iconUser}>
                  <use href={sprite + `#icon-Icon`}></use>
                </svg>

                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={styles.userInfoModal__input}
                  aria-label="Username"
                  disabled={isSubmitting}
                />

                <svg
                  className={styles.userInfoModal__iconEdit}
                  aria-hidden="true"
                >
                  <use href={`${sprite}#icon-edit-01`}></use>
                </svg>
              </div>

              <button
                type="submit"
                className={styles.userInfoModal__btnSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Save..." : "Save changes"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserInfoModal;
