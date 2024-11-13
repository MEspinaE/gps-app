// src/App.js
import React from 'react';
import Map from './Map';  
import SendGps from './SendGps';  
const App = () => {
  return (
    <div>
      <h1>GPS Tracker</h1>
      <SendGps />  
      <Map /> 
    </div>
  );
};

export default App;
