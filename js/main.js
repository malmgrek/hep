/*
 * Hep! Random draw foosball teams.
 */


/**
 * Create player card div's
 */
const createCard = (bgColor, text, fontSize = "20vw") => {

  let cardText = document.createElement("span");
  cardText.className = "CardText";
  cardText.style.fontSize = fontSize;
  cardText.appendChild(document.createTextNode(text));

  let card = document.createElement("div");
  card.className = "Card";
  card.style.backgroundColor = bgColor;
  card.appendChild(cardText);

  return card
}


/**
 * Collection of available cards
 */
const blue_defense = createCard("#1e90ff", "BD");
const blue_offense = createCard("#1e90ff", "BO");
const red_defense = createCard("#dc143c", "RD");
const red_offense = createCard("#dc143c", "RO");
// const totenkopf = createCard("#666", "\u2620", "20vw");
// const radioactive = createCard("#ffd700", "\u2622", "20vw");
const fu = createCard("#666", "🖕", "20vw");


/**
 * Create a card deck
 */
const createCardDeck = (length = 4) => {
  let cards = [blue_defense, blue_offense, red_defense, red_offense].concat(
    Array(length - 4).fill(fu));
  return {cards: cards, mutated: false}
}


/**
 * Take a card from the card container and add to "container"
 */
const sampleCard = (cardDeck, parentElement) => {

  let index = Math.floor(Math.random() * cardDeck.cards.length);

  // Remove a random card from deck
  let card = cardDeck.cards.splice(index, 1).pop().cloneNode(true);

  // Adds same element (possibly) many times
  parentElement.appendChild(card);

  return {cards: cardDeck.cards, mutated: true}

}


const createTextDiv = (text) => {

  let p = document.createElement("p");
  p.appendChild(document.createTextNode(text));
  p.style.fontSize = "5vh";
  p.style.fontFamily = "Courier";

  let div = document.createElement("div");
  div.appendChild(p);

  return div
}


const App = () => {

  /*************************
   * Create main container *
   *************************/
  let samplingArea = document.createElement("div");
  samplingArea.id = "samplingArea";
  samplingArea.appendChild(createTextDiv(
    "Select the number of players and click Hep!"));

  /************************
   * Create control panel *
   ************************/
  let controlPanel = document.createElement("div");
  controlPanel.className = "ControlPanel";

  // Input field that defines number of players
  let playersInput = document.createElement("input");
  playersInput.type = "number";
  playersInput.id = "playersInput";
  playersInput.min = 4;
  playersInput.value = 4;
  playersInput.autocomplete = "off";

  // Hep! button that initializes the card sampling loop
  let startButton = document.createElement("button");
  startButton.id = "startButton";
  startButton.appendChild(document.createTextNode("Hep!"));
  // Button triggers re-creation of a new card deck
  // according player number given by the user
  startButton.addEventListener("click", () => {
    cardDeck = createCardDeck(
      document.getElementById("playersInput").value);
    samplingArea = document.getElementById("samplingArea");
    samplingArea.innerHTML = "";
    samplingArea.appendChild(createTextDiv(
      "Tap screen to draw cards!"));
    // Add click (tap) detection to all over main container.
    // Triggers new random cards appearing on screen
    samplingArea.addEventListener("click", () => {
        // TODO: Get rid of 'mutated'
        cardDeck = (cardDeck.mutated && cardDeck.cards.length) ?
        sampleCard(cardDeck, samplingArea) :
        {cards: cardDeck.cards, mutated: true}
    });
  });

  /****************************************
   * Render - Append elements to document *
   ****************************************/
  controlPanel.appendChild(playersInput);
  controlPanel.appendChild(startButton);
  samplingArea.appendChild(controlPanel);
  document.body.appendChild(samplingArea);

  return true

}


/**
 * Run app
 */
let status = App();
