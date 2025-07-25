import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Tab, Tabs} from "@mui/material";
import {useTranslation} from "react-i18next";
import { categoryKeys } from "../../data/categoryKeys";



const COLORS = {
  primary: "#8BAA36",
  border: "#E0E0E0",
  tabInactive: "#E0E0E0",
};

const TAB_STYLES = {
  tabs: {
    marginTop: "20px",
    borderBottom: `1px solid ${COLORS.border}`,
    "& .MuiTabs-indicator": {
      backgroundColor: COLORS.primary,
    },
    "& .MuiTab-root": {
      outline: "none",
    },
    "& .MuiButtonBase-root": {
      padding: "10px 10px 32px 10px",
    },
    "& .MuiTabs-flexContainer": {
      gap: "28px",
    },
  },
  tab: {
    padding: "0",
    fontSize: "14px",
    lineHeight: "14px",
    color: COLORS.tabInactive,
    "&.Mui-selected": {
      color: COLORS.primary,
    },
  },
};

const CategoriesNav = () => {
  const navigate = useNavigate();
  const {categoryName} = useParams();
  const [value, setValue] = useState(0);
  const {t, i18n} = useTranslation();

  const categoriesList = useMemo(() => {
    return categoryKeys.map((key) => t(`categoriess.${key}`));
  }, [t, i18n.language]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`/categories/${categoriesList[newValue]}`);
    setValue(newValue);
  };

  useEffect(() => {
    if (categoryName && categoriesList.length > 0) {
      const activeCategoryIndex = categoriesList.findIndex(
        (category) => category === categoryName
      );
      setValue(activeCategoryIndex !== -1 ? activeCategoryIndex : 0);
    }
  }, [categoryName, categoriesList]);

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false}
      allowScrollButtonsMobile
      aria-label="Category Navigation Tabs"
      sx={TAB_STYLES.tabs}
    >
      {categoriesList.map((category) => (
        <Tab key={category} label={category} sx={TAB_STYLES.tab} />
      ))}
    </Tabs>
  );
};

export default CategoriesNav;
