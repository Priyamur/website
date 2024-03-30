import React, { useState } from "react";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import axios from "axios";
import '../Styles/Service.css';
import { Navigate } from "react-router-dom";
import {Link, useNavigate } from 'react-router-dom';


const initialValues = {
    serviceName: "",
    serviceDescription: "",
    serviceCost: "",
    serviceImage: null,
};

function UploadService() {

    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);

    const handleInput = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setValues({
            ...values,
            serviceImage: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post("http://localhost:5151/api/Backend/CreateUser", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            window.alert(" Service created successfully");
            navigate ('/AdminDisplay');

            console.log ("Service created successfully:", response.data);
        } catch (error) {
            console.error("Post failure:", error);
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
                        <Form className='adminadd' onSubmit={handleSubmit}>
                            <h1 class>Add Service</h1><br></br>
                            <Form.Group className="servicecard">
                                <Form.Label>Service Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    data-testid="Service Name:"
                                    name="serviceName"
                                    value={values.serviceName}
                                    onChange={handleInput}
                                />
                            </Form.Group>

                            <Form.Group className="servicecard ">
                                <Form.Label>Cost:</Form.Label>
                                <Form.Control
                                    type="number"
                                    data-testid="Cost:"
                                    name="serviceCost"
                                    value={values.serviceCost}
                                    onChange={handleInput}
                                />
                            </Form.Group>

                            <Form.Group className="servicecard ">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    data-testId="Description:"
                                    name="serviceDescription"
                                    value={values.serviceDescription}
                                    onChange={handleInput}
                                />
                            </Form.Group>


                            <Form.Group className="servicecard">
                                <Form.Label>service picture:</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="serviceImage"
                                    data-testId="service picture:"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>

                            <Button type="submit" data-testid="Add Service" className="addservice">Add Service</Button>
                            <Button data-testid="Existing Service" className="displaying"><a href="/AdminDisplay">Existing Service</a></Button>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default UploadService;