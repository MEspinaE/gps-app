import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error obteniendo la ubicación: ", error);
        }
      );
    } else {
      console.log("La geolocalización no está soportada en este navegador.");
    }
  };

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    
  
    if (isMobile) {
      console.log("Dispositivo móvil detectado.");
      getUserLocation();  
    } else {
      console.log('No es un dispositivo móvil.');
    }
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <LoadScript googleMapsApiKey="APP_KEY_GOOGLE">
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: -33.8688, lng: 151.2093 }}  
        zoom={15}
        onLoad={handleMapLoad}
      >
        {userLocation && (
          <Marker position={userLocation}>
            <InfoWindow position={userLocation}>
              <div>
                <h2>Ubicación actual</h2>
                <p>Latitud: {userLocation.lat}</p>
                <p>Longitud: {userLocation.lng}</p>
              </div>
            </InfoWindow>
          </Marker>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
