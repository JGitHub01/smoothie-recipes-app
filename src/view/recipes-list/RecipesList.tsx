import { NoEncryptionTwoTone } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { putRecipe } from "../../lib/local-storage-service";
//import { putRecipe } from "../../lib/api-service";
import { IRecipe } from "../../lib/model";
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
  onCancelCreate?: () => void;
}
export function RecipesList({
  recipes = [],
  isCreative,
  onSave,
  onCancelCreate,
}: RecipesListProps) {
  const classes = useStyles();
  const expandedRecipe = recipes.length > 0 ? recipes[0].name : "";
  return (
    <>
      <div className={isCreative ? "" : classes["not-creating"]}>
        <RecipeCard
          mode="CREATE"
          expanded
          recipe={{ id: "" }}
          onCancel={() => {
            onCancelCreate && onCancelCreate();
          }}
        />
      </div>
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
