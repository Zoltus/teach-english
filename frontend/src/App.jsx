import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
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

    const LocationHandler = () => {
        useMapEvents({
            dblclick: async (event) => {
                const {lat, lng} = event.latlng;
                try {
                    const location = {latitude: lat, longitude: lng};
                    //Add new location
                    await axios.post(url, location);
                    setLocations(locations.concat(location));
                } catch (err) {
                    console.error('Error:', err);
                    alert('Failed to add location');
                }
            },
        });
        return locations.map(loc => <Marker key={loc.id} position={[loc.latitude, loc.longitude]}/>)
    }

    return <>
        <div>
            <h1>Locationss</h1>
            <button onClick={fetch}>Fetch</button>
            <ul>
                {locations.map(loc => (
                    <li key={loc.id}>lat: {loc.latitude}, lon: {loc.longitude}</li>
                ))}
            </ul>
        </div>
        <div>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{height: '600px', width: '800px'}}
                doubleClickZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <LocationHandler/>
            </MapContainer>
        </div>
    </>
}

export default App;