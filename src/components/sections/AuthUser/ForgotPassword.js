import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ForgotPasswordForm() {
    // const history = useHistory();

    // const [email, setEmail] = useState("");

    // const getUserIdByEmail = async (email) => {
    //     try {
    //         const response = await axios.get('https://651be95a194f77f2a5af127c.mockapi.io/users');
    //         const users = response.data;
    //         const user = users.find(user => user.email === email);
    //         return user ? user.id : null;
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //         return null;
    //     }
    // };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const userId = await getUserIdByEmail(email);

    //     if (userId) {
    //         console.log("User ID:", userId);
    //         history.push(`/reset-password/${userId}`);

    //         // history.push(`/reset-password?id=${userId}`);
    //     } else {
    //         alert('Email not found. Please enter a valid email.');
    //     }
    // };


    return (
        <div>
            <h1>Forgot Password</h1>

        </div>
    );
}

export default ForgotPasswordForm;
