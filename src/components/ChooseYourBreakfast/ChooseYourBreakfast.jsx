import React from "react";
import css from "./ChooseYourBreakfast.module.css";
import recipes from "../../images/recipesMobile1x.png";
import sprite from "../../assets/icons/sprite.svg";

const ChooseYourBreakfast = () => {
  return (
    <div className={css.chooseBox}>
      {/* <img src={recipes} alt="obrazek dania" className={css.imageRecipes} /> */}
      <div className={css.boxRecipes}>
        <span className={css.fontRecipes}>
          <span className={css.fontRecipesInnerColor}>
            Delicious and healthy{" "}
          </span>
          way to enjoy a variety of fresh ingredients in one satisfying meal
        </span>
        <button type="button" className={css.btn}>
          See recipes{" "}
          <svg className={css.icon}>
            <use href={sprite + `#icon-arrow-narrow-right`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChooseYourBreakfast;
