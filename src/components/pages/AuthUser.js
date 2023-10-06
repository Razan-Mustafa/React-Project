import React, { useState } from "react";
import "./styles.css";
import SignInForm from "../sections/AuthUser/SignIn";
import SignUpForm from "../sections/AuthUser/SignUp";

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
      <div className="Apps">
        <div className={containerClass} id="containers">
          <SignUpForm />
          <SignInForm />
          <div className="overlays-containers">
            <div className="overlays">
              <div className="overlay-panels overlay-lefts">
                <h1 className="h1">Welcome Back!</h1>
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
                <h1 className="h1">Hello, Friend!</h1>
                <p className="p">
                  Enter your personal details and start journey with us
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
    </div>
  );
}
