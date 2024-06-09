import { useEffect, useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onCloseModal, isOpen, handleLogin }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(loginData);
  };

  return (
    <ModalWithForm
      title="Log In"
      name="log-in"
      buttonText="Log In"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      orButtonText="or Sign Up"
      handleSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <label className="form__label form__label_type_text" htmlFor="email">
          Email*
        </label>
        <input
          className="form__input"
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          required
          value={loginData.email}
          onChange={handleChange}
        ></input>

        <label className="form__label form__label_type_text" htmlFor="password">
          Password*
        </label>
        <input
          className="form__input"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          required
          minLength="8"
          value={loginData.password}
          onChange={handleChange}
        ></input>
      </fieldset>
    </ModalWithForm>
  );
}

export default LoginModal;
