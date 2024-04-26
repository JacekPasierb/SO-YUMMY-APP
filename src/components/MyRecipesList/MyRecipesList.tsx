import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectOwnRecipes,
} from "../../redux/recipes/selectors";
import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";

const MyRecipesList = () => {
  const ownRecipes = useSelector(selectOwnRecipes);
  const isLoading = useSelector(selectIsLoading);
  console.log("prep", ownRecipes);

  return (
    <>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        ownRecipes && (
          <ul>
            {ownRecipes.map((ownRecipe) => {
              return (
                <li key={ownRecipe._id}>
                  <CardOwnRecipe ownRecipe={ownRecipe} />
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
