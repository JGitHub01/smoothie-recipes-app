import { createServer, Factory, Model } from "miragejs";
import recipesData from "./recipes-data.json";
import { Recipe } from "./model";

export default function createMockedServer(type = "local-storage") {
  return type === "local-storage"
    ? createLocalStorageServer()
    : createMirageServer();
}

function createLocalStorageServer() {
  const jsonStr = localStorage.getItem("recipes");
  if (jsonStr == null) {
    localStorage.setItem("recipes", JSON.stringify(recipesData as Recipe[]));
  }
}

function createMirageServer() {
  return createServer({
    environment: "development",
    models: {
      recipe: Model,
    },
    factories: {
      recipe: Factory.extend({
        id: "1",
        name: "smoothie-1",
        ingredients: [{ name: "ingredient-1", quantity: "1 tsp" }],
      }),
    },

    routes() {
      this.namespace = "api";

      this.get("/recipes", (schema, request) => {
        const name = request.queryParams["name"];
        return name
          ? schema.where<"recipe">(
              "recipe",
              (recipe: Recipe) =>
                recipe.name.search(new RegExp(name, "i")) > -1,
            )
          : schema.all("recipe");
      });

      this.patch("/recipe/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const recipe = schema.find<"recipe">("recipe", id);

        if (recipe) {
          recipe.update(attrs);
          return recipe;
        }

        return schema.create(attrs);
      });
    },

    seeds(server) {
      recipesData.forEach(({ name, ingredients }) => {
        server.schema.create("recipe", { name, ingredients });
      });
    },
  });
}
