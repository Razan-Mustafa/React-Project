import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch your data from an API or other source using Axios
    axios
      .get("https://651be95a194f77f2a5af127c.mockapi.io/Docfind")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="row">
      {/* Data */}
      {categories.map((category) => (
        <div className="col-lg-4 col-md-6" key={category.id}>
          <div className="sigma_service style-17">
            <div className="sigma_service-thumb">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/" + category.image}
                alt={category.image}
              />
            </div>
            <div className="sigma_service-body">
              <h5>
                <Link
                  to={"/category/" + category.id}
                  style={{ fontSize: "20px" }}
                >
                  {category.name}
                </Link>{" "}
              </h5>

              <p>{category.description}</p>
              <Link
                to={"/category/" + category.id}
                className="btn-link primary-color"
              >
                See All
                <i className="fal fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      ))}
      {/* Data */}
    </div>
  );
}

export default Categories;
