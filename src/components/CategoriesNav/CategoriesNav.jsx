import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./CategoriesNav.module.css";
import { useNavigate } from "react-router";

const CategoriesNav = () => {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(`./api/recipes/category-list`);
      setCategories(data.data.catArr);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const activeCategory = categories[value];
      console.log("va", activeCategory);
      navigate(`/categories/${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`);
  
    }
  }, [categories, navigate, value]);

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
        {categories.map((cat, idx) => {
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
