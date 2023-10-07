import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headertwo";
import Breadcrumbs from "../layouts/Breadcrumbs";
import Footer from "../layouts/Footer";
import Categories from "../sections/home/Categories";

const pagelocation = "All Departments";

function category() {
  return (
    <Fragment>
      <MetaTags>
        <title>
          Docfind - Doctors Appointment Booking - React Template |{" "}
          {pagelocation}
        </title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Breadcrumbs breadcrumb={{ pagename: pagelocation }} />
     <div className="section section-padding bg-gray">
        <div className="container">
          <div className="section-title centered">
            <span className="subtitle">Choose one department ..</span>
            {/* <h3 className="title">All Departments</h3> */}
          </div>
          <Categories />
        </div>
      </div>
     
      <Footer />
    </Fragment>
  );
}

export default category;
