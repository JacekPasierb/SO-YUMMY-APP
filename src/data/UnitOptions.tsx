
import { TFunction } from "i18next";
import { Option } from "../types/ingredientsTypes";

export const getUnitOptions = (t: TFunction): Option[] => [
  { value:t("units.tbs"), label: t("units.tbs") },
  { value: t("units.tsp"), label: t("units.tsp") },
  { value:  t("units.kg"), label: t("units.kg") },
  { value:  t("units.g"), label: t("units.g") },
  { value: t("units.pcs"), label: t("units.pcs") },
  { value: t("units.l"), label: t("units.l") },
  { value:t("units.ml"), label: t("units.ml") },
];
