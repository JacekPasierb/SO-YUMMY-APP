import styles from "./RecipeDescriptionFields.module.css";
import sprite from "../../assets/icons/sprite.svg";

import {toast} from "react-toastify";

import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCategoriesList} from "../../redux/recipes/selectors";
import {AppDispatch} from "../../redux/store";
import {getCategoriesList} from "../../redux/recipes/operations";
import {useTranslation} from "react-i18next";

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

const RecipeDescriptionFields: React.FC<{data: DataForm}> = ({data}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesList);
  const {t, i18n} = useTranslation();
  const currentLanguage = i18n.language;
  const timeOptionsList = () => {
    const time = [];
    for (let i = 5; i <= 120; i += 5) {
      time.push({label: `${i} min`, value: i});
    }
    return time;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.currentTarget;

    if (!files || !files.length) return;

    const file = files[0];
    let allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error(t("invalidFileType"));
      data.setFile(null);
      return;
    }

    if (file.size > 4000000) {
      toast.error(t("fileTooLarge"));
      data.setFile(null);
      return;
    }
    data.setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    data.setTitleRecipe(event.currentTarget.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    data.setDescriptionRecipe(event.currentTarget.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    data.setCategoryRecipe(event.currentTarget.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    data.setCookingTime(event.currentTarget.value);
  };

  useEffect(() => {
    dispatch(getCategoriesList(currentLanguage));
  }, [dispatch, currentLanguage]);

  return (
    <>
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
                {preview && (
                  <img
                    src={preview}
                    alt="Recipe Preview"
                    className={styles.image}
                  />
                )}
              </div>
            )}

            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className={styles.fileInput}
              name="file"
            />
          </label>
        </div>
        <div className={styles.formFields}>
          <div className={styles.inputField}>
            <label htmlFor="title" />
            <input
              type="text"
              id="title"
              value={data.titleRecipe}
              onChange={handleTitleChange}
              placeholder={t("enterRecipeTitle")}
              className={styles.input}
              name="title"
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="about" />
            <input
              type="text"
              id="about"
              value={data.descriptionRecipe}
              onChange={handleDescriptionChange}
              placeholder={t("enterAboutRecipe")}
              className={styles.input}
              name="about"
            />
          </div>
          <div className={`${styles.inputField} ${styles.inputField__select}`}>
            <div>
              <label htmlFor="category" />
              <input
                type="text"
                id="category"
                placeholder={t("category")}
                className={styles.input}
                readOnly
                name="category"
              />
            </div>

            <select
              id="category"
              value={data.categoryRecipe}
              onChange={handleCategoryChange}
              className={styles.select}
              name="cat"
            >
              {categoriesList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={`${styles.inputField} ${styles.inputField__select}`}>
            <div>
              <label htmlFor="cookingTime" />
              <input
                type="text"
                id="cookingTime"
                placeholder={t("cookingTime")}
                className={styles.input}
                readOnly
                name="cookingTime"
              />
            </div>

            <select
              id="cookingTime"
              value={data.cookingTime}
              onChange={handleTimeChange}
              className={`${styles.select}`}
              name="time"
            >
              {timeOptionsList().map((option) => (
                <option value={option.value} key={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDescriptionFields;
