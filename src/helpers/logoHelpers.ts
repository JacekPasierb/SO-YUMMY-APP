import { useMediaQuery } from "@react-hook/media-query";
import logo from "../images/logos";

const isTablet = useMediaQuery("(min-width: 768px)");
const isDesktop = useMediaQuery("(min-width: 1200px)");
const isRetina = window.devicePixelRatio > 1;

export const logoSrc = isDesktop
? isRetina
  ? logo.desktop2x
  : logo.desktop1x
: isTablet
? isRetina
  ? logo.tablet2x
  : logo.tablet1x
: isRetina
? logo.mobile2x
: logo.mobile1x;