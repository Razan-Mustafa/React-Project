import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAuthor, Rating } from '../../../helper/helper';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';




function Content({ catId, detailId }) {

  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('IsLoggedIn') === 'true');
  const [showAllComments, setShowAllComments] = useState(false);
  const [Review, setReview] = useState([]);
  const [doctorDatafiltered, setDoctorData] = useState([]);

  // Retrieve session storage
  const IsLoggedIn = sessionStorage.getItem('IsLoggedIn');
  const userId = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName');
  const userImg = sessionStorage.getItem('userImg');
  // console.log(userImg);
  // console.log(userName);

  // start handel add review 
  const [reviewText, setReviewText] = useState({
    userid: userId,
    doctorid: detailId,
    catid: catId,
    name: userName,
    image: userImg,
    commentdate: new Date().toLocaleDateString(),
    rating: 5,
    comment: " "
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReviewText({
      ...reviewText,
      [id]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`https://651a613f340309952f0d2f42.mockapi.io/Review`, reviewText)
      .then((response) => {
        if (response.status === 201) {
          const newReview = response.data;
          // Update reviews state with the new review
          setReview([...Review, newReview]);
          setReviewText({ rating: 5, comment: "" });
          console.log('Review added successfully:', newReview);
          BtnClick();
        } else {
          console.error('Failed to add review');
        }
      })
      .catch((error) => {
        console.error('Error adding review:', error);
      });
  };

  const BtnClick = () => {
    Swal.fire({
      icon: "success",
      title: "Your Review Submitted Successfully !",
      showConfirmButton: false,
      timer: 2500,
    });
  }
  // end

  // stat get and post data
  const getReview = () => {
    axios
      .get('https://651a613f340309952f0d2f42.mockapi.io/Review')
      .then((response) => setReview(response.data))
      .catch((error) => console.error(error));

  };


  const getDoctorData = () => {
    axios
      .get(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${catId}`)
      .then((response) => {
        const doctorData = response.data;

        if (doctorData) {
          const doctor = doctorData.doctors.find((doctor) => doctor.id === detailId);
          if (doctor) {
            const dataaaa = doctor;
            setDoctorData(dataaaa);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching doctor data:', error);
      });
  };

  useEffect(() => {
    getDoctorData();
    getReview();
  }, [setReviewText]);
  // end


  // start calculating Rating
  const reviewsFiltered = Review.filter(review => review.doctorid === detailId && review.catid === catId);

  const totalRating = reviewsFiltered.reduce((sum, review) => {
    const rating = parseFloat(review.rating);
    return sum + rating;
  }, 0);

  const averageRating = reviewsFiltered.length === 0 ? 0 : totalRating / reviewsFiltered.length;
  // end 

  return (doctorDatafiltered && (
    <div className="section sigma_post-details">
      <div className="container" key={doctorDatafiltered.id}>
        <div className="row">
          <div className="col-lg-8">
            <div className="sigma_post-details-inner">
              <div className="entry-content">
                <div className="sigma_team style-17 mb-0">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <div className="sigma_team-thumb">
                        <img src={process.env.PUBLIC_URL + `/assets/img/` + doctorDatafiltered.image} alt={doctorDatafiltered.name} />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="sigma_team-body">
                        <h5>
                          <Link to={"/doctor-details/" + doctorDatafiltered.id}>{doctorDatafiltered.name}</Link>
                        </h5>
                        <div className="sigma_rating">
                          {Rating(averageRating.toFixed(2))}
                          <span className="ml-3">({averageRating.toFixed(2)})</span>
                        </div>
                        <div className="sigma_team-categories">
                          <Link to={"/doctor-details/" + doctorDatafiltered.id} className="sigma_team-category">{doctorDatafiltered.qualification}</Link>
                        </div>
                        <div className="sigma_team-info mt-4">
                          <span>
                            <i className="fal fa-phone" />
                            {doctorDatafiltered.phone}
                          </span>
                          <span>
                            <i className="fal fa-at" />
                            {doctorDatafiltered.email}
                          </span>
                          <span>
                            <i className="fal fa-building" />
                            {doctorDatafiltered.location}
                          </span>
                          <span>
                            <i className="fal fa-money-bill" />
                            Service Price :{doctorDatafiltered.price} JOD
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
                    <div className="col-md-6">
                      <div className="menu nav-item border-0">
                        <Link to="#" className="nav-link p-0" onClick={() => document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' })}>Review</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="overview">
                  <h4>Overview Of {doctorDatafiltered.name}</h4>
                  <h5>Experience:{doctorDatafiltered.experience}</h5>
                  <div dangerouslySetInnerHTML={{ __html: doctorDatafiltered.description }} />
                </div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                {reviewsFiltered.length > 0 &&
                  <div id="reviews">
                    <h4>Patient Experience</h4>
                    {/* Data */}

                    {Review.filter(review => review.doctorid === detailId && review.catid === catId).slice(0, showAllComments ? Review.length : 2).map(Review => (
                      // {doctorDatafiltered.reviews.slice(0, showAllComments ? doctorDatafiltered.reviews.length : 2).map(Review => (
                      <>
                        <div className="sigma_testimonial style-14" key={Review.id}>

                          <div className="sigma_testimonial-thumb" key={Review.id}>
                            <img src={process.env.PUBLIC_URL + `/assets/img/` + Review.image} alt={Review.name} />
                          </div>
                          <div className="sigma_testimonial-body" key={Review.id}>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-block d-sm-flex align-items-center">
                                <div className="sigma_author-block">
                                  <h5>
                                    {Review.name}
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
                }


                {/* Review form ****************************************/}
                {!IsLoggedIn &&
                  <div>
                    <br></br>
                    <h5>To Add Review Please <Link to="/authUser"><h5 style={{ color: '#00acb1', textDecoration: 'underline' }}>
                      Login</h5></Link></h5>
                  </div>
                }
                {IsLoggedIn &&
                  <div className="container">
                    <br />
                    <h4>Add a Review</h4>
                    <form onSubmit={(e) => submit(e)}>
                      <div className="form-group">
                        <label>Rating:</label>
                        <select id="rating" value={reviewText.rating} onChange={(e) => handleInputChange(e)}>
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
                          id="comment"
                          value={reviewText.comment}
                          onChange={(e) => handleInputChange(e)}
                          required
                        ></textarea>
                      </div>
                      <button type="submit">Submit Review</button>
                    </form>
                  </div>
                }
              </div>
            </div>
          </div>
          {/* Sidebar Start */}
          <div className="col-lg-4" >
            <div className="sidebar style-10 mt-5 mt-lg-0">
              {/* form Widget */}
              <div className="widget widget-form">
                <h5 className="widget-title">Schedule</h5>
                <div className="widget-inner">

                </div>
                <hr />
                <div className="widget-inner widget-service">

                  <form>
                    <div className="form-group">
                      <table>
                        <thead>
                          <tr>
                            <th>Day</th>
                            <th>Available Times</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctorDatafiltered.availableDays && doctorDatafiltered.availableDays.map((day, index) => (
                            <tr key={index}>
                              <td>{day.day}</td>
                              <td style={{ fontSize: '14px' }}>
                                {day.times && day.times.map((timeSlot, timeIndex) => (
                                  <React.Fragment key={timeIndex}>
                                    {timeSlot.timeSlot}
                                    {timeIndex !== day.times.length - 1 && ', '}
                                  </React.Fragment>
                                ))}
                              </td>
                            </tr>
                          ))
                          }
                        </tbody>

                      </table>
                    </div>

                    <Link to={isLoggedIn ? `/appointment/${catId}/${detailId}` : '/authUser'} className="sigma_btn btn-block btn-sm">
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

    </div>
  ))
}
export default Content;