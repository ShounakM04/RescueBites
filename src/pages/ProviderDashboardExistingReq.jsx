import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../styles/providerdashboard.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [isNavigationHidden, setIsNavigationHidden] = useState(false);
  const [foodDetails, setFoodDetails] = useState([]);
  const [error,setError] = useState(false);
  const navigate  = useNavigate();

  const toggleNavigation = () => {
    setIsNavigationHidden(!isNavigationHidden);
  };

  const handleHome = () =>{
    navigate('/providerdashboard');
  }

  const handleExtReq = () =>{
    navigate('/providerdashboardexistingreq');
  }

  const handlePrevReq = () =>{
    navigate('/providerdashboardpreviousreq');
  }


  
  const handleAddProject =  (e) => {

    try {
     
      navigate('/providerdetails')
      // navigate('/providerdashboard')

    } catch (error) {
      console.error("Error signing in:", error);
      alert("Please try again.");
    }
  };


  const fetchFoodDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found");
      }

      const response1 = await axios.get("https://rescue-bite-server-pde3wfsa5-amols-projects-604b6fbf.vercel.app/provider_id", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // const decodedToken = jwtDecode(token);
      const providerId = response1.id;
      // console.log("while calling : "+ decodedToken);

      const response = await axios.get("https://rescue-bite-server-pde3wfsa5-amols-projects-604b6fbf.vercel.app/provider_history_curr", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          providerId
        }
      });

      if (response.data.length === 0) {
        // Handle case where no food details are found for the provider
        setFoodDetails([]);
        console.log("No food details found for the provider.");
      } else {
        setFoodDetails(response.data);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching food details:", error);
    }
  };

  useEffect(() => {
    fetchFoodDetails();
  }, []);


  return (
    <>
    {error && navigate('/providerlogin')}
    
 
    <div className="container-fluid display-table">
      <div className="row display-table-row">
        <div
          className={`col-md-2 col-sm-1 ${
            isNavigationHidden ? "hidden-xs" : ""
          } display-table-cell v-align box`}
          id="navigation"
        >
          <div className="navi">
            <ul>
              <li className="active">
              <button className="elemBtn" onClick={handleHome}>
             <div className="element">
                  <i className="fa fa-home" aria-hidden="true"></i>
                  <span className="hidden-xs hidden-sm">Home</span>
              </div>
              </button>
              </li>
              <li>
              <button className="elemBtn" onClick={handleExtReq}>
              <div className="element">
                  <i className="fa fa-tasks" aria-hidden="true"></i>
                  <span className="hidden-xs hidden-sm">Existing Request</span>
                </div>
                </button>
              </li>
              <li>
              <button className="elemBtn" onClick={handlePrevReq}>
              <div className="element">
                  <i className="fa fa-bar-chart" aria-hidden="true"></i>
                  <span className="hidden-xs hidden-sm">Previous Request</span>
                </div>
                </button>
              </li>
              {/* <li>
              <div className="element">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span className="hidden-xs hidden-sm"><button className="elemBtn" onClick={handleHome}>Home</button></span>
                </div>
              </li>
              <li>
              <div className="element">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  <span className="hidden-xs hidden-sm"><button className="elemBtn" onClick={handleHome}>Home</button></span>
                </div>
              </li>
              <li>
              <div className="element">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                  <span className="hidden-xs hidden-sm"><button className="elemBtn" onClick={handleHome}>Home</button></span>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="col-md-10 col-sm-11 display-table-cell v-align">
          <div className="row">
            <header>
              <div className="col-md-7">
               
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle collapsed"
                      onClick={toggleNavigation}
                    >
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                
                <div className="search hidden-xs hidden-sm">
                  <input type="text" placeholder="Search" id="search" />
                </div>
              </div>
              <div className="col-md-5">
                <div className="header-rightside">
                  <ul className="list-inline header-top pull-right">
                    <li className="hidden-xs">
                      
                      <button className="add-project" onClick={handleAddProject}> Add Project </button>
                     
                    </li>
                    <li>
                      <a href="#">
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon-info">
                       
                      </a>
                    </li>
                    <li className="dropdown">
                      <ul className="dropdown-menu">
                        <li>
                          <div className="navbar-content">
                            <span>JS Krishna</span>
                            <p className="text-muted small">me@jskrishna.com</p>
                            <div className="divider"></div>
                            <a href="#" className="view btn-sm active">
                              View Profile
                            </a>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </header>
          </div>
          <div className="user-dashboard">
            <h1>Hello, JS</h1>
            <div className="row gx-5">
            {foodDetails.map(detail => (
                <div className="col-md-7 col-sm-7 col-xs-12 gutter" key={detail.food_id}>
                  <div className="sales">
                    <h2>Food Name: {detail.food_name}</h2>
                    <h2>People Count: {detail.people_count}</h2>
                    <h2>Time of posting: {new Date(detail.request_time).toLocaleString()}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;