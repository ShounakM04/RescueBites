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

            setData(response.data);
            console.log("response received");
        } catch (error) {
            console.error("Error fetching providerId:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
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