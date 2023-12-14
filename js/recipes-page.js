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
    // Events ON DROPDOWNS INPUT
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
          // element.remove();
          element.style.transform = "translateY(-10000px)";
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
        recipeIngredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(letters.toLowerCase())
        )
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
      // let newTags = [];
      // newTags = dropdownTags;

      dropdownTags.addEventListener("click", (event) => {
        const selectTag = event.target.innerHTML.toLowerCase();

        this.newDisplayRecipes(this.searchByTags(selectTag));
      });
      this.filterTags(
        this.newAllIngredients,
        this.newAllAppliances,
        this.newAllUstensils,
        this.selectTag
      );

      ul.appendChild(dropdownTags);
    });
  }

  // FILTERS
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

  // FILTER BY TAGS

  searchByTags(selectTag) {
    let resultat = [];
    this.cards.forEach((recipe) => {
      let recipeName = recipe.name;
      let recipeDescription = recipe.description;
      let recipeIngredients = recipe.ingredients;

      if (
        recipeName.toLowerCase().includes(selectTag) ||
        recipeDescription.toLowerCase().includes(selectTag) ||
        recipeIngredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(selectTag)
        )
      ) {
        resultat.push(recipe);
      }
    });

    return resultat;
  }

  filterTags(allIngredients, allAppliances, allUstensils, letters) {
    let result = [];
    this.newAllAppliances = [];
    this.newAllIngredients = [];
    this.newAllUstensils = [];
    this.cards.forEach((recipe) => {
      let recipeName = recipe.name;
      let recipeDescription = recipe.description;
      let recipeIngredients = recipe.ingredients;
      if (
        recipeName
          .toLowerCase()
          .includes(
            (allIngredients || allAppliances || allUstensils) && letters
          ) ||
        recipeDescription
          .toLowerCase()
          .includes(
            (allIngredients || allAppliances || allUstensils) && letters
          ) ||
        recipeIngredients.forEach((ingredient) => {
          let recipeIngredientName = ingredient.ingredient;
          recipeIngredientName
            .toLowerCase()
            .includes(
              (allIngredients || allAppliances || allUstensils) && letters
            );
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
        this.newAllIngredients.push(recipe);
      }

      let isExistAppliances = allAppliances.some((element) =>
        recipe.appliance.includes(element)
      );
      if (isExistAppliances) {
        this.newAllAppliances.push(recipe);
      }
      let isExistUstensils = allUstensils.some((element) =>
        recipe.ustensils.includes(element)
      );

      if (isExistUstensils) {
        this.newAllUstensils.push(recipe);
      }
    });

    return result;
  }
}

function algoFilter(
  recettes,
  textSearch,
  choicesIngredients,
  choicesAppliances,
  choicesUstensils
) {
  // verifie si champs de texte est supérieur ou égal à 3 caractères
  // et si dans noms, description...

  // nouveau tableau après 1er filtre
  // puis si dans ingredients filtrer dans ingrédients...
  // meme chose pour ustensils
  // meme chose pour appliances
  let result = [];

  if (textSearch.length >= 3) {
    recettes.forEach((recette) => {
      let recetteName = recette.name;
      let recetteDescription = recette.description;
      let recetteIngredients = recette.ingredients;

      if (
        recetteName.toLowerCase().includes(textSearch) ||
        recetteDescription.toLowerCase().includes(textSearch.toLowerCase()) ||
        //   use filter or map or some
        recetteIngredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(textSearch.toLowerCase())
        )
      ) {
        result.push(recette);
        console.log("result search by main input :", result);
      }
      let result2 = [];
      result.forEach((recette) => {
        let recetteIngredients = recette.ingredients;
        if (
          recetteIngredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(choicesIngredients)
          )
        ) {
          result2.push(recette);
          // console.log("result search by ingredient :", result2);
        }
      });

      // if si result 2 n'est pas vide alors result = [...result2]

      let result3 = [];
      result2.forEach((recette) => {
        let recetteAppliance = recette.appliance;

        if (recetteAppliance.toLowerCase().includes(choicesAppliances)) {
          result3.push(recette);
          result = [...result3];
          // console.log("result search by appliances : ", result3);
        }
      });

      let result4 = [];
      result3.forEach((recette) => {
        let recetteUstensils = recette.ustensils;

        if (
          recetteUstensils.some((ustensil) =>
            ustensil.toLowerCase().includes(choicesUstensils)
          )
        ) {
          result4.push(recette);
          result = [...result4];
          console.log("result search by ustensil :", result4);
        }
      });
    });
  }
  // si champs de recherche est vide et choices > 0 ou ... ou ...
  // alors  results = [...recettes]
  else if (
    textSearch.length < 3 &&
    (choicesIngredients.length > 0 ||
      choicesAppliances.length > 0 ||
      choicesUstensils.length > 0)
  ) {
    result = [...recettes];
    let result2 = [];
    result.forEach((recette) => {
      let recetteIngredients = recette.ingredients;
      if (
        recetteIngredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(choicesIngredients)
        )
      ) {
        result2.push(recette);
        result = [...result2];

        console.log("result search by ingredient :", result2);
      }
    });

    // if si result 2 n'est pas vide alors result = [...result2]

    let result3 = [];
    result2.forEach((recette) => {
      let recetteAppliance = recette.appliance;

      if (recetteAppliance.toLowerCase().includes(choicesAppliances)) {
        result3.push(recette);
        result = [...result3];
        console.log("result search by appliances : ", result3);
      }
    });

    let result4 = [];
    result3.forEach((recette) => {
      let recetteUstensils = recette.ustensils;

      if (
        recetteUstensils.some((ustensil) =>
          ustensil.toLowerCase().includes(choicesUstensils)
        )
      ) {
        result4.push(recette);
        result = [...result4];
        console.log("result search by ustensil :", result4);
      }
    });
  }

  return result;
}
algoFilter(recipes, "la", [""], [""], ["couteau"]);
