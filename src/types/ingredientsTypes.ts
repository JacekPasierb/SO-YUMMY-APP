export interface Ing {
  id: string;
  selectedValue: string;
  selectedUnit: string;
}
// Dla danych z API
export interface IngredientData {
  _id: string;
  ttl: string;
  thb: string;
  t: string;
  desc: string;
}

// Dla API
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
export interface FormIngredient {
  id:string;
  selectedValue: string;
  selectedUnit: string;
}
