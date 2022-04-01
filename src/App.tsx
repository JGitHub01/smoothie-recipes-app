import { Button, Icon, InputAdornment, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./app.scss";
import { getRecipes } from "./lib/api-service";
import { debounceTimer } from "./lib/debounceTimer";
import { Recipe } from "./lib/model";
import { RecipesList } from "./view/recipes-list/RecipesList";

function App() {
  const [recipes, keyword, search] = useSearch();
  useEffect(() => {
    search();
  }, []);
  return (
    <div className="app-light-theme">
      <header className="app-header">
        <h2>My Smoothie Recipes</h2>
      </header>
      <div className="app-body">
        <div className="recipes-panel">
          <div className="recipes-panel__toolbar">
            <TextField
              variant="filled"
              label="Search"
              placeholder="By recipe name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              }}
              value={keyword}
              onChange={(event) => {
                search(event.target.value, 300);
              }}
            />
            <Button variant="outlined" color="primary">
              New Recipe
            </Button>
          </div>
          <div className="recipes-panel__list">
            <RecipesList recipes={recipes} />
          </div>
        </div>
      </div>
    </div>
  );
}

function useSearch(): [
  recipes: Recipe[],
  keyword: string,
  search: (keyword?: string, delay?: number) => void,
] {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const search = async (keyword?: string, delay?: number) => {
    setKeyword(keyword ?? "");
    if (delay === undefined || delay === 0) {
      const { recipes } = await getRecipes({ name: keyword });
      setRecipes(recipes);
    } else {
      debounceTimer(async () => {
        const { recipes } = await getRecipes({ name: keyword });
        setRecipes(recipes);
      }, delay);
    }
  };
  return [recipes, keyword, search];
}
export default App;
