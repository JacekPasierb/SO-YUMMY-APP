import React, { FC } from "react";
import { useNavigate } from "react-router";
import styles from "./MyRecipesList.module.css";
import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";
import MyRecipesListSkeleton from "../CardOwnRecipe/MyRecipesListSkelton";
import { IRecipe } from "../../types/recipesTypes";

interface MyRecipesListProps {
  recipes: IRecipe[];
  isLoading: boolean;
}

const MyRecipesList: FC<MyRecipesListProps> = ({ recipes, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <MyRecipesListSkeleton />;
  }

  if (!recipes ) {
    navigate("/404");
    return null;
  }
  if ( recipes.length === 0) {
   return (
      <div className={styles.emptyState} role="status">
        <p className={styles.emptyStateText}>
          You haven't added any recipes yet
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className={styles.myRecipesList}>
        {recipes.map((recipe) => (
          <li key={recipe._id} className={styles.myRecipesList__item}>
            <CardOwnRecipe
              ownRecipe={recipe}
              aria-label={`Recipe: ${recipe.title}`}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyRecipesList;
