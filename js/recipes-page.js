import { RecipeCard } from "./recipe-card.js";
import { recipes } from "./recipes.js";
export class RecipesPage {
  constructor() {
    this.recipesContainer = document.querySelector("section");
    this.cards = [];

    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];

    this.getCreateCards();

    this.searchBar = document.querySelector(".search-bar");
    this.dropdownContent(this.type);

    this.searchDropdowns = document.querySelectorAll(".dropdown-search");
    this.dropdownOpen();

    // display elements in dropdowns
    this.displayDropdownContent(this.allIngredients, "ingredients");
    this.displayDropdownContent(this.allAppliances, "appliances");
    this.displayDropdownContent(this.allUstensils, "ustensils");

    // EVENT ON INPUT : CREATION NEW ARRAY WITH FILTERED RECIPES BY INPUT

    this.searchBar.addEventListener("keyup", (event) => {
      this.enteredLetters = event.target.value;
      if (this.enteredLetters.length < 3) {
        this.displayRecipes();
      } else {
        this.testSearchByCategoryTag(
          this.cards,
          this.allIngredients,
          this.allAppliances,
          this.allUstensils,
          this.enteredLetters
        );
        this.newDisplayRecipes(this.filteredRecipes(this.enteredLetters));
      }
    });
    // Event for open dropdowns tags
    // this.DropdownsEvents = document
    //   .querySelectorAll(".btn-dropdown")
    //   .forEach((element) => {
    //     const type = element.dataset.type;
    //     const dropdown = document.querySelector(`.${type}-dropdown`);
    //     console.log(dropdown);
    //     dropdown.style.display = "none";
    //     element.addEventListener("click", () => {
    //       if (dropdown.classList.contains("show-list")) {
    //         this.smallInput();
    //         dropdown.style.display = "none";
    //         dropdown.classList.remove("show-list");
    //       } else {
    //         this.closeDropdowns();
    //         this.largeInput();
    //         dropdown.style.display = "grid";
    //         dropdown.classList.add("show-list");
    //       }
    //     });
    //   });

    this.selectedTags = document
      .querySelectorAll(".tags")
      .forEach((element) => {
        element.addEventListener("click", (e) => {
          element.remove();
        });
      });
  }

  dropdownOpen() {
    const dropdown = document.querySelectorAll(".dropdown-input");
    dropdown.forEach((input) => {
      let dropdownTags;
      input.addEventListener("focusin", function () {
        let nextElement = input;
        while (nextElement) {
          nextElement = nextElement.nextElementSibling;
          if (nextElement.classList.contains("dropdown-tags")) {
            nextElement.style.display = "grid";
            nextElement.style.width = "100px";
            input.style.width = "280px";
            input.style.borderRadius = "0";
            dropdownTags = nextElement;
            break;
          }
        }
      });
      input.addEventListener("focusout", function () {
        dropdownTags.style.display = "none";
        input.style.width = "170px";
      });
    });
  }

  getCreateCards() {
    for (let recipe of recipes) {
      let card = new RecipeCard(
        recipe.name,
        recipe.time,
        recipe.ingredients,
        recipe.description,
        recipe.appliance,
        recipe.ustensils
      );
      this.cards.push(card);
    }
  }

  // DISPLAYED RECIPES

  displayRecipes() {
    this.cards.forEach((recipe) => {
      this.recipesContainer.appendChild(recipe.displayCard());
    });
  }

  // NEW ARRAY

  newDisplayRecipes(array) {
    this.recipesContainer.innerHTML = "";
    array.forEach((recipe) => {
      this.recipesContainer.appendChild(recipe.displayCard());
    });
  }

  // FILTERED RECIPES BY INPUT

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

  // ADDED TAGS BY TYPE IN EACH ARRAY (ingredients, appliances, ustensils)

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
  // DISPLAY DROPDOWNS CONTENT BY ID
  displayDropdownContent(array, id) {
    let ul = document.getElementById(id);
    array.forEach((element) => {
      const dropdownTags = document.createElement("li");
      dropdownTags.textContent = `${element}`;
      dropdownTags.classList.add("tags");
      dropdownTags.addEventListener("click", () => {
        // this.testSearchByCategoryTag(
        //   this.cards,
        //   this.allIngredients,
        //   this.allAppliances,
        //   this.allUstensils,
        //   this.enteredLetters
        // );
      });
      ul.appendChild(dropdownTags);
    });
  }

  //*********************************************************************************** */

  testSearchByCategoryTag(
    cards,
    allIngredients,
    allAppliances,
    allUstensils,
    letters
  ) {
    let result = [];
    if (letters.length > 2) {
      cards.forEach((recipe) => {
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
          result.push(recipe);
        }
        let isExistIngredients = allIngredients.some((element) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.includes(element)
          )
        );
        if (isExistIngredients) {
          result.push(recipe);
        }
        let isExistAppliances = allAppliances.some((element) =>
          recipe.appliance.includes(element)
        );
        if (isExistAppliances) {
          result.push(recipe);
        }
        let isExistUstensils = allUstensils.some((element) =>
          recipe.ustensils.includes(element)
        );

        if (isExistUstensils) {
          result.push(recipe);
        }
      });
      const uniqId = result.map((one) => one.id);
      const filtered = result.filter(
        ({ id }, index) => !uniqId.includes(id, index + 1)
      );
      console.log(filtered);
    } else {
      this.cards.forEach((recipe) => {
        let recipeName = recipe.name;
        let recipeDescription = recipe.description;
        let recipeIngredients = recipe.ingredients;
        if (
          recipeName
            .toLowerCase()
            .includes(allIngredients || allAppliances || allUstensils) &&
          recipeDescription
            .toLowerCase()
            .includes(allIngredients || allAppliances || allUstensils) &&
          recipeIngredients.forEach((ingredient) => {
            let recipeIngredientName = ingredient.ingredient;
            recipeIngredientName
              .toLowerCase()
              .includes(allIngredients || allAppliances || allUstensils);
          })
        ) {
          result.push(recipe);
        }
        let isExistIngredients = allIngredients.some((element) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.includes(element)
          )
        );
        if (isExistIngredients) {
          result.push(recipe);
        }

        let isExistAppliances = allAppliances.some((element) =>
          recipe.appliance.includes(element)
        );
        if (isExistAppliances) {
          result.push(recipe);
        }
        let isExistUstensils = allUstensils.some((element) =>
          recipe.ustensils.includes(element)
        );

        if (isExistUstensils) {
          result.push(recipe);
        }
      });
      const uniqId = result.map((one) => one.id);
      const filtered = result.filter(
        ({ id }, index) => !uniqId.includes(id, index + 1)
      );
      console.log(filtered);
    }
    return result;
  }
}
