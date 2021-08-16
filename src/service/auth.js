import firebase from "firebase";

const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => res.user)
    .catch((error) => error);
};

export default socialMediaAuth;
