// Recipe images
import recipeMobilePng from "../images/recipesMobile1x.png";
import recipeTabletPng from "../images/recipesTablet1x.png";
import recipeDesktopPng from "../images/recipesDesctop1x.png";

import recipeMobileWebp from "../images/recipesMobile1x.webp";
import recipeTabletWebp from "../images/recipesTablet1x.webp";
import recipeDesktopWebp from "../images/recipesDesctop1x.webp";

// Search images
import searchMobile1xPng from "../images/searchMobile1x.png";
import searchMobile2xPng from "../images/searchMobile2x.png";
import searchTablet1xPng from "../images/searchTablet1x.png";
import searchTablet2xPng from "../images/searchTablet2x.png";
import searchDesktop1xPng from "../images/searchDesktop1x.png";
import searchDesktop2xPng from "../images/searchDesktop2x.png";

import searchMobile1xWebp from "../images/searchMobile1x.webp";
import searchMobile2xWebp from "../images/searchMobile2x.webp";
import searchTablet1xWebp from "../images/searchTablet1x.webp";
import searchTablet2xWebp from "../images/searchTablet2x.webp";
import searchDesktop1xWebp from "../images/searchDesktop1x.webp";
import searchDesktop2xWebp from "../images/searchDesktop2x.webp";

// Logo images
import logoMobile1xPng from "../images/LogoMobile1x.png";
import logoMobile2xPng from "../images/LogoMobile2x.png";
import logoTablet1xPng from "../images/LogoTablet1x.png";
import logoTablet2xPng from "../images/LogoTablet2x.png";
import logoDesktop1xPng from "../images/LogoDesctop1x.png";
import logoDesktop2xPng from "../images/LogoDesctop2x.png";

import logoMobile1xWebp from "../images/LogoMobile1x.webp";
import logoMobile2xWebp from "../images/LogoMobile2x.webp";
import logoTablet1xWebp from "../images/LogoTablet1x.webp";
import logoTablet2xWebp from "../images/LogoTablet2x.webp";
import logoDesktop1xWebp from "../images/LogoDesctop1x.webp";
import logoDesktop2xWebp from "../images/LogoDesctop2x.webp";

const images = {
  recipes: {
    mobile: {
      png: recipeMobilePng,
      webp: recipeMobileWebp,
    },
    tablet: {
      png: recipeTabletPng,
      webp: recipeTabletWebp,
    },
    desktop: {
      png: recipeDesktopPng,
      webp: recipeDesktopWebp,
    },
  },
  emptySearch: {
    mobile: {
      png: {"1x": searchMobile1xPng, "2x": searchMobile2xPng},
      webp: {"1x": searchMobile1xWebp, "2x": searchMobile2xWebp},
    },
    tablet: {
      png: {"1x": searchTablet1xPng, "2x": searchTablet2xPng},
      webp: {"1x": searchTablet1xWebp, "2x": searchTablet2xWebp},
    },
    desktop: {
      png: {"1x": searchDesktop1xPng, "2x": searchDesktop2xPng},
      webp: {"1x": searchDesktop1xWebp, "2x": searchDesktop2xWebp},
    },
  },
  logo: {
    mobile: {
      png: {"1x": logoMobile1xPng, "2x": logoMobile2xPng},
      webp: {"1x": logoMobile1xWebp, "2x": logoMobile2xWebp},
    },
    tablet: {
      png: {"1x": logoTablet1xPng, "2x": logoTablet2xPng},
      webp: {"1x": logoTablet1xWebp, "2x": logoTablet2xWebp},
    },
    desktop: {
      png: {"1x": logoDesktop1xPng, "2x": logoDesktop2xPng},
      webp: {"1x": logoDesktop1xWebp, "2x": logoDesktop2xWebp},
    },
  },
} as const;

interface DeviceConfig {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isRetina: boolean;
}

const supportsWebP = () => {
  const elem = document.createElement("canvas");
  return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

export const getRecipeImage = ({
  isDesktop,
  isTablet,
}: Partial<DeviceConfig>): string => {
  const format = supportsWebP() ? "webp" : "png";

  if (isDesktop) return images.recipes.desktop[format];
  if (isTablet) return images.recipes.tablet[format];
  return images.recipes.mobile[format];
};

export const getEmptySearchImage = ({
  isDesktop,
  isTablet,
  isRetina,
}: Partial<DeviceConfig>): string => {
  const format = supportsWebP() ? "webp" : "png";
  const resolution = isRetina ? "2x" : "1x";

  if (isDesktop) return images.emptySearch.desktop[format][resolution];
  if (isTablet) return images.emptySearch.tablet[format][resolution];
  return images.emptySearch.mobile[format][resolution];
};

export const getLogoSrc = ({
  isDesktop,
  isTablet,
  isRetina,
}: Partial<DeviceConfig>): string => {
  const format = supportsWebP() ? "webp" : "png";
  const resolution = isRetina ? "2x" : "1x";
  if (isDesktop) return images.logo.desktop[format][resolution];
  if (isTablet) return images.logo.tablet[format][resolution];
  return images.logo.mobile[format][resolution];
};

export const getPageFromQueryString = (search: string) => {
  const searchParams = new URLSearchParams(search);
  const pageString = searchParams.get("page");
  const page = parseInt(pageString || "1", 10);
  return isNaN(page) || page < 1 ? 1 : page;
};
