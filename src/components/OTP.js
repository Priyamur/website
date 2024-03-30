import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import axios from 'axios';
import Login from '../Styles/Login.css';

export default function OTP() {
    const location = useLocation();
    const verifyOtp = location?.state?.otp;
    const [formData, setFormData] = useState({ otp: '' });
    const [error, setError] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        document.title = "OTP Verification"
    }

    )
    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOTP = async (e) => {
        e.preventDefault();
        if (formData.otp == verifyOtp) {
            window.alert('OTP submitted successfully')
            navigate("/Reset")
        }
        setError("Invalid OTP")
    }
        return (
        <div>
            <div className='login-signup'>
                <div className='login'>
                    <form className="login-form">

                        <h3 className="sign">OTP Verification</h3><br></br>
                        <p style={{ fontSize: 12, color: 'red' }}>{error}</p>
                        <div className="mb-3 ">
                            <input type="text" className="un" placeholder="Enter number" name="otp" value={formData.otp} onChange={handleChange}/>
                        </div>
                        <button type="submit" className="submit book" onClick={handleOTP}><a>
                            Submit</a>
                        </button>
                    </form>
                    </div>
                </div>
        </div>
    )
}