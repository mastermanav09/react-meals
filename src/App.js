import React, { useState } from "react";
import Header from "../src/Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import Auth from "./Components/Auth";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [isEmailVerified, setisEmailVerified] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const showHandler = () => {
    setShowCart(true);
  };

  const hideHandler = () => {
    setShowCart(false);
  };

  return (
    <>
      <Header
        onShowCart={showHandler}
        isEmailVerified={isEmailVerified}
        setisEmailVerified={setisEmailVerified}
      ></Header>
      {isEmailVerified ? (
        <>
          {showCart && <Cart onHideCart={hideHandler} />}
          <main>
            <Meals />
          </main>
        </>
      ) : (
        <Auth setisEmailVerified={setisEmailVerified} />
      )}
    </>
  );
}

export default App;
