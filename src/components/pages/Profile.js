import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import axios from "axios"; // Import Axios

const Profile = () => {
    // State variables
    const [profileData, setProfileData] = useState(null);
    const [formDatas, setFormDatas] = useState({ name: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [loopData, setLoopData] = useState([]);
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState(''); // Define name error state
    const [isUpdateConfirmed, setIsUpdateConfirmed] = useState(false);
    const [image, setImage] = useState('');
    const [oldPassword, setOldPassword] = useState('');

  const user_id = sessionStorage.getItem("userId");

  //   const isPasswordValid = (password) => {
  //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
  //       password
  //     );
  //   };

  // Fetch booking information from the API
  const fetchBookingData = async () => {
    try {
      const response = await axios.get(
        `https://651cfc0044e393af2d58f77b.mockapi.io/booking?user_id=${user_id}`
      );
      setLoopData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booking data:", error);
      setLoading(false);
    }
  };

  // Fetch user profile data from the API
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `https://651be95a194f77f2a5af127c.mockapi.io/users/${user_id}`
      );
      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };


    const isPasswordValid = (password) => {
        // Customize your password validation logic here
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    };

    // Handle input changes in the form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormDatas({ ...formDatas, [name]: value });
        if (name === 'password') {
            if (!isPasswordValid(value)) {
                setPasswordError('The Password must be at least 8 characters long and contain Capital letters and numbers');
            } else if (oldPassword !== profileData.password) {
                setPasswordError('The Old Password is incorrect');
            } else {
                setPasswordError('');
            }
        }
    };

    // Handle confirmation before updating profile
    const handleConfirmUpdate = () => {
        // const userConfirmed = window.confirm('Are you sure you want to update your profile?');
        const userConfirmed = Swal.fire({
            icon: "success",
            title: 'Your Information updated successfully',
            showConfirmButton: false,
            timer: 2500,
        });
        setIsUpdateConfirmed(userConfirmed);
    };

    const resetForm = () => {
        setFormDatas({ name: '', password: '', oldPassword: '' });
        setPasswordError('');
        setNameError('');
    };

  // Handle form submission and update profile data
  const handleSubmit = (event) => {
    event.preventDefault();

        if (isUpdateConfirmed) {
            // Validate the form data
            if (!isPasswordValid(formDatas.password)) {
                // Display an error message or handle validation as needed
                console.error('Form data is not valid.');
                return;
            }
            const updatedData = {
                email: profileData.email,
                name: formDatas.name ? formDatas.name : profileData.name,
                password: formDatas.password,
                image: profileData.image,
            };

            // Send a PUT request to update the profile
            axios
                .put(`https://651be95a194f77f2a5af127c.mockapi.io/users/${user_id}`, updatedData)
                .then((response) => {
                    setProfileData(updatedData);
                    resetForm();
                    // console.log('Data updated successfully:', response.data);
                    // You can add a success message or perform additional actions here
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                });
        }
        fetchProfileData();
    };
    // console.log(profileData.image);

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            // console.log(reader.result);
            image1 = reader.result
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    // Handle image upload
    const handleImage = (e) => {
        // setImage(e.target.files[0]);
        // console.log(e.target.files[0]);
        getBase64(e.target.files[0])
    };

    let image1 = ''
    // console.log(setImage);
    // Handle image upload to the API
    const handleApi = () => {
        // console.log(image1);

        // Send a PUT request to update the user's image
        axios.put(`https://651be95a194f77f2a5af127c.mockapi.io/users/${user_id}`, {
            image: image1
        }).then((res) => {
            console.log('Image uploaded successfully:', res);
            setProfileData(res.data);

            // You can add a success message or perform additional actions here
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Image is too big',
                showConfirmButton: false,
                timer: 2500,
            });
        });
    };

    const CheckImage = () => {

        if (profileData.image == "default.jpg") {
            return "assets/img/default.jpg";
        } else {
            return profileData.image;
        }

    }
    // Fetch initial data when the component mounts
    useEffect(() => {
        fetchBookingData();
        fetchProfileData();
    }, [passwordError]);

  // const [errors, setErrors] = useState({});

  //   if (!profileData) {
  //     return <div>Loading...</div>; // You can render a loading indicator here
  //   }

  return (
    <div className="section">
      <Header />

            <section id="section-settings" className="bg-gray-100">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 mb0">
                            <div className="card p-3 rounded-5" style={{ height: '100%' }}>
                                {profileData ? (
                                    <div>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                margin: '20px auto',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <img
                                                src={CheckImage()}
                                                alt={profileData.image}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </div>
                                        <label>Name:</label>
                                        <p>{profileData.name}</p>

                    <label>Email:</label>
                    <p>{profileData.email}</p>
                  </div>
                ) : (
                  <div>Profile data not available.</div>
                )}
              </div>
            </div>

                        <div className="col-lg-9">
                            <div className="card p-4 rounded-5">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form id="form-create-item" className="form-border" onSubmit={handleSubmit}>
                                            <div className="de_tab tab_simple">
                                                <h2>Profile</h2>
                                                <div className="de_tab_content">
                                                    <div className="tab-1">
                                                        <div className="row">
                                                            <div className="col-lg-6 mb-3">
                                                                <h5>Username</h5>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    id="username"
                                                                    className="form-control"
                                                                    placeholder="Enter username"
                                                                    value={formDatas.name}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div><br></br>

                                                    <div className="row">
                                                        <div className="col-lg-6 mb-3 mt-2">
                                                            <h5>Old Password</h5>
                                                            <input
                                                                type="password"
                                                                name="oldPassword"
                                                                id="oldPassword"
                                                                className="form-control"
                                                                placeholder="Enter old password"
                                                                onChange={(e) => setOldPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div className="row">

                                                        <div className="col-lg-6 mb-3 mt-2">
                                                            <h5>New Password</h5>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                id="password"
                                                                className="form-control"
                                                                placeholder="Enter new password"
                                                                value={formDatas.password}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                            {passwordError && <p className="text-danger">{passwordError}</p>}
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="submit"
                                                        className="btn-main mt-4 handle"
                                                        value="Update profile"
                                                        onClick={handleConfirmUpdate}
                                                        style={{ padding: '10px 15px' }}
                                                    />
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                    <div className="col-lg-6 mb20 mt-4">

                                        <h5>Uplode Your Image</h5>
                                        <input accept="image/*" type="file" name="file" id="file" className="form-control" onChange={handleImage} />
                                        <button className="btn mt-3 handle" onClick={handleApi}  >uplode your image</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                {loopData.length > 0 &&
                    <div className="container pt-5">
                        <h4 className="mb-4">Booking Information</h4>
                        <div className="custom-table-container">
                            <table className="table table-bordered">
                                <thead className='tablepro'>
                                    <tr>
                                        <th scope="col">Doctor Name</th>
                                        <th scope="col">Booking Day</th>
                                        <th scope="col">Booking Time</th>
                                        <th scope="col">Booking Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loopData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.doctorName}</td>
                                            <td>{data.bookingDay}</td>
                                            <td>{data.bookingTime}</td>
                                            <td>{data.bookingDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }

            </section >

            <Footer />
        </div >
    );
};

export default Profile;
