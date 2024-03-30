import { useState, useEffect } from "react";
import '../Styles/Service.css'
import axios from 'axios';
import '../Styles/App.css';
import '../Styles/Appointment.css';
import { Link, useNavigate } from "react-router-dom";

export default function AdminDisplay() {

    const [serviceid, setServiceId] = useState("");
    

    const [imageSrc, setImageSrc] = useState([]);

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
   
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
            console.log("set", services)
        }


        catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    // const handleServiceDetails = (service) => {
    //     setSelectedService(service);
    // }
    const navigate = useNavigate();

    const LoadEdit = (serviceid) => {
        console.log("serviceid to edit", serviceid)
        navigate("/Updatedisplay/" + serviceid);
    }
   
     const handleDelete = async(serviceId) => {
        try{
            await axios.delete(`http://localhost:5151/api/Backend/DeleteServiceDetails/${serviceId}`);
            fetchServices();
        }catch(error)
        {
            console.error('Error deleting service:',error);
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


            <div className="jumbotron">
                <h3> List of services added</h3>
                <p>Our services only for our customer happiness</p>
            </div>
            <div className="servicelist" >
                <div className="">
                    <div className="products-container panel panel-default text-center">
                        {services.map((service, index) => (
                            <div key={service.id} className="product-item">
                                <div className="panel-header">
                                    <h2>{service.name}</h2>
                                </div>
                                <div className="panel-body">
                                    <img src={service.imageUrl} alt={service.name} />
                                </div>
                                <div className="panel-footer">
                                    <p>Description: {service.description}</p>
                                    <p>Cost: {service.cost}</p>
                                    <button className="btn btn-lg" type='button' onClick={() => LoadEdit(service.id)}>Update</button>
                                    <button className="btn btn-lg" type='button' onClick={() => handleDelete(service.id)}>Delete</button>

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