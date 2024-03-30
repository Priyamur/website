import React, { useState, useEffect } from "react";
import hotstone from '../Images/hotstone.jpg';
import jojoboa from '../Images/jojobao.jpg';
import spa1 from '../Images/spa1.jpg';
import spa2 from '../Images/spa2.jpg';
import spa6 from '../Images/spa6';
import hotvapourmassage from '../Images/hotvapourmassage.jpg';

export default function Homepage() {
    const [comments, setComments] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const designation = e.target.designation.value;
        const comment = e.target.comments.value;
        const newComment = { name, designation, comment };
        setComments([...comments, newComment]);
        e.target.reset();
    };

    const userId = localStorage.getItem('user');
    console.log("sessionid",userId);

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

                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav ">
                            <li><a href="#about">ABOUT</a></li>
                            <li><a href="/Display">SPA SERVICES</a></li>
                            <li><a href="#service">VALUES</a></li>
                            <li><a href="#Location">HEADQUATERS</a></li>
                            <li><a href="#comments">BEST SERVICE</a></li>
                            <li><a href="#products">NEWLY LAUNCHED SERVICE</a></li>
                            <li>{userId? <p></p>:<a href="/Signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a>}</li>
                            {userId? <li><a href="#" onClick={handleLogout} ><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>:<li><a href="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="jumbotron">
                <h1>Ray Spa</h1>
                <p>We will make your own starlight<br></br>Put you under global spotlight</p>

            </div>
            <div class="container-fluid para1 text-center" id="about">
                <div className="row">
                    <div className="col-sm-8 get">
                        <h2>About Our Page</h2>
                        <h4>Letting our customers to explore with our service</h4>
                        <p>We are one of the bestest spa in the world  all the products are made with  full care and low chemicals we are doing it with love. </p>
                        <button class="btn btn-default btn-lg "><a href="/Display" className="book" >Get in Touch</a></button>
                    </div>

                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-signal logo"></span>
                    </div>
                </div>
            </div>
            <div className="container-fluid para2 bg-grey text-center" >
                <div className="row">
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-globe logo"></span>
                    </div>
                    <div className="col-sm-8">
                        <h2>Our Values</h2>
                        <h5><strong>MISSION:</strong> Our mission to make our service available through out the world </h5>
                        <h5><strong>VISION:</strong> Our vision to make each and every women and men to feel relaxed </h5>
                    </div>
                </div>
            </div>
            <div className="container-fluid para3 text-center" id="service">
                <h2>SERVICES</h2>
                <h4>What we offer</h4>
                <br />
                <div className="row">
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-off logo-small"></span>
                        <h4>POWER</h4>
                        <p>The Power of our services were won millions of peoples heart</p>
                    </div>
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-heart logo-small"></span>
                        <h4>LOVE</h4>
                        <p>Valentine's Day Special service make you fall in love</p>
                    </div>
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-lock logo-small"></span>
                        <h4>Shopping store</h4>
                        <p>We will bring our spa to every home</p>
                    </div>
                </div>
                <br></br>
                <div className="row" >
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-leaf logo-small"></span>
                        <h4>GREEN</h4>
                        <p>We only belong to vegan community</p>
                    </div>
                    <div className="col-sm-4">
                        <span class="glyphicon glyphicon-certificate logo-small"></span>
                        <h4>CERTIFIED</h4>
                        <p>We are the certified one around the world</p>
                    </div>
                    <div className="col-sm-4">
                        <span class="glyphicon glyphicon-wrench logo-small"></span>
                        <h4>HARD WORK</h4>
                        <p>Thousands of people pouring their hardwork to make this spa services even more beautiful and useful</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid text-center bg-grey del" id="Location">
                <h2>Headquaters</h2>
                <h4>Our main parts of our spa world</h4>
                <div className="row text-center">
                    <div className="col-sm-4">
                        <div className="thumbnail">
                            <img src={spa2} alt="spa2" />
                            <p><strong>Paris</strong></p>
                            <p>Yes, we built in Paris</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="thumbnail">
                            <img src={spa1} alt="spa3" />
                            <p><strong>New York</strong></p>
                            <p>yes,we built in New york too</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="thumbnail">
                            <img src={spa6} alt="spa4" />
                            <p><strong>London</strong></p>
                            <p>yes,we built in London too</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid text-center bg-grey del" id="comments">

                <h2 className="ley text-center">What our customers say</h2>

                <div id="myCarousel" className="carousel slide text-center" data-ride="carousel">



                    <ol className="carousel-indicators">

                        {comments.map((_, index) => (

                            <li key={index} data-target="#myCarousel" data-slide-to={index} className={index === 0 ? "active" : ""}></li>

                        ))}

                    </ol>



                    <div className="carousel-inner" role="listbox">

                        {comments.map((comment, index) => (

                            <div key={index} className={`item ${index === 0 ? "active" : ""} review`}>

                                <h4>"{comment.comment}"<br /><span>{comment.name}, {comment.designation}</span></h4>

                            </div>

                        ))}

                    </div>



                    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">

                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>

                        <span className="sr-only">Previous</span>

                    </a>

                    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">

                        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>

                        <span className="sr-only">Next</span>

                    </a>

                </div>

            </div>            
             <div className="container-fluid " id="products">
                <div className="text-center">
                    <h2>Newly Launched Services</h2>
                    <h4>Choose a service that works for you</h4>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-default text-center">
                            <div className="Lip Gloss">
                                <h2>Hotstone Massage</h2>
                            </div>
                            <div className="panel-body ">
                                <img src={hotstone} alt="lipstick" />
                            </div>
                            <div className="panel-footer">
                                <h4>it will relieve your muscular starins</h4>
                                <button className="btn btn-lg"><a href="/Booking" data-testid="Book Now" className="book">Book Now</a></button>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default text-center">
                            <div className="Perfume">
                                <h2>jojobao oil massage</h2>
                            </div>
                            <div className="panel-body">
                                <img src={jojoboa} alt="perfumes" />
                            </div>
                            <div className="panel-footer">
                                <h4>jojobao oil is very rich in nutritions</h4>
                                <button className="btn btn-lg"><a href="/Booking" className="book">Book Now</a></button>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default text-center">
                            <div className="concealer">
                                <h2>HotMat Massage</h2>
                            </div>
                            <div className="panel-body">
                                <img src={hotvapourmassage} alt="concealer" />
                            </div>
                            <div className="panel-footer">
                                <h4>It will help you feel relax and relive your back pain</h4>
                                <button className="btn btn-lg"><a href="/Booking" className="book">Book Now</a></button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="container-fluid bg-grey" id="contacts">
                <h2 className="text-center">Contact</h2>
                <div className="row">
                    <div className="col-sm-5">
                        <p>Contact us and we'll get back to you within 24 hours.</p>
                        <p><span class="glyphicon glyphicon-map-marker"></span> New York, US</p>
                        <p><span class="glyphicon glyphicon-phone"></span> +00 1515151515</p>
                        <p><span class="glyphicon glyphicon-envelope"></span> raycosmetics@gmail.com</p>
                    </div>
                    <form onSubmit={handleSubmit} className="box">
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <input className="form-control" id="name" name="name" placeholder="Name" type="text" required />
                            </div>
                            <div className="col-sm-6 form-group">
                                <input className="form-control" id="designation" name="designation" placeholder="Designation" type="text" required />
                            </div>
                        </div>
                        <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea><br />
                        <div className="row">
                            <div className="col-sm-12 form-group">
                                <button className="btn btn-default pull-right" type="submit">Send</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
            <footer class="container-fluid text-center">
                <a href="#myPage" title="To Top">
                    <span class="glyphicon glyphicon-chevron-up"></span>
                </a>
                <p>or buy from <a href="www.sephora.com" target="_blank" title="Visit sephora">www.sephora.com</a></p>
            </footer>
        </div>

    )
}