import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "../Components/Navbar";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";


function Home() {


  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
      window.addEventListener('load', handleLoad);

      return () => {
          window.removeEventListener('load', handleLoad);
      };
  }, []);

  const handleLoad = () => {
      window.scrollTo(0, 0);

      if (!isScrolling) {
          const scrollPosition = window.scrollY;
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          if (scrollPosition === maxScroll) {
              window.scrollTo(0, 0);
          }
      }
  };

  const handleClick = () => {
      const windowHeight = window.innerHeight*1.1;
      const scrollDuration = 600;
      const scrollStep = Math.round(windowHeight / (scrollDuration / 15));
      smoothScroll(scrollStep, windowHeight, scrollDuration);

      const initialColor = 4 * 255; 
      const finalColor = 255; 
      document.body.style.backgroundColor = `rgb(${initialColor}, ${initialColor}, ${initialColor})`;

  };

  const smoothScroll = (scrollStep, targetHeight, duration) => {
      setIsScrolling(true);
      let start = window.scrollY;
      let currentTime = 0;
      const increment = 20;

      function animateScroll() {
          currentTime += increment;
          const val = easeInOutQuad(currentTime, start, targetHeight, duration);
          window.scrollTo(0, val);
          if (currentTime < duration) {
              setTimeout(animateScroll, increment);
          } else {
              setIsScrolling(false);
          }
      }
      animateScroll();
  };

  const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  };


  return (
    <>
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favourite Food Delivered Hot
          </h1>
          <p className="primary-text">
            Healthy switcher chefs do all the prep work, like peeding, chopping
            & marinating, so you can cook a fresh food.
          </p>
          <button className="secondary-button button" onClick={handleClick}>
            <h2>Order Now <FiArrowRight />{" "}</h2>
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;