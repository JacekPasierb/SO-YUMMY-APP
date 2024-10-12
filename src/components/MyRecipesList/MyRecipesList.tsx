import css from "./MyRecipesList.module.css";

import React, { useEffect } from "react";

import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";
import { IRecipe } from "../../types/recipesTypes";
import MyRecipesListSkeleton from "./MyRecipesListSkelton";

interface recipe {
  _id: string;
  title: string;
  preview: string;
  description: string;
  time: string;
}

interface Props {
  recipes: IRecipe[];
  isLoading: boolean
}

const MyRecipesList = ({ recipes, isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <MyRecipesListSkeleton /> // Zwracamy skeleton podczas ładowania
      ) : (
        recipes && (
          <ul className={css.myRecipesList}>
            {recipes.map((recipe) => {
              return (
                <li key={recipe._id}>
                  <CardOwnRecipe ownRecipe={recipe} />
                </li>
              );
            })}
          </ul>
        )
      )}
    </>
  );
};


export default MyRecipesList;
