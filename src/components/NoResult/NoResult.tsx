import React, {useMemo} from "react";
import styles from "./NoResult.module.css";
import {useMediaQuery} from "@react-hook/media-query";
import {getEmptySearchImage} from "../../helpers/helpers";
import {useTranslation} from "react-i18next";



const NoResult: React.FC<{ text: string }> = ({ text }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isRetina = window.devicePixelRatio > 1;
  const {t} = useTranslation();

  const emptySearchImage = useMemo(() => {
    return getEmptySearchImage({isDesktop, isTablet, isMobile, isRetina});
  }, [isDesktop, isTablet, isMobile, isRetina]);

  return (
    <div className={styles.noResults}>
      <img
        src={emptySearchImage}
        alt="No results found"
        className={styles.noResults__image}
      />
      <p className={styles.noResults__text}>{t(text)}</p>
    </div>
  );
};

export default NoResult;
