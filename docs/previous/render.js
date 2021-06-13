"use strict";

import { variables } from "./variables.js";

export const renderUI = () => {
    variables();
    // fightResultContainer

    let roundResult = "waiting"; //Initial state of round result

    const messages = {
        //Fight state's messages
        waiting: "Oczekiwanie na pojedynek",
        fighting: "Trwa walka",
        win: "Uff! To było mocne! Twój przeciwnik zwija się z bólu!",
        lost: "Otrzymujesz potężny cios, który niemalże zwalił cię z nóg!",
        nodmg: "Twoje uderzenie było za słabe, żeby wyrządzić jakąkolwiek krzywdę przeciwnikowi.",
        draw: "Remis.",
        levelup: "Gratulacje, osiągasz nowy poziom. Twój poziom teraz to ",
    };

    const fightResultContainer = document.querySelector(".fight__result");
    const hpBarProgress = document.querySelector(".hp__bar--actual");
    const barProgress = document.querySelector(".progress__bar--actual");
    const barProgressDisplay = document.querySelector(".progress__bar");

    fightResultContainer.innerHTML = messages[roundResult];

    barProgress.innerHTML = progressActual + "%";
    barProgress.style.width = progressActual + "%";

    // barProgressDisplay.innerHTML = progressActual + "%";

    hpBarProgress.innerHTML = hpBarActual.toFixed(2) + "%";
    hpBarProgress.style.width = hpBarActual.toFixed(2) + "%";

    const buttonFight = document.querySelector(".fight");
    buttonFight.innerHTML = buttonMsg[buttonState];

    fightArea.style.width = fightAreaActual - winCounter * 5 + "%";

    character.innerHTML = "Poziom: " + playerStats.level;
    charPower.innerHTML = "Siła: " + playerStats.power;
    charToughness.innerHTML = "Wytrzymałość: " + playerStats.toughness;
    charHP.innerHTML = "Punkty życia: " + parseInt(hpActual);
    charWins.innerHTML = "Wygranych z rzędu: " + winCounter;

    monsterName.innerHTML = "Nazwa: " + monsterStats.name;
    monsterLevel.innerHTML = "Poziom: " + monsterLevelStats;
    monsterPower.innerHTML = "Siła: " + monsterStats.power;
    monsterToughness.innerHTML = "Wytrzymałość: " + monsterStats.toughness;

    // console.log(selectedMonster.pic);
    // console.log(monsterPicture.src);

    if (monsterLevelStats === "-") {
        btnChoseMonster.disabled = false;
        btnChoseMonster.classList.remove("disable");
        btnFightStart.disabled = true;
        btnFightStart.classList.add("disable");
    }

    if (monsterLevelStats != "-") {
        btnChoseMonster.disabled = true;
        btnChoseMonster.classList.add("disable");
    }
};