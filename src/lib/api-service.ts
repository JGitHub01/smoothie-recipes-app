import { IRecipe, IRecipesFilter } from "./model";

const baseUrl = window.location.href;
export async function getRecipes(
  filter?: IRecipesFilter,
): Promise<{ recipes: IRecipe[] }> {
  const url = new URL("/api/recipes", baseUrl);
  filter && url.searchParams.append("name", filter.name ?? "");
  const rsps = await fetch(url.toString(), {
    method: "GET",
  });
  const recipes = (await rsps.json()) as Promise<{ recipes: IRecipe[] }>;

  return recipes;
}

export async function putRecipe(recipe: IRecipe) {
  const url = new URL(`/api/recipe/${recipe.id}`, baseUrl);
  const rsps = await fetch(url.toString(), {
    method: "PATCH",
    body: JSON.stringify(recipe),
  });
  return await rsps.json();
}
