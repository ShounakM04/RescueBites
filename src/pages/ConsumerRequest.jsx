import React, { useState, useEffect } from 'react';
import ConsumerRequestCards from '../Components/ConsumerRequestCards';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const App = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.get("http://localhost:3001/ConsumerRequest", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Append current timestamp to each data entry
            const newData = response.data.map(item => ({ ...item, timestamp: Date.now() }));
            setData(prevData => [...prevData, ...newData]);
            console.log("Data fetched successfully");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        }
    };

    // Function to clear expired data entries
    const clearExpiredData = () => {
        const currentTime = Date.now();
        const updatedData = data.filter(item => (currentTime - item.timestamp) <= (18 * 60 * 60 * 1000)); // Keep entries within 18 hours
        setData(updatedData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            clearExpiredData();
        }, 3600000); // Check every hour for expired data (adjust as needed)

        return () => clearInterval(interval);
    }, [data]);

    const navigate = useNavigate();

    return (
        <div>
            <h1>Consumer Requests</h1>
            {error ? (
                navigate('/consumerlogin')
            ) : (
                <ConsumerRequestCards data={data} />
            )}
        </div>
    );
};

export default App;
