import styles from "./MyRecipesList.module.css";
import React, { useEffect } from "react";
import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";
import MyRecipesListSkeleton from "../CardOwnRecipe/MyRecipesListSkelton";
import { IRecipe } from "../../types/recipesTypes";

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
        recipes && recipes.length !== 0 ? (
          <ul className={styles.myRecipesList}>
            {recipes.map((recipe) => {
              return (
                <li key={recipe._id} className={styles.myRecipesList__item}>
                  <CardOwnRecipe ownRecipe={recipe} />
                </li>
              );
            })}
          </ul>
        ) : ( <p>Add your first recipe...</p>)
      )}
    </>
  );
};


export default MyRecipesList;
