import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useMediaQuery} from "@react-hook/media-query";
import Header from "../../components/Header/Header";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";
import PreviewsCategories from "../../components/PreviewCategories/PreviewsCategories";
import ButtonOtherCategories from "../../components/ButtonOtherCategories/ButtonOtherCategories";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppDescription from "../../components/AppDescription/AppDescription";
import SearchForm from "../../components/SearchForm/SearchForm";
import styles from "./MainPage.module.css";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";


const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
const {t}=useTranslation();
  const handleSearchSubmit = (searchValue: string) => {
    const trimmedValue = searchValue?.trim();
    if (trimmedValue) {
      navigate(`/search?query=${encodeURIComponent(trimmedValue)}`);
    }
  };

  useEffect(() => {
    if (!document.head.querySelector("link[rel='preload'][href='/assets/bckg2Mobile1x-6dd32201.webp']")) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = "/assets/bckg2Mobile1x-6dd32201.webp";
      link.type = "image/webp";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("titles.welcome")}</title>
      </Helmet>
      <Header />
      <main>
        <section className={styles.background}>
          <div className={`${styles.container} ${styles.mainPageBox}`}>
            <div className={!isMobile ? styles.flexLayout : ""}>
              <div>
                <AppTitle />
                <AppDescription />
                <SearchForm onSearchSubmit={handleSearchSubmit} />
              </div>
              {!isMobile && <ChooseYourBreakfast />}
            </div>
            {isMobile && <ChooseYourBreakfast />}
          </div>
        </section>

        <section>
          <div
            className={`${styles.container} ${
              isDesktop ? styles.mainPageBox : styles.sectionBox
            }`}
          >
            <PreviewsCategories />
            <ButtonOtherCategories
              text={t("otherCategories")}
              categoryName="Beef"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default MainPage;
