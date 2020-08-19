/*
 * TODO: Features
 * - When card list is empty, write an info message
 * - All CSS to main.js
 * - New card should appear so that it is visible
 *   on mobile phone screen at all times
 *
 */


function createCard(backgroundColor, text, fontSize = "50px") {

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


const BD = createCard("#00f", "BD")
const BA = createCard("#00f", "BA")
const RD = createCard("#f00", "RD")
const RA = createCard("#f00", "RA")
const totenkopf = createCard("#666", "\u2620", "80px")


function createCardArray(length = 4) {
    return [BD, BA, RD, RA].concat(
        Array(
            // Number(
            //     document.getElementById("number-of-cards").value
            // ) - 4
            length - 4
        ).fill(totenkopf)
    )
}


// ===============================
// NOTE: Let's create this mutable
//       object here!
//
let cards = createCardArray()
// ===============================


function drawCard(cards) {
    // Draw (and remove) a card
    index = Math.floor(Math.random() * cards.length)
    document.getElementById("cards").appendChild(
        cards.splice(index, 1).pop().cloneNode(true)  // Adds same element many times
    )
}


function wipe() {
    // Wipe the card space
    document.getElementById("cards").innerHTML = ""
    cards = createCardArray(
        document.getElementById("number-of-cards").value
    )
}



function createButton(text, onclick) {
    let elem = document.createElement("button")
    elem.onclick = onclick
    elem.appendChild(document.createTextNode(text))
    return elem
}


//
// Build document body
//

document.body.appendChild(createButton("Draw", () => drawCard(cards)))
document.body.appendChild(createButton("Wipe", wipe))
document.body.appendChild((
    () => {
        let elem = document.createElement("input")
        elem.type = "number"
        elem.id = "number-of-cards"
        elem.min = 4
        elem.value = 4
        elem.autocomplete = "off"
        elem.oninput = wipe
        return elem
    }
)())
document.body.appendChild((
    () => {
        let elem = document.createElement("div")
        elem.id = "cards"
        elem.className = "cardSet"
        return elem
    }
)())
