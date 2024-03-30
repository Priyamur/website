import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../Styles/Login.css';

export default function Reset() {
    const [formData, setFormData] = useState({ confirmpassword: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
   
   
    useEffect(() => {
        document.title = "Reset Password"
    }
    )

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!formData.password.length==6) {
        //     setError("Password should contain only 6 digit");
        //     return;
        // }
         if (formData.confirmpassword != formData.password) {
            setError("Password must match");
            return;
        }
        else if (!formData.confirmpassword || !formData.password) {
            setError("Fields cannot be empty");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5151/api/LoginSignup/forgotpassword(id)`, formData);
            console.log('Reset password:', response.data);
            window.alert('New Password Created successfuly');
            navigate('/');
        }
        catch (error) {
            console.error('Error:', error);
        }

    }
    return (
        <div>
            <div className='login-signup'>
                <div className='login'>
                    <form onSubmit={handleSubmit} className="login-form">

                        <h3 className="sign">Reset Password</h3><br></br>
                        <p style={{ fontSize: 12, color: 'red' }}>{error}</p>
                        <div className="mb-3 ">
                            <input type="password" className="pass" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />

                        </div>
                        <div className="mb-3 ">
                            <input type="password" className="pass" placeholder="Enter confirm password" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} />

                        </div>

                        <button type="submit" className="submit book" ><a>
                            Submit</a>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
