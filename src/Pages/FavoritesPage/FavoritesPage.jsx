import React from 'react'
import css from "./FavoritesPage.module.css";
import Header from '../../components/Header/Header';
import MainTitle from '../../components/MainTitle/MainTitle';

const FavoritesPage = () => {
  return (
    <>
    <Header />
    <main className={css.background}>
      <div className={`${css.container} ${css.flex}`}>
        <MainTitle title={"Favorites"} />
      </div>
    </main>
  </>
  )
}

export default FavoritesPage