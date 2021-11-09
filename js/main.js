/*
 * Hep! Random draw foosball teams
 */


/*
 * Creates a card div
 */
const Card = (bgColor, text, id = null, fontSize = "20vw") => {

  let cardText = document.createElement("span");
  cardText.className = "CardText";
  cardText.style.fontSize = fontSize;
  cardText.appendChild(document.createTextNode(text));

  let card = document.createElement("div");
  card.className = "Card";
  card.id = id;
  card.style.backgroundColor = bgColor;
  card.appendChild(cardText);

  return card
}


/*
 * Creates a card deck with fixed order
 */
const createCardDeck = (length = 4) => {
  // Add unique id's to each card div so that (possible) multiple
  // instances of same card can be added to container element
  const blueDefense = Card("#1e90ff", "BD", "card0");
  const blueOffense = Card("#1e90ff", "BO", "card1");
  const redDefense = Card("#dc143c", "RD", "card2");
  const redOffense = Card("#dc143c", "RO", "card3");
  const middleFingers = [...Array(length - 4).keys()].map(
    i => Card("#666", "🖕", `Card${String(4 + i)}`));
  return [blueDefense,
          blueOffense,
          redDefense,
          redOffense].concat(middleFingers)
}


/*
 * Takes a random card from the card deck and adds it to parent element
 */
const drawRandomCard = (cardDeck, parentElement) => {
  let index = Math.floor(Math.random() * cardDeck.length);
  parentElement.appendChild(cardDeck[index]);
  return [...cardDeck.slice(0, index), ...cardDeck.slice(index + 1)]
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
