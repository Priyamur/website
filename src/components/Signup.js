import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Styles/Login.css';
import axios from 'axios';

export default function SignUp() {

    const[formData, setFormData] = useState({ email: '', password: '', confirmpassword: '' });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    

    useEffect(() => {
        document.title = "Sign up"
    }
    )

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Fields cannot be empty");
            return;
        }
        else if (!isEmail.test(formData.email)) {
            setError("Invalid email");
            return;
        }

        else if (!formData.email) {
            setError("Email field is required");
            return;
        }
        else if (!formData.password) {
            setError("Password field is required");
            return;
        }
        else if (!formData.confirmpassword) {
            setError("Confirm Password field is required");
            return;
        }
        else if (formData.password < 6) {
            setError("Password must be atleast 6 characters long");
            return;
        }
        else if (formData.confirmpassword != formData.password) {
            setError("Password must match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5151/api/LoginSignup/signup', formData);
            console.log('User created:', response.data);
            const userId = response.data.clientId;
            localStorage.setItem('user',userId)
            console.log(userId);
            window.alert('User Registered successfuly');
            navigate('/');
        }
        catch (error) {
            console.error('Error:', error);
        }

    };


    return (
        <div>
            <div className='login-signup'>
                <div className='login'>
                    <form onSubmit={handleSubmit} className="login-form">

                        <h3 className="sign">Sign Up</h3><br></br>
                        <p style={{ fontSize: 12, color: 'red' }}>{error}</p>
                        <div className="mb-3 ">
                            <input type="email" className="un" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
                           
                        </div>
                        <div className="mb-3 ">
                            <input type="password" className="pass" placeholder="Enter password" name="password" value={formData.password} required pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g" onChange={handleChange} />
                           
                        </div>
                        <div className="mb-3 ">
                            <input type="password" className="pass" placeholder="Enter confirm password" name="confirmpassword" value={formData.confirmpassword} required pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g" onChange={handleChange}/>
                           
                        </div>
                       
                        <button type="submit" data-testid="ben" className="submit book" ><a>
                            Submit</a>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}