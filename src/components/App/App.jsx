import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ItemPopup from "../ItemPopup/ItemPopup";
import { useEffect, useState } from "react";
import { getCurrentForecast, parseForecastData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: 0,
    isDay: true,
    condition: "",
  });
  const [location, setLocation] = useState("");
  const [activePopup, setActivePopup] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  }

  //"add-popup" or "preview"
  function handleOpenPopup(popup) {
    if (popup === "add-popup") {
      setActivePopup(popup);
      toggleAddPopupVisibility();
      toggleMobileMenu();
    } else {
      setActivePopup(popup);
    }
  }

  function toggleAddPopupVisibility() {
    if (isAddPopupVisible) {
      setIsAddPopupVisible(false);
    } else {
      setIsAddPopupVisible(true);
    }
  }

  function handleClosePopup(popup) {
    if (popup === "add-popup") {
      setActivePopup("");
      toggleAddPopupVisibility();
    } else {
      setActivePopup("");
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleOpenPopup("preview");
  }

  //side effect of handleEsc
  useEffect(() => {
    const handleEsc = (event) => {
      console.log(event);
      if (event.key === "Escape") {
        handleClosePopup();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  //side effect of handleClickOff
  useEffect(() => {
    const handleClickOff = (event) => {
      if (event.target.classList.contains("popup")) {
        handleClosePopup();
      }
    };
    document.addEventListener("click", handleClickOff);
    return () => document.removeEventListener("click", handleClickOff);
  }, []);

  //side effect of retrieving weather && location from api
  useEffect(() => {
    getCurrentForecast(coordinates, APIkey).then((data) => {
      console.log(data);
      const parsedData = parseForecastData(data);
      console.log(parsedData);
      setWeatherData(parsedData);
      setLocation(parsedData.location);
    });
  }, []);

  return (
    <div className="app">
      <Header
        onOpenPopup={() => handleOpenPopup("add-popup")}
        location={location}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <Main handleCardClick={handleCardClick} weatherData={weatherData} />
      <Footer />
      {activePopup === "add-popup" && (
        <PopupWithForm
          title="New garment"
          name="form"
          buttonText="Add garment"
          onClosePopup={() => handleClosePopup("add-popup")}
          isAddPopupVisible={isAddPopupVisible}
        >
          <fieldset className="form__fieldset">
            <label className="form__label form__label_type_text" for="name">
              Name
            </label>
            <input
              className="form__input"
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              required
              minLength="1"
              maxLength="30"
            ></input>

            <label className="form__label form__label_type_text" for="link">
              Image
            </label>
            <input
              className="form__input"
              id="link"
              name="link"
              placeholder="Image URL"
              type="url"
              required
            ></input>
          </fieldset>
          <p className="fieldset__text">Select the weather type:</p>
          <fieldset className="form__fieldset">
            <div className="label-wrapper">
              <input
                className="form__input"
                id="hot"
                type="radio"
                name="weather"
                value="hot"
              ></input>
              <label className="form__label form__label_type_radio" for="hot">
                Hot
              </label>
            </div>
            <div className="label-wrapper">
              <input
                className="form__input"
                id="warm"
                type="radio"
                name="weather"
                value="warm"
              ></input>
              <label className="form__label form__label_type_radio" for="warm">
                Warm
              </label>
            </div>
            <div className="label-wrapper">
              <input
                className="form__input"
                id="cold"
                type="radio"
                name="weather"
                value="cold"
              ></input>
              <label className="form__label form__label_type_radio" for="cold">
                Cold
              </label>
            </div>
          </fieldset>
        </PopupWithForm>
      )}
      {activePopup === "preview" && (
        <ItemPopup
          name="preview"
          card={selectedCard}
          onClosePopup={() => handleClosePopup("preview")}
        />
      )}
    </div>
  );
}

export default App;
