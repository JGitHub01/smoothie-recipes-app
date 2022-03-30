import { createServer, Factory, Model } from "miragejs";
import recipesData from "./recipes-data.json";

export default function createMockedServer(env = "test") {
  return createServer({
    environment: env,
    models: {
      recipe: Model,
    },
    factories: {
      recipe: Factory.extend({
        name: "smoothie-1",
        ingredients: [{ name: "ingredient-1", quantity: "1 tsp" }],
      }),
    },

    routes() {
      this.namespace = "api";

      this.get("/recipes", (schema) => {
        return schema.all("recipe");
      });
    },

    seeds(server) {
      recipesData.forEach(({ name, ingredients }) => {
        server.schema.create("recipe", { name, ingredients });
      });
    },
  });
}
