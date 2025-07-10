
import { TFunction } from "i18next";
import { Option } from "../types/ingredientsTypes";

export const getUnitOptions = (t: TFunction): Option[] => [
  { value: "tbs", label: t("units.tbs") },
  { value: "tsp", label: t("units.tsp") },
  { value: "kg", label: t("units.kg") },
  { value: "g", label: t("units.g") },
  { value: "pcs", label: t("units.pcs") },
  { value: "l", label: t("units.l") },
  { value: "ml", label: t("units.ml") },
];
