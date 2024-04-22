import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

import { Navigate } from "react-router-dom";
const handleRedirect = async (req, res) => {
  try {
  } catch {
    alert("Redirect error");
  }
};
const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Consumer",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: ChooseMeals,
      title: "Provider",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: DeliveryMeals,
      title: "Admin",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text"></p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <a 
              href={
                data.title == "Consumer"
                  ? "/consumerlogin"
                  : data.title == "Provider"
                  ? "/providerlogin"
                  : "nothing"
              }
            >
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
