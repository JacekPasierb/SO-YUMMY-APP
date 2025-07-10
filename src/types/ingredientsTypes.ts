export interface Ing {
  id: string;
  selectedValue: string;
  selectedUnit: string;
}
// Dla danych z API
export interface IngredientData {
  _id: string;
  ttl: string;
  ttlPl: string;
  thb: string;
  t: string;
  desc: string;
}

// Dla API (RecipePage pobieram przepis wg id i liste składnikow przekazuje do wyswietlenia w formie id:"sdfsdfdsf" i measure: "4 cups")
export interface Ingredient {
  id: string;
  measure: string;
}

export interface UnitInputProps {
  ingredients: Ing[];
  setIngredients: React.Dispatch<React.SetStateAction<Ing[]>>;
  index: number;
}

export interface Option {
  label: string;
  value: string;
}

// Dla formularza
// export interface FormIngredient {
//   id:string;
//   selectedValue: string;
//   selectedUnit: string;
// }

export type IngredientCreate = {
  id: string;
  name: string;
  amount: number;
  unit: string;
};
