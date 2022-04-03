export interface IRecipe {
  id: string;
  name: string;
  ingredients: IIngredient[];
}

export interface IIngredient {
  name?: string;
  quantity?: string;
}

export interface IRecipesFilter {
  name?: string;
}
