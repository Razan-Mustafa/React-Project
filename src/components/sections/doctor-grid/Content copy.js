import React, { useState } from "react";
import { Link } from "react-router-dom";
import doctorpost from "../../../data/doctor/doctor.json";
import { getFilteredPosts } from "../../../helper/doctorHelper";
import { Rating } from "../../../helper/helper";
import Sidebar from "../../layouts/Doctorsidebar";
import Pagination from "react-js-pagination";


function Content(props) {
  const [activePage, setActivePage] = useState(1);
  const [favorite, setFavorite] = useState(null);
  const itemPerpage = 4;

  const getPosts = () => {
    const cat = props.catId ? props.catId : "";
    const filteredItems = getFilteredPosts(doctorpost, { cat });
    return filteredItems;
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const favoriteTrigger = (item) => {
    setFavorite(favorite === item ? null : item);
  };

  const paginationData = getPosts()
  
    .slice((activePage - 1) * itemPerpage, activePage * itemPerpage)
    .map((item, i) => (
      <div className="col-lg-6 col-md-6" key={i}>
        <div className="sigma_team style-16">
          <div className="sigma_team-thumb">
            <img
              src={process.env.PUBLIC_URL + "/" + item.image}
              alt={item.name}
            />
            <div className="sigma_team-controls">
              <Link
                to="#"
                className={favorite === item ? "active" : ""}
                onClick={(e) => favoriteTrigger(item)}
              >
                <i className="fal fa-heart" />
              </Link>
            </div>
          </div>
          <div className="sigma_team-body">
            <h5>
              <Link to={"/doctor-details/" + item.id}>{item.name}</Link>
            </h5>
            <div className="sigma_rating">
              {Rating(item.rating)}
              <span className="ml-3">({item.reviews.length})</span>
            </div>
            <div className="sigma_team-categories">
              <Link
                to={"/doctor-details/" + item.id}
                className="sigma_team-category"
              >
                {item.specialist}
              </Link>
            </div>
            <div className="sigma_team-info">
              <span>
                <i className="fal fa-map-marker-alt" />
                {item.location}
              </span>
            </div>
            <Link
              to={"/doctor-details/" + item.id}
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
                itemsCountPerPage={itemPerpage}
                totalItemsCount={getPosts().length}
                pageRangeDisplayed={getPosts().length}
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

export default Content;
