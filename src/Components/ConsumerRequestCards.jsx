import React, { useState, useEffect } from 'react';
import '../styles/ConsumerRequestCards.css';

const ConsumerRequestCards = ({ data }) => {
    const [visibleData, setVisibleData] = useState([]);

    useEffect(() => {
        // When new data arrives, add it to visibleData and start a timer for each request
        setVisibleData(prevData => {
            const newData = data.map(request => ({
                ...request,
                timerId: setTimeout(() => removeRequest(request.food_id), 10 * 60 * 1000) // Start a timer for each request
            }));
            return newData;
        });

        // Clear timers when the component unmounts or when data changes
        return () => {
            visibleData.forEach(request => clearTimeout(request.timerId));
        };
    }, [data]); // Re-run effect when data changes

    const removeRequest = (foodIdToRemove) => {
        setVisibleData(prevData => prevData.filter(request => request.food_id !== foodIdToRemove));
    };

    return (
        <div className="card-container">
            {visibleData.map((request, index) => (
                <div className="card" key={index}>
                    <h3>{request.resto_name}</h3>
                    <p>Veg: {request.veg ? 'Yes' : 'No'}</p>
                    <p>Food Name: {request.food_name}</p>
                    <p>People Count: {request.people_count}</p>
                </div>
            ))}
        </div>
    );
}

export default ConsumerRequestCards;
