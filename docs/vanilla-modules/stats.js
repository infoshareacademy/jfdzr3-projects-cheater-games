// firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

const id = "mXKzlweHQdt4jlHOm7ak";

db.collection('stats').onSnapshot(stat => getStats(stat));

let stats = {};

const getStats = (stat) => {
    stat.forEach(statistics => {
        const statValue = statistics.data();

        stats = {
            str: statValue.str,
            agi: statValue.agi,
            tough: statValue.tough,
            int: statValue.int,
            perc: statValue.perc,
            left: statValue.left
        }
        const container = document.querySelector('#stats-matrix');
        const valueContainer = document.querySelectorAll("[data-stat");
        const pointsLeftNode = container.querySelector('[data-points-left]');
        valueContainer.forEach(statName => {
            statName.textContent = stats[statName.dataset.stat];
        });
        pointsLeftNode.textContent = stats.left;

        const updateStat = (stat, modifier) => {
            const delta = Math.min(stats.left, modifier)
            if (stats[stat] + delta <= stats[stat]) {
                return;
            }
            stats[stat] += delta;
            stats.left -= delta;

            pointsLeftNode.textContent = stats.left;

            const displayNode = container.querySelector(`[data-stat="${stat}"]`)
            if (displayNode) {
                displayNode.textContent = stats[stat]
            }
        }
        container.addEventListener('click', event => {
            const diff = event.target.dataset.diff
            if (diff !== undefined) {
                const [stat, modifier] = diff.split('|')
                updateStat(stat, parseInt(modifier))
            }
        })
    })
}

const btnSaveStats = document.querySelector(".myButton");

const updateStats = () => {
    console.log(stats);
    db.collection("stats").doc(id).set(stats);
}

btnSaveStats.addEventListener("click", updateStats)


// let strengthValue = 1;
// let agilityValue = 1;
// let toughnessValue = 1;
// let intelligenceValue = 1;
// let perceptivenessValue = 1;