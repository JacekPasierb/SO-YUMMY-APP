import axios from "axios";

export const fetchAllCategories = async () => {
  const { data } = await axios.get(`./api/recipes/category-list`);
  return data;
};
