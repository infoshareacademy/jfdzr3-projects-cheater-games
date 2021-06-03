"use strict";

export const monsterEncounter = () => {
    const btnFightStart = document.querySelector(".fight"); // storing button into variable
    const btnChoseMonster = document.querySelector(".chose__monster");
    const monsterPicture = document.querySelector(".monster__portrait");
    const heartOne = document.querySelector("#heart1");
    const heartTwo = document.querySelector("#heart2");
    const heartThree = document.querySelector("#heart3");
    let lostCounter = 0;

    //Player's stats stored in object
    const playerStats = {
        level: 1,
        power: 1,
        toughness: 1,
    };

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

    let direction = 1;

    const newLevel = document.querySelector(".new__level");
    const character = document.querySelector("#character");
    const charPower = document.querySelector("#char__power");
    const charToughness = document.querySelector("#char__toughness");
    const charHP = document.querySelector("#char__hp");
    const charXP = document.querySelector("#char__xp");
    const charWins = document.querySelector("#char__wins");

    const monsterName = document.querySelector("#monster__name");
    const monsterLevel = document.querySelector("#monster__level");
    const monsterPower = document.querySelector("#monster__power");
    const monsterToughness = document.querySelector("#monster__toughness");
    const plotStoryFirst = document.querySelector("#first_paragraph");
    const plotStorySecond = document.querySelector("#second_paragraph");
    const plotStoryThird = document.querySelector("#third_paragraph");
    const plotStoryFourth = document.querySelector("#fourth_paragraph");

    const walkingDead = document.querySelector(".moving__thing");
    let pos = walkingDead.style.marginLeft;
    let width = 2;

    // Initial Monster stats
    let monsterLevelStats = "-";
    let monsterStats = {
        power: "-",
        toughness: "-",
        name: "-",
        hp: "-",
    };

    // Resetting Monster stats
    const monsterStatsReset = () => {
        monsterPicture.style.display = "none";
        monsterLevelStats = "-";
        monsterStats = {
            power: "-",
            toughness: "-",
            name: "-",
            pic: "-",
            hp: "-",
        };
    };

    const randomizeStats = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const monsterNames = [
        { name: "Grizzly", pic: "grizzly.png" },
        { name: "Wolf", pic: "wolf.png" },
        { name: "Spider", pic: "spider.png" },
        { name: "Rat", pic: "rat.png" },
        { name: "Zombie", pic: "zombie.png" },
        { name: "Skeleton", pic: "skeleton.png" },
        { name: "Bat", pic: "bat.png" },
        { name: "Goblin", pic: "goblin.png" },
        { name: "Orc", pic: "orc.png" },
        { name: "Giant", pic: "giant.png" },
    ];

    let selectedMonster;
    // = monsterNames[Math.floor(Math.random() * monsterNames.length)];

    // console.log(selectedMonster.pic);
    // console.log(selectedMonster.name);

    // const selectMonsterName = () => {
    //     selectedMonster = monsterNames[Math.floor(Math.random() * monsterNames.length)];
    // }

    // const selectMonsterPicture = () => {
    //     return monsterNames[Math.floor(Math.random() * monsterNames.length)].pic;
    // }

    const generateMonster = (playerStats) => {
        if (playerStats.level == 1) {
            selectedMonster =
                monsterNames[Math.floor(Math.random() * monsterNames.length)];
            (monsterLevelStats = randomizeStats(1, 4)),
            (monsterStats = {
                //Example monster's stats stored in object
                power: randomizeStats(1, monsterLevelStats + 4),
                toughness: randomizeStats(1, monsterLevelStats + 4),
                name: selectedMonster.name,
                pic: selectedMonster.pic,
                hp: 100,
            });
            return;
        }
        if (playerStats.level == 2) {
            selectedMonster =
                monsterNames[Math.floor(Math.random() * monsterNames.length)];
            (monsterLevelStats = randomizeStats(1, 5)),
            (monsterStats = {
                //Example monster's stats stored in object
                power: randomizeStats(1, monsterLevelStats + 4),
                toughness: randomizeStats(1, monsterLevelStats + 4),
                name: selectedMonster.name,
                pic: selectedMonster.pic,
                hp: 100,
            });
            return;
        }
        if (playerStats.level == 3) {
            selectedMonster =
                monsterNames[Math.floor(Math.random() * monsterNames.length)];
            (monsterLevelStats = randomizeStats(1, 6)),
            (monsterStats = {
                //Example monster's stats stored in object
                power: randomizeStats(1, monsterLevelStats + 4),
                toughness: randomizeStats(1, monsterLevelStats + 4),
                name: selectedMonster.name,
                pic: selectedMonster.pic,
                hp: 100,
            });
            return;
        }
        selectedMonster =
            monsterNames[Math.floor(Math.random() * monsterNames.length)];
        (monsterLevelStats = randomizeStats(
            playerStats.level - 2,
            playerStats.level + 3
        )),
        (monsterStats = {
            //Example monster's stats stored in object
            power: randomizeStats(monsterLevelStats - 1, monsterLevelStats + 4),
            toughness: randomizeStats(monsterLevelStats - 1, monsterLevelStats + 4),
            name: selectedMonster.name,
            pic: selectedMonster.pic,
            hp: 100,
        });
    };

    let roundResult = "waiting"; //Initial state of round result
    let buttonState = "waiting"; //Initial state of button result

    const buttonMsg = {
        //Button messages
        fight: "Walcz",
        end: "Zakończ pojedynek",
    };

    buttonState = "fight";

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

    //Function that make the fighting bar move
    const fightingBar = () => {
        buttonState = "end";
        let speed = 1.5;
        const move = () => {
            walkingDead.style.marginLeft = pos + "%";
            walkingDead.style.width = width + "%";

            if (direction > 0 && pos + width >= 100) {
                direction = -1;
            }

            if (direction < 0 && pos - width <= -100) {
                direction = 1;
            }

            pos = Math.max(
                pos +
                (speed +
                    winCounter * 0.3 +
                    playerStats.level * 0.3 +
                    monsterStats.power * 0.3) *
                direction,
                width - 100,
                Math.min(
                    pos +
                    (speed +
                        winCounter * 0.3 +
                        playerStats.level * 0.3 +
                        monsterStats.power * 0.3) *
                    direction,
                    100 - width
                )
            );

            fightWon = requestAnimationFrame(move);
        };

        move();
    };

    const renderUI = () => {
        // fightResultContainer
        const fightResultContainer = document.querySelector(".fight__result");
        const hpBarProgress = document.querySelector(".hp__bar--actual");
        const barProgress = document.querySelector(".progress__bar--actual");
        const barProgressDisplay = document.querySelector(".progress__bar");
        const staticMonsterText = document.querySelector(".monster__stats");

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
        charHP.innerHTML =
            "Punkty życia: " + parseInt(hpActual) + "/" + parseInt(maxHP);
        charXP.innerHTML =
            "Doświadczenie: " + parseInt(progress) + "/" + parseInt(maxExp);
        charWins.innerHTML = "Trafień z rzędu: " + winCounter;

        // staticMonsterText.innerHTML = "Statystyki potwora:";
        monsterName.innerHTML = "Nazwa: " + monsterStats.name;
        monsterLevel.innerHTML = "Poziom: " + monsterLevelStats;
        monsterPower.innerHTML = "Siła: " + monsterStats.power;
        monsterToughness.innerHTML = "Wytrzymałość: " + monsterStats.toughness;

        plotStoryFirst.innerHTML =
            "Zdecydowanie wygląda na to, że to nie jest twój dzień. Po przedarciu się z wielką determinacją przez kolejne chaszcze, stwierdzasz z przerażeniem, że przyjdzie ci się zmierzyć z przerażającym przeciwnikiem. Przygotuj się do obrony, gdyż naprzeciwko ciebie stoi " +
            monsterStats.name +
            " i szykuje się do walki. Broń się!";
        plotStoryThird.classList.add('not__visible');
        plotStoryFourth.classList.add('not__visible');
        plotStorySecond.classList.add('not__visible');

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

    renderUI();

    const clock = document.querySelector("#clockdiv");

    const countdownClock = () => {
        function getTimeRemaining(endtime) {
            const total = Date.parse(endtime) - Date.parse(new Date());
            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);

            return {
                total,
                minutes,
                seconds,
            };
        }

        function initializeClock(endtime) {
            clock.style.display = "block";
            const minutesSpan = clock.querySelector(".minutes");
            const secondsSpan = clock.querySelector(".seconds");

            function updateClock() {
                const t = getTimeRemaining(endtime);

                minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
                secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

                if (t.total <= 0) {
                    clock.style.display = "none";
                    btnFightStart.style.display = "unset";
                    heartOne.style.visibility = "unset";
                    heartTwo.style.visibility = "unset";
                    heartThree.style.visibility = "unset";
                    newLevel.style.display = "none";
                    roundResult = "waiting";
                    monsterStatsReset();
                    renderUI();
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            const timeinterval = setInterval(updateClock, 1000);
        }

        let deadline;

        if (document.cookie && document.cookie.match("myClock")) {
            deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
        } else {
            const timeInMinutes = 5;
            const currentTime = Date.parse(new Date());
            deadline = new Date(currentTime + timeInMinutes * 60 * 1000);

            document.cookie =
                "myClock=" + deadline + "; path=/; domain=.yourdomain.com";
        }

        initializeClock(deadline);
    };

    const startCountdown = () => {
        btnFightStart.style.display = "none";
        countdownClock();
    };

    const updateProgress = () => {
        winCounter++;
        if (playerStats.power * 2 * winCounter - monsterStats.toughness <= 0) {
            roundResult = "nodmg";
        } else {
            progress =
                progress +
                parseInt(playerStats.power * 2 * winCounter - monsterStats.toughness);
        }
        progressActual = ((progress / maxExp) * 100).toFixed(2);
        newLevel.style.display = "none";
        updateLevel();
    };

    const updateHP = () => {
        // console.log(hp);
        if (
            2 * monsterStats.power - 1.5 * playerStats.toughness + monsterLevelStats <
            3
        ) {
            hpActual = hpActual - 2;
        }
        hpActual =
            hpActual -
            (2 * monsterStats.power -
                1.5 * playerStats.toughness +
                monsterLevelStats);
        hpBarActual = (hpActual / maxHP) * 100;
        // console.log(hp);
        newLevel.style.display = "none";
        updateLives();
    };

    const updateLevel = () => {
        if (progressActual >= 100) {
            progressActual = 0;
            hpBarActual = 100;
            playerStats.level++;
            playerStats.power++;
            playerStats.toughness++;
            maxHP = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
            hpActual = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
            maxExp = parseInt(((4 * Math.pow(playerStats.level, 2)) / 5) * 100);
            progress = 0;
            winCounter = 0;
            newLevel.style.display = "unset";
            newLevel.innerHTML =
                "Wzrost doświadczenia zaowocował zwiększeniem Twoich umiejętności. Twój nowy poziom to " +
                playerStats.level;
            character.innerHTML = "Poziom: " + playerStats.level;
            monsterStatsReset();
        }
    };

    const updateLives = () => {
        if (hpActual <= 0 && lostCounter === 0) {
            hpBarActual = 100;
            heartThree.style.visibility = "hidden";
            newLevel.style.display = "unset";
            newLevel.innerHTML =
                "Niestety! Walka z " +
                monsterStats.name +
                " zakończyła się twoją porażką";
            hpActual = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
            lostCounter++;
            return;
        }
        if (hpActual <= 0 && lostCounter === 1) {
            hpBarActual = 100;
            heartTwo.style.visibility = "hidden";
            newLevel.style.display = "unset";
            newLevel.innerHTML =
                "Niestety! Walka z " +
                monsterStats.name +
                " zakończyła się twoją porażką";
            hpActual = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
            lostCounter++;
            return;
        }
        if (hpActual <= 0 && lostCounter === 2) {
            hpBarActual = 100;
            heartOne.style.visibility = "hidden";
            newLevel.style.display = "unset";
            newLevel.innerHTML =
                "To straszne! To twoja trzecia porażka! Musisz teraz odpocząć.";
            hpActual = 100 * (1 + (playerStats.level + playerStats.toughness) / 10);
            lostCounter = 0;
            startCountdown();
            return;
        }
    };

    const getFightResult = () => {
        buttonState = "fight";
        if (
            pos + width >= winCounter * 5 - 80 &&
            pos - width <= 80 - winCounter * 5
        ) {
            roundResult = "win";
            updateProgress();
            return;
        }
        roundResult = "lost";
        winCounter = 0;
        updateHP();
        return;
    };

    const performFight = () => {
        fightingBar();
        roundResult = "fighting";
        renderUI();
        stopFighting();
        //   updateLevel();
    };

    const fightStop = () => {
        cancelAnimationFrame(fightWon);
        getFightResult();
        startFighting();
        renderUI();
    };

    let isFighting = false;
    btnFightStart.addEventListener("click", performFight);

    const stopFighting = () => {
        isFighting = true;
        btnFightStart.removeEventListener("click", performFight);
        btnFightStart.addEventListener("click", fightStop);
    };

    const startFighting = () => {
        isFighting = false;
        btnFightStart.removeEventListener("click", fightStop);
        btnFightStart.addEventListener("click", performFight);
    };

    const getMonster = () => {
        generateMonster(playerStats);
        renderUI();
        btnFightStart.classList.remove("disable");
        btnFightStart.disabled = false;
        monsterPicture.style.display = "unset";
        monsterPicture.src = selectedMonster.pic;
    };

    btnChoseMonster.addEventListener("click", getMonster);
};

monsterEncounter();