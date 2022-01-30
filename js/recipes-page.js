import { RecipeCard } from "./recipe-card.js";
import { recipes } from "./recipes.js";
export class RecipesPage {
  constructor() {
    this.recipesContainer = document.querySelector("section");
    this.cards = [];
    this.allIngredients = [];
    console.log(this.allIngredients);
    this.allAppliances = [];
    console.log(this.allAppliances);
    this.allUstensils = [];
    console.log(this.allUstensils);

    this.listIngredients = document.querySelector(".list-ingredients");
    console.log(this.cards);
    this.searchBar = document.querySelector(".search-bar");
    this.dropdownContent(this.type);

    this.getCreateCards();
    // display elements in dropdowns
    this.displayDropdownContent(this.allIngredients, "ingredients");
    this.displayDropdownContent(this.allAppliances, "appliances");
    this.displayDropdownContent(this.allUstensils, "ustensils");

    this.searchBar.addEventListener("keyup", (event) => {
      this.enteredLetters = event.target.value;
      // console.log(this.enteredLetters);
      if (this.enteredLetters.length < 3) {
        this.displayRecipes();
      } else {
        this.newDisplayRecipes(this.filteredRecipes(this.enteredLetters));
      }
    });
  }
  getCreateCards() {
    for (let recipe of recipes) {
      let card = new RecipeCard(
        recipe.name,
        recipe.time,
        recipe.ingredients,
        recipe.description
      );
      this.cards.push(card);
    }
  }

  displayRecipes() {
    this.cards.forEach((recipe) => {
      this.recipesContainer.appendChild(recipe.displayCard());
    });
  }

  newDisplayRecipes(array) {
    console.log(array);
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

    return resultat;
  }

  dropdownContent(type) {
    recipes.forEach((recipe) => {
      if (type === this.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          this.allIngredients.push(ingredient.ingredient);
        });
      }
      if (type === this.appliance) {
        this.allAppliances.push(recipe.appliance);
      }
      if (type === this.ustensils) {
        recipe.ustensils.forEach((ustensil) => {
          this.allUstensils.push(ustensil);
        });
      }
    });
  }

  displayDropdownContent(array, id) {
    let ul = document.getElementById(id);
    array.forEach((element) => {
      ul.innerHTML += `
      <li class="tags-dropdown">${element}</li>`;
    });
  }
}
