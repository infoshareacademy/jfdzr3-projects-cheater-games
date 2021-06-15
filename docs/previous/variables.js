export const variables = () => {
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
    let hpBarActual = (hpActual / maxHP) * 100 //starting position of HP Bar
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
    const charWins = document.querySelector("#char__wins");

    const monsterName = document.querySelector("#monster__name");
    const monsterLevel = document.querySelector("#monster__level");
    const monsterPower = document.querySelector("#monster__power");
    const monsterToughness = document.querySelector("#monster__toughness");

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
        }
    };

    const randomizeStats = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const monsterNames = [
        { "name": "Grizzly", "pic": "grizzly.png" },
        { "name": "Wolf", "pic": "wolf.png" },
        { "name": "Spider", "pic": "spider.png" },
        { "name": "Rat", "pic": "rat.png" },
        { "name": "Zombie", "pic": "zombie.png" },
        { "name": "Skeleton", "pic": "skeleton.png" },
        { "name": "Bat", "pic": "bat.png" },
        { "name": "Goblin", "pic": "goblin.png" },
        { "name": "Orc", "pic": "orc.png" },
        { "name": "Giant", "pic": "giant.png" },
    ];

    let selectedMonster;

    // const messages = {
    //     //Fight state's messages
    //     waiting: "Oczekiwanie na pojedynek",
    //     fighting: "Trwa walka",
    //     win: "Uff! To było mocne! Twój przeciwnik zwija się z bólu!",
    //     lost: "Otrzymujesz potężny cios, który niemalże zwalił cię z nóg!",
    //     nodmg: "Twoje uderzenie było za słabe, żeby wyrządzić jakąkolwiek krzywdę przeciwnikowi.",
    //     draw: "Remis.",
    //     levelup: "Gratulacje, osiągasz nowy poziom. Twój poziom teraz to ",
    // };

};