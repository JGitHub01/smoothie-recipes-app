import React, { useEffect, useState } from "react";
import "./app.scss";
import { getRecipes } from "./lib/api-service";
import { Recipe } from "./lib/model";
import { RecipesList } from "./view/recipes-list/RecipesList";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    getRecipes().then(({ recipes }) => {
      setRecipes(recipes);
    });
  }, []);
  return (
    <div className="app-light-theme">
      <header className="app-header">
        <h2>My Smoothie Recipes</h2>
      </header>
      <div className="app-body">
        <div className="recipes-panel">
          <input
            className="recipes-panel__filter"
            type="text"
            placeholder="fitler by name"
          />
          <RecipesList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default App;
