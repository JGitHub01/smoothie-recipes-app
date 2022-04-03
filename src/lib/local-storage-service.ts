import { IRecipe, IRecipesFilter } from "./model";

export async function getRecipes(
  filter?: IRecipesFilter,
): Promise<{ recipes: IRecipe[] }> {
  const jsonStr = localStorage.getItem("recipes");
  if (jsonStr == null) {
    return Promise.resolve({ recipes: [] });
  }
  const recipes = JSON.parse(jsonStr) as IRecipe[];
  const name = filter?.name;
  if (name) {
    return {
      recipes: recipes.filter(
        (recipe) =>
          recipe.name && recipe.name.search(new RegExp(name, "i")) > -1,
      ),
    };
  }

  return { recipes: recipes };
}

export async function putRecipe(recipe: IRecipe) {
  const jsonStr = localStorage.getItem("recipes");
  const recipes: IRecipe[] =
    jsonStr == null ? [] : (JSON.parse(jsonStr) as IRecipe[]);
  const matchIdx = recipes.findIndex((r) => r.id === recipe.id);
  if (matchIdx === -1) {
    recipes.push(recipe);
  } else {
    recipes[matchIdx] = { ...recipes[matchIdx], ...recipe };
  }
  localStorage.setItem("recipes", JSON.stringify(recipes));

  return Promise.resolve(recipe);
}
