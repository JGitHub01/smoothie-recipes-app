import { Recipe } from "../../lib/model";
export function RecipeCard({ name, ingredients }: Recipe) {
  return (
    <div className="recipe-card">
      <h3>{name}</h3>
      <div className="recipe-card__content">
        <h4>Ingredients</h4>
        <span>{ingredients.map(({ name }) => name).toString()}</span>
      </div>
    </div>
  );
}
