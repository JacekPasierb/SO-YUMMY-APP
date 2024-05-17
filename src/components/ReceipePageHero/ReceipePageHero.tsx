import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";

import React, { useEffect, useState } from "react";

import MainPageTitle from "../MainPageTitle/MainPageTitle";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { addToFavorite, removeFromFavorite } from "../../API/favoritesAPI";

interface Recipe {
  title: string;
  description: string;
  time: string;
  favorites: any[];
  _id: string;
}

const ReceipePageHero = ({ recipe }: { recipe: Recipe }) => {
  const { title, description, time, favorites, _id } = recipe;
  const user = useSelector(selectUser);
  const userId = user.userId;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favorites !== undefined) {
      setIsFav(favorites.includes(userId));
    }
  }, [recipe]);

  useEffect(() => {
    console.log("fav", isFav);
  }, [isFav,setIsFav]);

  const handleFavorite = async(id: string) => {
    console.log("klik");

    try {
      if (isFav) {
        await removeFromFavorite(id);
      } else {
        await addToFavorite(id);
      }
      
      setIsFav(!isFav); // Zmiana stanu po pomyślnym dodaniu/usunięciu z ulubionych
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={css.receipeHeroBox}>
      <MainPageTitle title={title} />
      <p className={css.recipeDescription}>{description}</p>

      <button
        type="button"
        className={`${css.btn} ${css.textBtn}`}
        onClick={() => handleFavorite(_id)}
      >
        {!isFav ? "Add to favorite recipes" : "Remove from favorites"}
      </button>
      {time && (
        <div className={css.timeBox}>
          <svg className={css.iconClock}>
            <use href={sprite + `#icon-clock`}></use>
          </svg>
          <p className={css.timeText}>{time} min</p>
        </div>
      )}
    </div>
  );
};

export default ReceipePageHero;
