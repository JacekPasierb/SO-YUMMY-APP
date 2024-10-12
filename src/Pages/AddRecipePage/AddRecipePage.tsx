import styles from "./AddRecipePage.module.css";
import React, { lazy, Suspense } from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import { useMediaQuery } from "@react-hook/media-query";
import SubTitle from "../../components/SubTitle/SubTitle";
import Skeleton from "react-loading-skeleton";

const PopularRecipe = lazy(
  () => import("../../components/PopularRecipe/PopularRecipe")
);
const FollowUs = lazy(
  () => import("../../components/Footer/FollowUs/FollowUs")
);
// Skeleton loader component for PopularRecipe
const PopularRecipeSkeleton = () => (
  <div className={styles.skeletonList}>
    <Skeleton height={85} width={104} style={{ marginBottom: '10px' }} />
    <Skeleton height={20} width={150} style={{ marginBottom: '6px' }} />
    <Skeleton count={2} />
  </div>
);
const AddRecipePage: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width:1200px)");
  return (
    <>
      <main className={styles.addRecipePage}>
        <Header />
        <div className={`${styles.addRecipePage__container} ${styles.flex}`}>
          <MainTitle title={"Add recipe"} />
          <div className={styles.addRecipePage__content}>
            {isDesktop ? (
              <>
                <AddRecipeForm />
                <aside className={styles.addRecipePage__sidebar}>
                  <SubTitle title={"Follow Us"} /> <FollowUs />
                  <Suspense fallback={<PopularRecipeSkeleton />}>
                    <PopularRecipe />
                  </Suspense>
                </aside>
              </>
            ) : (
              <>
                <AddRecipeForm />  <Suspense fallback={<PopularRecipeSkeleton />}>
                    <PopularRecipe />
                  </Suspense>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AddRecipePage;
