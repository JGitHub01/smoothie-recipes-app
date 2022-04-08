import { Button, Icon, InputAdornment, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import "./app.scss";
import { getRecipes } from "./lib/local-storage-service";
//import { getRecipes } from "./lib/api-service";
import { debounceTimer } from "./lib/debounceTimer";
import { IRecipe } from "./lib/model";
import { RecipesList } from "./view/recipes-list/RecipesList";

function App() {
  const [recipes, keyword, search] = useSearch();
  const [isCreative, setIsCreative] = useState(false);
  useEffect(() => {
    search();
  }, [search]);
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIsCreative(true);
              }}
            >
              New Recipe
            </Button>
          </div>
          <div className="recipes-panel__list">
            <RecipesList
              isCreative={isCreative}
              recipes={recipes}
              onSave={(status) => {
                search();
              }}
              onCreateClose={() => {
                setIsCreative(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function useSearch(): [
  recipes: IRecipe[],
  keyword: string,
  search: (keyword?: string, delay?: number) => void,
] {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const search = useCallback(async (keyword?: string, delay?: number) => {
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
  }, []);
  return [recipes, keyword, search];
}
export default App;
