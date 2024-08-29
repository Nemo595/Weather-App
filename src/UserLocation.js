//uses built in api to check users location

import React, { useState, useEffect } from 'react';

var globalLat;  
var globalLng;


const UserLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  globalLat = location.lat; 
  globalLng = location.lng; 

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      )}
    </div>
  );
};

export default UserLocation;


export function getLat() {
  return globalLat;
}
export function getLng() { 
  return globalLng; 
}
