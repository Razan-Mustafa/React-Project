import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headertwo";
import Breadcrumbs from "../layouts/Breadcrumbs";
import Footer from "../layouts/Footer";
import CategoryPage from "../sections/doctor-grid/Content";

const pagelocation = "All Doctors";

function Doctorgrid(props) {
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
      <CategoryPage catId={props.match.params.id} />
      <Footer />
    </Fragment>
  );
}

export default Doctorgrid;
