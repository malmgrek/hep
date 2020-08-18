/*
 * TODO: Features
 * - If number of participants changes, then flush
 *   - Can be done with event listeners
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


let cards = createCardArray()


function drawCard(cards) {
    // TODO: cards to input
    index = Math.floor(Math.random() * cards.length)
    document.getElementById("cards").appendChild(
        cards.splice(index, 1).pop().cloneNode(true)  // Adds same element many times
    )
}


function wipe() {
    document.getElementById("cards").innerHTML = ""
    cards = createCardArray(
        document.getElementById("number-of-cards").value
    )
}
