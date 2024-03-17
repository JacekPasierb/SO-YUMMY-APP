import React, { useEffect, useState } from "react";
import css from "./RecipeDescriptionFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllCategories } from "../../API/categoriesAPI";

const RecipeDescriptionFields = () => {
  const [file, setFile] = useState();
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
    setFile(file);
    setPath(URL.createObjectURL(file));
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
          {!file ? (
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
          placeholder="Enter about recipe"
          className={css.input}
        />
      </div>
      <div className={css.inputBox}>
        <label htmlFor="category" />
        <input
          type="text"
          name="category"
          placeholder="Category"
          id="category"
          readOnly
          className={css.input}
        />
        <select id="cat" name="cat" className={css.select}>
          {categoriesList.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={css.inputBox}>
        <label htmlFor="cookingTime" />
        <input
          type="text"
          name="cookingTime"
          id="cookingTime"
          placeholder="Cooking time"
          readOnly
          className={css.input}
        />
        <select id="time" name="time" className={css.select}>
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
