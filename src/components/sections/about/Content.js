import React, { Fragment } from "react";
import Counter from "./Counter";
import Whyus from "./Whyus";
import Workprocess from "./Workprocess";

function Content() {
  return (
    <Fragment>
      <Workprocess />
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
      {/* <Team /> */}
      <br></br>
      <br></br>
      <div className="section section-padding p-0">
        <div className="container-fluid p-0">
        </div>
      </div>
    </Fragment>
  );
}

export default Content;
