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
    if (categoryName && categoriesList) {
      const idxActivCat = categoriesList.indexOf(categoryName);

      if (idxActivCat === -1) {
        return setValue(0);
      } else {
        return setValue(idxActivCat);
      }
    }
  }, [categoryName, categoriesList]);

  return (
    <>
      {error && <p>Something went wrong with category nav.. try again</p>}

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          marginTop: `20px`,
          borderBottom: "1px solid #E0E0E0",

          "& .MuiTabs-indicator": {
            backgroundColor: `#8BAA36`,
            marginTop: `100`,
          },

          "& .MuiTab-root": {
            outline: `none`,
          },
          "& .MuiButtonBase-root": {
            padding: "10px 10px 32px 10px",
          },
          "& .MuiTabs-flexContainer": {
            gap: "28px",
          },
        }}
      >
        {categoriesList &&
          categoriesList.map((cat, idx) => {
            return (
              <Tab
                label={cat}
                key={idx}
                sx={{
                  padding: "0",
                  fontSize: "14px",
                  lineHeight: "14px",
                  color: "#E0E0E0",
                  "&.Mui-selected": {
                    color: "#8BAA36",
                  },
                }}
              />
            );
          })}
      </Tabs>
    </>
  );
};

export default CategoriesNav;
