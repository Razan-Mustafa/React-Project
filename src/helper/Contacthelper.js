import React, { useState } from "react";
import axios from "axios";

function Contacthelper() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isVerified, setIsVerified] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // REcaptcha

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://651a62f5340309952f0d3231.mockapi.io/users", formData)
      .then((response) => {
        if (response.data.id !== "") {
          // Handle success
          console.log("Request succeeded:", response.data);
          setIsVerified(true);
          resetForm();
        } else {
          // Handle failure
          console.error("Request failed:", response.data);
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
      });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      {/* Your form JSX here */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Name"
        />
        {/* Add other form fields */}
        <button type="submit">Submit</button>
      </form>
      {isVerified && <div id="server_response_success">Success</div>}
    </div>
  );
}

export default Contacthelper;
