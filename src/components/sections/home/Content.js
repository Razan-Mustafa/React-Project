import React, { Component, Fragment } from "react";
import Banner from "./Banner";
import Searchform from "./Searchform";
import Services from "./Services";
import Whyus from "./Whyus";
import Counter from "./Counter";
import Categories from "./Categories";
import Newsletter from "./Newsletter";
import Clients from "./Clients";
import Workprocess from "./Workprocess";
import Team from "./Team";
import Blogs from "./Blogs";
import Testimonials from "./Testimonials";
import Galleryslider from "../../layouts/Galleryslider";

class Content extends Component {
  render() {
    return (
      <Fragment>
        <Banner />
        <Searchform />
        <div className="section section-padding bg-gray">
          <div className="container">
            <div className="section-title centered">
              <span className="subtitle">What We do</span>
              <h3 className="title">Our Services</h3>
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
        <Workprocess />
        <Team />
        {/* <Blogs /> */}
        <Testimonials />
        <div className="container-fluid p-0">
        </div>
      </Fragment>
    );
  }
}

export default Content;
