import { Recipe, RecipesFilter } from "./model";

const baseUrl = window.location.href;
export async function getRecipes(
  filter?: RecipesFilter,
): Promise<{ recipes: Recipe[] }> {
  const url = new URL("/api/recipes", baseUrl);
  filter && url.searchParams.append("name", filter.name ?? "");
  const rsps = await fetch(url.toString(), {
    method: "GET",
  });
  const recipes = (await rsps.json()) as Promise<{ recipes: Recipe[] }>;

  return recipes;
}

export async function putRecipe(recipe: Recipe) {
  const url = new URL(`/api/recipe:${recipe.id}`, baseUrl);
  const rsps = await fetch(url.toString(), {
    method: "PUT",
    body: JSON.stringify(recipe),
  });
  return await rsps.json();
}
