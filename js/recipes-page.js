import { RecipeCard } from "./recipe-card.js";
import { recipes } from "./recipes.js";
export class RecipesPage {
  constructor() {
    this.recipesContainer = document.querySelector("section");
    this.cards = [];

    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];
    this.newAllIngredients = [];
    this.newAllAppliances = [];
    this.newAllUstensils = [];
    this.getCreateCards();

    this.searchBar = document.querySelector(".search-bar");
    this.dropdownContent(this.type);

    this.ulIngredients = document.querySelector(".list-ingredients");
    this.ulAppliances = document.querySelector(".list-appliances");
    this.ulUstensils = document.querySelector(".list-ustensils");

    this.searchDropdownIngredients = document.querySelector(
      ".dropdown-ingredients"
    );
    this.searchDropdownAppliances = document.querySelector(
      ".dropdown-appliances"
    );
    this.searchDropdownUstensils = document.querySelector(
      ".dropdown-ustensils"
    );

    this.dropdownOpen();

    // display elements in dropdowns
    this.displayDropdownContent(this.allIngredients, "ingredients");
    this.displayDropdownContent(this.allAppliances, "appliances");
    this.displayDropdownContent(this.allUstensils, "ustensils");

    // EVENT ON MAIN INPUT

    this.searchBar.addEventListener("keyup", (event) => {
      this.enteredLetters = event.target.value;
      if (this.enteredLetters.length < 3) {
        this.displayRecipes();
      } else {
        this.newDisplayRecipes(this.filteredRecipes(this.enteredLetters));
      }
    });

    // EVENT ON DROPDOWNS INPUT

    // this.searchDropdowns.forEach((input) => {
    //   input.addEventListener("keyup", (event) => {
    //     this.enteredLetters = event.target.value;
    //     console.log(this.enteredLetters);
    //     if (this.enteredLetters.length < 3) {
    //       this.displayDropdownContent(this.allIngredients, "ingredients");
    //       this.displayDropdownContent(this.allAppliances, "appliances");
    //       this.displayDropdownContent(this.allUstensils, "ustensils");
    //     } else {
    //       this.newDropdownContent(this.filteredDropdowns(this.enteredLetters));
    //     }
    //   });
    // });

    this.searchDropdownIngredients.addEventListener("keyup", (event) => {
      this.enteredLetters = event.target.value;
      if (this.enteredLetters.length >= 3) {
        this.newDropdownContentIngredients(
          this.filteredDropdownsIngredients(this.enteredLetters)
        );
      } else {
        this.displayDropdownContent(this.allIngredients, "ingredients");
      }
    });

    this.searchDropdownAppliances.addEventListener("keyup", (event) => {
      this.enteredLetters = event.target.value;
      if (this.enteredLetters.length >= 3) {
        this.newDropdownContentAppliances(
          this.filteredDropdownsAppliances(this.enteredLetters)
        );
      } else {
        this.displayDropdownContent(this.allAppliances, "appliances");
      }
    });

    this.searchDropdownUstensils.addEventListener("keyup", (event) => {
      this.enteredLetters = event.target.value;
      if (this.enteredLetters.length >= 3) {
        this.newDropdownContentUstensils(
          this.filteredDropdownsUstensils(this.enteredLetters)
        );
      } else {
        this.displayDropdownContent(this.allUstensils, "ustensils");
      }
    });

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

      this.button = document
        .querySelectorAll(".btn-dropdown")
        .forEach((element) => {
          element.addEventListener("click", () => {
            dropdownTags.style.display = "none";
            input.style.width = "170px";
          });
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

  // ADD TAGS BY TYPE IN EACH ARRAY (ingredients, appliances, ustensils)

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
        // this.searchByTagsAndMainInput(
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

  // FILTER DROPDOWNS WITH INPUT

  // filteredDropdowns(letters) {
  //   let newAllIngredients = [];
  //   let newAllAppliances = [];
  //   let newAllUstensils = [];

  //   this.allIngredients.forEach((tagIngredient) => {
  //     let tagIngredients = tagIngredient;
  //     if (tagIngredients.toLowerCase().includes(letters)) {
  //       newAllIngredients.push(tagIngredient);
  //     }

  //   })
  //   return newAllIngredients;
  //   console.log(newAllIngredients);
  //   this.allAppliances.forEach((tagAppliance) => {
  //     let tagAppliances = tagAppliance;
  //     if (tagAppliances.toLowerCase().includes(letters)) {
  //       newAllAppliances.push(tagAppliance);
  //       console.log(resultat);
  //     }
  //     return newAllAppliances;
  //   }

  //   this.allUstensils.forEach((tagUstensil) => {
  //     let tagUstensils = tagUstensil;
  //     if (tagUstensils.toLowerCase().includes(letters)) {
  //       newAllUstensils.push(tagUstensil);
  //     }
  //   });
  //   return newAllUstensils;
  // }

  filteredDropdownsIngredients(letters) {
    let newAllIngredients = [];
    this.allIngredients.forEach((tagIngredient) => {
      let tagIngredients = tagIngredient;
      if (tagIngredients.toLowerCase().includes(letters)) {
        newAllIngredients.push(tagIngredient);
      }
    });
    return newAllIngredients;
  }

  filteredDropdownsAppliances(letters) {
    let newAllAppliances = [];
    this.allAppliances.forEach((tagAppliance) => {
      let tagAppliances = tagAppliance;
      if (tagAppliances.toLowerCase().includes(letters)) {
        newAllAppliances.push(tagAppliance);
      }
    });
    return newAllAppliances;
  }

  filteredDropdownsUstensils(letters) {
    let newAllUstensils = [];
    this.allUstensils.forEach((tagUstensil) => {
      let tagUstensils = tagUstensil;
      if (tagUstensils.toLowerCase().includes(letters)) {
        newAllUstensils.push(tagUstensils);
      }
    });
    return newAllUstensils;
  }

  // Display DROPDOWNS AFTER FILTER

  newDropdownContentIngredients(array) {
    this.ulIngredients.innerHTML = "";
    array.forEach((element) => {
      const dropdownTags = document.createElement("li");
      dropdownTags.textContent = `${element}`;
      dropdownTags.classList.add("tags");

      this.ulIngredients.appendChild(dropdownTags);
    });
  }

  newDropdownContentAppliances(array) {
    this.ulAppliances.innerHTML = "";
    array.forEach((element) => {
      const dropdownTags = document.createElement("li");
      dropdownTags.textContent = `${element}`;
      dropdownTags.classList.add("tags");

      this.ulAppliances.appendChild(dropdownTags);
    });
  }

  newDropdownContentUstensils(array) {
    this.ulUstensils.innerHTML = "";
    array.forEach((element) => {
      const dropdownTags = document.createElement("li");
      dropdownTags.textContent = `${element}`;
      dropdownTags.classList.add("tags");

      this.ulUstensils.appendChild(dropdownTags);
    });
  }

  // searchByTagsAndMainInput(
  //   cards,
  //   allIngredients,
  //   allAppliances,
  //   allUstensils,
  //   letters
  // ) {
  //   let result = [];
  //   if (letters.length > 2) {
  //     cards.forEach((recipe) => {
  //       let recipeName = recipe.name;
  //       let recipeDescription = recipe.description;
  //       let recipeIngredients = recipe.ingredients;
  //       if (
  //         recipeName.toLowerCase().includes(letters) ||
  //         recipeDescription.toLowerCase().includes(letters) ||
  //         recipeIngredients.forEach((ingredient) => {
  //           let recipeIngredientName = ingredient.ingredient;
  //           recipeIngredientName.toLowerCase().includes(letters);
  //         })
  //       ) {
  //         result.push(recipe);
  //       }
  //       let isExistIngredients = allIngredients.some((element) =>
  //         recipe.ingredients.some((ingredient) =>
  //           ingredient.ingredient.includes(element)
  //         )
  //       );
  //       if (isExistIngredients) {
  //         result.push(recipe);
  //       }
  //       let isExistAppliances = allAppliances.some((element) =>
  //         recipe.appliance.includes(element)
  //       );
  //       if (isExistAppliances) {
  //         result.push(recipe);
  //       }
  //       let isExistUstensils = allUstensils.some((element) =>
  //         recipe.ustensils.includes(element)
  //       );

  //       if (isExistUstensils) {
  //         result.push(recipe);
  //       }
  //     });
  //     const uniqId = result.map((one) => one.id);
  //     const filtered = result.filter(
  //       ({ id }, index) => !uniqId.includes(id, index + 1)
  //     );
  //     console.log(filtered);
  //   } else {
  //     this.cards.forEach((recipe) => {
  //       let recipeName = recipe.name;
  //       let recipeDescription = recipe.description;
  //       let recipeIngredients = recipe.ingredients;
  //       if (
  //         recipeName
  //           .toLowerCase()
  //           .includes(allIngredients || allAppliances || allUstensils) &&
  //         recipeDescription
  //           .toLowerCase()
  //           .includes(allIngredients || allAppliances || allUstensils) &&
  //         recipeIngredients.forEach((ingredient) => {
  //           let recipeIngredientName = ingredient.ingredient;
  //           recipeIngredientName
  //             .toLowerCase()
  //             .includes(allIngredients || allAppliances || allUstensils);
  //         })
  //       ) {
  //         result.push(recipe);
  //       }
  //       let isExistIngredients = allIngredients.some((element) =>
  //         recipe.ingredients.some((ingredient) =>
  //           ingredient.ingredient.includes(element)
  //         )
  //       );
  //       if (isExistIngredients) {
  //         result.push(recipe);
  //       }

  //       let isExistAppliances = allAppliances.some((element) =>
  //         recipe.appliance.includes(element)
  //       );
  //       if (isExistAppliances) {
  //         result.push(recipe);
  //       }
  //       let isExistUstensils = allUstensils.some((element) =>
  //         recipe.ustensils.includes(element)
  //       );

  //       if (isExistUstensils) {
  //         result.push(recipe);
  //       }
  //     });
  //     const uniqId = result.map((one) => one.id);
  //     const filtered = result.filter(
  //       ({ id }, index) => !uniqId.includes(id, index + 1)
  //     );
  //     console.log(filtered);
  //   }
  //   return result;
  // }
}
