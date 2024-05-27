export interface Ing {
    id: string;
    selectedValue?: string;
    selectedUnit: string;
  }
  
  export interface IngredientData {
    _id: string;
    ttl: string;
    thb: string;
    t: string;
    desc: string;
  }

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