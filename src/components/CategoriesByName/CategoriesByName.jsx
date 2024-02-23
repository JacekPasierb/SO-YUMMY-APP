import React from "react";
import { useParams } from "react-router";

const CategoriesByName = () => {
  const { categoryName } = useParams();
  return <div>CategoriesByName</div>;
};

export default CategoriesByName;
