import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/Appointment.css';


export default function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [clientemail, setClientemail] = useState('');
    const [servicename, setServiceName] = useState('');
   


    const [selectedappointment, setSelectedAppointments] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5151/api/Appointments');

            setAppointments(response.data)
            for (const appointment of response.data) {
                const clientId = appointment.clientId;
                const serviceId = appointment.serviceId;
                const clientResponse = await axios.get(`http://localhost:5151/api/LoginSignup/${clientId}`);
                const serviceResponse = await axios.get(`http://localhost:5151/api/Backend/GetById/${serviceId}`);
                setClientemail(clientResponse.data.email);
                setServiceName(serviceResponse.data.serviceName);
            }

        } catch (error) {
            console.error('Error fetching :', appointments.appointmentId, error);

        }
    };

    const sendEmail = async (clientemail, content) => {
        console.log("mail", clientemail, content)

        try {
            console.log(clientemail, content);
            await axios.post(`http://localhost:5151/api/LoginSignup/email?email=${clientemail}&content=${content}`);
            window.alert(" Email sent successfully");
        } catch (error) {

            console.error('Error sending email:', error);

        }

    };

    const handleConfirmation = async (clientemail) => {

        await sendEmail(clientemail, "Hello!!We are from Ray Spa, we are happy to inform that your Booking is confirmed for the time and date you preferred");

    };
    const handleCancellation = async (clientemail, appId) => {
        await sendEmail(clientemail, "Hello!!We are from Ray Spa, We are sorry to inform that your booking is cancelled because of busy schedule try another date with us");
        try {
            await axios.delete(`http://localhost:5151/api/Appointments/${appId}`);
            window.alert(" Appointment cancelled successfully");
            await fetchServices();
        } catch (error) {
            console.error('Error cancelling appointment:', error);
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
                                    <a href="/Customer">
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
                <h3>List of Appointments</h3>
            </div>
            <div class="table-wrapper">
                <div class="table-inner">
                    <table class="pricing-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>PhoneNumber</th>
                                <th>Email</th>
                                <th>Services</th>
                                <th>Confirm booking</th>
                                <th>Cancel booking</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {appointments.map((appointment, i) => (<tr
                                key={appointment.appointmentId}>
                                <td>{appointment.name}</td>
                                <td>{appointment.clientAge}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.phoneNumber}</td>
                                <td>{clientemail}</td>
                                <td>{servicename}</td>

                                <td>
                                    <button className="btn btn-sm" onClick={() => handleConfirmation(clientemail)} data-testid='Confirm'>Confirm</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm" onClick={() => handleCancellation(clientemail, appointment.appointmentId)} data-testid="Cancel">Cancel</button>
                                </td>
                            </tr>))}

                        </tbody>

                    </table>
                </div>
            </div>

        </div>

    )

}
