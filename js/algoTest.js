// filterTags(allIngredients, allAppliances, allUstensils, letters) {
//   let result = [];
//   this.newAllAppliances = [];
//   this.newAllIngredients = [];
//   this.newAllUstensils = [];
//   this.cards.forEach((recipe) => {
//     let recipeName = recipe.name;
//     let recipeDescription = recipe.description;
//     let recipeIngredients = recipe.ingredients;
//     if (
//       recipeName
//         .toLowerCase()
//         .includes(
//           (allIngredients || allAppliances || allUstensils) && letters
//         ) ||
//       recipeDescription
//         .toLowerCase()
//         .includes(
//           (allIngredients || allAppliances || allUstensils) && letters
//         ) ||
//       recipeIngredients.forEach((ingredient) => {
//         let recipeIngredientName = ingredient.ingredient;
//         recipeIngredientName
//           .toLowerCase()
//           .includes(
//             (allIngredients || allAppliances || allUstensils) && letters
//           );
//       })
//     ) {
//       result.push(recipe);
//     }
//     let isExistIngredients = allIngredients.some((element) =>
//       recipe.ingredients.some((ingredient) =>
//         ingredient.ingredient.includes(element)
//       )
//     );
//     if (isExistIngredients) {
//       this.newAllIngredients.push(recipe);
//     }

//     let isExistAppliances = allAppliances.some((element) =>
//       recipe.appliance.includes(element)
//     );
//     if (isExistAppliances) {
//       this.newAllAppliances.push(recipe);
//     }
//     let isExistUstensils = allUstensils.some((element) =>
//       recipe.ustensils.includes(element)
//     );

//     if (isExistUstensils) {
//       this.newAllUstensils.push(recipe);
//     }
//   });

//   return result;
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  TEST FILTER THAT COMBINES SEARCH BY INPUT AND TAGS

function algoFilterTest(
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
    recettes.map((recette) => {
      let recetteName = recette.name;
      let recetteDescription = recette.description;
      let recetteIngredients = recette.ingredients;

      if (
        recetteName.toLowerCase().includes(textSearch) ||
        recetteDescription.toLowerCase().includes(textSearch.toLowerCase()) ||
        //   use filter or map or some
        recetteIngredients.every((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(textSearch.toLowerCase())
        )
      ) {
        result.push(recette);
        // console.log("result search by main input :", result);
      }
      let result2 = [];
      for (let recette of result) {
        let recetteIngredients = recette.ingredients;
        let recetteIngredientsArray = [];

        recetteIngredients.map((ingredient) => {
          recetteIngredientsArray.push(ingredient.ingredient.toLowerCase());
        });
        if (
          choicesIngredients.every((recette) =>
            recetteIngredientsArray.includes(recette)
          )
        ) {
          result2.push(recette);
          result = [...result2];

          // console.log("result search by ingredient :", result2);
        }
      }

      let result3 = [];
      for (let recette of result) {
        let recetteAppliance = recette.appliance;
        let recetteAppliancesArray = [];

        recetteAppliancesArray.push(recetteAppliance.toLowerCase());

        if (
          choicesAppliances.every((recette) =>
            recetteAppliancesArray.includes(recette)
          )
        ) {
          result3.push(recette);
          result = [...result3];
          // console.log("result search by appliances : ", result3);
        }
      }

      let result4 = [];
      result.map((recette) => {
        let recetteUstensils = recette.ustensils;
        let recetteUstensilsArray = [];
        for (let recetteUstensil of recetteUstensils) {
          recetteUstensilsArray.push(recetteUstensil.toLowerCase());
        }
        if (
          choicesUstensils.every((recette) =>
            recetteUstensilsArray.includes(recette)
          )
        ) {
          result4.push(recette);
          result = [...result4];
          // console.log("result search by ustensil :", result4);
        }
      });
    });
    console.log("advanced result with input : ", result);
  }
  // si champs de recherche est vide et choices > 0 ou ... ou ...
  // alors  results = [...recettes]
  else if (textSearch.length < 3) {
    if (choicesIngredients.length > 0) {
      result = [...recettes];
      let result2 = [];
      for (let recette of result) {
        let recetteIngredients = recette.ingredients;
        let recetteIngredientsArray = [];

        recetteIngredients.map((ingredient) => {
          recetteIngredientsArray.push(ingredient.ingredient.toLowerCase());
        });
        if (
          choicesIngredients.every((recette) =>
            recetteIngredientsArray.includes(recette)
          )
        ) {
          result2.push(recette);
          result = [...result2];

          // console.log("result search by ingredient :", result2);
        }
      }
    }

    if (choicesAppliances.length > 0) {
      let result3 = [];
      for (let recette of result) {
        let recetteAppliance = recette.appliance;
        let recetteAppliancesArray = [];

        recetteAppliancesArray.push(recetteAppliance.toLowerCase());

        if (
          choicesAppliances.every((recette) =>
            recetteAppliancesArray.includes(recette)
          )
        ) {
          result3.push(recette);
          result = [...result3];
          // console.log("result search by appliances : ", result3);
        }
      }
    }
    if (choicesUstensils.length > 0) {
      let result4 = [];
      result.map((recette) => {
        let recetteUstensils = recette.ustensils;
        let recetteUstensilsArray = [];
        for (let recetteUstensil of recetteUstensils) {
          recetteUstensilsArray.push(recetteUstensil.toLowerCase());
        }
        if (
          choicesUstensils.every((recette) =>
            recetteUstensilsArray.includes(recette)
          )
        ) {
          result4.push(recette);
          result = [...result4];
          // console.log("result search by ustensil :", result4);
        }
      });
      console.log("advanced result between tags : ", result);
    }
  }

  return result;
}
algoFilterTest(recipes, "lait", ["sucre"], ["casserole"], ["saladier"]);
