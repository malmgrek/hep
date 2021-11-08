/*
 * Hep! Random draw foosball teams
 */


/*
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


/*
 * Collection of available cards
 */
const blueDefense = createCard("#1e90ff", "BD");
const blueOffense = createCard("#1e90ff", "BO");
const redDefense = createCard("#dc143c", "RD");
const redOffense = createCard("#dc143c", "RO");
const middleFinger = createCard("#666", "🖕", "20vw");


/*
 * Create a card deck
 */
const createCards = (length = 4) => {
  let cards = [blueDefense, blueOffense, redDefense, redOffense].concat(
    Array(length - 4).fill(middleFinger));
  return cards
}


/*
 * Take a card from the card container and add to "container"
 */
const drawRandomCard = (cards, parentElement) => {

  let index = Math.floor(Math.random() * cards.length);

  // Remove a random card from deck
  let card = cards.splice(index, 1).pop().cloneNode(true);

  // Adds same element (possibly) many times
  parentElement.appendChild(card);

  return cards

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

  /*
   * Create main container
   */
  let samplingArea = document.createElement("div");
  samplingArea.id = "samplingArea";
  samplingArea.appendChild(createTextDiv(
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
    let cards = createCards(
      document.getElementById("playersInput").value);
    samplingArea = document.getElementById("samplingArea");
    samplingArea.innerHTML = "";
    samplingArea.appendChild(createTextDiv(
      "Tap screen to draw cards!"));
    // Add click (tap) detection to all over main container.
    // Triggers new random cards appearing on screen
    samplingArea.addEventListener("click", () => {
      cards = cards.length ? drawRandomCard(cards, samplingArea) : cards
      // Set as a capturing event, so it won't be captured by the button event
      // that is bubbling under as a child.
    }, true);
  }, false);

  /*
   * Render - Append elements to document
   */
  controlPanel.appendChild(playersInput);
  controlPanel.appendChild(startButton);
  samplingArea.appendChild(controlPanel);
  document.body.appendChild(samplingArea);

  return true

}


/*
 * Run app
 */
let status = App();
