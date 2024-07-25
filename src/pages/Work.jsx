import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

import { useNavigate } from "react-router-dom";

const Work = () => {
  const navigate = useNavigate();

  const workInfoData = [
    {
      image: PickMeals,
      title: "Consumer",
      // text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: ChooseMeals,
      title: "Provider",
      // text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: DeliveryMeals,
      title: "Admin",
      // text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];

  const handleNavigation = (title) => {
    if (title === "Consumer") {
      navigate("/consumerlogin");
    } else if (title === "Provider") {
      navigate("/providerlogin");
    } else {
      alert("No navigation route defined for this title");
    }
  };

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-text"></p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div onClick={() => handleNavigation(data.title)} className="info-boxes-img-container" style={{ cursor: 'pointer' }}>
              <img src={data.image} alt="" />
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
