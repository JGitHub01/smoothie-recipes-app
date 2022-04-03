import { putRecipe } from "../../lib/local-storage-service";
//import { putRecipe } from "../../lib/api-service";
import { IRecipe } from "../../lib/model";
import { RecipeCard } from "./RecipeCard";

interface RecipesListProps {
  recipes: IRecipe[];
  onSave?: (status: { success: boolean }) => void;
}
export function RecipesList({ recipes = [], onSave }: RecipesListProps) {
  const expandedRecipe = recipes.length > 0 ? recipes[0].name : "";
  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          expanded={expandedRecipe === recipe.name}
          recipe={recipe}
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
