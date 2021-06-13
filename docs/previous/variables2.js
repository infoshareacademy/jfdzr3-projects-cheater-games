export variables = () => {
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
};