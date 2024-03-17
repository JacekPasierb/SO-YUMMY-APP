import React, { useState } from "react";
import css from "./RecipeDescriptionFields.module.css";
import sprite from "../../assets/icons/sprite.svg";

const RecipeDescriptionFields = () => {
  const [file, setFile] = useState();
  4;

  return (
    <div className={css.recipeDescriptionFieldsBox}>
      <label htmlFor="file">
        {!file && (
          <div className={css.pictureBox}>
            <svg className={css.iconAdd}>
              <use href={sprite + `#icon-add`}></use>
            </svg>
          </div>
        )}
      </label>
      <input type="file" name="file" id="file" className={css.inputPicture}/>
      <label htmlFor="title">Enter Item Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter Item Title"
      />
      <label htmlFor="about">Enter about recipe</label>
      <input type="text" name="about" id="about" />
    </div>
  );
};

export default RecipeDescriptionFields;
