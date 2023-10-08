import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';

export default function Content({ catId, detailId }) {
    const history = useHistory();
    const [apiData, setApiData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [doctorAvailableDays, setDoctorAvailableDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [doctorAvailableTimes, setDoctorAvailableTimes] = useState([]);
    const [doctorName, setDoctorName] = useState("");
    const [doctorPrice, setDoctorPrice] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        bookingDay: "",
        bookingTime: "",
        date: "",
        notes: ""
    });

    const [name, setName] = useState(formData.name);
    const [email, setEmail] = useState(formData.email);
    const [phone, setPhone] = useState(formData.phone);
    const [gender, setGender] = useState(formData.gender);
    const [bookingDay, setBookingDay] = useState(formData.bookingDay);
    const [bookingTime, setBookingTime] = useState(formData.bookingTime);
    const [bookingDate, setBookingDate] = useState();
    const [date, setDate] = useState(formData.date);
    const [notes, setNotes] = useState(formData.notes);
    // const nextSaturday = getNextSaturday();
    // const nextSaturdayFormatted = nextSaturday.toISOString().split('T')[0];

    const [checkIn, setCheckIn] = useState('');

    const getCurrentMonthSaturdays = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDay();
        const saturdays = [];
        let startDay = null;
        switch (bookingDay) {
            case 'Sunday':
                startDay = 1
                break;
            case 'Monday':
                startDay = 2
                break;
            case 'Tuesday':
                startDay = 3
                break;
            case 'Wednesday':
                startDay = 4
                break;
            case 'Thursday':
                startDay = 5
                break

            default:
                break;
        }
        for (let day = currentDay + 5; day <= 31; day++) {
            const date = new Date(currentYear, currentMonth, day);
            if (date.getDay() === startDay && date.getMonth() === currentMonth) {
                saturdays.push(date.toISOString().split('T')[0]);
            }
        }

        return saturdays;
    };

    const saturdaysInMonth = getCurrentMonthSaturdays();

    //Get the user_id from the session
    const user_id = sessionStorage.getItem('userId');
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

    //Get the detailId from the session
    // const categoryId = 1;
    // sessionStorage.setItem('catId', categoryId.toString());
    // const catId = sessionStorage.getItem('catId');

    // //Get the detailId from the session
    // const doctorId = 1;
    // sessionStorage.setItem('detailId', doctorId.toString());
    // const detailId = sessionStorage.getItem('detailId');


    /*----------------------------------------------Doctors API----------------------------------------------*/
    const getDoctorData = () => {
        axios
            .get(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${catId}`)
            .then((response) => {
                const doctorData = response.data;
                setDoctorData(doctorData);
                console.log(doctorData.doctors[0].name);

                // Check if doctorData is defined before accessing its properties
                if (doctorData) {
                    const doctor = doctorData.doctors.find((doctor) => doctor.id === detailId);
                    if (doctor) {
                        const doctorAvailableDays = doctor.availableDays;
                        setDoctorAvailableDays(doctorAvailableDays);
                        console.log(doctorAvailableDays);
                        const doctorAvailableTimes = doctor.availableTime;
                        setDoctorAvailableTimes(doctorAvailableTimes);
                        const doctorName = doctor.name;
                        setDoctorName(doctorName);
                        const doctorPrice = doctor.price;
                        setDoctorPrice(doctorPrice);
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching doctor data:', error);
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
                doctorName,
                notes,
                bookingDay,
                bookingTime,
                bookingDate,
                gender,
            })
    }


    useEffect(() => {
        getData();
        getUserData();
        getDoctorData();

        // Fetch doctor data
        axios
            .get(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${catId}`)
            .then((response) => {
                setDoctorData(response.data);
            });
    }, []);


    const handleDayChange = (e) => {
        const selectedDay = e.target.value;
        setSelectedDay(selectedDay);

        const doctorForSelectedDay = doctorAvailableDays.find(
            (dayObject) => dayObject.day === selectedDay
        );

        if (doctorForSelectedDay) {
            const availableTimes = doctorForSelectedDay.times.filter((timeSlotObj) => !timeSlotObj.isBooked)
                .map((timeSlotObj) => timeSlotObj.timeSlot);

            setDoctorAvailableTimes(availableTimes);
        } else {
            setDoctorAvailableTimes([]);
        }
    };

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

        const timeSlot = bookingTime;
        const selectedDay = bookingDay;
        const updatedDoctor = {
            ...doctorData,
            doctors: doctorData.doctors.map((doc) => {
                if (doc.id === detailId) {
                    return {
                        ...doc,
                        availableDays: doc.availableDays.map((day) => {
                            if (day.day === selectedDay) {
                                return {
                                    ...day,
                                    times: day.times.map((timeSlotObj) => {
                                        if (timeSlotObj.timeSlot === timeSlot) {
                                            return {
                                                ...timeSlotObj,
                                                isBooked: true,
                                            };
                                        }
                                        return timeSlotObj;
                                    }),
                                };
                            }
                            return day;
                        }),
                    };
                }
                return doc;
            }),
        };



        const sendIsBooked = () => {
            axios
                .put(`https://651be95a194f77f2a5af127c.mockapi.io/Docfind/${catId}`, updatedDoctor)
        };

        sendIsBooked();

    };

    const handleBothChanges = (e) => {
        handleChange(e);
        handleDayChange(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
        resetForm();
        sendDataToAPI();
        BtnClick();

        // navigate("/");
    };

    const BtnClick = () => {
        Swal.fire({
            icon: "success",
            title: "Your Book Submitted Successfully !",
            showConfirmButton: false,
            timer: 2500,
        }).then((result) => {
            history.push('/');
        });
    }

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            bookingDay: null,
            bookingTime: null,
            date: "",
            notes: ""
        });


    };
    // const handleButtonClick = (value) => {
    //     setModalOpen(false);
    //     setMessage(value);
    // };


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
                                                    <input type="number" name="phone" onChange={handleChange} placeholder="Phone Number" required />
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
                                                    <select name="bookingDay" value={bookingDay} onChange={handleBothChanges}>
                                                        <option value={1}>Select Day</option>
                                                        {doctorAvailableDays &&
                                                            doctorAvailableDays.map((dayObject, index) => (
                                                                <option key={index} value={dayObject.day}>
                                                                    {dayObject.day}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <select name="bookingTime" value={bookingTime} onChange={handleChange}>
                                                        <option value={1}>Select Time</option>
                                                        {doctorAvailableTimes &&
                                                            doctorAvailableTimes.map((time, index) => (
                                                                <option key={index} value={time}>
                                                                    {time}
                                                                </option>
                                                            ))}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <select
                                                        className="date-input"
                                                        id="date-in"
                                                        onChange={(e) => {
                                                            setCheckIn(e.target.value);
                                                            setBookingDate(e.target.value);
                                                        }}
                                                        value={checkIn}
                                                    >
                                                        <option value="" disabled>Select Date</option>
                                                        {saturdaysInMonth.map((saturday, index) => (
                                                            <option key={index} value={saturday}>{saturday}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea name="notes" value={notes} onChange={handleChange} rows={7} placeholder="Note To The Doctor(Optional)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                <span>{checkIn && checkIn}</span>
                                            </li>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Time</span>
                                                <span>{bookingTime && bookingTime}</span>
                                            </li>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Doctor Name</span>
                                                <span>Dr. {doctorName && doctorName}</span>
                                            </li>
                                        </ul>
                                        <hr />
                                        <ul>
                                            <li className="d-flex align-items-center justify-content-between">
                                                <span>Service Price</span>
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
                                                {/* <Link to="/"> */}
                                                <button type="submit" className="sigma_btn btn-block btn-sm mt-4" style={{ fontSize: "17px", padding: "20px 70px" }}>
                                                    Confirm Booking
                                                    <i className="fal fa-arrow-right ml-3" />
                                                </button>
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
