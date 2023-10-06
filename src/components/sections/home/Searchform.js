import React, { useState } from "react";

function Searchform() {
  const [location, setLocation] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Location:", location);
    // Perform your search by location logic here
  };

  return (
    <div className="sigma_banner-info style-2">
      <div className="container">
        <div className="sigma_cta style-13">
          <form onSubmit={handleSubmit}>
            <div className="row no-gutters">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Location</label>
                  <div className="input-group">
                    <i className="fal fa-map-marker-alt d-none d-sm-block" />
                    <input
                      type="text"
                      className="location-field"
                      placeholder="Location"
                      value={location}
                      onChange={handleLocationChange}
                      required
                    />
                    <div className="input-group-append">
                      <button type="submit">
                        <i className="fal fa-search mr-1" /> Find Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Searchform;
