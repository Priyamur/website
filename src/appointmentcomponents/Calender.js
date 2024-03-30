import React, { useState, useEffect } from 'react'; 
import '../Styles/Calender.css'
import axios from 'axios'; 

const AppointmentsCalendar = () => { 
  const [availableAppointments, setAvailableAppointments] = useState([]); 
 
  useEffect(() => { 
    fetchAvailableAppointments(); 
  }, []); 

  const fetchAvailableAppointments = async () => { 
    try { 
      const response = await axios.get('http://localhost:5151/api/Calender/available'); 
      setAvailableAppointments(response.data); 
    } catch (error) { 
      console.error('Error fetching available appointments:', error); 
    } 
  };

  return ( 
    <div> 
      <h2 data-testid="Available Appointments">Available Appointments</h2> 
      <table className='calender'> 
        <thead> 
          <tr> 
            <th>Date</th> 
            <th>Time</th> 
            <th>Action</th> 
          </tr> 
        </thead> 
        <tbody> 
          {availableAppointments.map(appointment => ( 
            <tr key={appointment.id}> 
              <td>{appointment.date}</td> 
              <td>{appointment.time}</td> 
              <td><button >Book</button></td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
    </div> 
  ); 
}; 

 

export default AppointmentsCalendar; 