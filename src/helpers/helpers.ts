import recipesMobile from "../../images/recipesMobile1x.png";
import recipesTablet from "../../images/recipesTablet1x.png";
import recipesDesktop from "../../images/recipesDesctop1x.png";

export const getRecipeImage = (
  isMobile: boolean,
  isTablet: boolean,
  isDesktop: boolean
) => {
  if (isMobile) return recipesMobile;
  if (isTablet) return recipesTablet;
  if (isDesktop) return recipesDesktop;
  return recipesMobile;
};
