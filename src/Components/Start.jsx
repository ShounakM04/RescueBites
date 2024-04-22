import React from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Work from "../pages/Work";
import Testimonial from "../pages/Testimonial";
import Contact from "../pages/Contact";
import Footer from "./Footer";


const AppContainer = () => {
  return (
    < >
      <div>
        {/* <Navbar /> */}
        <Home />
    <Work />
      <About />
      <Testimonial />
      <Contact />
      <Footer />
      </div>
    </ >
  );
};

export default AppContainer;
