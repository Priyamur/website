import logo from './logo.svg';
import './Styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import SignUp from './components/Signup';
import AddService from './servicecomponents/AddService'
import ForgetPassword from './components/ForgetPassword';
import OTP from './components/OTP';
import AdminPage from './components/AdminPage';
import Reset from './components/Reset';
import DisplayService from './servicecomponents/DisplayService';
import Booking from './appointmentcomponents/Booking';
import Virtual from './appointmentcomponents/Virtual';
import Appointment from './components/Appointmentcomponents/Appointment';
import Customer from './components/Appointmentcomponents/Customercomponents/Customer';
import AdminDisplay from './servicecomponents/AdminDisplay';
import Updatedisplay from './servicecomponents/Updatedisplay';
import Calender from '../src/appointmentcomponents/Calender';

function App() {
  return (

    <BrowserRouter>
      <div className="App">

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Signup' element={<SignUp />} />
              <Route path='/Forget' element={<ForgetPassword />} />
              <Route path='/OTP' element={<OTP />} />
              <Route path='/Reset' element={<Reset />} />
              <Route path='/Admin' element={<AdminPage />} />
              <Route path='/Create' element={<AddService />} />
              <Route path='/Display' element={<DisplayService />} />
              <Route path='/Booking' element={<Booking />} />
              <Route path='/Virtual' element={<Virtual />} />
              <Route path='/Appointment' element={<Appointment />} />
              <Route path='/Customer' element={<Customer />} />
              <Route path='/AdminDisplay' element={<AdminDisplay />} />
              <Route path='/Updatedisplay/:sid' element={<Updatedisplay />} />
              <Route path='/Calender' element={<Calender/>} />

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
