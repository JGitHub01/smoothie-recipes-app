export interface IRecipe {
  id: string;
  name?: string;
  ingredients?: IIngredient[];
}
export const EmptyRecipe: IRecipe = { id: "" };

export interface IIngredient {
  name?: string;
  quantity?: string;
}

export interface IRecipesFilter {
  name?: string;
}
