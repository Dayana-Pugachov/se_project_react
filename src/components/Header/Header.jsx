import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import "./Header.css";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  onOpenModal,
  location,
  isMobileMenuOpen,
  toggleMobileMenu,
  isLoggedIn,
  openRegisterModal,
  openLoginModal,
}) {
  const currentDate = new Date().toLocaleString("en", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container header__container_type_logo">
        <Link to="/">
          <img alt="WTWR-logo" src={logo} className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {location}
        </p>
      </div>
      <div
        className={`header__container ${
          isMobileMenuOpen
            ? "mobile-menu_open"
            : "header__container_type_options"
        }`}
      >
        <ToggleSwitch />
        <button
          className="mobile-menu__close-btn"
          type="button"
          onClick={toggleMobileMenu}
        />
        <button
          className={isLoggedIn ? "header__button" : "hidden"}
          id="add-clothes-btn"
          type="button"
          aria-label="Add clothes"
          onClick={onOpenModal}
        >
          + Add clothes
        </button>
        <Link
          to="/profile"
          className={isLoggedIn ? "header__user-name" : "hidden"}
        >
          {currentUser.name}
        </Link>
        <Link to="/profile">
          <button
            className={
              isLoggedIn && !currentUser.avatar
                ? "header__avatar-placeholder"
                : "hidden"
            }
          >
            {currentUser.name[0]}
          </button>
        </Link>
        <Link to="/profile">
          <img
            alt="User avatar"
            src={currentUser.avatar}
            className={
              isLoggedIn && currentUser.avatar ? "header__avatar" : "hidden"
            }
          />
        </Link>
        <button
          type="button"
          alt="sign up"
          className={!isLoggedIn ? "header__auth" : "hidden"}
          onClick={openRegisterModal}
        >
          Sign Up
        </button>
        <button
          type="button"
          alt="log in"
          className={!isLoggedIn ? "header__auth" : "hidden"}
          onClick={openLoginModal}
        >
          Log In
        </button>
      </div>
      <button
        className="hamburger"
        type="button"
        onClick={toggleMobileMenu}
        aria-label="Mobile menu"
      />
    </header>
  );
}

export default Header;
