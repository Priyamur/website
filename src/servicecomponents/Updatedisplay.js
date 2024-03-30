import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import axios from "axios";
import '../Styles/Service.css';
import { Navigate, useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';

export default function Updatedisplay() {
    const { sid } = useParams();

    const [service, setService] = useState({
        serviceName: "",
        serviceCost: "",
        serviceDescription: "",
        serviceImage: null
    });

    const [validation, valchange] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5151/api/Backend/GetById/${sid}`)
        .then((res) => {
                const servicedata = res.data;
                setService(servicedata);
                console.log("Get data:", servicedata)
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log("Service not found")
                }
                console.log("Error:", error.message);
            });
    }, [sid]);

  

    const handleChange = (e) => {

        const { name, value } = e.target;

        setService(prevService => ({

            ...prevService,

            [name]: value

        }));

    };
    const handleImageChange = (e) => {

        setService({

            ...service,

            serviceImage: e.target.files[0],

        });

    };
    const handlesubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("serviceName", service.serviceName);
        formData.append("serviceCost", service.serviceCost);
        formData.append("serviceDescription", service.serviceDescription);
        formData.append("serviceImage", service.serviceImage);


        if (!isNaN(service.serviceName) || !isNaN(service.serviceDescription)) {
            alert('Name cannot have an integer');
        }
        else {
            axios.put(`http://localhost:5151/api/Backend/UpdateService/${sid}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then((res) => {
                    alert("Updated successfully.");
                    navigate("/AdminDisplay");
                })

                .catch((error) => {
                    console.log("Error:", error.message);
                });
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
            <Container>
                <Card className=" Servicemain">
                    <CardBody className="Service">
                        <Form className='adminadd' onSubmit={handlesubmit}>
                            <h1 class>Update Service</h1><br></br>
                            <Form.Group className="servicecard mb-3">
                                <Form.Label>Service Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serviceName"
                                    data-testid="Service Name:"
                                    value={service.serviceName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="servicecard">
                                <Form.Label>Cost:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="serviceCost"
                                    data-testId="Cost:"
                                    value={service.serviceCost}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="servicecard">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serviceDescription"
                                    data-testid="Description:"
                                    value={service.serviceDescription}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="servicecard">
                                <Form.Label>service picture:</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="serviceImage"
                                    data-testid="service picture:"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>
                            <Button type="submit" data-testid="Add Service" className="addservice">Add Service</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}