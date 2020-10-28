import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA3BMrC0woT8uEydI0Yj_EqM7GfPnf_ZNo",
  authDomain: "catch-of-the-day-dryan.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-dryan.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export

export default base;
