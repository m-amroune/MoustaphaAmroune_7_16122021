import { RecipeCard } from "./recipe-card.js";
import { recipes } from "./recipes.js";
export class RecipesPage {
  constructor() {
    this.recipesContainer = document.querySelector("section");
    this.cards = [];
    console.log(this.cards);
    this.searchBar = document.querySelector(".search-bar");

    this.searchBar.addEventListener("keyup", (event) => {
      this.enteredLetters = event.target.value;
      console.log(this.enteredLetters);
      if (this.enteredLetters.length < 3) {
        this.displayRecipes();
      } else {
        this.newDisplayRecipes(this.filteredRecipes(this.enteredLetters));
        console.log(this.cards);
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
    this.cards.splice(50, this.cards.length);
    this.cards.forEach((recipe) => {
      this.recipesContainer.appendChild(recipe.displayCard());
    });
  }

  newDisplayRecipes(array) {
    this.recipesContainer.innerHTML = "";
    array.forEach((recipe) => {
      this.recipesContainer.appendChild(recipe.displayCard());
    });
  }

  filteredRecipes(letters) {
    let resultat = [];
    this.cards.forEach((recipe) => {
      let recipeName = recipe.name;
      let recipeDescription = recipe.description;
      let recipeIngredients = recipe.ingredients;

      if (
        recipeName.toLowerCase().includes(letters) ||
        recipeDescription.toLowerCase().includes(letters) ||
        recipeIngredients.forEach((ingredient) => {
          let recipeIngredientName = ingredient.ingredient;
          recipeIngredientName.toLowerCase().includes(letters);
        })
      ) {
        resultat.push(recipe);
      }
    });
    console.log(resultat);
    console.log(this.cards);
    return resultat;
  }
}
