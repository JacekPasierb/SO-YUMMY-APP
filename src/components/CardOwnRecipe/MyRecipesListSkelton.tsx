import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CardOwnRecipe.module.css"; // Upewnij się, że ścieżka jest poprawna

const MyRecipesListSkeleton = () => {
  return (
    <ul className={styles.myRecipesList}>
      {[...Array(4)].map((_, index) => (
        <li key={index} className={styles.myRecipesList__item}>
          <div className={styles.myRecipesList__card}>
            <Skeleton height={124} width={124} />
            <div className={styles.myRecipesList__info}>
              <div className={styles.myRecipesList__rowFirst}>
                <Skeleton height={20} width={`60%`} />
                <Skeleton height={20} width={30} />
              </div>
              <Skeleton
                count={2}
                style={{ marginTop: "10px", marginBottom: "5px" }}
              />
              <div className={styles.myRecipesList__row}>
                <Skeleton height={20} width={50} />
                <Skeleton
                  height={20}
                  width={80}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyRecipesListSkeleton;
