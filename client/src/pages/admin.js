import { React, useEffect, useState } from "react"
import { Box } from "@mui/system"
import { Skeleton } from "@mui/material"
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"
import { VehicleList } from "../components/VehicleList"
import config from '../config/config'

const VehicleMarker = ({ id, position, vehicleNo, icon, handleClick }) => {
  const [pos, setPos] = useState(position);
  
  useEffect(() => {
    setInterval(() => {
      fetch(`${config.API_BASE_URL}/vehicles/${id}`)
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.coords) {
            setPos(jsonRes.coords);
          } else {
            console.log("Can't find vehicle with given ID");
          }
        }).catch(err => {
          console.log(err);
        })
    }, 10000)
  }, [])

  return (
    <Marker
      position={pos}
      onClick={() => { handleClick(pos) }}
      icon={{ url: icon, scaledSize: new window.google.maps.Size(30, 70) }}
      label={vehicleNo}
      className="hello"
    />
  )
}

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [map, setMap] = useState(null);

  const fetchVehicles = async () => {
    console.log('Fetching vehicles...')
    fetch(`${config.API_BASE_URL}/vehicles`)
      .then(res => res.json())
      .then((jsonResponse) => {
        setVehicles(jsonResponse.filter(vehicle => vehicle.pos));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const center = { lat: 26.182808644471546, lng: 91.80385223005672 }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
  })

  const icons = [
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/carImage.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/ambulenceImage.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/truck.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/fireTruck.png",
    "https://raw.githubusercontent.com/tripathics/iocl-tracker/master/client/src/media/Icons/bulldozer.png"
  ]

  return (
    <Box sx={{ minHeight: "inherit", position: "relative" }}>
      <VehicleList fetchVehicles={fetchVehicles} vehicles={vehicles} map={map} isLoaded={isLoaded} />

      {!isLoaded ? <Skeleton component="div" variant="rectangular" sx={{ minHeight: 'inherit', width: '100%' }} /> : (
        <GoogleMap
          center={center}
          zoom={18}
          options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
          mapContainerStyle={{ minHeight: "inherit" }}
          onLoad={map => { setMap(map); console.log(`Map loaded`); fetchVehicles(); }}
        >
          {vehicles.map((vehicle) => (
            <VehicleMarker key={vehicle._id}
              id={vehicle._id}
              position={vehicle.pos.coords}
              icon={icons[0]}
              vehicleNo={vehicle.vehicleNo}
              handleClick={(pos) => { map.panTo(pos); }}
            />
          ))}
        </GoogleMap>
      )}
    </Box>
  )
}

export default Admin