import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import "./Header.css";

function Header({ onOpenPopup, location, isMobileMenuOpen, toggleMobileMenu }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container header__container_type_logo">
        <img alt="WTWR-logo" src={logo} className="header__logo" />
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
          onClick={onOpenPopup}
        >
          + Add clothes
        </button>
        <p className="header__user-name">Terrence Tegegne</p>
        <img alt="User avatar" src={avatar} className="header__avatar" />
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
