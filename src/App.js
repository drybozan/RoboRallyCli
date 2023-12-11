import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // react-toastify'yi içe aktar
import 'react-toastify/dist/ReactToastify.css'; // Stil dosyasını içe aktar
import Login from './pages/Login'
import MainPage1 from './pages/MainPage1';
import MainPage2 from './pages/MainPage2';

function App() {
  return (
    <div className="App">

      <ToastContainer position="bottom-right" />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/main" element={<MainPage1 />} />
        <Route exact path="/main/page2" element={<MainPage2/>} />
    
      </Routes>

    </div>
  );
}

export default App;
