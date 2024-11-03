import recipesMobile from "../../src/images/recipesMobile1x.png";
import recipesTablet from "../../src/images/recipesTablet1x.png";
import recipesDesktop from "../../src/images/recipesDesctop1x.png";
import emptySearchImageMobile1x from "../images/searchMobile1x.png";
import emptySearchImageMobile2x from "../images/searchMobile2x.png";
import emptySearchImageTablet1x from "../images/searchMobile1x.png";
import emptySearchImageTablet2x from "../images/searchTablet2x.png";
import emptySearchImageDesktop1x from "../images/searchDesktop1x.png";
import emptySearchImageDesktop2x from "../images/searchDesktop2x.png";
import logo from "../images/logos";
import logo1x from "../images/LogoMobile1x.png";
import logo2x from "../images/LogoMobile2x.png";
import logoTablet1x from "../images/LogoTablet1x.png";
import logoTablet2x from "../images/LogoTablet2x.png";
import logoDesktop1x from "../images/LogoDesctop1x.png";
import logoDesktop2x from "../images/LogoDesctop2x.png";

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

export const getLogoSrc = (
  isMobile: boolean,
  isTablet: boolean,
  isDesktop: boolean
) => {
  const isRetina = window.devicePixelRatio > 1;

  if (isDesktop) {
    return isRetina ? logo.desktop2x : logo.desktop1x;
  } else if (isTablet) {
    return isRetina ? logo.tablet2x : logo.tablet1x;
  } else {
    return isRetina ? logo.mobile2x : logo.mobile1x;
  }
};

export const getResponsiveLogo = (
  isDesktop: boolean,
  isTablet: boolean,
  isRetina: boolean
): string => {
  if (isDesktop) {
    return isRetina ? logoDesktop2x : logoDesktop1x;
  }
  if (isTablet) {
    return isRetina ? logoTablet2x : logoTablet1x;
  }
  return isRetina ? logo2x : logo1x;
};
