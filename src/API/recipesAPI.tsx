import axios from "axios";

export const fetchRecipesByFourCategories = async (count = 1, lang = "pl") => {
  
  const { data } = await axios.get(`./api/recipes/main-page?count=${count}&lang=${lang}`);
  return data;
};



export const fetchRecipeById = async (id: string) => {
  const { data } = await axios.get(`./api/recipes/${id}`);
  return data;
};

export const fetchPopularRecipe = async (count = 4) => {
  const { data } = await axios.get(`./api/popularRecipes?count=${count}`);
  return data;
};
