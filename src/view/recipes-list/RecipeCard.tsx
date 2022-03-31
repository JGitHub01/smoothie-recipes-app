import { Recipe } from "../../lib/model";
import "./recipe-card.scss";

export function RecipeCard({ name, ingredients }: Recipe) {
  return (
    <div className="recipe-card">
      <h3>{name}</h3>
      <div className="recipe-card__content">
        <strong className="recipe-card__content__label">Ingredients:</strong>
        <span>{ingredients.map(({ name }) => name).toString()}</span>
      </div>
    </div>
  );
}
