import axios from "axios";

export const fetchAllCategories = async () => {
  const { data } = await axios.get(`./api/recipe/category-list`);
  return data;
};
