import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import "./Header.css";

function Header({ onOpenPopup, location }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__section header__section_type_left">
        <img alt="WTWR-logo" src={logo} className="header__logo" />
        <p className="header__date-location">
          {currentDate}, {location}
        </p>
      </div>
      <div className="header__section header__section_type_right">
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
        <button className="hamburger"></button>
      </div>
    </header>
  );
}

export default Header;
