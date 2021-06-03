import * from './variables';

const playerStats = {
    //Player's stats stored in object
    level: 1,
    power: 1,
    toughness: 1,
};

let monsterLevelStats = "-";
let monsterStats = {
    // //Example monster's stats stored in object
    power: "-",
    toughness: "-",
    name: "-",
    hp: "-",
};

const monsterStatsReset = () => {
    monsterLevelStats = "-";
    monsterStats = {
        // //Example monster's stats stored in object
        power: "-",
        toughness: "-",
        name: "-",
        hp: "-",
    }
};

const randomizeStats = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const monsterNames = [
    "Grizzly",
    "Wolf",
    "Spider",
    "Rat",
    "Zombie",
    "Skeleton",
    "Killer Bee",
    "Goblin",
    "Orc",
    "Giant",
];
console.log(monsterNames.length);

const selectMonsterName = () => {
    return monsterNames[Math.floor(Math.random() * monsterNames.length)];
}

const generateMonster = (playerStats) => {
    if (playerStats.level == 1) {
        monsterLevelStats = randomizeStats(1, 4),
            monsterStats = {
                //Example monster's stats stored in object
                power: randomizeStats(1, monsterLevelStats + 4),
                toughness: randomizeStats(1, monsterLevelStats + 4),
                name: selectMonsterName(),
                hp: 100,
            };
        return;
    };
    if (playerStats.level == 2) {
        monsterLevelStats = randomizeStats(1, 5),
            monsterStats = {
                //Example monster's stats stored in object
                power: randomizeStats(1, monsterLevelStats + 4),
                toughness: randomizeStats(1, monsterLevelStats + 4),
                name: selectMonsterName(),
                hp: 100,
            };
        return;
    };
    if (playerStats.level == 3) {
        monsterLevelStats = randomizeStats(1, 6),
            monsterStats = {
                //Example monster's stats stored in object
                power: randomizeStats(1, monsterLevelStats + 4),
                toughness: randomizeStats(1, monsterLevelStats + 4),
                name: selectMonsterName(),
                hp: 100,
            };
        return;
    };
    monsterLevelStats = randomizeStats(playerStats.level - 2, playerStats.level + 3),
        monsterStats = {
            //Example monster's stats stored in object
            power: randomizeStats(monsterLevelStats - 1, monsterLevelStats + 4),
            toughness: randomizeStats(monsterLevelStats - 1, monsterLevelStats + 4),
            name: selectMonsterName(),
            hp: 100,
        }
}

export { playerStats, monsterLevelStats, monsterStats, monsterStatsReset, randomizeStats, monsterNames, selectMonsterName, generateMonster };