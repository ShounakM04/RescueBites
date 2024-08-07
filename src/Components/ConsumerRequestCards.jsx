import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ConsumerRequestCards.css";
import axios from "axios";

const ConsumerRequestCards = ({ data, dataType, refreshData }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [numPeople, setNumPeople] = useState("");

  useEffect(() => {
    if (dataType === "consumerRequests") {
      const filteredData = data.filter((request) => request.people_count > 0);
      setVisibleData(filteredData);
    } else {
      setVisibleData(data);
    }
  }, [data, dataType]);

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

    // "http://localhost:3001"
    try {
      await axios.post("https://rescue-bite-server-nt5i27bs5-amols-projects-604b6fbf.vercel.app/update_count", {
        food_id: selectedRequest.food_id,
        count: numPeopleInt,
      });

      const updatedPeopleCount = selectedRequest.people_count - numPeopleInt;
      setVisibleData((prevData) =>
        prevData.map((request) =>
          request.food_id === selectedRequest.food_id
            ? { ...request, people_count: updatedPeopleCount }
            : request
        )
      );

      handleCloseModal();
      refreshData();
    } catch (error) {
      console.error("Error updating people count:", error);
      alert("Failed to update people count.");
    }
  };

  return (
    <div className="card-container">
      {visibleData.length === 0 && <p>No requests found.</p>}
      {visibleData.map((request, index) => (
        <div className="card" key={index}>
          <Card.Body>
            <Card.Title>{request.resto_name}</Card.Title>
            <Card.Text>
              Veg: {request.veg ? "Yes" : "No"}
              <br />
              Food Name: {request.food_name}
              <br />
              People Count:{" "}
              {dataType === "consumerRequests"
                ? request.people_count
                : request.booked_count}
            </Card.Text>
            {dataType === "consumerRequests" && (
              <div className="button-container">
                <Button onClick={() => handleBookClick(request)}>Book</Button>
              </div>
            )}
          </Card.Body>
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
