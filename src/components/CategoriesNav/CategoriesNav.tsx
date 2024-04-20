import { Tab, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import css from "./CategoriesNav.module.css";

import { fetchAllCategories } from "../../API/categoriesAPI";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  title: string;
}

const CategoriesNav = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [value, setValue] = useState(0);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(`/categories/${categoriesList[newValue]}`);
    setValue(newValue);
  };

  useEffect(() => {
    console.log("RLO");

    const getAllCategories = async () => {
      try {
        const { data } = await fetchAllCategories();
        console.log("data", data);

        await setCategoriesList(data.catArr);
        console.log("S", categoriesList);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, [categoryName]);

  useEffect(() => {
    if (categoryName && categoriesList) {
      console.log("catName", categoryName);
      console.log("categortLis", categoriesList);

      const idxActivCat = categoriesList.findIndex(
        (cat) => console.log("popo",cat)
        
        // (cat) => cat.title.toLowerCase() === categoryName.toLowerCase()
      );
      console.log("idx", idxActivCat);

      if (idxActivCat === -1) {
        return setValue(0);
      } else {
        return setValue(idxActivCat);
      }
    }
  }, [categoryName, categoriesList]);

  return (
    <>
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
                label={cat.title}
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
