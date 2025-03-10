import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import {
  selectCategoriesList,
  selectError,
  selectIsLoading,
} from "../../redux/recipes/selectors";
import { getCategoriesList } from "../../redux/recipes/operations";

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

interface CategoriesNavProps {
  categoriesList: string[];
}

const CategoriesNav: React.FC<CategoriesNavProps> = ({categoriesList}) => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [value, setValue] = useState(0);
  
console.log("name",categoryName);
console.log("val",value);

  // const categoriesList = useSelector(selectCategoriesList);
  const error = useSelector(selectError);
  // const isLoading = useSelector(selectIsLoading);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    console.log("newval",newValue);
    console.log("cat",categoriesList);
    
    navigate(`/categories/${categoriesList[newValue]}`);
    setValue(newValue);
  };

//tu byl

  useEffect(() => {
    if (categoryName && categoriesList.length > 0) {
      const activeCategoryIndex = categoriesList.findIndex(
        (category) => category === categoryName
      );
      setValue(activeCategoryIndex !== -1 ? activeCategoryIndex : 0);
    }
  }, [categoryName, categoriesList]);

  // if (error) {
  //   toast.error("Something went wrong with categories. Please try again.");
  //   return <p>Failed to load categories</p>;
  // }

  // if (isLoading || !categoriesList) {
  //   return null;
  // }

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
      {categoriesList.map((category, index) => (
        <Tab key={category} label={category} sx={TAB_STYLES.tab} />
      ))}
    </Tabs>
  );
};

export default CategoriesNav;
