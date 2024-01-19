// function searchByInputAndTags(
//     cards,
//     textSearch,
//     choicesIngredients,
//     choicesAppliances,
//     choicesUstensils
//   ) {
//     let result = [];
//     // avant de fermer l'acc
//     if (textSearch.length >= 3) {
//         cards.forEach((recipe) => {
//             let recipeName = recipe.name;
//             let recipeDescription = recipe.description;
//             let recipeIngredients = recipe.ingredients;
//             let recipeIngredientsArray = [];
//             recipeIngredients.map((ingredient) => {
//               recipeIngredientsArray.push(ingredient.ingredient.toLowerCase());
//             });
//             if (
//               recipeName.toLowerCase().includes(textSearch.toLowerCase()) ||
//               recipeDescription.toLowerCase().includes(textSearch.toLowerCase()) ||
//               recipeIngredientsArray
//                 .toString()
//                 .toLowerCase()
//                 .includes(textSearch.toLowerCase())
//             ) {
//               result.push(recipe);
//               // console.log("result search by main input :", result);
//             }
//           });
//     }else{
//         result = [...cards]
//     }
//       // fermer le if
//       let result2 = [];
//       if(choicesIngredients.length > 0){
//         for (let recipe of result) {
//             let recipeIngredients = recipe.ingredients;
//             let recipeIngredientsArray = [];

//             recipeIngredients.map((ingredient) => {
//               recipeIngredientsArray.push(ingredient.ingredient.toLowerCase());
//             });
//             if (
//               choicesIngredients.every((recipe) =>
//                 recipeIngredientsArray.includes(recipe)
//               )
//             ) {
//               result2.push(recipe);
//               // console.log("result search by ingredient :", result2);
//             }
//           }
//       }else{
//         result2 = [...result]
//       }

//       result = [...result2];
//       let result3 = [];
//       if(choicesAppliances.length >0){
//         for (let recipe of result) {
//             let recipeAppliance = recipe.appliance;
//             let recipeAppliancesArray = [];
//             recipeAppliancesArray.push(recipeAppliance.toLowerCase());
//             if (
//               choicesAppliances.every((tag) => recipeAppliancesArray.includes(tag))
//             ) {
//               result3.push(recipe);
//               // console.log("result search by appliances : ", result3);
//             }
//           }
//       }else{
//         result3 = [...result]
//       }

//       result = [...result3];
//       let result4 = [];
//       if(choicesUstensils.length>0){
//         result.map((recipe) => {
//             let recipeUstensils = recipe.ustensils;
//             let recipeUstensilsArray = [];
//             for (let recipeUstensil of recipeUstensils) {
//               recipeUstensilsArray.push(recipeUstensil.toLowerCase());
//             }
//             if (
//               choicesUstensils.every((recipe) =>
//                 recipeUstensilsArray.includes(recipe)
//               )
//             ) {
//               result4.push(recipe);
//               // console.log("result search by ustensil :", result4);
//             }
//           });
//       }else{
//         result4 = [...result]
//       }

//       result = [...result4];
//       console.log("advanced result with input : ", result);
//       this.allIngredients = [];
//       this.allAppliances = [];
//       this.allUstensils = [];
//       result.forEach((recipe) => {
//         recipe.ingredients.forEach((ingredient) => {
//           this.allIngredients.push(ingredient.ingredient.toLowerCase());
//           this.allIngredients = [...new Set(this.allIngredients)].sort();
//         });

//         this.allAppliances.push(recipe.appliance.toLowerCase());
//         this.allAppliances = [...new Set(this.allAppliances)].sort();

//         recipe.ustensils.forEach((ustensil) => {
//           this.allUstensils.push(ustensil.toLowerCase());
//           this.allUstensils = [...new Set(this.allUstensils)].sort();
//         });
//       });
//       this.ulIngredients.innerHTML = "";
//       this.ulAppliances.innerHTML = "";
//       this.ulUstensils.innerHTML = "";
//       this.displayDropdownContentIngredients("ingredients");
//       this.displayDropdownContentAppliances("appliances");
//       this.displayDropdownContentUstensils("ustensils");
//     }
//     return result;
//   }
