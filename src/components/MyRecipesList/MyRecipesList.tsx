import React, { useEffect } from "react";
import css from "./MyRecipesList.module.css";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectOwnRecipes,
} from "../../redux/recipes/selectors";
import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";

interface ownRecipe {
  _id: string;
  title: string;
  preview: string;
  description: string;
  time: string;
}

interface Props {
  ownRecipes: ownRecipe[];
}

const MyRecipesList = ({ ownRecipes }: Props) => {
  return (
    <>
      {ownRecipes && (
        <ul className={css.myRecipesList}>
          {ownRecipes.map((ownRecipe) => {
            return (
              <li key={ownRecipe._id}>
                <CardOwnRecipe ownRecipe={ownRecipe} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MyRecipesList;
