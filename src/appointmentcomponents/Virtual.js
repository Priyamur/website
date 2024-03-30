import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/App.css';
import '../Styles/Appointment.css';

export default function Virtual(){
    const [formData,setFormData]=useState({name:"",date:"",time:"",phoneNumber:null,serviceId:"",clientAge:""});
    const navigate = useNavigate();
    const userId = localStorage.getItem('user');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log("virtual",userId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5151/api/Appointments?name=${formData.name}&date=${formData.date}&time=${formData.time}&phoneNumber=${formData.phoneNumber}&clientAge=${formData.clientAge}&clientId=${userId}&serviceId=${formData.serviceId}`
              
            );
            window.alert(" Appointment booked for virtual consultation successfully");
             navigate('/');
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
        }finally{
            window.location.reload();

        }
    }

    return(
        <div>
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
                        <ul class="nav navbar-nav ">
                            <li><a href="/">HOMEPAGE</a></li>
                            <li><a href="/Display">SPA SERVICES</a></li>
                            {/* <li><a href="/Virtual">VIRTUAL CONSULTATION</a></li> */}
                            <li><a href="#service">VALUES</a></li>
                            <li><a href="#Location">HEADQUATERS</a></li>
                          
                            <li><a href="#contacts">CONTACT</a></li>
                            <li><a href="/Signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                            <li><a href="#" onClick={handleLogout} ><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='jumbotron'>
                <h3>We will serve you virtually</h3>
                </div>
                <form action="index.html appointment" className='Appointform' onSubmit={handleSubmit} >
                <fieldset>
                    <legend><span class="number">1</span>Your basic details</legend>
                    <label for="name">Name*:</label>
                    <input type="text" id="name" name="name" value={formData.name} placeholder="Atchyut (only first names)" required pattern="[a-zA-Z0-9]+" onChange={handleChange} />

                    <label for="age">Age*:</label>
                    <input type="tel" id="age" name="clientAge" value={formData.clientAge} placeholder="Enter your age" required pattern="[0-1]{1}[0-9]{0,2}"onChange={handleChange} />

                    <label for="tel">Contact Number:</label>
                    <input type="tel" id="tel" value={formData.phoneNumber} placeholder="Include country code" name="phoneNumber" required pattern="[789][0-9]{9}"  onChange={handleChange} />
                </fieldset>

                <fieldset>
                    <legend><span class="number">2</span>Appointment Details</legend>
                    <label for="appointment_description" data-testid="Virtual Consultation"> Virtual Consultation</label>
                    {/* <textarea id="appointment_description" name="allergyspecification" value={formData.allergyspecification} placeholder="Allergy specification of mine"  onChange={handleChange}></textarea> */}
                    <select name="allergyspecification" class="form-control dropdown" value={formData.serviceId} placeholder="select your treatment" onChange={handleChange}>
                    <option value="Virtually connect for hair treatment">Choose your service</option>
                                        <option value="24">Virtually connect for hair treatment</option>
                                        <option value="25">Virtually connect for face treatment</option>
                                    </select>
                    <label for="date">Date*:</label>
                    <input type="date" name="date" data-testid="Date*:"  onChange={handleChange} value={formData.date} required></input>
                    <br></br>
                    <label for="time">Time*:</label>
                    <input type="time" name="time" data-testid="Time*:" onChange={handleChange} value={formData.time} required></input>
            
                </fieldset>
                <button type="submit" className='bookin'>Request For Appointment</button>
            </form>
        </div>
    )
}