import React from "react";
import classes from "./Auth.module.css";
import { googleAuthProvider } from "../config/firebase";
import socialMediaAuth from "../service/auth";

function Auth({ setisEmailVerified, setStillLoggedIn }) {
  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);

    setisEmailVerified(res.emailVerified);
    localStorage.setItem("isLoggedIn", res.emailVerified);
  };

  return (
    <div className={classes["signin-form"]}>
      <span>Welcome!</span>
      <button onClick={() => handleOnClick(googleAuthProvider)}>
        Sign up with Google
      </button>
    </div>
  );
}

export default Auth;
