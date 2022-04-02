import {
  Button,
  List,
  ListItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Recipe } from "../../lib/model";
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

type RecipeMode = "display" | "edit";
interface IRecipeCardProps extends Recipe {
  mode?: RecipeMode;
  expanded?: boolean;
  onSave?: (recipe: Recipe) => void;
}
export function RecipeCard(props: IRecipeCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(props.expanded);
  const [recipe, setRecipe, mode, editButton, saveButton, cancelButton] =
    useRecipeModes(
      props.mode ?? "display",
      {
        id: props.id,
        name: props.name,
        ingredients: [...props.ingredients],
      },
      props.onSave,
    );
  const { name, ingredients } = recipe;
  useEffect(() => {
    setRecipe({
      id: props.id,
      name: props.name,
      ingredients: props.ingredients,
    });
  }, [props.id, props.name, props.ingredients]);
  return (
    <Accordion
      square
      expanded={expanded}
      onChange={(e, isExpanded) => {
        setExpanded(isExpanded);
      }}
    >
      <AccordionSummary aria-controls={`${name}-content`} id={`${name}-header`}>
        <Typography variant="h6">{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List className={classes["ingredients-list"]}>
          {ingredients?.map(({ name, quantity }, ingredientIdx) => (
            <ListItem key={ingredientIdx} className={classes.ingredient}>
              {mode === "display" ? (
                <Typography className={classes.quantity}>{quantity}</Typography>
              ) : (
                <TextField
                  className={classes.quantity}
                  variant="standard"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => {
                    setRecipe({
                      ...recipe,
                      ingredients: ingredients.map(
                        ({ name, quantity }, idx) => {
                          return idx === ingredientIdx
                            ? { name, quantity: e.target.value }
                            : { name, quantity };
                        },
                      ),
                    });
                  }}
                />
              )}
              <Typography className={classes.name}>{name}</Typography>
            </ListItem>
          ))}
        </List>
        {mode === "display" ? (
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
  initRecipe: Recipe,
  onSave?: (recipe: Recipe) => void,
): [
  recipe: Recipe,
  setRecipe: (recipe: Recipe) => void,
  mode: "display" | "edit",
  editButton: JSX.Element,
  saveButton: JSX.Element,
  cancelButton: JSX.Element,
] {
  const [mode, setMode] = useState<RecipeMode>(initMode);
  const [recipe, setRecipe] = useState<Recipe>(initRecipe);
  const switchMode = () => {
    setMode(mode === "display" ? "edit" : "display");
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
      onClick={() => {
        switchMode();
        setRecipe(initRecipe);
        onSave && onSave(recipe);
      }}
    >
      Save
    </Button>
  );
  const cancelButton = (
    <Button
      onClick={() => {
        switchMode();
        setRecipe(initRecipe);
      }}
    >
      Cancel
    </Button>
  );

  return [recipe, setRecipe, mode, editButton, saveButton, cancelButton];
}
