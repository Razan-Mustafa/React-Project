import React, { useState } from "react";
import "./styles.css";
import SignInForm from "../sections/AuthUser/SignIn";
import SignUpForm from "../sections/AuthUser/SignUp";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function AuthUser() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "containers " + (type === "signUp" ? "right-panels-active" : "");
  return (
    <div className="badys">
      <Header /> {/* Display Header */}
      <div className="Apps">
        <div className={containerClass} id="containers">
          <SignUpForm />
          <SignInForm />
          <div className="overlays-containers">
            <div className="overlays">
              <div className="overlay-panels overlay-lefts">
                <div className="sigma_logo-wrapper">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/logo-light2.png"}
                    alt="logo"
                  />
                </div>
                <p className="p">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghosts"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panels overlay-rights">
                <div className="sigma_logo-wrapper">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/logo-light2.png"}
                    alt="logo"
                  />
                </div>
                <p className="p">
                  Enter your personal details and start the journey with us
                </p>
                <button
                  className="ghosts "
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Display Footer */}
    </div>
  );
}
