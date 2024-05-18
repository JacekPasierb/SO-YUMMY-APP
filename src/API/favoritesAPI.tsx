import axios from "axios";

export const addToFavorite = async (recipeId: string) => {
  const data = await axios.patch(`/api/favorite/add/${recipeId}`);
  return data;
};

export const removeFromFavorite = async (recipeId: string) => {
  const data = await axios.delete(`/api/favorite/remove/${recipeId}`);
  return data;
};
