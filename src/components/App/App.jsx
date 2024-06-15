import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
  updateUserInfo,
  likeClothingItem,
  unlikeClothingItem,
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
  const [currentUser, setCurrentUser] = useState({});
  const [isErrorActive, setIsErrorActive] = useState(false);

  const jwt = localStorage.getItem("jwt");

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

  function deleteSelectedCard() {
    setIsLoading(true);
    deleteClothingItem(selectedCard._id, jwt)
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
    setIsLoading(true);
    register(email, password, name, avatar)
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error;
        if (err.includes(409)) {
          setIsErrorActive(true);
        }
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    authorize(email, password)
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleCloseModal();

          getUserInfo(res.token).then((user) => {
            setCurrentUser(user.data);
            setIsLoggedIn(true);
            setIsErrorActive(false);
          });
        }
      })
      .catch((err) => {
        console.error;
        if (err.includes(400) || err.includes(401)) {
          setIsErrorActive(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddItemSubmit(inputValues) {
    setIsLoading(true);
    addClothingItem(inputValues, jwt)
      .then((item) => {
        setClothingItems([item.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleProfileEdit(data) {
    setIsLoading(true);
    updateUserInfo(data, jwt)
      .then((user) => {
        currentUser.name = user.data.name;
        currentUser.avatar = user.data.avatar;
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(cardId, isLiked) {
    console.log("cardId:", cardId);
    if (!isLiked) {
      likeClothingItem(cardId, jwt)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === cardId ? updatedCard.data : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      unlikeClothingItem(cardId, jwt)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === cardId ? updatedCard.data : item))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  }

  function handleAuthModalClose() {
    handleCloseModal();
    setIsErrorActive(false);
  }

  function handleModalRedirect() {
    if (activeModal === "sign-up") {
      setIsErrorActive(false);
      setActiveModal("log-in");
    } else {
      setIsErrorActive(false);
      setActiveModal("sign-up");
    }
  }

  //USE EFFECTS

  useEffect(() => {
    if (!jwt) {
      console.log("No token");
      return;
    }
    getUserInfo(jwt)
      .then((user) => {
        setCurrentUser(user.data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

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

  //side effect of retrieving clothing items from api
  useEffect(() => {
    getClothingItems()
      .then((data) => {
        console.log(data.data);
        setClothingItems(data.data.reverse());
      })
      .catch(console.error);
  }, []);

  //test

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
                  isLoggedIn={isLoggedIn}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddModalOpen={openAddModal}
                    handleEditProfileModalOpen={() =>
                      setActiveModal("edit-profile")
                    }
                    handleLogOut={handleLogOut}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
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
            onCloseModal={handleAuthModalClose}
            isOpen={activeModal === "sign-up"}
            handleRegistration={handleRegistartion}
            isErrorActive={isErrorActive}
            handleModalRedirect={handleModalRedirect}
          ></RegisterModal>
          <LoginModal
            onCloseModal={handleAuthModalClose}
            isOpen={activeModal === "log-in"}
            handleLogin={handleLogin}
            isErrorActive={isErrorActive}
            handleModalRedirect={handleModalRedirect}
          ></LoginModal>
          <EditProfileModal
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "edit-profile"}
            handleProfileEdit={handleProfileEdit}
          ></EditProfileModal>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
