"use strict";

// btnBattleStart
const hearingFightButton = document.querySelector("button"); // storing button into variable

let fightWon = null;
let fightLost = null;
let hpBarActual = 100; //starting position of HP Bar
let progressActual = 0; //starting position of XP Bar

const playerStats = { //Player's stats stored in object
    level: 3,
    power: 1,
    toughness: 2,
    hp: 100,
};

const monsterStats = { //Example monster's stats stored in object
    level: 1,
    power: 2,
    toughness: 1,
    hp: 100,
};

let roundResult = "waiting"; //Initial state of round result
let buttonState = "waiting"; //Initial state of button result

const buttonMsg = { //Button messages
    waiting: "Walcz",
    end: "Zakończ pojedynek",
}

const messages = { //Fight state's messages
    win: "Gratulacje, wygrana",
    lost: "Przykro mi, przegrałeś",
    draw: "Remis.",
    levelup: "Gratulacje, osiągasz nowy poziom. Twój poziom teraz to " +
        playerStats.level,
};

//Function that make the fighting bar move
// const fightingBar = () => {
//     const walkingDead = document.querySelector(".moving__thing");
//     let pos = 0;
//     let speed = 1.5;
//     let width = 2;
//     let direction = 1;
//     const move = () => {
//         walkingDead.style.marginLeft = pos + "%";
//         walkingDead.style.width = width + "%";

//         if (direction > 0 && pos + width >= 100) {
//             direction = -1;
//         }

//         if (direction < 0 && pos - width <= -100) {
//             direction = 1;
//         }

//         pos = Math.max(
//             pos + speed * direction,
//             width - 100,
//             Math.min(pos + speed * direction, 100 - width)
//         );

//         fightWon = requestAnimationFrame(move);
//     };

//     move();
// };

// let counter = 0;
// const walkingDead = document.querySelector('.moving__thing');
// walkingDead.animate([
//     {transform: 'translateX(2400%)'},
//     {transform: 'translateX(-2500%)'},
//     {transform: 'translateX(2400%)'},
// ], {
//     duration: 5000,
//     iterations: Infinity,
// })



const renderUI = () => {
    // fightResultContainer
    const getFightResult = document.querySelector(".fight__result");
    const hpBarProgress = document.querySelector(".hp__bar--actual");
    const barProgress = document.querySelector(".progress__bar--actual");

    getFightResult.innerHTML = messages[roundResult];

    barProgress.innerHTML = progressActual + "%";
    barProgress.style.width = progressActual + "%";

    hpBarProgress.innerHTML = hpBarActual + "%";
    hpBarProgress.style.width = hpBarActual + "%";

    const buttonFight = document.querySelector(".fight");
    buttonFight.innerHTML = buttonMsg[buttonState];
};

// const fightStop = () => {
//     buttonState = "waiting";
//     cancelAnimationFrame(fightWon);
// }

const getUserInput = (callback) => {
    // inputValue
    const givenNumber = Number(document.querySelector(".get__number").value);

    if (givenNumber > 20 || givenNumber < 1) {
        alert("Liczba powinna być w zakresie od 1 do 20");
        return;
    }
    callback(givenNumber);
};

const updateProgress = () => {
    console.log(59, playerStats);
    progressActual = progressActual + playerStats.power * 50;
    console.log(61, playerStats);
};

const updateHP = () => {
    hpBarActual =
        hpBarActual -
        (Math.pow(2, playerStats.level - playerStats.toughness) +
            monsterStats.power);
    console.log(
        66,
        Math.pow(2, playerStats.level - playerStats.toughness) + monsterStats.power
    );
    console.log(67, playerStats);
};

const updateLevel = () => {
    if (progressActual >= 100) {
        console.log(progressActual);
        progressActual = 0;
        hpBarActual = 100;
        roundResult = "levelup";
        playerStats.level++;
        playerStats.power++;
        playerStats.toughness++;
        playerStats.hp++;
        console.log(playerStats);
    }
};

const updateGameState = (givenNumber) => {
    // fightRange
    const choseOption = Math.floor(Math.random() * 10);
    // opponentNumber
    const choseOpponentNumber = Math.floor(Math.random() * 20 + 1);

    console.log(choseOption);
    console.log(choseOpponentNumber);

    console.log(givenNumber);

    // buttonState = "end";
    // hearingFightButton.removeEventListener("click", performFight);
    // hearingFightButton.addEventListener("click", fightStop);

    if (givenNumber === choseOpponentNumber) {
        roundResult = "draw";
        return;
    }

    if (choseOption >= 5) {
        if (givenNumber > choseOpponentNumber) {
            roundResult = "win";
            updateProgress();
            return;
        }

        roundResult = "lost";
        updateHP();
        return;
    } else {
        if (givenNumber < choseOpponentNumber) {
            roundResult = "win";
            updateProgress();
            return;
        }

        roundResult = "lost";
        updateHP();
        return;
    }
};

// Jest jedno kliknięcie do tyłu - po pierwszym kliknięciu wyświetla stan "Walcz", a tuż przed zmianą levela - console.log już wie, że jest nowy poziom ale przeglądarka jeszcze nie

const performFight = () => {
    // fightingBar();
    getUserInput(updateGameState);
    renderUI();
    //   updateLevel();
};

console.log(hearingFightButton);

hearingFightButton.addEventListener("click", performFight);