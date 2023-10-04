import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getDoctor } from '../../../helper/doctorHelper';
import { getAuthor, Rating } from '../../../helper/helper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


// Set a value in local storage
localStorage.setItem('doctorid', '1');

// Retrieve the value from local storage
const doctorid = localStorage.getItem('doctorid');

// localStorage.removeItem('sessionVariable');

function Content() {
    const [showAllComments, setShowAllComments] = useState(false);
    const [Doctors, setDoctors] = useState([]);


    useEffect(() => {
        axios
          .get('https://651a613f340309952f0d2f42.mockapi.io/REACT')
          .then((response) => setDoctors(response.data))
          .catch((error) => console.error(error));
      }, []);

      const filteredItem = Doctors.find((item) => item.id === doctorid );

      return(filteredItem ? (
      
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
                              <img src={`${Doc.image}`} alt={Doc.name} />
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
                                    {index !== Doc.availableTime.length - 1 && <br/>}
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
                        {Doc.reviews.slice(0, showAllComments ? Doc.reviews.length : 2).map(Review =>(
                        <>
                        <h5>
                           {Review.user.name}
                        </h5>
                          <div className="sigma_testimonial style-14" key={Review.user.id}>
                            
                              <div className="sigma_testimonial-thumb" key={Review.user.id}>
                                <img src={process.env.PUBLIC_URL + "/" + Review.image} alt={Review.user.name} />
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
                      
                    </div>
                  </div>
                </div>
                {/* Sidebar Start */}
                <div className="col-lg-4">
                  <div className="sidebar style-10 mt-5 mt-lg-0">
                    {/* form Widget */}
                    <div className="widget widget-form">
                      <h5 className="widget-title">Booking Summary</h5>
                      <div className="widget-inner">
                        <form>
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
                        </form>
                      </div>
                      <hr />
                      <div className="widget-inner widget-service">
                        <form>
                          <div className="form-group">
                            <label>Choose Service</label>
                            <ul>
                              <li className="d-flex justify-content-between mb-3">
                                <div className="d-flex">
                                  <input type="checkbox" id="checkbox" name="checkbox" />
                                  <label className="mb-0" htmlFor="checkbox">Lorem ipsum dolor</label>
                                </div>
                                <span>$80</span>
                              </li>
                              <li className="d-flex justify-content-between mb-3">
                                <div className="d-flex">
                                  <input type="checkbox" id="checkbox1" name="checkbox" />
                                  <label className="mb-0" htmlFor="checkbox1">Lorem ipsum dolor</label>
                                </div>
                                <span>$80</span>
                              </li>
                              <li className="d-flex justify-content-between">
                                <div className="d-flex">
                                  <input type="checkbox" id="checkbox2" name="checkbox" />
                                  <label className="mb-0" htmlFor="checkbox2">Lorem ipsum dolor</label>
                                </div>
                                <span>$80</span>
                              </li>
                            </ul>
                          </div>
                          <Link to="/appointment" className="sigma_btn btn-block btn-sm">
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
      ): null)
 }
export default Content;