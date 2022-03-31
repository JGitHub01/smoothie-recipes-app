import { Recipe } from "../../lib/model";
import { RecipeCard } from "./RecipeCard";

export function RecipesList({ recipes = [] }: { recipes: Recipe[] }) {
  return (
    <div className="recipes-panel__list">
      {recipes.map(({ name, ingredients }) => (
        <RecipeCard key={name} name={name} ingredients={ingredients} />
      ))}
    </div>
  );
}
