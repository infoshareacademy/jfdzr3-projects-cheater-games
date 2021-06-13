const db = firebase.firestore();

const formData = document.forms.registration;
// const nickName = formData.elements.nickname.value;
// const emailAdress = formData.elements.email.value;
// const password = formData.elements.password.value;
const btnSubmit = document.querySelector(".myButton");

const createUser = (email, password, nick) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((token) => {
            createCharacter(token.user.uid, nick);
            createPlayerStats(token.user.uid);
            createPlayerResources(token.user.uid);
        });
};

const createCharacter = (uid, nick) => {
    return db.collection("users").doc(uid).set({
        exp: 0,
        nextLevel: 100,
        name: nick,
    });
};

const createPlayerStats = (uid) => {
    return db.collection("stats").doc(uid).set({
        str: 1,
        agi: 1,
        tough: 1,
        int: 1,
        perc: 1,
        left: 10,
    });
};

const createPlayerResources = (uid) => {
    return db.collection("resources").doc(uid).set({
        gold: 100,
        material: 50,
        wood: 50,
    });
};

const submitData = (e) => {
    e.preventDefault();
    const nickName = formData.elements.nickname.value;
    const emailAdress = formData.elements.email.value;
    const password = formData.elements.password.value;
    createUser(emailAdress, password, nickName);
    formData.reset();
};

btnSubmit.addEventListener("click", submitData);