import recipesMobile from "../../src/images/recipesMobile1x.png";
import recipesTablet from "../../src/images/recipesTablet1x.png";
import recipesDesktop from "../../src/images/recipesDesctop1x.png";

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
