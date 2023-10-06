import React, { useState } from "react";
import Navhelper from "../../helper/NavHelper";
import Mobilemenu from "./Mobilemenu";
import { Link } from "react-router-dom";
import navigation from "../../data/navigation.json";

function Header() {
  const [navMethod, setNavMethod] = useState(false);
  const [searchMethod, setSearchMethod] = useState(false);

  const toggleNav = () => {
    setNavMethod(!navMethod);
  };

  const toggleSearch = () => {
    setSearchMethod(!searchMethod);
  };

  return (
    <>
      {/* Mobile Menu */}
      <aside
        className={
          navMethod === true ? "sigma_aside aside-open" : "sigma_aside"
        }
      >
        <div className="sigma_close aside-trigger" onClick={toggleNav}>
          <span />
          <span />
        </div>
        <Mobilemenu />
      </aside>
      <div className="sigma_aside-overlay aside-trigger" onClick={toggleNav} />
      {/* Mobile Menu */}
      {/* Header */}
      <header className="sigma_header header-absolute style-5 other can-sticky">
        <div className="sigma_header-top dark-bg d-none d-md-block">
          <div className="container-fluid">
            <div className="sigma_header-top-inner">
              <div className="sigma_header-top-links">
                <ul className="sigma_header-top-nav">
                  <li>
                    <Link to="#">
                      <i className="fal fa-envelope" />
                      docfind@gmail.com
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fal fa-map-marker-alt" />
                      Jordan, Irbid
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="sigma_header-top-contacts">
                <ul className="sigma_header-top-nav">
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      <i className="fab fa-google" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="sigma_header-middle">
          <div className="container-fluid">
            <div className="navbar">
              <div className="sigma_logo-wrapper">
                <Link to="/" className="sigma_logo">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/logo-light.png"}
                    alt="logo"
                  />
                </Link>
              </div>
              <ul className="navbar-nav">
                {/* Data */}
                {navigation.map((item, i) => (
                  <li key={i} className="menu-item">
                    <Link to={item.link}>{item.linkText}</Link>
                  </li>
                ))}
                {/* Data */}
              </ul>
              <div className="sigma_header-controls style-2">
                <ul className="sigma_header-controls-inner">
                 
                  <li className="d-none d-sm-block">
                    <Link to="/contact" className="sigma_btn btn-sm">
                      Get a Quote
                      <i className="fal fa-arrow-right" />
                    </Link>
                  </li>
                  <li
                    className="aside-toggle aside-trigger"
                    onClick={toggleNav}
                  >
                    <span />
                    <span />
                    <span />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header */}
      {/* Search Bar */}
      <div
        className={
          searchMethod === true
            ? "search-form-wrapper open"
            : "search-form-wrapper"
        }
      >
        <div className="search-trigger sigma_close" onClick={toggleSearch}>
          <span />
          <span />
        </div>
        <form className="search-form">
          <input type="text" placeholder="Search..." required />
          <button type="submit" className="search-btn">
            <i className="fal fa-search m-0" />
          </button>
        </form>
      </div>
      {/* Search Bar */}
    </>
  );
}

export default Header;
