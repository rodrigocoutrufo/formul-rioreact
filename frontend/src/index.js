import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Verifique se o nome do arquivo está correto (com 'App.js' e não 'App.Js')


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
