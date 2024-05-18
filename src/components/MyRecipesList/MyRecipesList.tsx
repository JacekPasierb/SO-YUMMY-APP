import css from "./MyRecipesList.module.css";

import React, { useEffect } from "react";

import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";

interface recipe {
  _id: string;
  title: string;
  preview: string;
  description: string;
  time: string;
}

interface Props {
  recipes: recipe[];
}

const MyRecipesList = ({ recipes }: Props) => {
  
  return (
    <>
      {recipes && (
        <ul className={css.myRecipesList}>
          {recipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                <CardOwnRecipe ownRecipe={recipe} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MyRecipesList;
