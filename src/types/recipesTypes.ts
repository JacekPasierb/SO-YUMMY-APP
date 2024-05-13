export interface Recipe {
  _id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  preview: string;
  time: string;
  popularity: 0;
  favorites: [];
  likes: [];
  youtube: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
  owner?: string;
  ingredients: [];
}
