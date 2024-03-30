import { Component } from "react"
import '../Styles/Admin.css';
import axios from 'axios';
import Appointment from "./Appointmentcomponents/Appointment";



export default function AdminPage() {
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
          
        </div>


    )
}


