import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ConsumerRequestCards.css";
import axios from "axios";

const ConsumerRequestCards = ({ data }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [numPeople, setNumPeople] = useState("");

  useEffect(() => {
    // Filter out requests with zero people count and set visible data
    const filteredData = data.filter(request => request.people_count > 0);
    setVisibleData(filteredData);
  }, [data]); // Re-run effect when data changes

  const handleBookClick = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setNumPeople("");
  };

  const handleConfirmBooking = async () => {
    const numPeopleInt = parseInt(numPeople, 10);

    if (isNaN(numPeopleInt) || numPeopleInt <= 0) {
      alert("Please enter a valid number of people.");
      return;
    }

    if (numPeopleInt > selectedRequest.people_count) {
      alert("Please enter a smaller number of people than shown.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/update_count",
        {
          food_id: selectedRequest.food_id,
          count: numPeopleInt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPeopleCount = response.data.people_count;

      if (updatedPeopleCount < 0) {
        alert("Failed to update people count: Resulting count is negative.");
        return;
      }

      // Fetch updated data from backend
      const updatedData = await fetchUpdatedData();
      setVisibleData(updatedData);

      handleCloseModal();
    } catch (error) {
      console.error("Error updating people count:", error);
      alert("Failed to update people count.");
    }
  };

  const fetchUpdatedData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get("http://localhost:3001/ConsumerRequest", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Filter out requests with zero people count
    const newData = response.data.filter((request) => request.people_count > 0);

    return newData;
  };

  return (
    <div className="card-container">
      {visibleData.map((request, index) => (
        <div className="card" key={index}>
          <h3>{request.resto_name}</h3>
          <p>Veg: {request.veg ? "Yes" : "No"}</p>
          <p>Food Name: {request.food_name}</p>
          <p>People Count: {request.people_count}</p>
          <p>
            <button onClick={() => handleBookClick(request)}>Book</button>
          </p>
        </div>
      ))}

      {selectedRequest && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{selectedRequest.resto_name}</h3>
            <p>Veg: {selectedRequest.veg ? "Yes" : "No"}</p>
            <p>Food Name: {selectedRequest.food_name}</p>
            <p>People Count: {selectedRequest.people_count}</p>
            <p>
              Enter Number of people:
              <input
                type="number"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
              />
            </p>
            <p>Are you sure you want to book this?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmBooking}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ConsumerRequestCards;
