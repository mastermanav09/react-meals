import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Loader from "../Loader/Loader";
import Categories from "./Categories";

let initialCat = "north-indian";

const AvailableMeals = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [httpError, setHttpError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentCat, setCurrentCat] = useState(initialCat);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_KEY}/meals/${currentCat}.json`
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      const items = [];
      for (const key in data) {
        items.push({
          id: data[key].id,
          description: data[key].description,
          imgUrl: data[key].imgurl,
          name: data[key].name,
          price: data[key].price,
        });
      }

      setFoodItems(items);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message || "Something went wrong");
    });
  }, [currentCat]);

  const fetchItemsHandler = (catId) => {
    setCurrentCat(catId);
  };

  let content = <p style={{ fontWeight: "bold" }}>No Meals found</p>;

  if (foodItems.length > 0) {
    content = (
      <ul>
        {foodItems.map((meal) => (
          <MealItem key={meal.id} value={meal}></MealItem>
        ))}
      </ul>
    );
  }

  if (httpError) {
    content = <p className={classes["error_text"]}>{httpError}</p>;
  }

  return (
    <>
      <Categories fetchItemsHandler={fetchItemsHandler} />
      <section className={classes.meals}>
        <Card>
          {!isLoading && content}
          {isLoading && <Loader />}
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;
