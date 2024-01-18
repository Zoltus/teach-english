import React, {useState, useEffect} from "react";
import axios from 'axios';

function App() {
    let [locations, setLocations] = useState([]);
    const url = `${import.meta.env.VITE_API_URL}/api/locations`;

    const fetch = async () => {
        try {
            const resp = await axios.get(url)
            setLocations(resp.data);
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to load locations');
        }
    };

    return <>
        <header>
            <h1 className={"text-2xl"}>headerr</h1>
        </header>
        <div>
            <h1>Locationss</h1>

        </div>
        <div>

        </div>
    </>
}

export default App;