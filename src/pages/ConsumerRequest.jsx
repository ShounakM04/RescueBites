import React, { useState, useEffect } from "react";
import ConsumerRequestCards from "../Components/ConsumerRequestCards";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ConsumerRequestCards.css";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showConsumerRequests, setShowConsumerRequests] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const decodedToken = jwtDecode(token);
      const pincode = decodedToken.pincode;

      const endpoint = showConsumerRequests
        ? "https://rescue-bite-server-nt5i27bs5-amols-projects-604b6fbf.vercel.app/ConsumerRequest"
        : "https://rescue-bite-server-nt5i27bs5-amols-projects-604b6fbf.vercel.app/current_requests";

      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        params: {
          pincode,
        },
      });

      setData(response.data);
      console.log("response received");
    } catch (error) {
      console.error("Error fetching consumer requests:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showConsumerRequests]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/consumerlogin");
  };

  return (
    <div className="app-container">
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            RescueBites
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-container">
        <div className="sidebar">
          <h3>Consumer Requests</h3>
          <Nav className="flex-column">
            <Nav.Link
              className="toggle-text"
              onClick={() => setShowConsumerRequests(!showConsumerRequests)}
            >
              {showConsumerRequests
                ? "Your Accepted Requests"
                : "All Consumer Requests"}
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </div>

        <div className="content">
          <h1>Consumer Requests</h1>
          {error ? (
            navigate("/consumerlogin")
          ) : (
            <ConsumerRequestCards
              data={data}
              dataType={
                showConsumerRequests ? "consumerRequests" : "acceptedRequests"
              }
              refreshData={fetchData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
