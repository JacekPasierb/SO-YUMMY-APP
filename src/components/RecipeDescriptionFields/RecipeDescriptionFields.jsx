import React, { useEffect, useState } from "react";
import css from "./RecipeDescriptionFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllCategories } from "../../API/categoriesAPI";
import { toast } from "react-toastify";

const RecipeDescriptionFields = ({
  data,
  file,
  setFile,
  titleRecipe,
  setTitleRecipe,
  descriptionRecipe,
  setDescriptionRecipe,
  categoryRecipe,
  setCategoryRecipe,
  cookingTime,
  setCookingTime,
}) => {
  const [path, setPath] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  const timeOptionsList = () => {
    const time = [];
    for (let i = 5; i <= 120; i += 5) {
      time.push({ label: `${i} min`, value: i });
    }
    return time;
  };
  const handleFile = ({ currentTarget }) => {
    const { files } = currentTarget;
    const [file] = files;

    let allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!file || !allowedImageTypes.includes(file.type)) {
      toast.error("Wrong file type. Please, choose different image type", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      data.setFile(null);
      return;
    }
    data.setFile(file);
    setPath(URL.createObjectURL(file));
  };

  const handleTitle = ({ currentTarget }) => {
    const title = currentTarget.value;
    data.setTitleRecipe(title);
  };
  const handleChange = ({ currentTarget }) => {
    const about = currentTarget.value;
    data.setDescriptionRecipe(about);
  };
  const handleCategory = ({ currentTarget }) => {
    const category = currentTarget.value;
    data.setCategoryRecipe(category);
  };
  const handleTime = ({ currentTarget }) => {
    const cookingTime = currentTarget.value;
    data.setCookingTime(cookingTime);
  };
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await fetchAllCategories();
        setCategoriesList(data.catArr);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className={css.recipeDescriptionFieldsBox}>
      <div>
        <label htmlFor="file">
          {!data.file ? (
            <div className={css.iconBox}>
              <svg className={css.iconAdd}>
                <use href={sprite + `#icon-add`}></use>
              </svg>
            </div>
          ) : (
            <div className={css.pictureBox}>
              <img src={path} alt="preview" className={css.imgRecipe} />
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
      <div className={css.inputBox}>
        <label htmlFor="title" />
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleTitle}
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
          onChange={handleChange}
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
          onChange={handleCategory}
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
          onChange={handleTime}
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
  );
};

export default RecipeDescriptionFields;
