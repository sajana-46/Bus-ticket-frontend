import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";

const AddUser = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    address: "",
    createdAt: "",

  });

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const inputHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = () => {
    setMessage("");
    setErrorMsg("");
    
    axios
      .post("http://127.0.0.1:3000/add-user", input)
      .then((response) => {
        setMessage("User added successfully");
        setInput({
          name: "",
          email: "",
          phone: "",
          gender: "",
          age: "",
          address: "",
          createdAt: "",

        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Failed to add user. Please try again.");
        }
      });
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header">
            <h3>Add User</h3>
          </div>

          <div className="card-body">
            {message && <div className="alert alert-success">{message}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={input.name}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email <span className="text-danger">*</span></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={input.email}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={input.phone}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={input.gender}
                  onChange={inputHandler}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Age <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={input.age}
                  onChange={inputHandler}
                  min="1"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Address <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={input.address}
                  onChange={inputHandler}
                  required
                />
              </div>
              <div className="col-md-6">
              <label className="form-label">
                Created At <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="createdAt"
                value={input.createdAt}
                onChange={inputHandler}
                required
              />
            </div>

              <div className="col-12 text-center mt-3">
                <button
                  className="btn btn-primary px-5"
                  onClick={submitHandler}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
