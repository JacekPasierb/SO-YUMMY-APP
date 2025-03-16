import axios from "axios";
import i18next from "i18next";

export const fetchRecipesByFourCategories = async (count = 1) => {
  const lang = i18next.language || "pl";
  const { data } = await axios.get(`./api/recipes/main-page?count=${count}&lang=${lang}`);
  return data;
};

// export const fetchRecipesByCategoryName = async (category,page)=>{
//     const {data} = await axios.get(`./api/recipes/categories/${category}?page=${page}&limit=8`);
//     return data;
// }

export const fetchRecipeById = async (id: string) => {
  const { data } = await axios.get(`./api/recipes/${id}`);
  return data;
};

export const fetchPopularRecipe = async (count = 4) => {
  const { data } = await axios.get(`./api/popularRecipes?count=${count}`);
  return data;
};
