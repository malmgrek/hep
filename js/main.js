// var blueDefence = document.createElement("div")
// blueDefence.className = "card b"
// var symbol = document.createElement("span");
// symbol.className = "symbol"
// symbol.appendChild(document.createTextNode("BD"));
// blueDefence.appendChild(symbol)

function createCard(backgroundColor, text) {

    var card = document.createElement("div")
    card.className = "card"
    card.style.backgroundColor = backgroundColor

    var cardText = document.createElement("span")
    cardText.className = "cardText"
    cardText.appendChild(document.createTextNode(text))

    card.appendChild(cardText)
    return card
}

const BD = createCard("#00f", "BD")
const BA = createCard("#00f", "BA")
const RD = createCard("#f00", "RD")
const RA = createCard("#f00", "RA")
const totenkopf = createCard("#333", "\u2620")

function generateCard() {
    var suitsInner = [
        "hearts",
        "spades",
        "diamond",
        "clubs"
    ];
    var suitsOuter = [
        "hearts",
        "spades",
        "diams",
        "clubs"
    ];
    var ranksInner = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
    var ranksOuter = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k']
    var suitIndex = Math.floor(Math.random() * suitsOuter.length)
    var suit = [
        suitsOuter[suitIndex],
        suitsInner[suitIndex]
    ];
    var rankIndex = Math.floor(Math.random() * ranksOuter.length);
    var rank = [
        ranksOuter[rankIndex],
        ranksInner[rankIndex]
    ];
    document.getElementById(
        "cardArea"
    ).innerHTML += "<div class='card rank-"
        + rank[0] + " "
        + suit[0]
        + "'><span class='rank'>"
        + rank[1]
        + "</span><span class='suit'>&"
        + suit[1] + ";</span></div>";
}

function flush() {
    document.getElementById("cardArea").innerHTML = "";
}
