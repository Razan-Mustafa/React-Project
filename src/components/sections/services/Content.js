import React, { Fragment, useState, useEffect } from "react";
import Testimonials from "./Testimonials";
import Galleryslider from "../../layouts/Galleryslider";
import { Link } from "react-router-dom";
import serviceblock from "../../../data/service/service.json";
import { getFilteredPosts } from "../../../helper/serviceHelper";

function Content(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getPosts());
  }, [props.catId]);

  function getPosts() {
    var cat = props.catId ? props.catId : "";
    var filteredItems = getFilteredPosts(serviceblock, { cat });
    return filteredItems;
  }

  const contentData = data.map((item, i) => {
    return (
      <div className="col-lg-4 col-md-6" key={i}>
        <div className="sigma_service style-18 has-bg">
          <div className="sigma_service-thumb">
            <i className={item.icon} />
          </div>
          <div className="sigma_service-body">
            <h5>
              <Link to={"/service-details/" + item.id}>{item.title}</Link>
            </h5>
            <p>{item.shorttext.slice(0, 70)}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className="section section-padding">
        <div className="container">
          <div className="row">
            {/* Data */}
            {contentData}
            {/* Data */}
          </div>
        </div>
      </div>
      <div className="section pt-0">
        <div className="container-fluid p-0">
        </div>
      </div>
    </Fragment>
  );
}

export default Content;
