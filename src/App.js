import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'; // react-toastify'yi içe aktar
import 'react-toastify/dist/ReactToastify.css'; // Stil dosyasını içe aktar
import Login from './pages/Login'
import MainPage1 from './pages/MainPage1';
import MainPage2 from './pages/MainPage2';
import ManuelPage from './pages/ManuelPage';

function App() {



  const PrivateRoute = ({ element, ...rest }) => {
    // Kullanıcının giriş yapmadığı bir sayfaya erişmeye çalıştığında login sayfasına yönlendir
    const isLoggedIn = localStorage.getItem('username');
    return isLoggedIn ? (
      React.cloneElement(element, rest)
    ) : (
      <Navigate to="/" replace={true} />
    );
  };


  return (
    <div className="App">

      <ToastContainer position="bottom-right" />
      <Routes>
        {/* <Route exact path="/" element={<Login />} />
        <Route exact path="/main" element={<MainPage1 />} />
        <Route exact path="/main/page2" element={<MainPage2/>} /> */}
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/main"
          element={<PrivateRoute element={<MainPage1 />} />}
        />
        <Route
          path="/main/page2"
          element={<PrivateRoute element={<MainPage2 />} />}
        />
        <Route
          path="/manuel"
          element={<PrivateRoute element={<ManuelPage />} />}
        />
      </Routes>

    </div>
  );
}

export default App;
