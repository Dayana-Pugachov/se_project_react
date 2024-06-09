import "./SideBar.css";
import avatar from "../../../images/avatar.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="side-bar">
      <img alt="User avatar" src={currentUser.avatar} className="side-bar__avatar" />
      <p className="side-bar__user-name">{currentUser.name}</p>
    </section>
  );
}

export default SideBar;
