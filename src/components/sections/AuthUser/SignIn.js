
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function SignInForm({ setIsLoggedIn }) {
  const history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  setIsLoggedIn = true;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await axios.get(
        `https://651be95a194f77f2a5af127c.mockapi.io/users?email=${email}&password=${password}`
      );

      const user = response.data.find(
        (user) => user.email === state.email && user.password === state.password
      );

      if (user) {



        // setIsLoggedIn(true); // Update state with true, not assignment
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userImg", user.image);
        sessionStorage.setItem("IsLoggedIn", "true"); // Store as string
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 2000,
        });
        history.goBack();

        console.log(sessionStorage.getItem("userId"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please check your email & password.",
          customClass: {
            confirmButton: "custom-confirm-button-class",
          },
        });
      }
    } catch (error) {
      // alert("Login failed.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed.",
        customClass: {
          confirmButton: "custom-confirm-button-class",
        },
      });




      console.log(error);
    }

    setState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="form-containers sign-in-containers">
      <form className="forms" onSubmit={handleOnSubmit}>

        <h3 className="h3">Sign in</h3>

        <span className="span"> use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="inputs"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="inputs"
        />
        <Link to="/forgot-password">Forgot your password?</Link>
        <button type="submit" className="buttons">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
