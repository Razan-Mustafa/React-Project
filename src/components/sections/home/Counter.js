import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

function Counter(props) {
  const [userData, setUserData] = useState({ count: 0 });
  const [doctorData, setDoctorData] = useState({ count: 0 });
  const [reviewData, setReviewData] = useState({ count: 0 });
  const [bookingData, setBookingData] = useState({ count: 0 });
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    // Fetch user accounts data from the API
    axios
      .get("https://651be95a194f77f2a5af127c.mockapi.io/users")
      .then((response) => {
        const userCount = response.data.length;
        setUserData({ count: userCount });
      })
      .catch((error) => {
        console.error("Error fetching user accounts:", error);
      });

    // Fetch doctor data from the API
    axios
      .get("https://651be95a194f77f2a5af127c.mockapi.io/Docfind")
      .then((response) => {
        const totalDoctorCount = response.data.reduce(
          (acc, category) => acc + category.doctors.length,
          0
        );
        setDoctorData({ count: totalDoctorCount });
      })
      .catch((error) => {
        console.error("Error fetching doctors data:", error);
      });

    // Fetch reviews data from the API and update the review count
    axios
      .get("https://651a613f340309952f0d2f42.mockapi.io/Review")
      .then((response) => {
        const reviewCount = response.data.length;
        setReviewData({ count: reviewCount });
      })
      .catch((error) => {
        console.error("Error fetching reviews data:", error);
      });

    // Fetch bookings data from the API and update the booking count
    axios
      .get("https://651cfc0044e393af2d58f77b.mockapi.io/booking")
      .then((response) => {
        const bookingCount = response.data.length;
        setBookingData({ count: bookingCount });
      })
      .catch((error) => {
        console.error("Error fetching bookings data:", error);
      });
  }, []);

  return (
    <div
      className="sigma_counter-wrapper margin-negative bg-primary-1 style-5"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/pattern-2.png)`,
      }}
    >
      <div className="row">
        {/* User Accounts Count */}
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="sigma_counter style-5">
            <span>
              <CountUp
                start={focus ? 0 : null}
                end={userData.count}
                duration={5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <VisibilitySensor
                    onChange={(isVisible) => {
                      if (isVisible) {
                        setFocus(true);
                      }
                    }}
                  >
                    <b ref={countUpRef} className="counter" />
                  </VisibilitySensor>
                )}
              </CountUp>
              <span className="plus">+</span>
            </span>
            <p className="text-white">User Accounts</p>
          </div>
        </div>
        {/* Doctor Count */}
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="sigma_counter style-5">
            <span>
              <CountUp
                start={focus ? 0 : null}
                end={doctorData.count}
                duration={5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <VisibilitySensor
                    onChange={(isVisible) => {
                      if (isVisible) {
                        setFocus(true);
                      }
                    }}
                  >
                    <b ref={countUpRef} className="counter" />
                  </VisibilitySensor>
                )}
              </CountUp>
              <span className="plus">+</span>
            </span>
            <p className="text-white">Doctors</p>
          </div>
        </div>
        {/* Reviews Count */}
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="sigma_counter style-5">
            <span>
              <CountUp
                start={focus ? 0 : null}
                end={reviewData.count}
                duration={5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <VisibilitySensor
                    onChange={(isVisible) => {
                      if (isVisible) {
                        setFocus(true);
                      }
                    }}
                  >
                    <b ref={countUpRef} className="counter" />
                  </VisibilitySensor>
                )}
              </CountUp>
              <span className="plus">+</span>
            </span>
            <p className="text-white">Reviews</p>
          </div>
        </div>
        {/* Bookings Count */}
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="sigma_counter style-5">
            <span>
              <CountUp
                start={focus ? 0 : null}
                end={bookingData.count}
                duration={5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <VisibilitySensor
                    onChange={(isVisible) => {
                      if (isVisible) {
                        setFocus(true);
                      }
                    }}
                  >
                    <b ref={countUpRef} className="counter" />
                  </VisibilitySensor>
                )}
              </CountUp>
              <span className="plus">+</span>
            </span>
            <p className="text-white">Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
