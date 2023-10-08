// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import validation from './Validation'
import Swal from "sweetalert2";
import { Link } from "react-scroll";

function SignUpForm({ setIsLoggedIn }) {
  const history = useHistory();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    image: "default.jpg"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    // function  (evt) {
    //   evt.preventDefault();
    //   setErrors(validation());
    // }

    const validationErrors = validation(state); // Validate the form fields
    if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
      return;
    }

    const response = await axios.post(
      "https://651be95a194f77f2a5af127c.mockapi.io/users",
      state
    );

    // alert(`User registered successfully  ${response.data.name}`);

    Swal.fire({
      title: `Your registered successfully ${response.data.name}`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });

    //  Swal.fire({
    //    title: `Your registered successfully  ${response.data.name}`,
    //    customClass: {
    //      confirmButton: "custom-confirm-button-class",
    //    },
    //  });

    setIsLoggedIn = true;

    setState({
      name: "",
      email: "",
      password: "",
    });
    // history.goBack();
  };
  useEffect(() => {
    // Clear errors when the user interacts with the form
    setErrors({});
  }, [state]); // This effect runs whenever 'state' changes

  return (
    <div className="form-containers sign-up-containers">
      <form className="forms" onSubmit={handleOnSubmit}>

        <h3 className="h3">Create Account</h3>

        <span> use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          // required
          className="inputs"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          // required
          className="inputs"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          // required
          className="inputs"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <button className="buttons">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;

