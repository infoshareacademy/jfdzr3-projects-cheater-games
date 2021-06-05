const db = firebase.firestore();

// signup
const signUpForm = document.querySelector("#signUp-form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nick = signUpForm["nickname"].value;
  const email = signUpForm["signUp-email"].value;
  const password = signUpForm["signUp-password"].value;
  createUser(nick, email, password);
});

// login

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(() => {
      console.log('user sign out');
  });
});

const logInUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((token) => {
      console.log(token);
      console.log("weszłam");
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
      alert("error");
    });
};

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

// const submitData = (e) => {
//   e.preventDefault();
//   const nickName = formData.elements.nickname.value;
//   const emailAdress = formData.elements.email.value;
//   const password = formData.elements.password.value;
//   createUser(emailAdress, password, nickName);
//   formData.reset();
// };

// btnSubmit.addEventListener("click", submitData);

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
