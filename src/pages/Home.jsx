import React, { useState, useEffect } from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "../Components/Navbar";
import { FiArrowRight } from "react-icons/fi";

function Home() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    handleLoad(); // Trigger handleLoad directly when component mounts
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
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
    const windowHeight = window.innerHeight;
    const scrollDuration = 500;
    const scrollStep = Math.round(windowHeight / (scrollDuration / 15));
    smoothScroll(windowHeight, scrollDuration);
  };

  const smoothScroll = (targetHeight, duration) => {
    setIsScrolling(true);
    const start = window.scrollY;
    const distance = targetHeight - start;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = easeInOutQuad(elapsedTime, start, distance, duration);
      window.scrollTo(0, scrollProgress);
      if (elapsedTime < duration) {
        requestAnimationFrame(step);
      } else {
        setIsScrolling(false);
      }
    }

    requestAnimationFrame(step);
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
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
            <h1 className="primary-heading">Reduce Food Waste, Feed More People</h1>
            <p className="primary-text">
              A platform dedicated to reducing food waste by connecting restaurants with surplus food to users who can benefit from it.
            </p>
            <button className="secondary-button button" onClick={handleClick}>
              <h2>Get Started <FiArrowRight />{" "}</h2>
            </button>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;