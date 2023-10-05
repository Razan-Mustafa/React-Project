import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getDoctor } from '../../../helper/doctorHelper';
import { getAuthor, Rating } from '../../../helper/helper';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import axios from 'axios';


// Set a value in local storage
// localStorage.setItem('detailId', '1');

// Retrieve the value from local storage
const userId = localStorage.getItem('userId');
const userName = localStorage.getItem('userName');

// localStorage.removeItem('sessionVariable');

function Content({ catId, detailId }) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [Doctors, setDoctors] = useState([]);

  const [reviewText, setReviewText] = useState(
    {
      user: {
        name: userName,
        id: userId,
      },
      rating: " ",
      comment: " ",
      commentdate: new Date().toLocaleDateString(),
    }
  );
  const [rating, setRating] = useState(5);
  
  function handle(e){
    const newReview ={...reviewText}
    newReview[e.target.id] = e.target.value
    setReviewText(newReview)
    console.log(newReview)
    }
    // // review object
    // const newReview = {
    //   user: {
    //     name: userName,
    //     id: userId,
    //   },
    //   rating: rating,
    //   comment: reviewText,
    //   commentdate: new Date().toLocaleDateString(),
    // };

  useEffect(() => {
    axios
      .get('https://651a613f340309952f0d2f42.mockapi.io/REACT')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error(error));
  }, []);


  

  // const handleReviewTextChange = (e) => {
  //   setReviewText(e.target.value);
  // };

  // const handleRatingChange = (e) => {
  //   setRating(parseInt(e.target.value, 10));
  // };

  // const handleReviewSubmit = (e) => {
  //   e.preventDefault();

  // const handleReviewSubmit = (e) => {
  //   e.preventDefault();

  //   // review object
  //   const newReview = {
  //     user: {
  //       name: 'User Name',
  //       id: 123,
  //     },
  //     rating: rating,
  //     comment: reviewText,
  //     commentdate: new Date().toLocaleDateString(),
  //   };

  //   // Add the new review to the doctor's reviews array
  //   filteredItem.doctors[0].reviews.push(newReview);
  //   // const filteredItem = Doctors.find((item) => item.id === detailId );

  //   // Clear the form inputs
  //   setReviewText('');
  //   setRating(5); // Reset rating to 5 or your default rating

  //   // You can also send the new review data to your server/API here if needed
  // // };




  const filteredItem = Doctors.find((item) => item.id === detailId);

  return (filteredItem ? (

    <div className="section sigma_post-details">
      {filteredItem.doctors.map(Doc => (
        <div className="container" key={Doc.id}>
          <div className="row">
            <div className="col-lg-8">
              <div className="sigma_post-details-inner">
                <div className="entry-content">
                  <div className="sigma_team style-17 mb-0">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <div className="sigma_team-thumb">
                          <img src={process.env.PUBLIC_URL + `/assets/img/` + Doc.image} alt={Doc.name} />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="sigma_team-body">
                          <h5>
                            <Link to={"/doctor-details/" + Doc.id}>{Doc.name}</Link>
                          </h5>
                          <div className="sigma_rating">
                            {Rating(Doc.rating)}
                            <span className="ml-3">({Doc.rating})</span>
                          </div>
                          <div className="sigma_team-categories">
                            <Link to={"/doctor-details/" + Doc.id} className="sigma_team-category">{Doc.qualification}</Link>
                          </div>
                          <div className="sigma_team-info mt-4">
                            <span>
                              <i className="fal fa-phone" />
                              {Doc.phone}
                            </span>
                            <span>
                              <i className="fal fa-at" />
                              {Doc.email}
                            </span>
                            <span>
                              <i className="fal fa-building" />
                              {Doc.location}
                            </span>
                            <span>
                              <i className="fal fa-clock" />
                              {Doc.availableDays.map((day, index) => (
                                <React.Fragment key={index}>
                                  {day}
                                  {index !== Doc.availableDays.length - 1 && <> , </>}
                                </React.Fragment>
                              ))}
                            </span>

                            <span style={{ marginLeft: '25px' }}>
                              {Doc.availableTime.map((time, index) => (
                                <React.Fragment key={index}>
                                  {time}
                                  {index !== Doc.availableTime.length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="detail-menu-list">
                    <div className="row no-gutters">
                      <div className="col-md-6">
                        <div className="menu nav-item">
                          <Link to="#" className="nav-link active p-0" onClick={() => document.getElementById("overview").scrollIntoView({ behavior: 'smooth' })}>Overview</Link>
                        </div>
                      </div>
                      {/* <div className="col-md-4">
                            <div className="menu nav-item">
                              <Link to="#" className="nav-link p-0" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Location &amp; Contact</Link>
                            </div>
                          </div> */}
                      <div className="col-md-6">
                        <div className="menu nav-item border-0">
                          <Link to="#" className="nav-link p-0" onClick={() => document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' })}>Review</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="overview">
                    <h4>Overview Of {Doc.name}</h4>
                    <h5>Experience:{Doc.experience}</h5>
                    <div dangerouslySetInnerHTML={{ __html: Doc.description }} />
                  </div>
                  <div className="spacer"></div>
                  <div className="spacer"></div>
                  <div id="reviews">
                    <h4>Patient Experience</h4>
                    {/* Data */}
                    {Doc.reviews.slice(0, showAllComments ? Doc.reviews.length : 2).map(Review => (
                      <>
                        <div className="sigma_testimonial style-14" key={Review.user.id}>

                          <div className="sigma_testimonial-thumb" key={Review.user.id}>
                            <img src={process.env.PUBLIC_URL + `/assets/img/` + Review.user.image} alt={Review.user.name} />
                          </div>
                          <div className="sigma_testimonial-body" key={Review.user.id}>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-block d-sm-flex align-items-center">
                                <div className="sigma_author-block">
                                  <h5>
                                    {Review.user.name}
                                  </h5>
                                </div>
                                <div className="sigma_rating ml-sm-4 ml-0 mt-2 mt-sm-0">
                                  {Rating(Review.rating)}
                                  <span className="ml-3">({Review.rating}/5)</span>
                                </div>
                              </div>
                              <span className="sigma_testimonial-date">{Review.commentdate}</span>
                            </div>
                            <p>"{Review.comment}"</p>
                          </div>
                        </div>
                      </>))}
                    {/* Data */}
                    {!showAllComments && (
                      <button
                        type="button"
                        className="sigma_btn"
                        onClick={() => setShowAllComments(true)}
                      >
                        See More
                        <i className="fal fa-arrow-right" />
                      </button>
                    )}

                    {showAllComments && (
                      <button
                        type="button"
                        className="sigma_btn"
                        onClick={() => setShowAllComments(false)}
                      >
                        See less
                        <i className="fal fa-arrow-right" />
                      </button>
                    )}
                  </div>


                  {/* Review form ****************************************/}
                  <div className="container">
                    <br />
                    <h4>Add a Review</h4>
                    <form>
                      <div className="form-group">
                        <label>Rating:</label>
                        <select value={rating} onChange={(e)=>handle(e)}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Review:</label>
                        <textarea
                          rows="4"
                          value={reviewText}
                          onChange={(e)=>handle(e)}
                          required
                        ></textarea>
                      </div>
                      <button type="submit">Submit Review</button>
                    </form>
                  </div>


                </div>
              </div>
            </div>
            {/* Sidebar Start */}
            <div className="col-lg-4">
              <div className="sidebar style-10 mt-5 mt-lg-0">
                {/* form Widget */}
                <div className="widget widget-form">
                  <h5 className="widget-title">Summary</h5>
                  <div className="widget-inner">
                    {/* <form>
                          <label>Date</label>
                          <div className="form-group">
                            <i className="fal fa-calendar-alt" />
                            <input type="text" name="date" data-provide="datepicker" placeholder="07/10/2022" />
                          </div>
                          <label>Time</label>
                          <div className="form-group mb-0">
                            <i className="far fa-clock" />
                            <input type="text" name="time" placeholder="08:30 PM" />
                          </div>
                        </form> */}
                  </div>
                  <hr />
                  <div className="widget-inner widget-service">

                    <form>
                      <div className="form-group">
                        {/* <label>Service</label> */}
                        <ul>
                          <li className="d-flex justify-content-between mb-3">
                            <div className="d-flex">
                              <input type="checkbox" id="checkbox" name="checkbox" />
                              <label className="mb-0" htmlFor="checkbox">Service Price</label>
                            </div>
                            <span>{Doc.price}</span>
                          </li>
                          <li className="d-flex justify-content-between mb-3">
                            <div className="d-flex">
                              <input type="checkbox" id="checkbox1" name="checkbox" />
                              <label className="mb-0" htmlFor="checkbox1">Lorem ipsum dolor</label>
                            </div>
                            <span>{Doc.price}</span>
                          </li>
                          <li className="d-flex justify-content-between">
                            <div className="d-flex">
                              <input type="checkbox" id="checkbox2" name="checkbox" />
                              <label className="mb-0" htmlFor="checkbox2">Lorem ipsum dolor</label>
                            </div>
                            <span>{Doc.price}</span>
                          </li>
                        </ul>
                      </div>

                      <Link to={"/appointment/" + catId + "/" + detailId} className="sigma_btn btn-block btn-sm">
                        Book Appointment
                        <i className="fal fa-arrow-right ml-3" />
                      </Link>
                    </form>

                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar End */}
          </div>
        </div>
      ))}
    </div>
  ) : null)
}
export default Content;