import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyalarını projeye ekle
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // createRoot'u react-dom/client'tan içe aktar

const root = createRoot(document.getElementById('root')); // createRoot'u doğru şekilde kullan

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
