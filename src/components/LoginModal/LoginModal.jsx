import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  onCloseModal,
  isOpen,
  handleLogin,
  isErrorActive,
  handleModalRedirect,
}) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const formErrorClassName = isErrorActive
    ? "form__error_active"
    : "form__error";

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
      handleSubmit={handleSubmit}
      onModalRedirect={handleModalRedirect}
      orButtonText="or Sign Up"
    >
      <fieldset className="form__fieldset">
        <label
          className="form__label form__label_type_text"
          htmlFor="loginEmail"
        >
          Email*
        </label>
        <input
          className="form__input"
          id="loginEmail"
          name="email"
          placeholder="Email"
          type="email"
          required
          value={loginData.email}
          onChange={handleChange}
        ></input>

        <label
          className="form__label form__label_type_text"
          htmlFor="loginPassword"
        >
          Password*
        </label>
        <input
          className="form__input"
          id="loginPassword"
          name="password"
          placeholder="Password"
          type="password"
          required
          minLength="8"
          value={loginData.password}
          onChange={handleChange}
        ></input>
        <div className={formErrorClassName}>Incorrect email or password.</div>
      </fieldset>
    </ModalWithForm>
  );
}

export default LoginModal;
