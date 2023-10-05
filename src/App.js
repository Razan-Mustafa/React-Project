import React, { Suspense, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// Import other components here...

import Home from "./components/pages/Home";

import Blog from "./components/pages/Blog";
import Blogstandard from "./components/pages/Blogstandard";
import Blogdetails from "./components/pages/Blogdetails";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Servicedetails from "./components/pages/Servicedetails";
import Faqs from "./components/pages/Faqs";
import Appointment from "./components/pages/Appointment";
import Clinicgrid from "./components/pages/Clinicgrid";
import Cliniclist from "./components/pages/Cliniclist";
import Clinicdetails from "./components/pages/Clinicdetails";

import Doctorgrid from "./components/pages/Doctorgrid";
// import Doctorlist from "./components/pages/Doctorlist";
import Doctordetails from "./components/pages/Doctordetails";
import Contact from "./components/pages/Contact";
import AuthUser from "./components/pages/AuthUser";
import Errorpage from "./components/pages/Errorpage";

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
            {/* Home */}
            <Route exact path="/" component={Home} />

            {/* Category */}
            <Route exact path="/category/:id" component={Doctorgrid} />

            {/* Blog */}
            <Route exact path="/blog/cat/:catId" component={Blog} />
            <Route exact path="/blog/tag/:tagId" component={Blog} />
            <Route exact path="/blog/search/:query" component={Blog} />
            <Route exact path="/blog/author/:authorId" component={Blog} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/blog-standard" component={Blogstandard} />
            <Route exact path="/blog-details/:id" component={Blogdetails} />

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

            {/* Clinics */}
            <Route exact path="/clinic/cat/:catId" component={Clinicgrid} />
            <Route exact path="/clinic-grid" component={Clinicgrid} />
            <Route exact path="/clinic-list" component={Cliniclist} />
            <Route exact path="/clinic-details/:id" component={Clinicdetails} />

            {/* Doctors */}
            {/* <Route path="/doctor-grid" component={Doctorgrid} /> */}
            {/* <Route exact path="/all-doctors/:id" component={Doctorgrid} /> */}
            <Route
              exact
              path="/doctor-details/:idcat/:id"
              component={Doctordetails}
            />

            {/* Contact */}
            <Route exact path="/contact" component={Contact} />

            {/* Reg & Login */}
            <Route exact path="/authUser" component={AuthUser} />

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
