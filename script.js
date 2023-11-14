// Récupération des différents élémments
const gameSection = document.querySelector(".game__container");
const playAgainBtn = document.querySelector(".play__again__btn");

// infos des différents cartes
let cardsArray = [
  { name: "pokemon1", img: "images/pokemon-1.jpg" },
  { name: "pokemon2", img: "images/pokemon-2.jpg" },
  { name: "pokemon3", img: "images/pokemon-3.jpg" },
  { name: "pokemon4", img: "images/pokemon-4.jpg" },
  { name: "pokemon5", img: "images/pokemon-5.jpg" },
  { name: "pokemon6", img: "images/pokemon-6.jpg" },
  { name: "pokemon7", img: "images/pokemon-7.jpg" },
  { name: "pokemon8", img: "images/pokemon-8.jpg" },
  { name: "pokemon9", img: "images/pokemon-9.jpg" },
];

// Création des variables
let firstGuess = "";
let secondGuess = "";
let count = 0;

// Déclaration de la fonction gameGrid qui va permettre de duppliquer les éléments du tableau cardsArray et de les mélanger
const gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

gameGrid.forEach((item) => {
  const { name, img } = item;

  // Création et ajout des éléments HTML dans le DOM
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;
  card.innerHTML = `<img src = "${img}">`;
  gameSection.appendChild(card);
});

// Déclaration de la fonction match qui va définir notamment le style css
const match = () => {
  let selectedCards = document.querySelectorAll(".selected");
  selectedCards.forEach((card) => {
    card.classList.add("matched");
    card.querySelector("img").style.opacity = "1";
    card.style.pointerEvents = "none";
    card.style.opacity = "0.8";
    card.classList.remove("selected");
  });
  count = 0;
};

// Déclaration de la fonction unmatch pour une remise à zéro
const unmatch = () => {
  let selectedCards = document.querySelectorAll(".selected");
  setTimeout(() => {
    selectedCards.forEach((card) => {
      card.classList.remove("selected");
    });
  }, 800);
  firstGuess = "";
  secondGuess = "";
  count = 0;
};

// Déclaration de la fonction checkCardMatch qui va vérifier si les deux cartes sur lesquelles l'internaute a cliqué sont identiques
const checkCardMatch = (guess1, guess2) => {
  if (guess1 === guess2) {
    // Appel de la fonction match()
    match();
  } else {
    //Appel de la fonction unmatch()
    unmatch();
  }
};

// Ecoute de l'événement "click" sur la section game__container
gameSection.addEventListener("click", (e) => {
  const selectedCard = e.target.parentElement;
  if (e.target.classList.contains("game__section")) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = selectedCard.dataset.name;
      //console.log(firstGuess);
      selectedCard.classList.add("selected", "is-clicked");
    } else {
      if (!selectedCard.classList.contains("is-clicked")) {
        secondGuess = selectedCard.dataset.name;
        //console.log(secondGuess);
        selectedCard.classList.add("selected");
        // Appel de la fonction checkCardMatch ayant pour paramètre firstGuess et secondGuess
        checkCardMatch(firstGuess, secondGuess);
        document.querySelectorAll(".card").forEach((card) => {
          card.classList.remove("is-clicked");
        });
      } else {
        count--;
      }
    }
  }
});

// Déclaration de la fonction playAgain qui va permettre de rejouer
const playAgain = () => {
  /* firstGuess = "";
  secondGuess = "";
  count = 0;*/
  window.location.reload();
};

// Ecoute de l'événement "click" sur le bouton et appel de la fonction playAgain
playAgainBtn.addEventListener("click", playAgain);
