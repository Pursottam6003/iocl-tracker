import React, { useState, useEffect } from 'react'

const VehicleSelect = ({ vehicle, handleSetVehicle }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      const response = await fetch(`http://192.168.26.39:5000/vehicles`);
      if (!response.ok) {
        const message = response.statusText;
        alert(`An error occured: ${message}`);
        return;
      }

      const vehicles = await (response.json());
      setVehicles(vehicles);
    }
    getVehicles();
  }, [])

  return (
    <div className='vehicle-select-form'>
      <h4>Enter your vehicle</h4>
      {!vehicle && (<>
        {vehicles.map((vehicle, i) => {
          return (
            <li key={i}>
              <button onClick={e => { handleSetVehicle(vehicle._id) }}>Select {vehicle.vehicleId}</button>
            </li>
          )
        })}
      </>
      )}
    </div>
  )
}

const Client = () => {
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    // update location on db
    const pushCurrPos = async () => {
      await fetch(`http://192.168.26.39:5000/update/${currentVehicle}`, {
        method: "POST",
        body: JSON.stringify({pos: pos}),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }

    // get location from gps
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (pos) {
        console.log(pos.timestamp, ': ', pos.coords.longitude, pos.coords.latitude);
        setPos({
          timestamp: pos.timestamp,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })

        if (currentVehicle) pushCurrPos();
      });
    }
  }, [pos, currentVehicle])

  return (
    <div className='client-component'>
      <h1>Client</h1>
      <div>
        {pos && (
          <p>Last updated: {pos.timestamp}</p>
        )}
      </div>
      <VehicleSelect handleSetVehicle={setCurrentVehicle} vehicle={currentVehicle} />
    </div>
  )
}

export default Client