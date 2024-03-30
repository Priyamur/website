import { useState, useEffect } from "react";
import '../Styles/Service.css'
import axios from 'axios';
import '../Styles/App.css';
import Booking from "../appointmentcomponents/Booking";
import { useNavigate } from "react-router-dom";


export default function DisplayService() {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState([]);
    const userId = localStorage.getItem('user');
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5151/api/Backend/GetAllCart'); // Assuming the API endpoint is correct 
            const productsWithImages = await Promise.all(response.data.map(async (product) => { 
                try { 
                    const imageResponse = await axios.get(`http://localhost:5151/api/Backend/GetImage/${product.id}/Image`, { 
                        responseType: 'arraybuffer', 
                    }); 
                    const imageUrl = URL.createObjectURL(new Blob([imageResponse.data], { type: 'image/jpeg' })); 
                    return { ...product, imageUrl }; 
                } catch (error) { 
                    console.error('Error fetching image for product:', product.id, error); 
                    return product; 
                } 
            })); 
            setServices(productsWithImages); 
            setFilteredServices(productsWithImages);
        }
         catch (error) {
            // console.error('Error fetching products:', error);
        }
    };
    const handleServiceDetails = (service) => {
        navigate('/Booking')
    }
    console.log("display",userId)
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

    const handleLogin = () =>{
        navigate('/login')
    }

    const handleSearch = (event) => { 
        const query = event.target.value.toLowerCase(); 
        setSearchQuery(query); 
        const filtered = services.filter(service => 
            service.name.toLowerCase().includes(query) 
        ); 
        setFilteredServices(filtered); 
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
                        <ul class="nav navbar-nav ">
                            <li><a href="/">HOMEPAGE</a></li>
                            <li><a href="/Display">SPA SERVICES</a></li>
                            {/* <li><a href="/">SERVICES</a></li> */}
                            <li><a href="/Virtual">VIRTUAL CONSULTATION</a></li>
                            <li><a href="">VALUES</a></li>
                            <li><a href="">HEADQUATERS</a></li>
                            <li><a href="">BEST SERVICE</a></li>
                           
                            {/* <li><a href="/">SERVICE</a></li> */}
                
                            <li>{userId? <p></p>:<a href="/Signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a>}</li>
                            {userId? <li><a href="#" onClick={handleLogout} ><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>:<li><a href="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="jumbotron">
                <h3>OUR SERVICES</h3>
                <p>Our services only for our customer happiness</p>
                <form className="form-inline">
                    <div className="input-group">
                        <input type="search" class="form-control search" size="80" placeholder="Search our products" value={searchQuery} onChange={handleSearch} required />
                        <div className="input-group-btn">
                            <button type="button" class="btn btn-danger">Search</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container " id="products">
                <div className="text-center">
                    <h2>List of our services</h2>
                </div>
            </div>
            <div className="servicelist" >
                <div className="">
                    <div className="products-container panel panel-default text-center">
                        {filteredServices.map((service, index) => (
                            <div key={service.id} className="product-item">
                                <div className="panel-header">
                                <h2>{service.name}</h2>
                                </div>
                                <div className="panel-body">
                                <img src={service.imageUrl} alt={service.name }/>
                                </div>
                                <div className="panel-footer">
                                <p>Description: {service.description}</p>
                                    <p>Cost: {service.cost}</p>
                                    <button className="btn btn-lg" type='button' onClick={() => {userId? handleServiceDetails(): handleLogin() }}><a className="book">Book Now</a></button>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className='product-detail bg-warning'>
                        {selectedService && (
                            <div>
                                <h2>{selectedService.name}</h2>
                                <p>Description: {selectedService.description}</p>
                                <p>Description: {selectedService.cost}</p>


                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}