import React from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <label className="toggle-switch__label">
        <input
          type="checkbox"
          className="toggle-switch__checkbox"
          onChange={handleToggleSwitchChange}
        />
        <span
          className={
            currentTemperatureUnit === "F"
              ? "toggle-switch__slider toggle-switch__slider_type_f"
              : "toggle-switch__slider toggle-switch__slider_type_c"
          }
        ></span>
        <p
          className={`toggle-switch__letter toggle-switch__letter_type_f ${
            currentTemperatureUnit === "F"
              ? "toggle-switch__letter_active"
              : "toggle-switch__letter_disabled"
          }`}
        >
          F
        </p>
        <p
          className={`toggle-switch__letter toggle-switch__letter_type_c ${
            currentTemperatureUnit === "C"
              ? "toggle-switch__letter_active"
              : "toggle-switch__letter_disabled"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
}

export default ToggleSwitch;
