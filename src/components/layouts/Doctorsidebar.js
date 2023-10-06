import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function Doctorsidebar() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors based on the selected location
  useEffect(() => {
    if (selectedLocation) {
      axios
        .get(
          `https://651be95a194f77f2a5af127c.mockapi.io/Docfind?location=${selectedLocation}`
        )
        .then((response) => {
          setDoctors(response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
        });
    }
  }, [selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="sidebar mb-5">
      {/* Location Filter */}
      <div className="widget">
        <h5 className="widget-title">Location</h5>
        <select
          name="location"
          id="locationFilter"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="">Select Location</option>
          <option value="Irbid">Irbid</option>
          <option value="Amman">Amman</option>
          <option value="Zarqa">Zarqa</option>
        </select>
      </div>

      {/* Display Doctors */}
      <div className="widget widget-categories">
        <h5 className="widget-title">Doctors</h5>
        <ul>
          {doctors.map((doctor, i) => (
            <li key={i}>
              <a href={`/doctor/cat/${doctor.id}`}>{doctor.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Doctorsidebar);
