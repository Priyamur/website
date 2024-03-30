import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../Styles/Login.css';

export default function ForgetPassword()
{
    const[formData, setFormData] = useState({ email: ''});
    const [verifyOtp, setVerifyOTP] = useState("")
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
        if(!isEmail.test(formData.email))
        {
            setError("Invalid email");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5151/api/LoginSignup/forgotpassword?email=${formData.email}`);
            console.log(response.data.sOTP)
            const otp = response.data.sOTP;
            setVerifyOTP(otp);
            window.alert('OTP sent successfuly');
            navigate('/OTP',{ state:{otp:otp}});
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return(
        <div>
            <div className='login-signup'>
                <div className='login'>
                    <form  className="login-form">

                        <h3 className="sign">Forget Password</h3><br></br>
                        <p style={{ fontSize: 12, color: 'red' }}>{error}</p>
                        <div className="mb-3 ">
                            <input type="email" className="un" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
                        </div>
                        <button type="submit" className="submit book" onClick={handleSubmit}><a>
                            Submit</a>
                        </button>
                    </form>
                    </div>
                </div>
        </div>
    )
}


