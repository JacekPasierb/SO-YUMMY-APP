import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import css from "./CardOwnRecipe.module.css"; // Upewnij się, że ścieżka jest poprawna

const MyRecipesListSkeleton = () => {
  return (
    <ul className={css.myRecipesList}>
      {[...Array(4)].map((_, index) => (
        <li key={index}>
          <div className={css.cardBox}>
            <Skeleton height={124} width={124} />
            <div className={css.recipeInfo}>
              <div className={css.rowFirst}>
                <Skeleton height={20} width={`60%`} />
                <Skeleton height={20} width={30} />
              </div>
              <Skeleton count={2} style={{ marginTop: '10px', marginBottom: '5px' }} />
              <div className={css.row}>
                <Skeleton height={20} width={50} />
                <Skeleton height={20} width={80} style={{ marginLeft: '10px' }} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyRecipesListSkeleton;
