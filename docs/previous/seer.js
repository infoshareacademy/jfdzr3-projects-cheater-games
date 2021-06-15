"use strict";

export const seer = () => {
    const btnFightStart = document.querySelector(".fight"); // storing button into variable
    const answerButton = document.querySelector(".riddle__answer"); // storing button into variable
    const btnChoseMonster = document.querySelector(".chose__monster");
    // const monsterPicture = document.querySelector(".monster__portrait");
    const heartOne = document.querySelector("#heart1");
    const heartTwo = document.querySelector("#heart2");
    const heartThree = document.querySelector("#heart3");
    let lostCounter = 0;
    const monsterStatistics = document.querySelector(".monster__stats");
    const plotStoryFirst = document.querySelector("#first_paragraph");
    const plotStorySecond = document.querySelector("#second_paragraph");
    const plotStoryThird = document.querySelector("#third_paragraph");
    const plotStoryFourth = document.querySelector("#fourth_paragraph");
    const seersPortrait = document.querySelector("#monster__pic");
    const riddle = document.querySelector(".riddle");
    const riddleAnswers = document.querySelector(".riddle__answers");
    const firstPack = document.querySelector(".first__pack");
    const secondPack = document.querySelector(".second__pack");
    const riddleOptions = document.querySelector(".riddle__options");

    btnChoseMonster.classList.add("not__visible");
    btnFightStart.classList.add("not__visible");
    monsterStatistics.innerHTML = "";

    // monsterStatistics.classList.add('hidden');
    //Player's stats stored in object
    const playerStats = {
        level: 1,
        power: 1,
        toughness: 1,
    };

    plotStoryFirst.innerHTML =
        "Minęło trochę czasu, zanim udało ci się przedrzeć przez kolejne zarośla. Przez moment wydawało ci się, że spotkanie z kolejnym potworem byłoby ciekawsze niż cięcie kolejnych pnączy i gałęzi. W końcu jednak twoje wysiłki zostały nagrodzone, a twoim oczom ukazała się polana.";
    plotStorySecond.innerHTML = "Z lekkim niepokojem zbliżasz się do stojącej na środku polany dziwnej chatki na kurzej nóżce. Powoli wdrapujesz się po schodkach i stajesz przed drzwiami. Już masz zapukać, gdy drzwi otwierają się z lekkim skrzypieniem."
    plotStoryThird.innerHTML = "Wewnątrz chatki, wśród niezliczonej ilości szklanych retort, fiolek, probówek, dziwnych składników, kurzu i starych zwojów, siedzi spokojnie dziwny starzec i przygląda ci się z uwagą. W jego oczach dostrzegasz iskierki pewnego rozbawienia i zaciekawienia."
    plotStoryFourth.innerHTML = "- Witaj - zwraca się do Ciebie. - Czy przyszedłeś po moją zagadkę? Oto ona:";


    let maxHP = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
    let maxExp = parseInt(((4 * Math.pow(playerStats.level, 2)) / 5) * 100);

    let fightWon = null;
    let fightLost = null;
    let hpActual = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
    let hpBarActual = (hpActual / maxHP) * 100; //starting position of HP Bar
    let progress = 0;
    let progressActual = 0; //starting position of XP Bar
    let winCounter = 0; //declaring number of wins counter
    let fightArea = document.querySelector(".fighting__bar--actual"); // storing fight area into variable
    let fightAreaActual = 80; //starting size of winning area on fighting bar
    fightArea.style.width = fightAreaActual - winCounter * 5 + "%";
    const walkingDead = document.querySelector(".moving__thing");

    fightArea.classList.add("not__visible");
    walkingDead.classList.add("not__visible");
    // let direction = 1;

    const newLevel = document.querySelector(".new__level");
    const character = document.querySelector("#character");
    const charPower = document.querySelector("#char__power");
    const charToughness = document.querySelector("#char__toughness");
    const charHP = document.querySelector("#char__hp");
    const charXP = document.querySelector("#char__xp");
    const charWins = document.querySelector("#char__wins");

    // const monsterName = document.querySelector("#monster__name");
    // const monsterLevel = document.querySelector("#monster__level");
    // const monsterPower = document.querySelector("#monster__power");
    // const monsterToughness = document.querySelector("#monster__toughness");

    const renderUI = () => {
        // fightResultContainer
        const fightResultContainer = document.querySelector(".fight__result");
        const hpBarProgress = document.querySelector(".hp__bar--actual");
        const barProgress = document.querySelector(".progress__bar--actual");
        const barProgressDisplay = document.querySelector(".progress__bar");

        // fightResultContainer.innerHTML = messages[roundResult];

        const seersImage = document.createElement("img");
        seersImage.src = "seer.png";
        seersImage.classList.add("monster__portrait");
        seersImage.style.display = "block";
        seersImage.style.marginTop = "60px";
        monsterStatistics.appendChild(seersImage);

        barProgress.innerHTML = progressActual + "%";
        barProgress.style.width = progressActual + "%";

        // barProgressDisplay.innerHTML = progressActual + "%";

        hpBarProgress.innerHTML = hpBarActual.toFixed(2) + "%";
        hpBarProgress.style.width = hpBarActual.toFixed(2) + "%";

        const buttonFight = document.querySelector(".fight");
        // buttonFight.innerHTML = buttonMsg[buttonState];

        fightArea.style.width = fightAreaActual - winCounter * 5 + "%";

        character.innerHTML = "Poziom: " + playerStats.level;
        charPower.innerHTML = "Siła: " + playerStats.power;
        charToughness.innerHTML = "Wytrzymałość: " + playerStats.toughness;
        charHP.innerHTML =
            "Punkty życia: " + parseInt(hpActual) + "/" + parseInt(maxHP);
        charXP.innerHTML =
            "Doświadczenie: " + parseInt(progress) + "/" + parseInt(maxExp);
        charWins.innerHTML = "Wygranych z rzędu: " + winCounter;

        seersPortrait.style.src = "url(seer.png)";

        // monsterName.innerHTML = "Nazwa: " + monsterStats.name;
        // monsterLevel.innerHTML = "Poziom: " + monsterLevelStats;
        // monsterPower.innerHTML = "Siła: " + monsterStats.power;
        // monsterToughness.innerHTML = "Wytrzymałość: " + monsterStats.toughness;

        // console.log(selectedMonster.pic);
        // console.log(monsterPicture.src);

        // if (monsterLevelStats === "-") {
        //     btnChoseMonster.disabled = false;
        //     btnChoseMonster.classList.remove("disable");
        //     btnFightStart.disabled = true;
        //     btnFightStart.classList.add("disable");
        // }

        // if (monsterLevelStats != "-") {
        //     btnChoseMonster.disabled = true;
        //     btnChoseMonster.classList.add("disable");
        // }
    };

    renderUI();

    const riddleSet = [{
            description: "1. Cegła waży kilogram i pół cegły. Ile waży cegła?",
            option1: "2 kilogramy",
            option2: "4 kilogramy",
            option3: "3 kilogramy",
            option4: "5 kilogramów",
            correctAnswer: "2 kilogramy",
            difficulty: "1",
            reward: "5",
        },
        {
            description: "2. Cegła waży kilogram i pół cegły. Ile waży cegła?",
            option1: "2 kilogramy",
            option2: "4 kilogramy",
            option3: "3 kilogramy",
            option4: "5 kilogramów",
            correctAnswer: "2 kilogramy",
            difficulty: "1",
            reward: "5",
        },
        {
            description: "3. Cegła waży kilogram i pół cegły. Ile waży cegła?",
            option1: "2 kilogramy",
            option2: "4 kilogramy",
            option3: "3 kilogramy",
            option4: "5 kilogramów",
            correctAnswer: "2 kilogramy",
            difficulty: "1",
            reward: "5",
        },
    ]

    const displayRiddle = () => {

        firstPack.classList.remove("not__visible");
        secondPack.classList.remove("not__visible");
        riddleOptions.classList.remove("not__visible");
        answerButton.classList.remove("not__visible");

        let chosenRiddle = riddleSet[Math.floor(Math.random() * riddleSet.length)];
        const firstAnswer = document.querySelector('#first__option');
        const secondAnswer = document.querySelector('#second__option');
        const thirdAnswer = document.querySelector('#third__option');
        const fourthAnswer = document.querySelector('#fourth__option');

        //Display description of the riddle
        let riddleDisplayParagraph = document.createElement("p");
        riddleDisplayParagraph.classList.add('plot__story');
        riddleDisplayParagraph.innerHTML = chosenRiddle.description;
        plotStoryFourth.appendChild(riddleDisplayParagraph);

        //Display options
        riddle.classList.remove('not__visible');
        riddleAnswers.classList.remove('not__visible');

        firstAnswer.innerHTML = chosenRiddle.option1;
        secondAnswer.innerHTML = chosenRiddle.option2;
        thirdAnswer.innerHTML = chosenRiddle.option3;
        fourthAnswer.innerHTML = chosenRiddle.option4;
    }

    displayRiddle();

    const resolveRiddle = (chosenRiddle, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer) => {
        const firstAnswerChecked = document.querySelector("#riddle__first:checked");
        const secondAnswerChecked = document.querySelector("#riddle__second:checked");
        const thirdAnswerChecked = document.querySelector("#riddle__third:checked");
        const fourthAnswerChecked = document.querySelector("#riddle__fourth:checked");

        console.log(firstAnswerChecked);
        console.log(secondAnswerChecked);
        console.log(thirdAnswerChecked);
        console.log(fourthAnswerChecked);

        // const firstAnswerValue = 

        if (chosenRiddle.correctAnswer === firstAnswerChecked) {
            console.log("Wygrana");
            return;
        } else {
            console.log("Przegrana");
        }
        // if (chosenRiddle.correctAnswer === secondAnswer) {
        //     console.log("Wygrana");
        //     return;
        // } else {
        //     console.log("Przegrana");
        // }
        // if (chosenRiddle.correctAnswer === thirdAnswer) {
        //     console.log("Wygrana");
        //     return;
        // } else {
        //     console.log("Przegrana");
        // }
        // if (chosenRiddle.correctAnswer === fourthAnswer) {
        //     console.log("Wygrana");
        //     return;
        // } else {
        //     console.log("Przegrana");
        // }

    }

    answerButton.addEventListener('click', resolveRiddle);
};

// seer();