"use strict";

import { monsterEncounter } from "./script2.js";

const init = () => {
    const btnFightStart = document.querySelector(".fight"); // storing button into variable
    const btnChoseMonster = document.querySelector(".chose__monster");
    const walkingDead = document.querySelector(".moving__thing");

    btnFightStart.classList.add("not__visible");
    btnChoseMonster.classList.add("not__visible");
    walkingDead.classList.add("not__visible");
}

const mainGame = () => {

    const monsterStatistics = document.querySelector(".monster__stats");
    const plotStoryFirst = document.querySelector("#first_paragraph");
    const plotStorySecond = document.querySelector("#second_paragraph");
    const plotStoryThird = document.querySelector("#third_paragraph");
    const plotStoryFourth = document.querySelector("#fourth_paragraph");

    init();

    monsterStatistics.innerHTML = "";

    //Player's stats stored in object
    const playerStats = {
        level: 1,
        power: 1,
        toughness: 1,
    };

    plotStoryFirst.innerHTML =
        "Lekkie drżenie serca towarzyszy ci, gdy opuszczasz bezpieczne schronienie w Obozowisku Łowców. Czujesz jednak dreszcz podniecenia. Oto kolejne polowanie może się wreszcie rozpocząć, a ty już teraz wiesz, że musi być udane. Powoli podążasz ścieżką w głąb przepastnej kniei. Tu jeszcze drzewa nie rosną tak gęsto. Wkrótce się to jednakże zmieni.";
    plotStorySecond.innerHTML = "Długo musisz iść przed siebie, bacznie nasłuchując odgłosów puszczy. W tych zaroślach po obydwu stronach ścieżki może się czaić jakieś monstrum."
    plotStoryThird.innerHTML = "W końcu docierasz w końcu do rozwidlenia. W jakim kierunku dalej podążysz?"
    plotStoryFourth.innerHTML = "";


    let maxHP = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
    let maxExp = parseInt(((4 * Math.pow(playerStats.level, 2)) / 5) * 100);

    let hpActual = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
    let hpBarActual = (hpActual / maxHP) * 100; //starting position of HP Bar
    let progress = 0;
    let progressActual = 0; //starting position of XP Bar
    let winCounter = 0; //declaring number of wins counter

    let fightAreaActual = 80; //starting size of winning area on fighting bar


    const renderUI = () => {
        // fightResultContainer

        const character = document.querySelector("#character");
        const charPower = document.querySelector("#char__power");
        const charToughness = document.querySelector("#char__toughness");
        const charHP = document.querySelector("#char__hp");
        const charXP = document.querySelector("#char__xp");
        const charWins = document.querySelector("#char__wins");

        let fightArea = document.querySelector(".fighting__bar--actual"); // storing fight area into variable
        fightArea.style.width = fightAreaActual - winCounter * 5 + "%";
        fightArea.classList.add("not__visible");

        const hpBarProgress = document.querySelector(".hp__bar--actual");
        const barProgress = document.querySelector(".progress__bar--actual");


        const seersImage = document.createElement("img");
        seersImage.src = "tent.png";
        seersImage.classList.add("monster__portrait");
        seersImage.style.display = "block";
        seersImage.style.marginTop = "60px";
        monsterStatistics.appendChild(seersImage);

        barProgress.innerHTML = progressActual + "%";
        barProgress.style.width = progressActual + "%";

        hpBarProgress.innerHTML = hpBarActual.toFixed(2) + "%";
        hpBarProgress.style.width = hpBarActual.toFixed(2) + "%";

        fightArea.style.width = fightAreaActual - winCounter * 5 + "%";

        character.innerHTML = "Poziom: " + playerStats.level;
        charPower.innerHTML = "Siła: " + playerStats.power;
        charToughness.innerHTML = "Wytrzymałość: " + playerStats.toughness;
        charHP.innerHTML =
            "Punkty życia: " + parseInt(hpActual) + "/" + parseInt(maxHP);
        charXP.innerHTML =
            "Doświadczenie: " + parseInt(progress) + "/" + parseInt(maxExp);
        charWins.innerHTML = "Wygranych z rzędu: " + winCounter;

    };

    renderUI();

    let chooseWay = document.querySelector(".green__arrow");
    let chooseWay2 = document.querySelector(".green__arrow2");
    let chooseWay3 = document.querySelector(".green__arrow3");

    chooseWay.classList.remove("not__visible");
    chooseWay2.classList.remove("not__visible");
    chooseWay3.classList.remove("not__visible");

    const renderNewLocation = () => {
        monsterEncounter();
    }

    console.log(chooseWay);
    chooseWay.addEventListener('click', renderNewLocation);
};

mainGame();