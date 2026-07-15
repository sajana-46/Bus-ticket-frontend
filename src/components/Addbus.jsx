import React, { useState } from 'react'

import axios from 'axios'
import NavigationBar from './NavigationBar';

const Addbus = () => {
    const [input, changeInput] = useState(
        {
             busNumber: "",
    busName: "",
    busType: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    availableSeats: "",
    fare: ""
        }
    )

    
    const inputHandler = (event) => {
        changeInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const readValue = () => {
        console.log(input);

        axios.post("http://localhost:3000/add-bus", input)
            .then((response) => {
                console.log(response.data);
                alert("Bus added successfully");
            })
            .catch((error) => {
                console.error("Error adding bus", error);
            });
    };
    return (
        <div>
            <NavigationBar/>
            
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <h2 className="text-center">Add Bus</h2>

                        <div className="row g-3">
                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">

                                
    <label className="form-label">Bus Number:</label>
    <input
        type="text"
        className="form-control"
        name="busNumber"
        value={input.busNumber}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Bus Name:</label>
    <input
        type="text"
        className="form-control"
        name="busName"
        value={input.busName}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Bus Type:</label>
    <select
        className="form-control"
        name="busType"
        value={input.busType}
        onChange={inputHandler}
    >
        <option value="">Select Bus Type</option>
        <option value="AC Sleeper">AC Sleeper</option>
        <option value="Non-AC Sleeper">Non-AC Sleeper</option>
        <option value="AC Seater">AC Seater</option>
        <option value="Non-AC Seater">Non-AC Seater</option>
    </select>
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Source:</label>
    <input
        type="text"
        className="form-control"
        name="source"
        value={input.source}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Destination:</label>
    <input
        type="text"
        className="form-control"
        name="destination"
        value={input.destination}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Departure Time:</label>
    <input
        type="text"
        className="form-control"
        name="departureTime"
        placeholder="08:00 PM"
        value={input.departureTime}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Arrival Time:</label>
    <input
        type="text"
        className="form-control"
        name="arrivalTime"
        placeholder="06:00 AM"
        value={input.arrivalTime}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Total Seats:</label>
    <input
        type="number"
        className="form-control"
        name="totalSeats"
        value={input.totalSeats}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Available Seats:</label>
    <input
        type="number"
        className="form-control"
        name="availableSeats"
        value={input.availableSeats}
        onChange={inputHandler}
    />
</div>

<div className="col col-12 col-sm-6 col-md-4">
    <label className="form-label">Fare:</label>
    <input
        type="number"
        className="form-control"
        name="fare"
        value={input.fare}
        onChange={inputHandler}
    />
</div>
                            <div className="col col-12">
                                <button className="btn btn-success" onClick={readValue}>Add Bus</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Addbus