import { Recipe } from "../../lib/model";
import { RecipeCard } from "./RecipeCard";
import "./RecipesList.scss";

export function RecipesList({ recipes = [] }: { recipes: Recipe[] }) {
  return (
    <div className="recipes-list">
      {recipes.map(({ name, ingredients }) => (
        <RecipeCard key={name} name={name} ingredients={ingredients} />
      ))}
    </div>
  );
}
