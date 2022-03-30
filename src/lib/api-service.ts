import { Recipe } from "./model";

export async function getRecipes(): Promise<{ recipes: Recipe[] }> {
  const rsps = await fetch("/api/recipes", {
    method: "GET",
  });
  const recipes = (await rsps.json()) as Promise<{ recipes: Recipe[] }>;

  return recipes;
}
