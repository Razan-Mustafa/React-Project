import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";



function SignInForm({ setIsLoggedIn }) {
      const history = useHistory();

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
    const response = await axios.get(
      `https://651be95a194f77f2a5af127c.mockapi.io/users?email=${email}&password=${password}`
    );
    const user = response.data;
          // try{
    if (response.data.length > 0) {
      alert("Login successful!");
      setIsLoggedIn = true;
      ;
      sessionStorage.setItem("userId", user[0].id);
      sessionStorage.setItem("userName", user[0].name);
      sessionStorage.setItem("IsLoggedIn", setIsLoggedIn);
      history.push("/");

      console.log(sessionStorage.getItem("userId"));
    } else {
      alert("Login failed. Please check your credentials.");
    }
    } catch (error) {
      alert("Login failed.");
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
        <a href="#">Forgot your password?</a>
        <button className="buttons">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;

// import React from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// function SignInForm({ setIsLoggedIn }) {
//   const history = useHistory();

//   const [state, setState] = React.useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;
//     setState({
//       ...state,
//       [name]: value,
//     });
//   };

//   const handleOnSubmit = async (evt) => {
//     evt.preventDefault();

//     const { email, password } = state;

//     try {
//       const response = await axios.get(
//         `https://651be95a194f77f2a5af127c.mockapi.io/users?email=${email}&password=${password}`
//       );

//       if (response.data.length > 0) {
//         alert("Login successful!");
//               setIsLoggedIn = true;
//         // User found, login successful
//         const user = response.data[{}];
//         // setIsLoggedIn(true);
//         sessionStorage.setItem("userId", user.id);
//         sessionStorage.setItem("userName", user.name);
//         sessionStorage.setItem("IsLoggedIn", setIsLoggedIn);
//         history.push("/");
//       } else {
//         // User not found, show an alert
//         alert("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       // Error occurred, show an alert
//       alert("Login failed. An error occurred.");
//     }

//     // Clear the form fields
//     setState({
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <div className="form-containers sign-in-containers">
//       <form className="forms" onSubmit={handleOnSubmit}>
//         <h3 className="h3">Sign in</h3>

//         <span className="span"> use your account</span>
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           className="inputs"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={state.password}
//           onChange={handleChange}
//           className="inputs"
//         />
//         <a href="#">Forgot your password?</a>
//         <button className="buttons">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default SignInForm;
