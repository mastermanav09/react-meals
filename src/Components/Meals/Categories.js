import React, { useState } from "react";
import "./categories.css";

const Categories = (props) => {
  const [activeCat, setActiveCat] = useState({
    activeIndex: 0,
    categories: [
      { id: "north-indian", catName: "North Indian" },
      { id: "rolls-sandwich", catName: "Rolls & Sandwich" },
      { id: "chinese", catName: "Chinese" },
      { id: "south-indian", catName: "South Indian" },
      { id: "burgers", catName: "Burgers" },
      { id: "pizzas", catName: "Pizzas" },
      { id: "icecream-shakes", catName: "Ice cream & shakes" },
    ],
  });

  const toggleActive = (index) => {
    setActiveCat({
      ...activeCat,
      activeIndex: index,
    });
  };

  const toggleActiveStyles = (index) => {
    if (index === activeCat.activeIndex) {
      return "category active";
    } else {
      return "category inactive";
    }
  };

  const colorPosOffsetHandler = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty("--x", x + "px");
    e.target.style.setProperty("--y", y + "px");
  };

  return (
    <div className="category-box">
      {activeCat.categories.map((cat, index) => (
        <div
          key={index}
          onMouseMove={colorPosOffsetHandler}
          className={toggleActiveStyles(index)}
          onClick={() => {
            toggleActive(index);
            props.fetchItemsHandler(cat.id);
          }}
        >
          <span>{cat.catName}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
