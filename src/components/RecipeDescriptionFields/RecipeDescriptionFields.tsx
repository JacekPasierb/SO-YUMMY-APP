import css from "./RecipeDescriptionFields.module.css";
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

const RecipeDescriptionFields: React.FC<{ data: DataForm }> = ({ data }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesList);

  const timeOptionsList = () => {
    const time = [];
    for (let i = 5; i <= 120; i += 5) {
      time.push({ label: `${i} min`, value: i });
    }
    return time;
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files || !files.length) return;

    const file = files[0];
    let allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

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
    dispatch(getCategoriesList());
  }, [dispatch]);

  return (
    <>
      <div className={css.recipeDescriptionFieldsBox}>
        <div className={css.img}>
          <label htmlFor="file">
            {!data.file ? (
              <div className={css.iconBox}>
                <svg className={css.iconAdd}>
                  <use href={sprite + `#icon-add`}></use>
                </svg>
              </div>
            ) : (
              <div className={css.pictureBox}>
                 {preview && <img src={preview} alt="Recipe Preview" className={css.imgRecipe} />}
                
              </div>
            )}

            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFile}
              className={css.inputPicture}
            />
          </label>
        </div>
        <div className={css.inputs}>
          <div className={css.inputBox}>
            <label htmlFor="title" />
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleTitleChange}
              value={data.titleRecipe}
              placeholder="Enter Item Title"
              className={css.input}
            />
          </div>
          <div className={css.inputBox}>
            <label htmlFor="about" />
            <input
              type="text"
              name="about"
              id="about"
              onChange={handleDescriptionChange}
              value={data.descriptionRecipe}
              placeholder="Enter about recipe"
              className={css.input}
            />
          </div>
          <div className={`${css.inputBox} ${css.inputBox__select}`}>
            <div>
              <label htmlFor="category" />
              <input
                type="text"
                name="category"
                placeholder="Category"
                id="category"
                readOnly
                className={css.input}
              />
            </div>
            <select
              id="cat"
              name="cat"
              onChange={handleCategoryChange}
              value={data.categoryRecipe}
              className={css.select}
            >
              <option value="" disabled>
                Please choose category
              </option>
              {categoriesList.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={`${css.inputBox} ${css.inputBox__select}`}>
            <div>
              <label htmlFor="cookingTime" />
              <input
                type="text"
                name="cookingTime"
                id="cookingTime"
                placeholder="Cooking time"
                readOnly
                className={css.input}
              />
            </div>
            <select
              id="time"
              name="time"
              value={data.cookingTime}
              onChange={handleTimeChange}
              className={css.select}
            >
              <option value="" disabled>
                Please choose time
              </option>
              {timeOptionsList().map((t) => (
                <option value={t.value} key={t.label}>
                  {t.label}
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
