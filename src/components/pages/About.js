import React from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headertwo";
import Breadcrumbs from "../layouts/Breadcrumbs";
import Footer from "../layouts/Footer";
import Content from "../sections/about/Content";

const pagelocation = "About Us";

function About() {
  return (
    <>
      <MetaTags>
        <title>
          Docfind - Doctors Appointment Booking - React Template |{" "}
          {pagelocation}
        </title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Breadcrumbs breadcrumb={{ pagename: pagelocation }} />
      <Content />
      <Footer />
    </>
  );
}

export default About;
