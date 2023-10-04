import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Modal from "./Modal";

export default function Content() {
    const [modalOpen, setModalOpen] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [doctorAvailableDays, setDoctorAvailableDays] = useState([]);
    const [doctorAvailableTimes, setDoctorAvailableTimes] = useState([]);
    const [doctorName, setDoctorName] = useState("");
    const [doctorPrice, setDoctorPrice] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "1111",
        gender: "",
        bookingDay: null,
        bookingTime: null,
        date: "",
        notes: ""
    });

    const [name, setName] = useState(formData.name);
    const [email, setEmail] = useState(formData.email);
    const [phone, setPhone] = useState(formData.phone);
    const [gender, setGender] = useState(formData.gender);
    const [bookingDay, setBookingDay] = useState(formData.bookingDay);
    const [bookingTime, setBookingTime] = useState(formData.bookingTime);
    const [date, setDate] = useState(formData.date);
    const [notes, setNotes] = useState(formData.notes);

    //Get the user_id from the session
    const userId = 2;
    sessionStorage.setItem('user_id', userId.toString());
    const user_id = sessionStorage.getItem('user_id');
    // console.log(user_id);

    /*----------------------------------------------Users API----------------------------------------------*/
    const getUserData = () => {
        axios
            .get(`https://651be95a194f77f2a5af127c.mockapi.io/users/${user_id}`)
            .then((getUserData) => {
                setUserData(getUserData.data);
                setName(getUserData.data.name);
                setEmail(getUserData.data.email);
            });
    };
    // console.log(userData);

    //Get the doctor_id from the session
    const categoryId = 1;
    sessionStorage.setItem('category_id', categoryId.toString());
    const category_id = sessionStorage.getItem('category_id');

    //Get the doctor_id from the session
    const doctorId = 1;
    sessionStorage.setItem('doctor_id', doctorId.toString());
    const doctor_id = sessionStorage.getItem('doctor_id');


    /*----------------------------------------------Doctors API----------------------------------------------*/
    const getDoctorData = () => {
        axios
            .get(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${category_id}`)
            .then((getDoctorData) => {
                setDoctorData(getDoctorData.data);
                const doctor = doctorData && doctorData.doctors.find((doctor) => doctor.id === doctor_id);
                const doctorAvailableDays = doctor.availableDays;
                setDoctorAvailableDays(doctorAvailableDays);
                const doctorAvailableTimes = doctor.availableTime;
                setDoctorAvailableTimes(doctorAvailableTimes);
                const doctorName = doctor.name;
                setDoctorName(doctorName);
                const doctorPrice = doctor.price;
                setDoctorPrice(doctorPrice);

                console.log(doctorPrice);
            });
    };

    /*----------------------------------------------Booking API----------------------------------------------*/
    const getData = () => {
        axios
            .get(`https://651cfc0044e393af2d58f77b.mockapi.io/booking`)
            .then((getData) => {
                setApiData(getData.data);
            });
    };

    const sendDataToAPI = () => {
        axios
            .post(`https://651cfc0044e393af2d58f77b.mockapi.io/booking`, {
                user_id,
                phone,
                date,
                doctorName,
                notes,
                bookingDay,
                bookingTime,
                gender,
            })
    }


    useEffect(() => {
        getData();
        getUserData();
        getDoctorData();

        // Fetch doctor data
        axios
            .get(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${category_id}`)
            .then((response) => {
                setDoctorData(response.data);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "gender":
                setGender(value);
                break;
            case "bookingDay":
                setBookingDay(value);
                break;
            case "bookingTime":
                setBookingTime(value);
                break;
            case "date":
                setDate(value);
                break;
            case "notes":
                setNotes(value);
                break;
            default:
                break;
        }

        setFormData({
            name,
            email,
            phone,
            gender,
            bookingDay,
            bookingTime,
            date,
            notes,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any action with the form data here
        console.log(formData);
        resetForm();
        sendDataToAPI();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            bookingDay: 1,
            bookingTime: 1,
            date: "",
            notes: ""
        });
    };


    return (
        <div className="sidebar-style-9">
            <div className="section">
                <div className="container">
                    <form onSubmit={handleSubmit} method="GET">

                        <div className="row">
                            <div className="col-lg-8">
                                <div className="sigma_form style-7">
                                    <div className="form-block">
                                        <h4>Your Information:</h4>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <i className="fal fa-user" />
                                                    <input type="text" name="name" value={name} onChange={handleChange} placeholder="Patient Name" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <i className="fal fa-at" />
                                                    <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <i className="fal fa-phone" />
                                                    <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-block d-flex">
                                        <h4 className="mb-0 mr-4">Gender:</h4>
                                        <div className="d-flex align-items-center">
                                            <input type="radio" id="radio" name="gender" value="Male" checked={gender === "Male"} onChange={handleChange} />
                                            <label className="mb-0" htmlFor="radio">Male</label>
                                        </div>
                                        <div className="d-flex align-items-center ml-4">
                                            <input type="radio" id="radio2" name="gender" value="Female" checked={gender === "Female"} onChange={handleChange} />
                                            <label className="mb-0" htmlFor="radio2">Female</label>
                                        </div>
                                    </div>
                                    <div className="form-block">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <select name="bookingDay" value={bookingDay} onChange={handleChange}>
                                                        <option value={1}>Select Day</option>
                                                        {doctorAvailableDays && doctorAvailableDays.map((day, index) => (
                                                            <option key={index} value={day}>
                                                                {day}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <select name="bookingTime" value={bookingTime} onChange={handleChange}>
                                                        <option value={1}>Select Time</option>
                                                        {doctorAvailableTimes && doctorAvailableTimes.map((time, index) => (
                                                            <option key={index} value={time}>
                                                                {time}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input type="date" name="date" value={date} onChange={handleChange} data-provide="datepicker" placeholder="Select Date" required />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea name="notes" value={notes} onChange={handleChange} rows={7} placeholder="Note To The Doctor(Optional)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="form-block mb-0">
                                            <h4>Payment Information:</h4>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>Name On Card</label>
                                                        <input type="text" value={formData.cardName} onChange={this.cardName} placeholder="Dorothy Schneider" />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>Card Number</label>
                                                        <div className="payment-card-wrapper d-block d-sm-flex align-items-center">
                                                            <input type="text" value={formData.cardNumber} onChange={this.cardNumber} placeholder="xxxx-xxxx-xxxx-xxxx" />
                                                            <div className="card-image">
                                                                <img src={process.env.PUBLIC_URL + "/assets/img/book-apppointment/243x50.png"} alt="img" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Expiration Date</label>
                                                        <input type="text" value={formData.expDate} onChange={this.expDate} placeholder="mm/yy" data-provide="datepicker" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Security Code</label>
                                                        <input type="text" value={formData.cardCvv} onChange={this.cardCvv} placeholder="CCV" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="sidebar style-10 mt-5 mt-lg-0">
                                    {/* Booking Widget */}
                                    <div className="widget widget-booking">
                                        <h5 className="widget-title">Booking Summary</h5>
                                        <ul>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Day</span>
                                                <span>{bookingDay && bookingDay}</span>
                                            </li>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Date</span>
                                                <span>{date && date}</span>
                                            </li>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Time</span>
                                                <span>{bookingTime && bookingTime}</span>
                                            </li>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Doctor Name</span>
                                                <span>{doctorName && doctorName}</span>
                                            </li>
                                        </ul>
                                        <hr />
                                        <ul>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Examination Cost 1</span>
                                                <span>{doctorPrice && doctorPrice} JOD</span>
                                            </li>
                                        </ul>
                                        <hr />
                                        <ul>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span className="secondary-color"><b>Total</b></span>
                                                <span className="secondary-color"><b>{doctorPrice && doctorPrice} JOD</b></span>
                                            </li>
                                            <li className="popup d-flex align-items-center justify-content-between">
                                                <button type="submit" className="openModalBtn sigma_btn btn-block btn-sm mt-4">
                                                    Confirm Booking
                                                    <i className="fal fa-arrow-right ml-3" />
                                                </button>
                                                {modalOpen && <Modal setOpenModal={setModalOpen} />}

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
}
