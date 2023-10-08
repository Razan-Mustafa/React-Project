import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../layouts/Doctorsidebar";
import Pagination from "react-js-pagination";

function CategoryPage({ catId }) {
  const [doctorsList, setDoctors] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemPerPage = 4;
  const categoryId = catId;
  const [selectedLocation, setSelectedLocation] = useState("All");

  const getDoctorData = () => {
    axios
      .get(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${categoryId}`)
      .then((response) => {
        const doctorData = response.data.doctors;
        setDoctors(doctorData);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  useEffect(() => {
    getDoctorData();
  }, [categoryId]);

  useEffect(() => {
    setActivePage(1);
  }, [selectedLocation]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const filterDoctorsByLocation = (doctors, location) => {
    if (location === "All") {
      return doctors;
    }
    return doctors.filter((doctor) => doctor.location === location);
  };

  const filteredDoctors = filterDoctorsByLocation(
    doctorsList,
    selectedLocation
  );

  const locationOptions = ["All", "Irbid", "Amman", "Zarqa"];

  return (
    <div className="sidebar-style-9">
      <div className="section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="widget">
                <h5 className="widget-title">Location</h5>
                <select
                  name="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locationOptions.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-8">
              {filteredDoctors.length === 0 ? (
                <div style={{ marginTop: "50px", marginLeft: "80px" }}>
                  No doctors available in this location.
                </div>
              ) : (
                <>
                  <div className="row">
                    {filteredDoctors
                      .slice(
                        (activePage - 1) * itemPerPage,
                        activePage * itemPerPage
                      )
                      .map((doctor) => (
                        <div className="col-lg-6 col-md-6" key={doctor.id}>
                          <div className="sigma_team style-16">
                            <div className="sigma_team-thumb">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/" +
                                  doctor.image
                                }
                                alt={doctor.name}
                              />
                              <div className="sigma_team-controls">
                                <Link to="#">
                                  <i className="fal fa-heart" />
                                </Link>
                              </div>
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
                              <Link
                                to={
                                  "/doctor-details/" + catId + "/" + doctor.id
                                }
                                className="sigma_btn btn-block btn-sm"
                              >
                                View More
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemPerPage}
                    totalItemsCount={filteredDoctors.length}
                    pageRangeDisplayed={filteredDoctors.length}
                    onChange={handlePageChange}
                    innerClass="pagination"
                    activeClass="active"
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
