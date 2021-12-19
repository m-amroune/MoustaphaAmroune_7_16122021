export class RecipeCard {
  constructor(name, time, ingredients, description) {
    this.name = name;
    this.time = time;
    this.ingredients = ingredients;
    this.description = description;
  }

  displayCard() {
    const cardArticle = document.createElement("article");
    const cardImg = document.createElement("img");
    const cardName = document.createElement("h3");
    const duration = document.createElement("p");
    const cardIngredientsList = document.createElement("ul");
    const cardInstructions = document.createElement("p");

    cardImg.classList.add("card-img");
    cardName.classList.add("card-name");
    duration.classList.add("duration");
    cardIngredientsList.classList.add("ingredients-list");
    cardInstructions.classList.add("card-instructions");

    cardImg.setAttribute("src", "../img/placeholder.png");
    cardName.textContent = `${this.name}`;
    duration.innerHTML = `<i class="far fa-clock"></i> ${this.time} min`;
    cardInstructions.textContent = `${this.description}`;

    cardArticle.append(
      cardImg,
      cardName,
      duration,
      cardIngredientsList,
      cardInstructions
    );

    return cardArticle;
  }
}
