import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import "./Header.css";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ onOpenModal, location, isMobileMenuOpen, toggleMobileMenu }) {
  const currentDate = new Date().toLocaleString("en", {
    month: "long",
    day: "numeric",
  });

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
          className="header__button"
          id="add-clothes-btn"
          type="button"
          aria-label="Add clothes"
          onClick={onOpenModal}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__user-name">
          Terrence Tegegne
        </Link>
        <Link to="/profile">
          <img alt="User avatar" src={avatar} className="header__avatar" />
        </Link>
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
