import {
  Button,
  List,
  ListItem,
  makeStyles,
  TextField,
  Icon,
  IconButton,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { IRecipe, IIngredient } from "../../lib/model";
import "./recipe-card.scss";
import { useEffect, useState } from "react";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  "ingredients-list": {
    width: "100%",
  },
  "new-recipe-name": {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ingredient: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    flex: 1,
    textAlign: "right",
    paddingRight: "16px",
  },

  name: {
    flex: 2,
  },
}));

type RecipeMode = "DISPLAY" | "EDIT" | "CREATE";
interface IRecipeCardProps {
  recipe: IRecipe;
  mode?: RecipeMode;
  expanded?: boolean;
  onSave?: (recipe: IRecipe) => void;
  onCancel?: () => void;
}
export function RecipeCard(props: IRecipeCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(props.expanded);
  const [recipe, setRecipe, mode, editButton, saveButton, cancelButton] =
    useRecipeModes(
      props.mode ?? "DISPLAY",
      props.recipe,
      props.onSave,
      props.onCancel,
    );
  const { name, ingredients } = recipe;
  useEffect(() => {
    setRecipe(props.recipe);
  }, [props.recipe]);
  return (
    <Accordion
      square
      expanded={expanded}
      onChange={(e, isExpanded) => {
        setExpanded(isExpanded);
      }}
    >
      <AccordionSummary aria-controls={`${name}-content`} id={`${name}-header`}>
        {mode === "CREATE" ? (
          <TextField
            className={classes["new-recipe-name"]}
            placeholder="New recipe name"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setRecipe({ ...recipe, name: e.target.value });
            }}
          />
        ) : (
          <Typography variant="h6">{name}</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <List className={classes["ingredients-list"]}>
          {mode === "EDIT" || mode === "CREATE" ? (
            <ListItem className={classes.ingredient}>
              <IngredientEdit
                isNew
                onAdd={(ingredient) => {
                  setRecipe({
                    ...recipe,
                    ingredients: [ingredient, ...(ingredients ?? [])],
                  });
                }}
              />
            </ListItem>
          ) : undefined}
          {ingredients?.map(({ name, quantity }, ingredientIdx) => (
            <ListItem key={ingredientIdx} className={classes.ingredient}>
              {mode === "DISPLAY" ? (
                <IngredientDisplay name={name} quantity={quantity} />
              ) : (
                <IngredientEdit
                  name={name}
                  quantity={quantity}
                  onQuantityChange={(newQuantity) => {
                    setRecipe({
                      ...recipe,
                      ingredients: ingredients.map(
                        ({ name, quantity }, idx) => {
                          return idx === ingredientIdx
                            ? { name, quantity: newQuantity }
                            : { name, quantity };
                        },
                      ),
                    });
                  }}
                  onNameChange={(newName) => {
                    setRecipe({
                      ...recipe,
                      ingredients: ingredients.map(
                        ({ name, quantity }, idx) => {
                          return idx === ingredientIdx
                            ? { name: newName, quantity }
                            : { name, quantity };
                        },
                      ),
                    });
                  }}
                  onRemove={() => {
                    const newIngredients = [...ingredients];
                    newIngredients.splice(ingredientIdx, 1);
                    setRecipe({
                      ...recipe,
                      ingredients: newIngredients,
                    });
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
        {mode === "DISPLAY" ? (
          editButton
        ) : (
          <div>
            {saveButton}
            {cancelButton}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

function useRecipeModes(
  initMode: RecipeMode,
  initRecipe: IRecipe,
  onSave?: (recipe: IRecipe) => void,
  onCancel?: () => void,
): [
  recipe: IRecipe,
  setRecipe: (recipe: IRecipe) => void,
  mode: RecipeMode,
  editButton: JSX.Element,
  saveButton: JSX.Element,
  cancelButton: JSX.Element,
] {
  const [mode, setMode] = useState<RecipeMode>(initMode);
  const [recipe, setRecipe] = useState<IRecipe>(initRecipe);
  const switchMode = () => {
    setMode(mode === "DISPLAY" ? "EDIT" : "DISPLAY");
  };
  const editButton = (
    <Button
      onClick={() => {
        switchMode();
      }}
    >
      Edit
    </Button>
  );
  const saveButton = (
    <Button
      disabled={mode === "CREATE" && (!recipe.name || !recipe.ingredients)}
      onClick={() => {
        switchMode();
        setRecipe(initRecipe);
        onSave && onSave(recipe);
      }}
    >
      {mode === "CREATE" ? "Create" : "Save"}
    </Button>
  );
  const cancelButton = (
    <Button
      onClick={() => {
        if (mode === "CREATE") {
          onCancel && onCancel();
        } else {
          switchMode();
          setRecipe(initRecipe);
        }
      }}
    >
      Cancel
    </Button>
  );

  return [recipe, setRecipe, mode, editButton, saveButton, cancelButton];
}

function IngredientDisplay({ name, quantity }: IIngredient) {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.quantity}>{quantity}</Typography>
      <Typography className={classes.name}>{name}</Typography>
    </>
  );
}

interface IIngredientEditProps extends IIngredient {
  isNew?: boolean;
  onQuantityChange?: (quantity: string) => void;
  onNameChange?: (name: string) => void;
  onAdd?: (ingredient: IIngredient) => void;
  onRemove?: () => void;
}
function IngredientEdit({
  name,
  quantity,
  isNew,
  onQuantityChange,
  onNameChange,
  onAdd,
  onRemove,
}: IIngredientEditProps) {
  const classes = useStyles();
  const [ingredient, setIngredient] = useState<IIngredient>({
    name: "",
    quantity: "",
  });
  return (
    <>
      <TextField
        className={classes.quantity}
        variant="standard"
        placeholder="Quantity"
        value={isNew ? ingredient.quantity : quantity}
        onChange={(e) => {
          isNew
            ? setIngredient({ ...ingredient, quantity: e.target.value })
            : onQuantityChange && onQuantityChange(e.target.value);
        }}
      />
      <TextField
        className={classes.name}
        variant="standard"
        placeholder="Ingredient"
        value={isNew ? ingredient.name : name}
        onChange={(e) => {
          isNew
            ? setIngredient({ ...ingredient, name: e.target.value })
            : onNameChange && onNameChange(e.target.value);
        }}
      />
      {isNew ? (
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() => {
            setIngredient({ name: "", quantity: "" });
            onAdd && onAdd(ingredient);
          }}
        >
          <Icon>add_circle</Icon>
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          aria-label="delete"
          onClick={() => {
            onRemove && onRemove();
          }}
        >
          <Icon>delete</Icon>
        </IconButton>
      )}
    </>
  );
}
