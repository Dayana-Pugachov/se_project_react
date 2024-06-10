import "./SideBar.css";
import avatar from "../../../images/avatar.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileModalOpen }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="side-bar">
      <div className="side-bar__user-data">
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
          onClick={handleEditProfileModalOpen}
        >
          Change profile data
        </button>
        <button className="nav__button nav__button_type_log-out">
          Log out
        </button>
      </div>
    </section>
  );
}

export default SideBar;
