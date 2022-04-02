import { Recipe, RecipesFilter } from "./model";

export async function getRecipes(
  filter?: RecipesFilter,
): Promise<{ recipes: Recipe[] }> {
  const jsonStr = localStorage.getItem("recipes");
  if (jsonStr == null) {
    return Promise.resolve({ recipes: [] });
  }
  const recipes = JSON.parse(jsonStr) as Recipe[];
  const name = filter?.name;
  if (name) {
    return {
      recipes: recipes.filter(
        (recipe) => recipe.name.search(new RegExp(name, "i")) > -1,
      ),
    };
  }

  return { recipes: recipes };
}

export async function putRecipe(recipe: Recipe) {
  const jsonStr = localStorage.getItem("recipes");
  const recipes: Recipe[] =
    jsonStr == null ? [] : (JSON.parse(jsonStr) as Recipe[]);
  const matchIdx = recipes.findIndex((r) => r.id === recipe.id);
  if (matchIdx === -1) {
    recipes.push(recipe);
  } else {
    recipes[matchIdx] = { ...recipes[matchIdx], ...recipe };
  }
  localStorage.setItem("recipes", JSON.stringify(recipes));

  return Promise.resolve(recipe);
}
