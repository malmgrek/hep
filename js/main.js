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


function createCards(length = 4) {
    let cardArray = [
        blue_defense, blue_offense, red_defense, red_offense
    ].concat(
        Array(length - 4).fill(fu)
    )
    return {array: cardArray, mutated: false}
}


// ====================================
// NOTE: Let's create this mutable
//       object here.
//
// TODO: Can we put this at the bottom?
let cards = {array: [], mutated: false}
// ====================================


// TODO: d = document as argument
function drawCard(cards) {
    let index = Math.floor(Math.random() * cards.array.length)
    document.getElementById("container").appendChild(
        // Adds same element (possibly) many times
        cards.array.splice(index, 1).pop().cloneNode(true)
    )
    cards.mutated = true
}


function createContainer(d) {

    const mutate = () => {
        cards.mutated = true
    }

    let container = d.createElement("div")
    container.id = "container"
    container.onclick = () => {
        (cards.mutated && cards.array.length) ?
            drawCard(cards) : mutate()
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
    start.appendChild(d.createTextNode("Hep!"))
    start.onclick = () => {
        cards = createCards(
            d.getElementById("number-of-cards").value
        )
        container = d.getElementById("container")
        container.innerHTML = ""
        container.appendChild(
            createInfo(d, "Tap screen to draw cards!")
        )
    }

    panel.appendChild(input)
    panel.appendChild(start)

    return panel
}


function createInfo(d, text) {
    let div = d.createElement("div")
    let p = d.createElement("p")
    p.appendChild(d.createTextNode(text))
    p.style.fontSize = "5vh"
    p.style.fontFamily = "Courier"
    div.appendChild(p)
    return div
}


//
// Build document body
//

container = createContainer(document)
container.appendChild(
    createInfo(
        document,
        "Select the number of players and click Hep!"
    )
)
container.appendChild(createPanel(document))
document.body.appendChild(container)
