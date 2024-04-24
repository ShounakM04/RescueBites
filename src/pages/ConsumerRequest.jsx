import React, { useState, useEffect } from 'react';
import ConsumerRequestCards from '../Components/ConsumerRequestCards';
import axios from "axios";

const App = () => {
    const [data, setData] = useState([]);


    const fetchData = async()=>{
        try{
            const response = await axios.get("http://localhost:3001/ConsumerRequest");
            setData(response.data);
            console.log("response received")
        }
        catch(error) {
            console.error("Error fetching providerId:", error);
            // Handle error if needed
        }
    }

        
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h1>Consumer Requests</h1>
            <ConsumerRequestCards data={data} />
        </div>
    );
}

export default App;
