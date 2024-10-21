import recipesMobile from "../../src/images/recipesMobile1x.png";
import recipesTablet from "../../src/images/recipesTablet1x.png";
import recipesDesktop from "../../src/images/recipesDesctop1x.png";
import emptySearchImageMobile1x from "../images/searchMobile1x.png";
import emptySearchImageMobile2x from "../images/searchMobile2x.png";
import emptySearchImageTablet1x from "../images/searchMobile1x.png";
import emptySearchImageTablet2x from "../images/searchTablet2x.png";
import emptySearchImageDesktop1x from "../images/searchDesktop1x.png";
import emptySearchImageDesktop2x from "../images/searchDesktop2x.png";

export const getRecipeImage = (
  isMobile: boolean,
  isTablet: boolean,
  isDesktop: boolean
) => {
  if (isTablet) return recipesTablet;
  if (isDesktop) return recipesDesktop;
  return recipesMobile;
};

export const getEmptySearchImage = (
  isMobile: boolean,
  isTablet: boolean,
  isDesktop: boolean
) => {
  const isRetina = window.devicePixelRatio > 1;

  if (isDesktop)
    return isRetina ? emptySearchImageDesktop2x : emptySearchImageDesktop1x;
  if (isTablet)
    return isRetina ? emptySearchImageTablet2x : emptySearchImageTablet1x;
  return isRetina ? emptySearchImageMobile2x : emptySearchImageMobile1x;
};
