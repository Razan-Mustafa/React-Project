import React, { Suspense, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// Import other components here...

import Home from "./components/pages/Home";

import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Servicedetails from "./components/pages/Servicedetails";
import Faqs from "./components/pages/Faqs";
import Appointment from "./components/pages/Appointment";


import category from "./components/pages/category";
import Doctorgrid from "./components/pages/Doctorgrid";
import Doctordetails from "./components/pages/Doctordetails";
import Contact from "./components/pages/Contact";

import AuthUser from "./components/pages/AuthUser";
import ForgotPasswordForm from "./components/sections/AuthUser/ForgotPassword";
import ResetPasswordForm from "./components/sections/AuthUser/ResetPassword";
import Errorpage from "./components/pages/Errorpage";
import Profile from './components/pages/Profile';
// Scroll to Top
const ScrollToTop = withRouter(({ children, location: { pathname } }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
});

function App() {
  return (
    <Router basename={"/themes/themeforest/react/docfind/"}>
      <Suspense fallback={<div></div>}>
        <ScrollToTop>
          <Switch>
            {/*  Profile  */}
            <Route exact path="/profile" component={Profile} />
            {/* Home */}
            <Route exact path="/" component={Home} />

            {/* Category */}
            <Route exact path="/all-category" component={category} />
            <Route exact path="/category/:id" component={Doctorgrid} />

            {/* About */}
            <Route exact path="/about" component={About} />

            {/* Services */}
            <Route exact path="/service/cat/:catId" component={Services} />
            <Route exact path="/services" component={Services} />
            <Route
              exact
              path="/service-details/:id"
              component={Servicedetails}
            />

            {/* FAQ's */}
            <Route exact path="/faqs" component={Faqs} />

            {/* Appointment */}
            <Route
              exact
              path="/appointment/:idcat/:id"
              component={Appointment}
            />

            {/* Doctors */}
            {/* <Route path="/doctor-grid" component={Doctorgrid} /> */}
            {/* <Route exact path="/all-doctors/:id" component={Doctorgrid} /> */}
            <Route
              exact
              path="/doctor-details/:idcat/:id"
              component={Doctordetails}
            />
            <Route
              exact
              path="/doctor-details/:idcat/:id"
              component={Doctordetails}
            />

            {/* Contact */}
            <Route exact path="/contact" component={Contact} />

            {/* Reg & Login */}
            <Route exact path="/authUser" component={AuthUser} />
            <Route path="/forgot-password" component={ForgotPasswordForm} />
            <Route path="/reset-password/:id" component={ResetPasswordForm} />

            {/* Extra */}
            <Route exact path="/error-page" component={Errorpage} />
            <Route exact component={Errorpage} />
          </Switch>
        </ScrollToTop>
      </Suspense>
    </Router>
  );
}

export default App;
