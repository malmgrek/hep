/*
 * Hep! Random draw foosball teams.
 */


function createCard(backgroundColor, text, fontSize = "20vw") {

    let card = document.createElement("div")
    card.className = "card"
    card.style.backgroundColor = backgroundColor

    let cardText = document.createElement("span")
    cardText.className = "cardText"
    cardText.style.fontSize = fontSize
    cardText.appendChild(document.createTextNode(text))

    card.appendChild(cardText)
    return card
}


const blue_defense = createCard("#1e90ff", "BD")
const blue_offense = createCard("#1e90ff", "BO")
const red_defense = createCard("#dc143c", "RD")
const red_offense = createCard("#dc143c", "RO")
const totenkopf = createCard("#666", "\u2620", "20vw")
const radioactive = createCard("#ffd700", "\u2622", "20vw")
const fu = createCard("#666", "🖕", "20vw")



/**
 * Create a container object for the card deck
 */
function createCards(length = 4) {
    let cardArray = [
        blue_defense, blue_offense, red_defense, red_offense
    ].concat(
        Array(length - 4).fill(fu)
    )
    return {array: cardArray, mutated: false}
}


// ====================================
// Create a mutable container of cards
// drawn so far.
let cards = {array: [], mutated: false}
// ====================================


/**
 * Take a card from the card container and add to "container"
 */
function drawCard(cards) {
    let index = Math.floor(Math.random() * cards.array.length)
    document.getElementById("container").appendChild(
        // Adds same element (possibly) many times
        cards.array.splice(index, 1).pop().cloneNode(true)
    )
    cards.mutated = true
}


/**
 * Create a container where we can draw new cards by tapping
 */
function createContainer() {

    const mutate = () => {
        cards.mutated = true
    }

    let container = document.createElement("div")
    container.id = "container"
    container.addEventListener("click", () => {
        (cards.mutated && cards.array.length) ?
            drawCard(cards) : mutate()
    })
    return container
}


/**
 * Build the main component
 */
function createPanel() {

    let panel = document.createElement("div")
    panel.className = "panel"

    let input = document.createElement("input")
    input.type = "number"
    input.id = "number-of-cards"
    input.min = 4
    input.value = 4
    input.autocomplete = "off"

    let start = document.createElement("button")
    start.id = "start"
    start.appendChild(document.createTextNode("Hep!"))
    start.addEventListener("click", () => {
        cards = createCards(document.getElementById("number-of-cards").value)
        container = document.getElementById("container")
        container.innerHTML = ""
        container.appendChild(createInfo(document, "Tap screen to draw cards!"))
    })

    panel.appendChild(input)
    panel.appendChild(start)

    return panel
}


function createInfo(text) {
    let div = document.createElement("div")
    let p = document.createElement("p")
    p.appendChild(document.createTextNode(text))
    p.style.fontSize = "5vh"
    p.style.fontFamily = "Courier"
    div.appendChild(p)
    return div
}


//
// Build document body
//

container = createContainer()
container.appendChild(createInfo(
    "Select the number of players and click Hep!"
))
container.appendChild(createPanel())
document.body.appendChild(container)
