import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Content from "../sections/home/Content";

const pagelocation = "Homepage";

function Home() {
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
      <Content />
      <Footer />
    </Fragment>
  );
}

export default Home;
