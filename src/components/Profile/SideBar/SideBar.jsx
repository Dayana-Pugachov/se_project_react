import "./SideBar.css";
import avatar from "../../../images/avatar.svg";

function SideBar() {
  return (
    <section className="side-bar">
      <img alt="User avatar" src={avatar} className="side-bar__avatar" />
      <p className="side-bar__user-name">Terrence Tegegne</p>
    </section>
  );
}

export default SideBar;
