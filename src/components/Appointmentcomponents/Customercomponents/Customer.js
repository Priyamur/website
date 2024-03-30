import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import '../.././../Styles/Appointment.css';

export default function Customer() {
    const [clients, setClients] = useState([]);
    const [appointments, setAppointments] = useState([]);

    // cont [selectedclients,setSelectedClients]=useState(null);

    useEffect(() => {
        fetchEmails();
        fetchAppointmets();
    }, []);
    const fetchEmails = async () => {
        try {
            const response = await axios.get('http://localhost:5151/api/LoginSignup');
            console.log("Emails", response.data)
            setClients(response.data)
        }
        catch (error) {
            console.error('Error fetching :', error);

        }
    };
    const fetchAppointmets = async () => {
        try {
            const response = await axios.get('http://localhost:5151/api/Appointments');
            console.log(response.data)
            setAppointments(response.data)
        }
        catch (error) {
            console.error('Error fetching :', error);

        }
    };
    return (
        <div>
            <div className="row">
                <div className="container adminhead " id="admin_nav">

                    <h2><b class="admin_navbar-brand">Admin Panel</b></h2>
                    <div>

                        <ul class="admin_navbar-nav col-sm-2">
                            <li class=" admin_nav-item">
                                <a class="admin_nav-link" href="Login">  <span class="glyphicon glyphicon-user"></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">

                <div class="container-fluid admincontainer" id="side">
                    <div>

                        <div class="col-md-3 col-sm-4 col-xs-12">
                            <div class="admin_left">
                                <ul>
                                    <a href="/">
                                        <li class="item-menu">
                                            <span class="glyphicon glyphicon-home"></span>
                                            <span class="menu">HOME</span>
                                        </li>
                                    </a>
                                    <a href="/post">
                                        <li class="item-menu">
                                            <span class="glyphicon glyphicon-book"></span>
                                            <span class="menu">CUSTOMERS</span>
                                        </li>
                                    </a>

                                    <a href="/Appointment">
                                        <li class="item-menu">
                                            <span class="glyphicon glyphicon-list"></span>
                                            <span class="menu">APPOINTMENTS</span>
                                        </li>
                                    </a>
                                    <a href="/Create">
                                        <li class="item-menu">
                                            <span class="glyphicon glyphicon-th-list"></span>
                                            <span class="menu">SERVICES</span>
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="jumbotron">
                <h3>List of Customers Logged In</h3>
            </div>
            <div class="table-wrapper">
                <div class="table-inner">
                    <table class="pricing-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>PhoneNumber</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {appointments.map(appointment => {
                                // Find the client whose ID matches the appointment's client ID 
                                const client = clients.find(client => client.clientId === appointment.clientId);

                                return (
                                    <tr key={appointment.appointmentId}>
                                        <td>{appointment.name}</td>
                                        <td>{appointment.clientAge}</td>
                                        <td>{appointment.phoneNumber}</td>
                                        {/* Display email only if client is found */}
                                        <td>{client ? client.email : 'Email not found'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}