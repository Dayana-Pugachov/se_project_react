import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import { getCurrentForecast, parseForecastData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  getUserInfo,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute";
import { register, authorize } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    isDay: true,
    condition: "",
  });
  const [location, setLocation] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); //what is that??

  function openAddModal() {
    setActiveModal("add-modal");
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((state) => !state);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleAddItemSubmit(inputValues) {
    setIsLoading(true);
    addClothingItem(inputValues)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function deleteSelectedCard() {
    setIsLoading(true);
    deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => selectedCard._id !== item._id)
        );
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleRegistartion({ email, password, name, avatar }) {
    register(email, password, name, avatar)
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch(console.error);
  }

  function handleLogin({ email, password }) {
    return authorize(email, password)
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleCloseModal();

          getUserInfo(res.token)
            .then((user) => {
              setCurrentUser(user.data);
            })
            .then(() => {
              setIsLoggedIn(true);
              console.log("Am I logged in?", isLoggedIn);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  }

  //side effect of handleEsc
  useEffect(() => {
    if (!activeModal) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal]);

  //side effect of handleClickOff
  useEffect(() => {
    if (!activeModal) return;
    const handleClickOff = (event) => {
      if (event.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleClickOff);
    return () => document.removeEventListener("mousedown", handleClickOff);
  }, [activeModal]);

  //side effect of retrieving weather && location from weatherApi
  useEffect(() => {
    getCurrentForecast(coordinates, APIkey)
      .then((data) => {
        const parsedData = parseForecastData(data);
        setWeatherData(parsedData);
        setLocation(parsedData.location);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      console.log("No token");
      return;
    }
    getUserInfo(jwt)
      .then((user) => {
        setCurrentUser(user.data);
        console.log("The user has been set");
      })
      .then(() => {
        setIsLoggedIn(true);
        console.log("Am I logged in?", isLoggedIn);
      })
      .catch(console.error);
  }, []);

  //side effect of retrieving clothing items from api
  useEffect(() => {
    getClothingItems()
      .then(({ data }) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  //test
  useEffect(() => {
    console.log("isLoggedIn state has changed:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onOpenModal={openAddModal}
            location={location}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            isLoggedIn={isLoggedIn}
            openRegisterModal={() => setActiveModal("sign-up")}
            openLoginModal={() => setActiveModal("log-in")}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  openLoginModal={() => setActiveModal("log-in")}
                >
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddModalOpen={openAddModal}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "add-modal"}
            onAddItem={handleAddItemSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            name="preview"
            card={selectedCard}
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "preview"}
            handleConfirmModalOpen={() => setActiveModal("confirm")}
          />
          <ConfirmModal
            name="confirm"
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "confirm"}
            handleDeleteItem={deleteSelectedCard}
          />
          <RegisterModal
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "sign-up"}
            handleRegistration={handleRegistartion}
          ></RegisterModal>
          <LoginModal
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "log-in"}
            handleLogin={handleLogin}
          ></LoginModal>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
