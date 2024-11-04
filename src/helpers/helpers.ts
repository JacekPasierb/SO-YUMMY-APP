// Recipe images
import recipeMobile from '../images/recipesMobile1x.png';
import recipeTablet from '../images/recipesTablet1x.png';
import recipeDesktop from '../images/recipesDesctop1x.png';

// Search images
import searchMobile1x from '../images/searchMobile1x.png';
import searchMobile2x from '../images/searchMobile2x.png';
import searchTablet1x from '../images/searchTablet1x.png';
import searchTablet2x from '../images/searchTablet2x.png';
import searchDesktop1x from '../images/searchDesktop1x.png';
import searchDesktop2x from '../images/searchDesktop2x.png';

// Logo images
import logoMobile1x from '../images/LogoMobile1x.png';
import logoMobile2x from '../images/LogoMobile2x.png';
import logoTablet1x from '../images/LogoTablet1x.png';
import logoTablet2x from '../images/LogoTablet2x.png';
import logoDesktop1x from '../images/LogoDesctop1x.png';
import logoDesktop2x from '../images/LogoDesctop2x.png';

const images = {
  recipes: {
    mobile: recipeMobile,
    tablet: recipeTablet,
    desktop: recipeDesktop,
  },
  emptySearch: {
    mobile: {
      '1x': searchMobile1x,
      '2x': searchMobile2x,
    },
    tablet: {
      '1x': searchTablet1x,
      '2x': searchTablet2x,
    },
    desktop: {
      '1x': searchDesktop1x,
      '2x': searchDesktop2x,
    },
  },
  logo: {
    mobile: {
      '1x': logoMobile1x,
      '2x': logoMobile2x,
    },
    tablet: {
      '1x': logoTablet1x,
      '2x': logoTablet2x,
    },
    desktop: {
      '1x': logoDesktop1x,
      '2x': logoDesktop2x,
    },
  },
} as const;

interface DeviceConfig {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isRetina: boolean;
}

export const getRecipeImage = ({ isDesktop, isTablet }: Partial<DeviceConfig>): string => {
  if (isDesktop) return images.recipes.desktop;
  if (isTablet) return images.recipes.tablet;
  return images.recipes.mobile;
};

export const getEmptySearchImage = ({ 
  isDesktop, 
  isTablet, 
  isRetina 
}: Partial<DeviceConfig>): string => {
  if (isDesktop) {
    return isRetina ? images.emptySearch.desktop['2x'] : images.emptySearch.desktop['1x'];
  }
  if (isTablet) {
    return isRetina ? images.emptySearch.tablet['2x'] : images.emptySearch.tablet['1x'];
  }
  return isRetina ? images.emptySearch.mobile['2x'] : images.emptySearch.mobile['1x'];
};

export const getLogoSrc = ({ 
  isDesktop, 
  isTablet, 
  isRetina 
}: Partial<DeviceConfig>): string => {
  if (isDesktop) {
    return isRetina ? images.logo.desktop['2x'] : images.logo.desktop['1x'];
  }
  if (isTablet) {
    return isRetina ? images.logo.tablet['2x'] : images.logo.tablet['1x'];
  }
  return isRetina ? images.logo.mobile['2x'] : images.logo.mobile['1x'];
};
