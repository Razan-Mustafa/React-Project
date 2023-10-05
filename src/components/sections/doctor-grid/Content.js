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

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationData = doctorsList
    .slice((activePage - 1) * itemPerPage, activePage * itemPerPage)
    .map((doctor) => (
      <div className="col-lg-6 col-md-6" key={doctor.id}>
        <div className="sigma_team style-16">
          <div className="sigma_team-thumb">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/" + doctor.image}
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
              <Link to={"/doctor-details/" + doctor.id}>{doctor.name}</Link>
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
              to={"/doctor-details/" + catId + "/" + doctor.id}
              className="sigma_btn btn-block btn-sm"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="sidebar-style-9">
      <div className="section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <Sidebar />
            </div>
            <div className="col-lg-8">
              <div className="row">
                {/* Data */}
                {paginationData}
                {/* Data */}
              </div>
              {/* Pagination */}
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemPerPage}
                totalItemsCount={doctorsList.length}
                pageRangeDisplayed={doctorsList.length}
                onChange={handlePageChange}
                innerClass="pagination"
                activeClass="active"
                itemClass="page-item"
                linkClass="page-link"
              />
              {/* Pagination */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
