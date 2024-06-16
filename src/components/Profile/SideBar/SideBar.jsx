import "./SideBar.css";
import avatar from "../../../images/avatar.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileModalOpen, handleLogOut, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="side-bar">
      <div className="side-bar__user-data">
        <div
          className={
            isLoggedIn && !currentUser.avatar
              ? "user-data__avatar-placeholder"
              : "hidden"
          }
        >
          {currentUser.name[0]}
        </div>
        <img
          alt="User avatar"
          src={currentUser.avatar}
          className="user-data__avatar"
        />
        <p className="user-data__name">{currentUser.name}</p>
      </div>
      <div className="side-bar__nav">
        <button
          className="nav__button nav__button_type_edit-data"
          type="button"
          aria-label="Edit profile data"
          onClick={handleEditProfileModalOpen}
        >
          Change profile data
        </button>
        <button
          className="nav__button nav__button_type_log-out"
          type="button"
          aria-label="Log out"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </section>
  );
}

export default SideBar;
