import { Recipe } from "../../lib/model";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { List, ListItem } from "@material-ui/core";

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

export function RecipesList({ recipes = [] }: { recipes: Recipe[] }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(
    recipes.length > 0 ? recipes[0].name : "",
  );
  return (
    <div className="recipes-panel__list">
      {recipes.map(({ name, ingredients }) => (
        <Accordion
          key={name}
          square
          expanded={expanded === name}
          onChange={(e, newExpanded) => {
            setExpanded(newExpanded ? name : "");
          }}
        >
          <AccordionSummary
            aria-controls={`${name}-content`}
            id={`${name}-header`}
          >
            <Typography variant="h5">{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes["ingredients-list"]}>
              {ingredients.map(({ name, quantity }) => (
                <ListItem className={classes.ingredient}>
                  <Typography className={classes.quantity}>
                    {quantity}
                  </Typography>
                  <Typography className={classes.name}>{name}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
