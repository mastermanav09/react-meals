import React from "react";
import headerStyles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    props.setisEmailVerified(null);
  };

  return (
    <>
      <header className={headerStyles.header}>
        <h1>ReactMeals</h1>

        {props.isEmailVerified && (
          <div className={headerStyles.nav}>
            <HeaderCartButton onShowCart={props.onShowCart} />
            <div className={headerStyles.logoutBtn}>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        )}
      </header>
      <div className={headerStyles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
