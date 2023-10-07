import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";

const settings = {
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  centerMode: true,
  centerPadding: 0,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function Team() {
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get("https://651be95a194f77f2a5af127c.mockapi.io/Docfind")
      .then((response) => {
        // Assuming the API response contains an array of categories
        const categories = response.data;
        const allDoctors = categories.flatMap((category) => category.doctors);
        setAllDoctors(allDoctors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="section section-padding sigma_team-sec style-14 bg-gray">
      <div className="container-fluid p-sm-0">
        <div className="section-title centered">
          <span className="subtitle text-white">Meet Our Team</span>
          <h3 className="title text-white">Our Creative Team</h3>
        </div>
        <Slider {...settings} className="sigma_team-slider-2">
          {/* Data */}
          {/* Render all doctors */}
          {allDoctors.map((doctor) => (
            <div key={doctor.id} className="sigma_team style-14">
              <div className="sigma_team-thumb">
                <img
                  src={process.env.PUBLIC_URL + "/assets/img/" + doctor.image}
                  alt={doctor.name}
                />
              </div>
              <div className="sigma_team-body">
                <h5>
                  <Link
                    style={{ fontSize: "20px" }}
                    to={"/doctor-details/" + doctor.id}
                  >
                    {doctor.name}
                  </Link>
                </h5>
                <div className="sigma_team-categories">
                  <Link
                    to={"/doctor-details/" + doctor.id}
                    className="sigma_team-category"
                  >
                    {doctor.qualification}
                  </Link>
                </div>
                <div className="sigma_team-info">
                  <span>
                    <i className="fal fa-map-marker-alt" />
                    {doctor.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Data */}
        </Slider>
      </div>
    </div>
  );
}

export default Team;
