import React, { Fragment } from "react";
import Banner from "./Banner";
import Services from "./Services";
import Whyus from "./Whyus";
import Counter from "./Counter";
import Categories from "./Categories";
import Workprocess from "./Workprocess";
import Team from "./Team";
import Testimonials from "./Testimonials";

function Content() {
  return (
    <Fragment>
      <Banner />
      <Workprocess />
      {/* <Searchform /> */}
      <div className="section section-padding bg-gray">
        <div className="container">
          <div className="section-title centered">
            <span className="subtitle">medical departments</span>
            <h3 className="title">Our Doctors</h3>
          </div>
          <Categories />
        </div>
      </div>
      <div
        className="section bg-secondary-1"
        style={{
          backgroundImage:
            "url(" + process.env.PUBLIC_URL + "/assets/img/pattern.png)",
        }}
      >
        <div className="container">
          <Whyus />
          <Counter />
        </div>
      </div>
      <div className="section pb-0 bg-gray" />
      <Services />

      {/* <div className="section section-padding" /> */}

      <Team />
      <Testimonials />
      <div className="container-fluid p-0"></div>
    </Fragment>
  );
}

export default Content;
