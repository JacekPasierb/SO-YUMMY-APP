import React, { useEffect } from "react";
import css from "./MainRecipesPage.module.css";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getOwnRecipes } from "../../redux/recipes/operations";
import { selectOwnRecipes } from "../../redux/recipes/selectors";
import { useAuth } from "../../hooks/useAuth";

const MyRecipesPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const ownRecipes = useSelector(selectOwnRecipes);
  const { user } = useAuth();
  const userId = user?.id;
  console.log("uu", userId);

  useEffect(() => {
    console.log("stt");
    if (userId) {
      dispatch(getOwnRecipes(userId));
    }
    console.log("ooowww", ownRecipes);
  }, [dispatch, userId]);
  console.log("ooo", ownRecipes);

  return (
    <main className={css.background}>
      <Header />
      <div className={`${css.container} ${css.flex}`}>
        <MainTitle title={"My recipes"} />
      </div>
    </main>
  );
};

export default MyRecipesPage;
