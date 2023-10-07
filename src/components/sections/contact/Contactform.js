

import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert } from "react-bootstrap";
import Swal from "sweetalert2";

function Contactform() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isVerified, setIsVerified] = useState(null); // Initialize as null

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // REcaptcha
  const reCaptchaLoaded = (value) => {
    console.log("Captcha Successfully Loaded", value);
  };

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
          setIsVerified(false); // Set to false on error
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
        setIsVerified(false); // Set to false on error
      });
        //   Swal.fire({
        //     title: `your  message sent successfully`,
        //     customClass: {
        //       confirmButton: "custom-confirm-button-class",
        //     },
        //   });

          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "your  message sent successfully",
            showConfirmButton: false,
            timer: 2500,
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
    <div className="section pt-0">
      <div className="container">
        <div className="section-title centered">
          <span className="subtitle">Call to Action</span>
          <h3 className="title">Contact With US</h3>
        </div>
        <div className="sigma_form style-2">
          <form onSubmit={handleSubmit} method="GET">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    value={formData.name}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <textarea
                    rows={10}
                    placeholder="Enter Message"
                    name="message"
                    value={formData.message}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
              <ReCAPTCHA
                sitekey="6LdxUhMaAAAAAIrQt-_6Gz7F_58S4FlPWaxOh5ib"
                onChange={reCaptchaLoaded}
                size="invisible"
              />
              <div className="col-12 text-center">
                <button type="submit">Submit Request</button>
                {/* Form Messages */}
                {/* {isVerified === true && (
                  <Alert
                    variant="success"
                    className="mt-3 mb-0"
                    id="server_response_success"
                  >
                    <strong>Success!</strong> Contact form has been successfully
                    submitted.
                  </Alert>
                )} */}
                {/* {isVerified === false && (
                  <Alert
                    variant="danger"
                    className="mt-3 mb-0"
                    id="server_response_danger"
                  >
                    <strong>Oops!</strong> Something bad happened. Please try
                    again later.
                  </Alert>
                )} */}
                {/* Form Messages */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contactform;
