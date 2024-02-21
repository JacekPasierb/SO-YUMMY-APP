import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import css from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(`./api/recipes/category-list`);
      setCategories(data.data.catArr);
    };
    getCategories();
  }, []);

  return (
    <>
      <div className={`${css.container} `}>
        <h2>CategoriesPage</h2>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
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
              padding: "10px",
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
      </div>
    </>
  );
};

export default CategoriesPage;
