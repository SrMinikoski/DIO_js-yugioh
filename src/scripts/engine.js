const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.querySelector('#score-point'),
    },
    cardSprites: {
        avatar: document.getElementById("card-img"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        playerCard: document.getElementById("player-field-card"),
        computerCard: document.getElementById("computer-field-card"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const pathImg = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue-Eyes White Dragon",
        type: "Paper",
        img: `${pathImg}dragon.png`,
        WinOf: [1],
        LoosOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImg}magician.png`,
        WinOf: [2],
        LoosOf: [0],
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImg}exodia.png`,
        WinOf: [0],
        LoosOf: [1],
    }
]
const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
    player1Box: document.querySelector("#player-cards"),
    computerBox: document.querySelector("#computer-cards"),
}

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {

    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
        cardImage.addEventListener("mouseover", () => {
            drawSelectedCard(IdCard);
        });


    }

    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.playerCard.style.display = "block";
    state.fieldCards.computerCard.style.display = "block";

    state.fieldCards.playerCard.src = cardData[cardId].img;
    state.fieldCards.computerCard.src = cardData[computerCardId].img;

    // let duelResult = checkDuelResult(cardId, computerCardId);

    // await updateScore();
    // await drawButton(duelResult);

}

async function removeAllCardsImages() {
    let cards = playerSides.computerBox;
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => {
        img.remove();
    });

    cards = playerSides.player1Box;
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => {
        img.remove();
    });
}



async function drawSelectedCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = `Atribute: ${cardData[index].type}`;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard,
            fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();