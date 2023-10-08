
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';


const ResetPasswordForm = () => {
    const history = useHistory();

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState(null);
    const { id } = useParams();

    // Assume you have a function to get the user by ID using axios
    const fetchUserById = async (userId) => {
        try {
            const response = await axios.get(`https://651be95a194f77f2a5af127c.mockapi.io/users/${userId}`);
            if (response.status === 200) {
                setUser(response.data);
                setCurrentPassword(response.data.password);
                console.log('User ID from URL:', userId);
            } else {
                alert('Failed to fetch user. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            alert('An error occurred while fetching the user.');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = async () => {
        if (password === confirmPassword) {
            try {
                // Send a PUT request to update the password
                await axios.put(`https://651be95a194f77f2a5af127c.mockapi.io/users/${id}`, {
                    password: confirmPassword
                });

                console.log('Password updated successfully!');
                Swal.fire({
                    icon: "success",
                    title: "Password updated successfully!",
                    showConfirmButton: false,
                    timer: 2500,
                }).then((result) => {
                    history.push('/authUser');
                });
                // alert('Password updated successfully!');
            } catch (error) {
                console.error('Error updating password:', error);
                alert('An error occurred while updating the password.');
            }
        } else {
            alert('Passwords do not match. Please try again.');
        }
    };
    useEffect(() => {
        fetchUserById(id)
    }, []);
    return (
        <center>
            <div className="containers forms" style={{ paddingTop: '5%', width: '30%', margin: '0px', marginTop: '5%' }}>
                {/* <p>Current Password: {currentPassword}</p> */}
                <h3>Reset Password</h3>

                <label htmlFor="password">New Password:</label>
                <input
                    style={{ border: '1px solid #00cab1' }}
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    style={{ border: '1px solid #00cab1' }}
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <br />

                <button onClick={() => handleResetPassword(id)}>Reset Password</button>
            </div>
        </center>
    );
};

export default ResetPasswordForm;



