// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Correcto si usas React 18
import './index.css';  // Archivo CSS para estilos globales
import App from './App';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
