import React, { useEffect, useState } from "react";
import "./App.scss";
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
    <div className="App">
      <header className="App-header">
        <h2>My Smoothie Recipes</h2>
      </header>
      <RecipesList recipes={recipes} />
    </div>
  );
}

export default App;
