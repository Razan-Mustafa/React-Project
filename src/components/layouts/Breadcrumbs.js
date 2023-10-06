import React from "react";
import { Link } from "react-router-dom";

function Breadcrumbs(props) {
  return (
    <div className="sigma_subheader style-5 bg-gray">
      <div className="container">
        <div className="sigma_subheader-inner">
          <h1>{props.breadcrumb.pagename}</h1>
        </div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="btn-link">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.breadcrumb.pagename}
          </li>
        </ol>
      </div>
      <img
        src={process.env.PUBLIC_URL + "/assets/img/subheader-br.png"}
        className="br"
        alt="subheader"
      />
      <img
        src={process.env.PUBLIC_URL + "/assets/img/subheader-bl.png"}
        className="bl"
        alt="subheader"
      />
      <img
        src={process.env.PUBLIC_URL + "/assets/img/subheader-tr.png"}
        className="tr"
        alt="subheader"
      />
    </div>
  );
}

export default Breadcrumbs;
