/*
 * TODO: Features
 * - When card list is empty, write an info message
 * - All CSS to main.js
 * - New card should appear so that it is visible
 *   on mobile phone screen at all times
 *
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


const BD = createCard("#1e90ff", "BD")
const BA = createCard("#1e90ff", "BA")
const RD = createCard("#dc143c", "RD")
const RA = createCard("#dc143c", "RA")
const totenkopf = createCard("#666", "\u2620", "20vw")
const radioactive = createCard("#666", "\u2622", "20vw")
const fu = createCard("#666", "🖕", "80px")


function createCards(length = 4) {
    let cardArray = [BD, BA, RD, RA].concat(
        Array(length - 4).fill(radioactive)
    )
    return {array: cardArray, mutated: false}
}


// ===============================
// NOTE: Let's create this mutable
//       object here!
//
let cards = {array: [], mutated: false}
// TODO: let deck = [...cards].reverse()
// ===============================


function drawCard(cards) {
    // Draw (and remove) a card
    index = Math.floor(Math.random() * cards.array.length)
    // document.getElementById("container").innerHTML = ""
    document.getElementById("container").appendChild(
        cards.array.splice(index, 1).pop().cloneNode(true)  // Adds same element many times
    )
    cards.mutated = true
}


function createContainer() {

    const mutate = () => {
        cards.mutated = true
    }

    let container = document.createElement("div")
    container.id = "container"
    container.onclick = () => {
        (cards.mutated && cards.array.length) ? drawCard(cards) : mutate()
    }
    return container
}


function createPanel(d) {

    let panel = d.createElement("div")
    panel.className = "panel"

    let input = d.createElement("input")
    input.type = "number"
    input.id = "number-of-cards"
    input.min = 4
    input.value = 4
    input.autocomplete = "off"

    let start = d.createElement("button")
    start.id = "start"
    start.appendChild(d.createTextNode("Start"))
    start.onclick = () => {
        cards = createCards(
            d.getElementById("number-of-cards").value
        )
        container = d.getElementById("container")
        container.innerHTML = ""
    }

    panel.appendChild(input)
    panel.appendChild(start)

    return panel
}


//
// Build document body
//

container = createContainer()
container.appendChild(createPanel(document))
document.body.appendChild(container)
