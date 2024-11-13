// src/SendGps.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SendGps.css'; // Asegúrate de tener este archivo con los estilos

const SendGps = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [phoneId, setPhoneId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validar coordenadas
  const validateCoordinates = () => {
    if (!latitude || !longitude || !phoneId) {
      setError('Por favor, complete todos los campos.');
      return false;
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      setError('Las coordenadas deben ser números válidos.');
      return false;
    }
    return true;
  };

  // Obtener geolocalización del dispositivo móvil
  const getLocation = () => {
    console.log("Intentando obtener ubicación...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Ubicación obtenida:', position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.error('Error de geolocalización:', err);
          setError('No se pudo obtener la ubicación del dispositivo. Verifica los permisos.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, 
          maximumAge: 0, 
        }
      );
    } else {
      console.error('Geolocalización no soportada por este navegador');
      setError('Geolocalización no es soportada por este navegador.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación
    if (!validateCoordinates()) return;

    const data = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      sent_at: new Date().toISOString(),
      phone_identifier: phoneId,
    };

    console.log('Sending data:', data); 

    try {
      const response = await axios.post('http://localhost:5000/api/gps', data);
      console.log('Response from server:', response.data); 
      setSuccess('Punto GPS enviado exitosamente');
      setLatitude('');
      setLongitude('');
      setPhoneId('');
    } catch (error) {
      console.error('Error sending GPS data:', error); 
      setError('Hubo un error al enviar la ubicación. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) { 
      getLocation();
    }
  }, []); 

  return (
    <div className="send-gps-container">
      <form onSubmit={handleSubmit} className="send-gps-form">
        <input
          type="text"
          placeholder="Phone ID"
          value={phoneId}
          onChange={(e) => setPhoneId(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">Enviar Ubicación</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default SendGps;
