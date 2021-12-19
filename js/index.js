import { RecipeCard } from "./recipeCard.js";
import { recipes } from "./recipes.js";

const recipesPage = document.querySelector("section");
const cards = [];

for (let recipe of recipes) {
  let card = new RecipeCard(
    recipe.name,
    recipe.time,
    recipe.ingredients,
    recipe.description
  );
  cards.push(card);
}

cards.forEach((recipe) => {
  recipesPage.appendChild(recipe.displayCard());
});
