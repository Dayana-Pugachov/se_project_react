//pass down weather data from App
//use filter() and map() methods in ItemCard
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ handleCardClick, weatherData }) {
  const filteredClothingItems = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherData.type; //HERE - weatherData.type
  });

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
