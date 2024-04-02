// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../Styles/App.css';
// import '../Styles/Appointment.css';


// export default function BookingHistory(){
//     return(
//         <div>
//              <nav class="navbar navbar-fixed-top">
//                 <div class="container">
//                     <div class="navbar-header">
//                         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
//                             <span class="icon-bar"></span>
//                             <span class="icon-bar"></span>
//                             <span class="icon-bar"></span>
//                         </button>
//                         {/* <a class="navbar-brand" href="#myPage">Logo</a> */}
//                     </div>
//                     <div class="collapse navbar-collapse" id="myNavbar">
//                         <ul class="nav navbar-nav">
//                             <li><a href="/">HOMEPAGE</a></li>
//                             <li><a href="/Display">SPA SERVICES</a></li>
//                             <li><a href="/">SERVICES</a></li>
//                             <li><a href="/Virtual">VIRTUAL CONSULTATION</a></li>
//                             <li><a href="/">CONTACT</a></li>
//                             <li>{userId ? <p></p> : <a href="/Signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a>}</li>
//                             {userId ? <li><a href="#" onClick={handleLogout} ><span class="glyphicon glyphicon-log-out"></span> Logout</a></li> : <li><a href="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>}
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//              <nav class="navbar navbar-fixed-top">
//                 <div class="container">
//                     <div class="navbar-header">
//                         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
//                             <span class="icon-bar"></span>
//                             <span class="icon-bar"></span>
//                             <span class="icon-bar"></span>
//                         </button>
//                         {/* <a class="navbar-brand" href="#myPage">Logo</a> */}
//                     </div>
//                     <div class="collapse navbar-collapse" id="myNavbar">
//                         <ul class="nav navbar-nav">
//                             <li><a href="/">HOMEPAGE</a></li>
//                             <li><a href="/Display">SPA SERVICES</a></li>
//                             <li><a href="/">SERVICES</a></li>
//                             <li><a href="/Virtual">VIRTUAL CONSULTATION</a></li>
//                             <li><a href="/">CONTACT</a></li>
//                             <li>{userId ? <p></p> : <a href="/Signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a>}</li>
//                             {userId ? <li><a href="#" onClick={handleLogout} ><span class="glyphicon glyphicon-log-out"></span> Logout</a></li> : <li><a href="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>}
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div className="jumbotron">
//                 <h3>List of Appointments</h3>
//             </div>
//             <div class="table-wrapper">
//                 <div class="table-inner">
//                     <table class="pricing-table">
//                         <thead>
//                             <tr>
//                                 <th>Service Name</th>
//                                 <th>Service Cost</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="tesxt-center">

//                         </tbody>
//                     </table>

//                 </div>

//             </div>
//         </div>
//     )
// }