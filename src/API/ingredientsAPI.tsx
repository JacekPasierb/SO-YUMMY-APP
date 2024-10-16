import axios from "axios";



export const fetchAllIngredients = async () => {
  const { data } = await axios.get(`./api/ingredients`);
  return data;
};

export const fetchIngredientsById = async (id: string) => {
  console.log("rrrrr",id);
  const { data } = await axios.get(`./api/ingredients/${id}`);
  
  return data;
};
