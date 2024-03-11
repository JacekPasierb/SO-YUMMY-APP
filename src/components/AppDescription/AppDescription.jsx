import React from 'react'
import css from "./AppDescription.module.css"

const AppDescription = () => {
  return (
    <p className={css.appDescription}>
    "What to cook?" is not only a recipe app, it is, in
    fact, your cookbook. You can add your own recipes to
    save them for the future.
  </p>
  )
}

export default AppDescription