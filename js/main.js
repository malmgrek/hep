/*
 * Hep! Random draw foosball teams
 */


/*
 * Creates a card div
 */
const Card = (bgColor, text, id = null, color = null, fontSize = "20vw") => {
  const cardText = document.createElement("span");
  cardText.className = "CardText";
  cardText.style.fontSize = fontSize;
  cardText.appendChild(document.createTextNode(text));
  const card = document.createElement("div");
  card.color = color;
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
  const blueDefense = Card("#1e90ff", "BD", "card0", "blue");
  const blueOffense = Card("#1e90ff", "BO", "card1", "blue");
  const redDefense = Card("#dc143c", "RD", "card2", "red");
  const redOffense = Card("#dc143c", "RO", "card3", "red");
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
const draw = (cardDeck, initialDeckSize, initialPrivileged) => {
  const dealt = initialDeckSize - cardDeck.length;
  const privileged = Math.max(initialPrivileged - dealt, 0);
  const maxIndex = (privileged > 0 ? 4 - dealt : cardDeck.length) - 1;
  const index = Math.floor(Math.random() * (maxIndex + 1));
  return {
    card: cardDeck[index],
    cardDeck: [...cardDeck.slice(0, index), ...cardDeck.slice(index + 1)]
  };
}


/**
 * Creates a div with a text
 */
const TextDiv = (text) => {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(text));
  p.style.fontSize = "5vw";
  p.style.fontFamily = "Courier";
  p.style.margin = "0 0 0 0";
  const div = document.createElement("div");
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
  const tappingArea = document.createElement("div");
  tappingArea.className = "TappingArea";

  /*
   * Create control panel
   */
  const controlPanel = document.createElement("div");
  controlPanel.className = "ControlPanel";

  // Input field that defines number of players
  const playersInput = document.createElement("input");
  playersInput.id = "playersInput"
  playersInput.type = "number";
  playersInput.min = 4;
  playersInput.value = 4;
  playersInput.autocomplete = "off";

  const privilegedInput = document.createElement("input");
  privilegedInput.id = "privilegedInput";
  privilegedInput.type = "number";
  privilegedInput.min = 0;
  privilegedInput.max = 4;
  privilegedInput.value = 0;

  const splitInput = document.createElement("input");
  splitInput.id = "splitInput";
  splitInput.type = "checkbox";
  splitInput.style.width = "50vw";
  splitInput.style.height = "15vw";
  splitInput.style.marginTop = "2vw";

  // Hep! button that initializes the card sampling loop
  const startButton = document.createElement("button");
  startButton.appendChild(document.createTextNode("Hep!"));
  // Button triggers re-creation of a new card deck
  // according player number given by the user
  startButton.addEventListener("click", () => {
    const initialDeckSize = document.getElementById("playersInput").value;
    const initialPrivileged = document.getElementById("privilegedInput").value;
    const split = document.getElementById("splitInput").checked;
    console.log(split);
    let cardDeck = createCardDeck(initialDeckSize);
    let drawResult = {};
    let teamCards = [];
    tappingArea.innerHTML = "";
    tappingArea.appendChild(TextDiv("Tap screen to draw cards!"));
    // Add click (tap) detection to all over main container.
    // Triggers new random cards appearing on screen
    tappingArea.addEventListener("click", () => {

      if (cardDeck.length) {
        drawResult = draw(cardDeck, initialDeckSize, initialPrivileged);
        if (split && (teamCards.length === 1)) {  // Possible re-draw
          while (drawResult.card.color === teamCards[0].color) {
            drawResult = draw(cardDeck, initialDeckSize, initialPrivileged)
          }
        }
        cardDeck = drawResult.cardDeck;
        teamCards = drawResult.card.color != null ?
          teamCards.concat([drawResult.card]) :
          teamCards;
        tappingArea.appendChild(drawResult.card);
      }

      // Set as a capturing event, so it won't be captured by the button event
      // that is bubbling under as a child.
    }, true);
  }, false);

  /*
   * Render - Append elements to document
   */
  controlPanel.appendChild(TextDiv("Number of players"));
  controlPanel.appendChild(playersInput);
  controlPanel.appendChild(TextDiv("Privileged players"));
  controlPanel.appendChild(privilegedInput);
  controlPanel.appendChild(TextDiv("Split first pair"))
  controlPanel.appendChild(splitInput);
  controlPanel.appendChild(startButton);
  tappingArea.appendChild(controlPanel);
  document.body.appendChild(tappingArea);

  return true

}


/*
 * Run application
 */
const status = App();
