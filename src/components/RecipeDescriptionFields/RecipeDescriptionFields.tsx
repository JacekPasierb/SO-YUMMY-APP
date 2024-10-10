import styles from "./RecipeDescriptionFields.module.css";
import sprite from "../../assets/icons/sprite.svg";

import { toast } from "react-toastify";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesList } from "../../redux/recipes/selectors";
import { AppDispatch } from "../../redux/store";
import { getCategoriesList } from "../../redux/recipes/operations";

interface DataForm {
  file: File | null;
  setFile: (file: File | null) => void;
  titleRecipe: string;
  setTitleRecipe: (title: string) => void;
  descriptionRecipe: string;
  setDescriptionRecipe: (description: string) => void;
  categoryRecipe: string;
  setCategoryRecipe: (category: string) => void;
  cookingTime: string;
  setCookingTime: (cookingTime: string) => void;
}

const RecipeDescriptionFields: FC<{ data: DataForm }> = ({ data }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesList);

  const timeOptions = Array.from({ length: 24 }, (_, i) => ({
    label: `${(i + 1) * 5} min`,
    value: (i + 1) * 5,
  }));

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || !files.length) return;

    const file = files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please use JPEG or PNG.");
      data.setFile(null);
      return;
    }

    if (file.size > 4000000) {
      toast.error("File is too large. Maximum size is 4MB.");
      data.setFile(null);
      return;
    }

    data.setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    data.setTitleRecipe(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    data.setDescriptionRecipe(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    data.setCategoryRecipe(event.target.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    data.setCookingTime(event.target.value);
  };

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.imageWrapper}>
        <label htmlFor="file">
          {!data.file ? (
            <div className={styles.iconContainer}>
              <svg className={styles.icon}>
                <use href={`${sprite}#icon-add`}></use>
              </svg>
            </div>
          ) : (
            <div className={styles.imagePreview}>
              {preview && <img src={preview} alt="Recipe Preview" className={styles.image} />}
            </div>
          )}
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </label>
      </div>

      <div className={styles.formFields}>
        <div className={styles.inputField}>
          <input
            type="text"
            id="title"
            value={data.titleRecipe}
            onChange={handleTitleChange}
            placeholder="Enter recipe title"
            className={styles.input}
          />
        </div>

        <div className={styles.inputField}>
          <input
            type="text"
            id="description"
            value={data.descriptionRecipe}
            onChange={handleDescriptionChange}
            placeholder="Enter recipe description"
            className={styles.input}
          />
        </div>

        <div className={styles.inputField}>
          <select
            id="category"
            value={data.categoryRecipe}
            onChange={handleCategoryChange}
            className={styles.select}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoriesList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputField}>
          <select
            id="cookingTime"
            value={data.cookingTime}
            onChange={handleTimeChange}
            className={styles.select}
          >
            <option value="" disabled>
              Select cooking time
            </option>
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RecipeDescriptionFields;
