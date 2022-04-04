import { IRecipe, IRecipesFilter } from "./model";
import { v4 as uuidv4 } from "uuid";

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

export async function postRecipe(recipe: IRecipe) {
  const jsonStr = localStorage.getItem("recipes");
  const recipes: IRecipe[] =
    jsonStr == null ? [] : (JSON.parse(jsonStr) as IRecipe[]);
  if (!recipe.name) {
    return Promise.reject("Error: recipe name is empty!");
  }
  if (isRecipeNameAvailable(recipes, recipe.name)) {
    recipe.id = uuidv4();
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    return Promise.resolve(recipe);
  } else {
    return Promise.reject("Error: duplicate recipe name!");
  }
}

export async function checkRecipeNameAvailability(name: string) {
  const jsonStr = localStorage.getItem("recipes");
  const recipes: IRecipe[] =
    jsonStr == null ? [] : (JSON.parse(jsonStr) as IRecipe[]);
  return Promise.resolve(isRecipeNameAvailable(recipes, name));
}

function isRecipeNameAvailable(recipes: IRecipe[], name: string) {
  const matchIdx = recipes.findIndex(
    (r) => r.name?.toLowerCase() === name.toLocaleLowerCase(),
  );
  return matchIdx === -1;
}
