import React, {FC, useRef} from "react";
import styles from "./ImageUploader.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import {toast} from "react-toastify";
import useRecipeForm from "../../../hooks/useRecipeForm";
import { RecipeFormState } from "../../../types/authTypes";

type Props = {
  file: File | null;
  updateField: <K extends keyof RecipeFormState>(field: K, value: RecipeFormState[K]) => void;
};

const ImageUploader:FC<Props> = ({file, updateField}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.currentTarget;
    if (!files || !files.length) return;

    const file = files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG and PNG allowed.");
      updateField("file", null);
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("File too large. Max size is 4MB.");
      updateField("file", null);
      return;
    }

    updateField("file", file);
  };

  return (
    <div
      className={styles.imageUploader}
      onClick={() => inputRef.current?.click()}
    >
      {file ? (
        <div className={styles.previewContainer}>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className={styles.previewImage}
          />
        </div>
      ) : (
        <div className={styles.uploadPlaceholder}>
          <svg className={styles.uploadIcon}>
            <use href={`${sprite}#icon-add`} />
          </svg>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{display: "none"}}
      />
    </div>
  );
};

export default ImageUploader;
