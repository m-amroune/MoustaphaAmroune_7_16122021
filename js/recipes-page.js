import { RecipeCard } from "./recipe-card.js";
import { recipes } from "./recipes.js";
export class RecipesPage {
  constructor() {
    this.recipesContainer = document.querySelector("section");
    this.cards = [];
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];

    this.listIngredients = document.querySelector(".list-ingredients");
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
    // Event for open dropdowns tags
    this.DropdownsEvents = document
      .querySelectorAll(".btn-dropdown")
      .forEach((element) => {
        const type = element.dataset.type;
        const dropdown = document.querySelector(`.${type}-dropdown`);
        console.log(dropdown);
        dropdown.style.display = "none";
        element.addEventListener("click", () => {
          if (dropdown.classList.contains("show-list")) {
            this.smallInput();
            dropdown.style.display = "none";
            dropdown.classList.remove("show-list");
            dropdown.style.display = "none";
          } else {
            this.closeDropdowns();
            this.largeInput();
            dropdown.style.display = "grid";
            dropdown.classList.add("show-list");
          }
        });
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
          this.allIngredients = Array.from(new Set(this.allIngredients));
        });
      }
      if (type === this.appliance) {
        this.allAppliances.push(recipe.appliance);
        this.allAppliances = Array.from(new Set(this.allAppliances));
      }
      if (type === this.ustensils) {
        recipe.ustensils.forEach((ustensil) => {
          this.allUstensils.push(ustensil);
          this.allUstensils = Array.from(new Set(this.allUstensils));
        });
      }
    });
  }

  displayDropdownContent(array, id) {
    let ul = document.getElementById(id);
    array.forEach((element) => {
      const dropdownTags = document.createElement("li");
      dropdownTags.textContent = `${element}`;
      dropdownTags.classList.add("tags");
      ul.appendChild(dropdownTags);
    });
  }

  closeDropdowns() {
    const openDropdowns = document.querySelectorAll(".show-list");
    openDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show-list");
    });
  }

  largeInput() {
    document.querySelectorAll(".dropdown-width").forEach((element) => {
      const type = element.dataset.type;
      const input = document.querySelector(`.${type}-input`);
      input.style.width = "600px";
      input.style.borderRadius = "0";
    });
  }
  smallInput() {
    document.querySelectorAll(".dropdown-width").forEach((element) => {
      const type = element.dataset.type;
      const input = document.querySelector(`.${type}-input`);
      input.style.width = "170px";
    });
  }
}
