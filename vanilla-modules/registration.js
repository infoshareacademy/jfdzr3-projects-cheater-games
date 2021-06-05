const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true })

// signup
const signUpForm = document.querySelector("#signUp-form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nick = signUpForm["nickname"].value;
  const email = signUpForm["signUp-email"].value;
  const password = signUpForm["signUp-password"].value;
  createUser(nick, email, password);
});

const createUser = (nick, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((token) => {
        signUpForm.reset();
        createCharacter(token.user.uid, nick);
        createPlayerStats(token.user.uid);
        createPlayerResources(token.user.uid);
      });
  };

// logout

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut();
});

//login

const logInForm = document.querySelector("#logIn-form");
logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = logInForm["logIn-email"].value;
  const password = logInForm["logIn-password"].value;
  logInUser(email, password);
});

const logInUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((token) => {
      console.log(token.user);
      logInForm.reset();
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
      alert("error");
    });
};

// Auth State Changed

firebase.auth().onAuthStateChanged(token => {
  if (token) {
    console.log(token);
    logout.classList.toggle("hidden");
  } else {
    console.log('user logged out');
    logout.classList.toggle("hidden");
  }
})


// user settings 
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


// MODAL

const authModals = document.querySelectorAll(".auth .modal");
const authSwitchModals = document.querySelectorAll(".switch");

authSwitchModals.forEach((modalLink) => {
  modalLink.addEventListener("click", () => {
    authModals.forEach((modal) => {
      modal.classList.toggle("active");
    });
  });
});
