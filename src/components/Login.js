import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Login.css';
import Cookies from 'js-cookie';
import SignUp from './Signup';


export default function Login() {
    const [formdata, setFormdata] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign in"
    })
    const handleChange = (e) => {
        setError("");
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formdata.email || !formdata.password) {
            setError("Fields cannot be empty");
            return;
        }
        else if (!isEmail.test(formdata.email)) {
            setError("invalid email");
            return;
        }
        else if (formdata.email == "priyastewartjan6@gmail.com" || formdata.password == "priya"){
            navigate("/Admin")
        }


        try {
            const response = await axios.post('http://localhost:5151/api/LoginSignup/login', formdata);
            if (response.status === 200) {
                // const token = response.data.token;
                // localStorage.setItem('token', token);
                const userId = response.data.clientId;
                localStorage.setItem('user',userId)
                console.log("login id",userId)
                // console.log("Token:", token);
               
                navigate('/');
            }
            else {
                // setError("Invalid email or password");
                console.log("response.data");
            }
        }
        catch (error) {
            console.error('Error:', error);
            setError("Invalid email or password");
        }
    };
    return (
        <div className='login-signup'>
            <div className='login'>
                <form onSubmit={handleSubmit} className="login-form">
                    {/* <p style={{ fontSize: 12, color: 'red' }}>{error}</p> */}
                    <h3 className="sign" >Sign In</h3><br></br>
                    <p style={{ fontSize: 12, color: 'red' }} >{error}</p>
                    <div className="mb-3 ">
                        <input type="email" className="un" placeholder="Enter email" name="email" value={formdata.email}  onChange={handleChange}/>
                        
                    </div>
                    <div className="mb-3 ">
                        <input type="password" className="pass" placeholder="Enter password" name="password" value={formdata.password} required pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g" onChange={handleChange}/>
                        {/* <p style={{ fontSize: 12, color: 'red' }}>{setError}</p> */}
                    </div>

                    <button data-textid="Submit" type="submit" className="submit book" >
                        Submit
                    </button>
                    <p className="forgot" align="center"><a href="/Forget">Forgot Password?</a></p>
                    <p>Don't have an account? <a href="/signup">SignUp</a></p>

                </form>
            </div>
        </div>
    )
}
