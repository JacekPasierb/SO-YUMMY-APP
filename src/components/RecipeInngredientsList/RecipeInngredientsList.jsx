import React from 'react'
import css from "./RecipeInngredientsList.module.css"

const RecipeInngredientsList = ({ingredients}) => {
    console.log("teet",ingredients);
  return (
    <div className={css.container}>RecipeInngredientsList</div>
  )
}

export default RecipeInngredientsList