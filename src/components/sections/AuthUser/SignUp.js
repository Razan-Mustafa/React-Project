// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios"; // Import Axios

// const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
// const REGISTER_URL = "https://651be95a194f77f2a5af127c.mockapi.io/users"; // Updated API URL

// const SignUpForm = ({ setIsLoggedIn }) => {
//   const nameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // const [errMsg, setErrMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     nameRef.current.focus();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password)) {
//       alert("Invalid Entry");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         REGISTER_URL,
//         { name, email, password }, // Send name, email, and password
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       console.log(response?.data);

//       setSuccess(true);
//      setIsLoggedIn(true);

//       // Clear form inputs
//       setName("");
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       if (!err?.response) {
//         alert("No Server Response");
//       } else if (err.response?.status === 409) {
//         alert("Username Taken");
//       } else {
//         alert("Registration Failed");
//       }
//     }
//   };

//   return (
//     <>
//       {success ? (
//         <section>
//           <h1>Success!</h1>
//           <p>
//             <a href="#">Sign In</a>
//           </p>
//         </section>
//       ) : (
//         <section>
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               ref={nameRef}
//               autoComplete="off"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />

//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               ref={emailRef}
//               autoComplete="off"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               required
//             />

//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               ref={passwordRef}
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               required
//             />

//             <button
//               disabled={
//                 !EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password)
//               }
//             >
//               Sign Up
//             </button>
//           </form>
//           <p>
//             Already registered?
//             <br />
//             <span className="line">
//               <a href="#">Sign In</a>
//             </span>
//           </p>
//         </section>
//       )}
//     </>
//   );
// };

// export default SignUpForm;

import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function SignUpForm({ setIsLoggedIn }) {
      const history = useHistory();

  const [state, setState] = React.useState({
    name: "",
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

    const response = await axios.post(
      "https://651be95a194f77f2a5af127c.mockapi.io/users",
      state
    );

    // alert(`User registered successfully with ID: ${response.data.id}`);
    
    setIsLoggedIn = true;
    
    setState({
      name: "",
      email: "",
      password: "",
    });
    history.push("/");
  };

  return (
    <div className="form-containers sign-up-containers">
      <form className="forms" onSubmit={handleOnSubmit}>
        <h3 className="h3">Create Account</h3>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="inputs"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="inputs"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="inputs"
        />
        <button className="buttons">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
