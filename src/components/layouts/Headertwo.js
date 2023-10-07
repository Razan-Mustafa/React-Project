import React, { Fragment, useState } from "react";
import Mobilemenu from "./Mobilemenu";
import { Link } from "react-router-dom";
import navigation from "../../data/navigation.json";
import { useHistory } from 'react-router-dom';

function Headertwo() {

  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('IsLoggedIn') === 'true');
  // Define state and toggle function using useState hook
  const [navMethod, setNavMethod] = useState(false);

  // Function to toggle navigation
  const toggleNav = () => {
    setNavMethod(!navMethod);
  };

  const IsLoggedIn = sessionStorage.getItem('IsLoggedIn');

  const handleLogout = () => {
    sessionStorage.removeItem('IsLoggedIn');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userImg');
    setIsLoggedIn(false);
    history.push('/');
  }

  return (
    <Fragment>
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
      <header className="sigma_header style-5 bg-transparent shadow-none can-sticky">
        <div className="container">
          <div className="sigma_header-top d-none d-md-block">
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
        <div className="container">
          <div className="sigma_header-middle pl-4 pr-4">
            <div className="navbar">
              <div className="sigma_logo-wrapper">
                <Link to="/" className="sigma_logo">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/logo.png"}
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="d-flex align-items-center">
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
                    {IsLoggedIn &&
                      <li className="d-none d-sm-block" style={{ marginLeft: '20px' }}>
                        <Link to="/profile" className="sigma_btn btn-sm">
                          My Profile
                        </Link>
                      </li>
                    }
                    {!IsLoggedIn &&
                      <li className="d-none d-sm-block" style={{ marginLeft: '20px' }}>
                        <Link to="/authUser" className="sigma_btn btn-sm">
                          Login
                        </Link>
                      </li>
                    }

                    {IsLoggedIn &&
                      <li className="d-none d-sm-block">
                        <button onClick={handleLogout} className="sigma_btn btn-sm">
                          Log out
                          <i className="fal fa-arrow-right" />
                        </button>
                      </li>
                    }
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
        </div>
      </header>
      {/* Header */}
    </Fragment >
  );
}

export default Headertwo;
