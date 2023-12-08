import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // react-toastify'yi içe aktar
import 'react-toastify/dist/ReactToastify.css'; // Stil dosyasını içe aktar
import MainDashboard from './layouts/MainDashboard'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">

      <ToastContainer position="bottom-right" />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/main" element={<MainDashboard />} />
      </Routes>

    </div>
  );
}

export default App;
