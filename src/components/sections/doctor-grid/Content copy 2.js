import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import doctorpost from "../../../data/doctor/doctor.json";
import { getFilteredPosts } from "../../../helper/doctorHelper";
import { Rating } from "../../../helper/helper";
import Sidebar from "../../layouts/Doctorsidebar";
import Pagination from "react-js-pagination";
import axios from "axios";

function CategoryPage({ catId }) {
  const [doctorsList, setDoctors] = useState({ doctors: [] }); // Initialize as an empty object
  const categoryId = catId; // Get the category ID from the URL parameter
  console.log(catId);

  const getDoctorData = () => {
    axios
      .get(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${categoryId}`)
      .then((response) => {
        const doctorData = response.data;
        setDoctors(doctorData);
        console.log(doctorData.doctors);
      });
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <div>
      {doctorsList.doctors.map((doctor) => (
        <div className="col-lg-6 col-md-6" key={doctor.id}>
          <div className="sigma_team style-16">
            <div className="sigma_team-thumb">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/" + doctor.image}
                alt={doctor.name}
              />
              <div className="sigma_team-controls">
                <Link
                  to="#"
                  //  className={favorite === item ? "active" : ""}
                  //  onClick={(e) => favoriteTrigger(item)}
                >
                  <i className="fal fa-heart" />
                </Link>
              </div>
            </div>
            <div className="sigma_team-body">
              <h5>
                <Link to={"/doctor-details/" + doctor.id}>{doctor.name}</Link>
              </h5>
              <div className="sigma_rating">
                {/* {Rating(item.rating)}
           <span className="ml-3">({item.reviews.length})</span> */}
              </div>
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
                to={"/doctor-details/" + doctor.id}
                className="sigma_btn btn-block btn-sm"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  //   return (
  //     <div className="sidebar-style-9">
  //       <div className="section section-padding">
  //         <div className="container">
  //           <div className="row">
  //             <div className="col-lg-4">
  //               <Sidebar />
  //             </div>
  //             <div className="col-lg-8">
  //               <div className="row">
  //                 {/* Data */}
  //                 {paginationData}
  //                 {/* Data */}
  //               </div>
  //               {/* Pagination */}
  //               <Pagination
  //                 activePage={activePage}
  //                 itemsCountPerPage={itemPerpage}
  //                 totalItemsCount={getPosts().length}
  //                 pageRangeDisplayed={getPosts().length}
  //                 onChange={handlePageChange}
  //                 innerClass="pagination"
  //                 activeClass="active"
  //                 itemClass="page-item"
  //                 linkClass="page-link"
  //               />
  //               {/* Pagination */}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}

export default CategoryPage;
