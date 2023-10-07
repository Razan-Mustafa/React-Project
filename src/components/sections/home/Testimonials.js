import React, { useState, useEffect } from "react";
import axios from "axios";

function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch your data from an API or other source using Axios
    axios
      .get("https://651a613f340309952f0d2f42.mockapi.io/Review")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Display only the first three reviews
  const firstThreeReviews = reviews.slice(0, 3);

  return (
    <div className="section section-padding">
      <div className="container">
        <div className="section-title centered">
          <span className="subtitle">Client Testimonials</span>
          <h3 className="title">What Our Clients Say</h3>
        </div>
        <div className="row">
          {/* Data */}
          {firstThreeReviews.map((review) => (
            <div className="col-lg-4 col-md-6" key={review.id}>
              <div className="sigma_testimonial bg-gray style-13">
                <div className="sigma_testimonial-thumb">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/" + review.image}
                    alt={review.name}
                  />
                  <span className="fas fa-quote-left sigma_testimonial-icon" />
                </div>
                <div className="sigma_testimonial-body">
                  <p>"{review.comment.slice(0, 124)}"</p>
                  <div className="sigma_author-block">
                    <h5>{review.name}</h5>
                    <span className="sigma_testimonial-category">
                      {review.commentdate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Data */}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
