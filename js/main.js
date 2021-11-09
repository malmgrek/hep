/*
 * Hep! Random draw foosball teams
 */


/*
 * Creates a card div
 */
const Card = (bgColor, text, fontSize = "20vw") => {

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


/*
 * Collection of available cards
 */
const blueDefense = Card("#1e90ff", "BD");
const blueOffense = Card("#1e90ff", "BO");
const redDefense = Card("#dc143c", "RD");
const redOffense = Card("#dc143c", "RO");
const middleFinger = Card("#666", "🖕", "20vw");


/*
 * Creates a card deck
 */
const createCardDeck = (length = 4) => {
  let cardDeck = [blueDefense, blueOffense, redDefense, redOffense].concat(
    Array(length - 4).fill(middleFinger));
  return cardDeck
}


/*
 * Takes a card from the card container and add to "container"
 */
const drawRandomCard = (cardDeck, parentElement) => {

  let index = Math.floor(Math.random() * cardDeck.length);

  // Remove a random card from deck
  // TODO: Immutable
  let card = cardDeck.splice(index, 1).pop().cloneNode(true);

  // Adds same element (possibly) many times
  parentElement.appendChild(card);

  return cardDeck

}


/**
 * Creates a div with a text
 */
const TextDiv = (text) => {

  let p = document.createElement("p");
  p.appendChild(document.createTextNode(text));
  p.style.fontSize = "5vh";
  p.style.fontFamily = "Courier";

  let div = document.createElement("div");
  div.appendChild(p);

  return div
}


/**
 * Application
 */
const App = () => {

  /*
   * Create main container for tapping
   */
  let tappingArea = document.createElement("div");
  tappingArea.id = "tappingArea";
  tappingArea.appendChild(TextDiv(
    "Select the number of players and click Hep!"));

  /*
   * Create control panel
   */
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
    let cardDeck = createCardDeck(
      document.getElementById("playersInput").value);
    tappingArea = document.getElementById("tappingArea");
    tappingArea.innerHTML = "";
    tappingArea.appendChild(TextDiv("Tap screen to draw cards!"));
    // Add click (tap) detection to all over main container.
    // Triggers new random cards appearing on screen
    tappingArea.addEventListener("click", () => {
      cardDeck = cardDeck.length ?
        drawRandomCard(cardDeck, tappingArea) : cardDeck
      // Set as a capturing event, so it won't be captured by the button event
      // that is bubbling under as a child.
    }, true);
  }, false);

  /*
   * Render - Append elements to document
   */
  controlPanel.appendChild(playersInput);
  controlPanel.appendChild(startButton);
  tappingArea.appendChild(controlPanel);
  document.body.appendChild(tappingArea);

  return true

}


/*
 * Run application
 */
let status = App();
