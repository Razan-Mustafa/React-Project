import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import validation from './Validation'

function SignUpForm({ setIsLoggedIn }) {
  const history = useHistory();

  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});


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
      // If there are validation errors, set them in the state
      setErrors(validationErrors);
      return;
    }

    const response = await axios.post(
      "https://651be95a194f77f2a5af127c.mockapi.io/users",
      state
    );

    alert(`User registered successfully  ${response.data.name}`);

    setIsLoggedIn = true;

    setState({
      name: "",
      email: "",
      password: "",
    });
    history.goBack();
  };

  return (
    <div className="form-containers sign-up-containers">
      <form className="forms" onSubmit={handleOnSubmit}>
        <h3 className="h3">Create Account</h3>

        <span>or use your email for registration</span>
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
