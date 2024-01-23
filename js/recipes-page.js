import { RecipeCard } from "./recipe-card.js";
import { recipes } from "./recipes.js";
export class RecipesPage {
  constructor() {
    this.recipesContainer = document.querySelector("section");
    this.cards = [];
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];
    this.ingredientsInput = "";
    this.appliancesInput = "";
    this.ustensilsInput = "";
    this.choices = [];
    this.choicesIngredients = [];
    this.choicesAppliances = [];
    this.choicesUstensils = [];
    this.getCreateCards();
    this.searchBar = document.querySelector(".search-bar");
    this.messageError = document.querySelector("#error-searchBar");
    this.textSearch = "";
    this.searchIngredient = "";
    this.tagsContainer = document.querySelector(".tags-container"); // container clicked tags
    this.tagsSelected = this.tagsContainer.children;
    this.dropdownContent();
    this.displayDropdownContentIngredients("ingredients");
    this.displayDropdownContentAppliances("appliances");
    this.displayDropdownContentUstensils("ustensils");
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

    // EVENT ON MAIN INPUT
    this.searchBar.addEventListener("keyup", (event) => {
      this.textSearch = event.target.value;
      let resultatFilteredRecipes = this.searchByInputAndTags(
        this.cards,
        this.textSearch,
        this.choicesIngredients,
        this.choicesAppliances,
        this.choicesUstensils
      );
      this.newDisplayRecipes(resultatFilteredRecipes);

      if (resultatFilteredRecipes.length === 0) {
        this.showMessageError(this.messageError);
      } else {
        this.hideMessageError(this.messageError);
      }
    });
    // Events ON DROPDOWNS INPUT
    this.searchDropdownIngredients.addEventListener("keyup", (event) => {
      this.ingredientsSearchInput = event.target.value.toLowerCase();
      this.ingredientsLi = this.ulIngredients.children;
      for (let ingredient of this.ingredientsLi) {
        if (!ingredient.innerText.includes(this.ingredientsSearchInput)) {
          ingredient.style.display = "none";
        } else {
          ingredient.style.display = "flex";
        }
      }
    });

    this.searchDropdownAppliances.addEventListener("keyup", (event) => {
      this.appliancesSearchInput = event.target.value.toLowerCase();
      this.appliancesLi = this.ulAppliances.children;
      for (let appliance of this.appliancesLi) {
        if (!appliance.innerText.includes(this.appliancesSearchInput)) {
          appliance.style.display = "none";
        } else {
          appliance.style.display = "flex";
        }
      }
    });

    this.searchDropdownUstensils.addEventListener("keyup", (event) => {
      this.ustensilsSearchInput = event.target.value.toLowerCase();
      this.ustensilsLi = this.ulUstensils.children;
      for (let ustensil of this.ustensilsLi) {
        if (!ustensil.innerText.includes(this.ustensilsSearchInput)) {
          ustensil.style.display = "none";
        } else {
          ustensil.style.display = "flex";
        }
      }
    });
  }
  // FILTER BY SEARCH INPUT AND TAGS
  searchByInputAndTags(
    cards,
    textSearch,
    choicesIngredients,
    choicesAppliances,
    choicesUstensils
  ) {
    let result = [];

    if (textSearch.length >= 3) {
      cards.forEach((recipe) => {
        let recipeName = recipe.name;
        let recipeDescription = recipe.description;
        let recipeIngredients = recipe.ingredients;
        let recipeIngredientsArray = [];
        recipeIngredients.map((ingredient) => {
          recipeIngredientsArray.push(ingredient.ingredient.toLowerCase());
        });
        if (
          recipeName.toLowerCase().includes(textSearch.toLowerCase()) ||
          recipeDescription.toLowerCase().includes(textSearch.toLowerCase()) ||
          recipeIngredientsArray
            .toString()
            .toLowerCase()
            .includes(textSearch.toLowerCase())
        ) {
          result.push(recipe);
          // console.log("result search by main input :", result);
        }
      });
    } else {
      result = [...cards];
    }

    let resultIngredientsFiltered = [];
    if (choicesIngredients.length > 0) {
      for (let recipe of result) {
        let recipeIngredients = recipe.ingredients;
        let recipeIngredientsArray = [];

        recipeIngredients.map((ingredient) => {
          recipeIngredientsArray.push(ingredient.ingredient.toLowerCase());
        });
        if (
          choicesIngredients.every((recipe) =>
            recipeIngredientsArray.includes(recipe)
          )
        ) {
          resultIngredientsFiltered.push(recipe);
          // console.log("result search by ingredient :", result2);
        }
      }
    } else {
      resultIngredientsFiltered = [...result];
    }

    result = [...resultIngredientsFiltered];
    let resultAppliancesFiltered = [];
    if (choicesAppliances.length > 0) {
      for (let recipe of result) {
        let recipeAppliance = recipe.appliance;
        let recipeAppliancesArray = [];
        recipeAppliancesArray.push(recipeAppliance.toLowerCase());
        if (
          choicesAppliances.every((tag) => recipeAppliancesArray.includes(tag))
        ) {
          resultAppliancesFiltered.push(recipe);
          // console.log("result search by appliances : ", result3);
        }
      }
    } else {
      resultAppliancesFiltered = [...result];
    }

    result = [...resultAppliancesFiltered];
    let resultUstensilsFiltered = [];
    if (choicesUstensils.length > 0) {
      result.map((recipe) => {
        let recipeUstensils = recipe.ustensils;
        let recipeUstensilsArray = [];
        for (let recipeUstensil of recipeUstensils) {
          recipeUstensilsArray.push(recipeUstensil.toLowerCase());
        }
        if (
          choicesUstensils.every((recipe) =>
            recipeUstensilsArray.includes(recipe)
          )
        ) {
          resultUstensilsFiltered.push(recipe);
          // console.log("result search by ustensil :", result4);
        }
      });
    } else {
      resultUstensilsFiltered = [...result];
    }

    result = [...resultUstensilsFiltered];
    console.log("advanced result with input : ", result);
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];
    result.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        this.allIngredients.push(ingredient.ingredient.toLowerCase());
        this.allIngredients = [...new Set(this.allIngredients)].sort();
      });

      this.allAppliances.push(recipe.appliance.toLowerCase());
      this.allAppliances = [...new Set(this.allAppliances)].sort();

      recipe.ustensils.forEach((ustensil) => {
        this.allUstensils.push(ustensil.toLowerCase());
        this.allUstensils = [...new Set(this.allUstensils)].sort();
      });
    });
    this.ulIngredients.innerHTML = "";
    this.ulAppliances.innerHTML = "";
    this.ulUstensils.innerHTML = "";
    this.displayDropdownContentIngredients("ingredients");
    this.displayDropdownContentAppliances("appliances");
    this.displayDropdownContentUstensils("ustensils");

    return result;
  }

  showMessageError(messageError) {
    messageError.classList.add("show-error");
    messageError.innerHTML =
      'Aucune recette ne correspond à votre critère de recherche... Vous pouvez chercher "tarte aux pommes", "poissons", etc.';
  }

  hideMessageError(messageError) {
    messageError.classList.remove("show-error");
    messageError.innerHTML = "";
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
            nextElement.style.width = "100%";
            input.style.width = "100%";
            input.style.maxWidth = "796px";
            input.style.borderRadius = "0";
            dropdownTags = nextElement;
            break;
          }
        }
        this.button = document
          .querySelectorAll(".btn-dropdown")
          .forEach((element) => {
            element.addEventListener("click", () => {
              dropdownTags.style.display = "none";
              input.style.width = "170px";
            });
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

  // ADD TAGS BY TYPE IN EACH ARRAY (ingredients, appliances, ustensils)

  dropdownContent() {
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        this.allIngredients.push(ingredient.ingredient.toLowerCase());
        this.allIngredients = [...new Set(this.allIngredients)].sort();
      });

      this.allAppliances.push(recipe.appliance.toLowerCase());
      this.allAppliances = [...new Set(this.allAppliances)].sort();

      recipe.ustensils.forEach((ustensil) => {
        this.allUstensils.push(ustensil.toLowerCase());
        this.allUstensils = [...new Set(this.allUstensils)].sort();
      });
    });
  }

  displayDropdownContentIngredients(id) {
    this.ulIngredients = document.getElementById(id);
    this.allIngredients.forEach((element) => {
      let dropdownIngredients = document.createElement("li");
      dropdownIngredients.textContent = `${element}`;
      dropdownIngredients.classList.add("tagsIngredients");
      dropdownIngredients.addEventListener("click", (event) => {
        const selectIngredient = event.target.innerHTML.toLowerCase();
        this.choicesIngredients.push(selectIngredient);

        let resultatFilteredRecipes = this.searchByInputAndTags(
          this.cards,
          this.textSearch,
          this.choicesIngredients,
          this.choicesAppliances,
          this.choicesUstensils
        );
        this.newDisplayRecipes(resultatFilteredRecipes);

        // creation list li for clicked tagsContainer
        const tagLi = document.createElement("li");
        tagLi.textContent = `${selectIngredient}`;
        tagLi.classList.add("ingredient-tag");
        this.tagsContainer.appendChild(tagLi);
        const iconLi = document.createElement("i");
        iconLi.classList.add("far");
        iconLi.classList.add("fa-times-circle");
        tagLi.appendChild(iconLi);

        // delete tag from tagsContainer

        for (let tagSelected of this.tagsSelected) {
          let closeButton = tagSelected.children.item(0);
          closeButton.addEventListener("click", () => {
            tagSelected.classList.remove("ingredient-tag");
            tagSelected.style.display = "none";
            let tagIndex = this.choicesIngredients.indexOf(
              tagSelected.innerText
            );
            this.choicesIngredients.splice(tagIndex, 1);
            this.displayDropdownContentIngredients("ingredients");
            let resultatFilteredRecipes = this.searchByInputAndTags(
              this.cards,
              this.textSearch,
              this.choicesIngredients,
              this.choicesAppliances,
              this.choicesUstensils
            );

            this.newDisplayRecipes(resultatFilteredRecipes);
          });
        }
      });
      this.ulIngredients.appendChild(dropdownIngredients);
    });
  }
  displayDropdownContentAppliances(id) {
    this.ulAppliances = document.getElementById(id);
    this.allAppliances.forEach((element) => {
      const dropdownAppliances = document.createElement("li");
      dropdownAppliances.textContent = `${element}`;
      dropdownAppliances.classList.add("tagsAppliances");

      dropdownAppliances.addEventListener("click", (event) => {
        const selectAppliance = event.target.innerHTML.toLowerCase();

        this.choicesAppliances.push(selectAppliance);
        console.log(this.choicesAppliances);

        let resultatFilteredRecipes = this.searchByInputAndTags(
          this.cards,
          this.textSearch,
          this.choicesIngredients,
          this.choicesAppliances,
          this.choicesUstensils
        );
        this.newDisplayRecipes(resultatFilteredRecipes);

        // selected tags for container
        const tagLi = document.createElement("li");
        tagLi.textContent = `${selectAppliance}`;
        tagLi.classList.add("appliance-tag");
        const iconLi = document.createElement("i");
        iconLi.classList.add("far");
        iconLi.classList.add("fa-times-circle");
        tagLi.appendChild(iconLi);
        this.tagsContainer.appendChild(tagLi);

        // delete tags from tagsContainer
        for (let tagSelected of this.tagsSelected) {
          let closeButton = tagSelected.children.item(0);
          closeButton.addEventListener("click", () => {
            tagSelected.classList.remove("appliance-tag");
            tagSelected.style.display = "none";
            let tagIndex = this.choicesAppliances.indexOf(
              tagSelected.innerText
            );
            this.choicesAppliances.splice(tagIndex, 1);
            this.displayDropdownContentAppliances("appliances");
            let resultatFilteredRecipes = this.searchByInputAndTags(
              this.cards,
              this.textSearch,
              this.choicesIngredients,
              this.choicesAppliances,
              this.choicesUstensils
            );

            this.newDisplayRecipes(resultatFilteredRecipes);
          });
        }
      });

      this.ulAppliances.appendChild(dropdownAppliances);
    });
  }
  displayDropdownContentUstensils(id) {
    this.ulUstensils = document.getElementById(id);
    this.allUstensils.forEach((element) => {
      const dropdownUstensils = document.createElement("li");
      dropdownUstensils.textContent = `${element}`;
      dropdownUstensils.classList.add("tagsUstensils");

      dropdownUstensils.addEventListener("click", (event) => {
        const selectUstensil = event.target.innerHTML.toLowerCase();

        this.choicesUstensils.push(selectUstensil);

        let resultatFilteredRecipes = this.searchByInputAndTags(
          this.cards,
          this.textSearch,
          this.choicesIngredients,
          this.choicesAppliances,
          this.choicesUstensils
        );
        this.newDisplayRecipes(resultatFilteredRecipes);

        // selected tags for container
        const tagLi = document.createElement("li");
        tagLi.textContent = `${selectUstensil}`;
        tagLi.classList.add("ustensil-tag");
        const iconLi = document.createElement("i");
        iconLi.classList.add("far");
        iconLi.classList.add("fa-times-circle");
        tagLi.appendChild(iconLi);
        this.tagsContainer.appendChild(tagLi);

        // delete tags from tagsContainer
        for (let tagSelected of this.tagsSelected) {
          let closeButton = tagSelected.children.item(0);
          closeButton.addEventListener("click", () => {
            tagSelected.classList.remove("ustensil-tag");
            tagSelected.style.display = "none";
            let tagIndex = this.choicesUstensils.indexOf(tagSelected.innerText);
            this.choicesUstensils.splice(tagIndex, 1);
            this.displayDropdownContentUstensils("ustensils");
            let resultatFilteredRecipes = this.searchByInputAndTags(
              this.cards,
              this.textSearch,
              this.choicesIngredients,
              this.choicesAppliances,
              this.choicesUstensils
            );

            this.newDisplayRecipes(resultatFilteredRecipes);
          });
        }
      });

      this.ulUstensils.appendChild(dropdownUstensils);
    });
  }
}
