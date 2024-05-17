import axios from "axios";
export const addToFavorite = async (recipeId) => {
    console.log("recId", recipeId);
    const data = await axios.patch(`/api/favorite/add/${recipeId}`);
    console.log("data", data);
    return data;
};
export const removeFromFavorite = async () => {
    const data = await axios.delete("/api/favorite/remove");
    return data;
};
