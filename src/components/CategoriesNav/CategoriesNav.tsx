import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoriesList,
  selectError,
  selectIsLoading,
} from "../../redux/recipes/selectors";
import { AppDispatch } from "../../redux/store";
import { getCategoriesList } from "../../redux/recipes/operations";
import styles from "./CategoriesNav.module.css";

const CategoriesNav = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [value, setValue] = useState(0);
  const categoriesList = useSelector(selectCategoriesList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(`/categories/${categoriesList[newValue]}`);
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  useEffect(() => {
    if (categoryName && categoriesList.length > 0) {
      const activeCategoryIndex = categoriesList.findIndex(
        (category) => category === categoryName
      );
      setValue(activeCategoryIndex !== -1 ? activeCategoryIndex : 0);
    }
  }, [categoryName, categoriesList]);

  if (error) {
    toast.error("Something went wrong with categories. Please try again.");
    return <p>Failed to load categories</p>;
  }

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        allowScrollButtonsMobile
        aria-label="Category Navigation Tabs"
        classes={{
          root: styles.tabs,
          indicator: styles.tabsIndicator,  
          flexContainer: styles.tabsFlexContainer,  
        }}
        
      >
        {categoriesList &&
          categoriesList.map((category, index) => {
            return (
              <Tab
                label={category}
                key={index}
                className={styles.tab} 
                classes={{ selected: styles.tabSelected }}
                
              />
            );
          })}
      </Tabs>
    </>
  );
};

export default CategoriesNav;
