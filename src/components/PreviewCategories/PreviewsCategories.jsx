import React, { useEffect, useState } from "react";
import css from "./PreviewsCategories.module.css";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";

const PreviewsCategories = () => {
  const [recipesByMainCategory, setRecipesByMainCategory] = useState("");

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesctop = useMediaQuery("(min-width:1200px)");

  useEffect(() => {
    let count;
    if (isDesctop) {
      count = 4;
    } else if (isTablet) {
      count = 2;
    } else {
      count = 1;
    }

    const getRecipeByFourCategory = async () => {
      const {data} = await axios.get(`./api/recipes?count=${count}`);

      setRecipesByMainCategory(data);
      
    };
    getRecipeByFourCategory();
   
  }, [isDesctop, isTablet]);
  console.log("to", recipesByMainCategory);
  return <>{recipesByMainCategory && <p>ppp</p>}</>;
};

export default PreviewsCategories;
