import { putRecipe } from "../../lib/api-service";
import { Recipe } from "../../lib/model";
import { RecipeCard } from "./RecipeCard";

interface RecipesListProps {
  recipes: Recipe[];
  onSave?: (status: { success: boolean }) => void;
}
export function RecipesList({ recipes = [], onSave }: RecipesListProps) {
  const expandedRecipe = recipes.length > 0 ? recipes[0].name : "";
  return (
    <>
      {recipes.map(({ id, name, ingredients }) => (
        <RecipeCard
          key={id}
          expanded={expandedRecipe === name}
          id={id}
          name={name}
          ingredients={[...ingredients]}
          onSave={async (recipe) => {
            try {
              await putRecipe(recipe);
              onSave && onSave({ success: true });
            } catch (error) {
              console.log(error);
            }
          }}
        />
      ))}
    </>
  );
}
