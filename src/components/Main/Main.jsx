//pass down weather data from App
//use filter() and map() methods in ItemCard
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useEffect } from "react";

function Main({ handleCardClick, weatherData }) {
  let filteredClothingItems = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherData.type;
  });

  useEffect(() => {
    const randomizeButton = document.querySelector("#randomize-btn");

    function randomizeItems(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
      console.log(array);
    }
    randomizeButton.addEventListener(
      "click",
      randomizeItems(filteredClothingItems)
    );
    return () =>
      randomizeButton.removeEventListener(
        "click",
        randomizeItems(filteredClothingItems)
      );
  }, []);

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="content__title">
        Today is {weatherData.temp}°F / You may want to wear:
      </section>
      <section className="content__gallery gallery">
        <ul className="gallery__list">
          {filteredClothingItems.map((item) => {
            return (
              <ItemCard
                item={item}
                key={item._id}
                handleCardClick={() => handleCardClick(item)}
              />
            );
          })}
        </ul>
        <button className="content__button_type_randomize" id="randomize-btn">
          Randomize
        </button>
      </section>
    </main>
  );
}

export default Main;
