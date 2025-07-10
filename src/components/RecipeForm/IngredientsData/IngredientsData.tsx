import React, {FC} from "react";
import {useTranslation} from "react-i18next";

import styles from "./IngredientsData.module.css";
import SubTitle from "../../SubTitle/SubTitle";
import Counter from "../Counter/Counter";
import IngredientsList from "../IngredientsList/IngredientsList";
import {IngredientCreate} from "../../../types/ingredientsTypes";

type Props = {
  ingredients: IngredientCreate[];
  updateField: (field: "ingredients", value: IngredientCreate[]) => void;
};

const IngredientsData: FC<Props> = ({ingredients, updateField}) => {
  const {t, i18n} = useTranslation();
  return (
    <div className={styles.ingredientsData}>
      <div className={styles.header}>
        <SubTitle title={t("ingredients")} />
        <Counter ingredients={ingredients} updateField={updateField} />
      </div>
      <IngredientsList ingredients={ingredients} updateField={updateField} />
    </div>
  );
};

export default IngredientsData;
