import { RecipeCard } from "./recipe-card.js";
import { recipes } from "./recipes.js";
export class RecipesPage {
  constructor() {
    this.recipesContainer = document.querySelector("section");
    this.cards = [];
    this.searchBar = document.querySelector(".search-bar");

    this.searchBar.addEventListener("keyup", (event) => {
      const enteredLetters = event.target.value;
      if (enteredLetters < 3) {
        this.displayRecipes();
      } else {
        // this.removeAllRecipes();
        // this.filteredRecipes();
      }
    });
  }

  displayRecipes() {
    for (let recipe of recipes) {
      let card = new RecipeCard(
        recipe.name,
        recipe.time,
        recipe.ingredients,
        recipe.description
      );
      this.cards.push(card);
    }

    this.cards.forEach((recipe) => {
      this.recipesContainer.appendChild(recipe.displayCard());
    });
  }

  filteredRecipes() {
    this.displayRecipes(this.enteredLetters);
  }
  removeAllRecipes() {
    const allRecipes = document.querySelectorAll("article");
    for (let recipes of allRecipes) {
      this.recipesContainer.removeChild(recipes);
    }
  }
}
