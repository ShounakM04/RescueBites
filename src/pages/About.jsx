import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        How It Works
        </h1>
        <p className="primary-text">

        Restaurants can easily notify users about available leftover food that was not served. By participating in our platform, restaurants not only reduce food waste but also contribute to their community.
        Users can browse available leftover food items from nearby restaurants. It's an opportunity to enjoy delicious meals while helping to combat food waste.
        </p>
        
      </div>
    </div>
  );
};

export default About;