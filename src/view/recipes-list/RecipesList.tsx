import { makeStyles } from "@material-ui/styles";
import { useRef, useEffect } from "react";
import { postRecipe, putRecipe } from "../../lib/local-storage-service";
//import { putRecipe } from "../../lib/api-service";
import { EmptyRecipe, IRecipe } from "../../lib/model";
import { RecipeCard } from "./RecipeCard";

const useStyles = makeStyles((theme) => ({
  "not-creating": {
    display: "none",
  },
}));
interface RecipesListProps {
  recipes: IRecipe[];
  isCreative?: boolean;
  onSave?: (status: { success: boolean }) => void;
  onCreateClose?: () => void;
}
export function RecipesList({
  recipes = [],
  isCreative,
  onSave,
  onCreateClose,
}: RecipesListProps) {
  const classes = useStyles();
  const createRef = useRef<HTMLDivElement>(null);
  //const expandedRecipe = recipes.length > 0 ? recipes[0].name : "";
  useEffect(() => {
    if (isCreative) {
      createRef.current?.scrollIntoView();
    }
  }, [isCreative]);
  return (
    <>
      <div
        ref={createRef}
        className={isCreative ? "" : classes["not-creating"]}
      >
        <RecipeCard
          mode="CREATE"
          expanded
          recipe={EmptyRecipe}
          onCreateClose={() => {
            onCreateClose && onCreateClose();
          }}
          onSave={async (recipe) => {
            try {
              await postRecipe(recipe);
              onSave && onSave({ success: true });
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
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
