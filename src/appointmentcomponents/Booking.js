import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/App.css';
import '../Styles/Appointment.css';
import { Navigate } from "react-router-dom";

export default function Booking() {
    const [availtime, setTime] = useState();
    const [availdate, setDate] = useState();
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const [formData, setFormData] = useState({ name: "", date: availdate, time: availtime, phoneNumber: null, clientAge: "" });
    const navigate = useNavigate();
    

    const userId = localStorage.getItem('user');
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
    
        // Validate mobile number
        if (name === "phoneNumber") {
            // Allow only digits and limit to 10 characters
            newValue = value.replace(/\D/g, '').slice(0, 10);
        }
    
        // Validate age
        if (name === "clientAge") {
            // Allow only digits and limit to 2 characters
            newValue = value.replace(/\D/g, '').slice(0, 2);
        }
    
        setFormData({ ...formData, [name]: newValue });
    };

    console.log("booking", userId);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formdata", formData);
        try {
            const response = await axios.post(`http://localhost:5151/api/Appointments?name=${formData.name}&date=${formData.date}&time=${formData.time}&phoneNumber=${formData.phoneNumber}&clientAge=${formData.clientAge}&clientId=${userId}&serviceId=${formData.serviceId}`

            );
            window.alert(" Appointment booked successfully further confirmation has been sent to your mail");
            navigate('/Display');
            console.log("booking created successfully:", response.data);
        } catch (error) {
            console.error("Post failure:", error);
        }

    };

    const handleLogout = async () => {
        try {
            const cleanupLocalStorage = () => {
                localStorage.removeItem('user'); // Remove userId from local storage 
            };
            window.addEventListener('beforeunload', cleanupLocalStorage);
            return () => {
                window.removeEventListener('beforeunload', cleanupLocalStorage);
            };

        } catch (error) {
            console.error('Error:', error);
        } finally {
            window.location.reload();

        }
    }

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

    const postBooking = async (id,date,time) => {
        try {
            setFormData({...formData, date:date, time:time});
            const response = await axios.post(`http://localhost:5151/api/Calender/book?calenderId=${id}`);
            console.log("response", response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="main" id="mypage" data-spy="scroll" data-target=".navbar" data-offset="60">

            <nav class="navbar navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        {/* <a class="navbar-brand" href="#myPage">Logo</a> */}
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <li><a href="/">HOMEPAGE</a></li>
                            <li><a href="/Display">SPA SERVICES</a></li>
                            <li><a href="/">SERVICES</a></li>
                            <li><a href="/Virtual">VIRTUAL CONSULTATION</a></li>
                            <li><a href="/">CONTACT</a></li>
                            <li>{userId ? <p></p> : <a href="/Signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a>}</li>
                            {userId ? <li><a href="#" onClick={handleLogout} ><span class="glyphicon glyphicon-log-out"></span> Logout</a></li> : <li><a href="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='jumbotron'>
                <h3>Book your Appointment with us</h3>
            </div>
            <form action="index.html appointment" className="Appointform" onSubmit={handleSubmit} >
                <fieldset>
                    <legend><span class="number">1</span>Your basic details</legend>
                    <label for="name">Name*:</label>
                    <input type="text" id="name" name="name" value={formData.name} placeholder="priya (only first names)" required pattern="[a-zA-Z0-9]+" onChange={handleChange} />

                    <label for="age">Age*:</label>
                    <input type="tel" id="age" name="clientAge" value={formData.clientAge} placeholder="Enter your age" onChange={handleChange} />

                    <label for="tel">Contact Number:</label>
                    <input type="tel" id="tel" value={formData.phoneNumber} placeholder="Include country code" name="phoneNumber" required pattern="[789][0-9]{9}" onChange={handleChange} />
                </fieldset>

                <fieldset>
                    <legend><span class="number">2</span>Appointment Details</legend>
                    <label for="appointment_description" data-testid="Services">Services</label>
                    <select name="serviceId" class="form-control dropdown" data-testid="Service" value={formData.serviceId} placeholder="select your treatment" onChange={handleChange}>
                        <option value="Virtually connect for hair treatment">Choose your service</option>
                        <option value="16">Full-body mud mask</option>
                        <option value="17">Herbal facial</option>
                        <option value="19">Full Body wrap</option>
                        <option value="20">jojobao oil massage</option>
                        <option value="21">Hotstone massage</option>
                        <option value="22">hotvapour massage</option>
                        <option value="23">Hotbath tub </option>
                    </select>
                    <label for="date">Date*:</label>
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
                                    <td><button onClick={() => postBooking(appointment.id,appointment.date,appointment.time)} style={{background:'rgb(163, 13, 58)'}} className='bok'> <a className="booki">Book</a></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </fieldset>
               
            </form>
        </div>

    )
}