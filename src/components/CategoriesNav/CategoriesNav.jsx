import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./CategoriesNav.module.css";
import { useNavigate, useParams } from "react-router";

const CategoriesNav = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [value, setValue] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(`./api/recipes/category-list`);
      setCategoriesList(data.data.catArr);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (categoriesList.length > 0) {
      if (categoryName ) {
        const idxActivCat = categoriesList.findIndex(
          (cat) => cat.toLowerCase() === categoryName.toLowerCase()
        );
        if (idxActivCat !== -1) {
          setValue(idxActivCat);
        }
      } else {
        setValue(1);
        console.log("ccccccccc");
      }
    }
  }, [categoriesList, categoryName]);

  useEffect(() => {
    if (categoriesList.length > 0) {
      const activeCategory = categoriesList[value];
      navigate(
        `/categories/${
          activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
        }`
      );
    }
  }, [value]);

  return (
    <>
      <h2 className={css.sectionTitle}>Categories</h2>
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
        {categoriesList.map((cat, idx) => {
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
