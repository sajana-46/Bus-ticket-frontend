import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';

const Viewbus = () => {
    const [data, changeData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Edit State
    const [editingBusId, setEditingBusId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const fetchData = () => {
        axios.post("http://localhost:3000/view-bus")
            .then((res) => {
                changeData(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this bus?")) {
            axios.post("http://localhost:3000/delete-bus", { _id: id })
                .then(() => {
                    changeData(data.filter(bus => bus._id !== id));
                })
                .catch(err => {
                    console.error("Error deleting bus:", err);
                    axios.delete(`http://localhost:3000/delete-bus/${id}`)
                        .then(() => changeData(data.filter(bus => bus._id !== id)))
                        .catch(e => console.error("Fallback delete failed:", e));
                });
        }
    };

    const handleEditClick = (bus) => {
        setEditingBusId(bus._id);
        setEditFormData({ ...bus });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        axios.post("http://localhost:3000/update-bus", editFormData)
            .then(() => {
                changeData(data.map(b => b._id === editingBusId ? editFormData : b));
                setEditingBusId(null);
            })
            .catch(err => console.error("Error updating bus:", err));
    };

    const handleCancel = () => {
        setEditingBusId(null);
    };

    const filteredData = data.filter(bus => {
        return (
            (bus.busName && bus.busName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (bus.busNumber && bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (bus.source && bus.source.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (bus.destination && bus.destination.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    return (
        <div>
            <NavigationBar />

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>View All Buses</h2>
                    <div className="w-25">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, number, source..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Source</th>
                                <th>Dest</th>
                                <th>Departs</th>
                                <th>Arrives</th>
                                <th>Seats</th>
                                <th>Available</th>
                                <th>Fare</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.length > 0 ? filteredData.map((value, index) => {
                                return (
                                    <tr key={value._id || index}>
                                        {editingBusId === value._id ? (
                                            <>
                                                <td><input type="text" name="busNumber" className="form-control form-control-sm" value={editFormData.busNumber || ''} onChange={handleEditChange} /></td>
                                                <td><input type="text" name="busName" className="form-control form-control-sm" value={editFormData.busName || ''} onChange={handleEditChange} /></td>
                                                <td>
                                                    <select name="busType" className="form-select form-select-sm" value={editFormData.busType || ''} onChange={handleEditChange}>
                                                        <option value="AC Sleeper">AC Sleeper</option>
                                                        <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                                                        <option value="AC Seater">AC Seater</option>
                                                        <option value="Non-AC Seater">Non-AC Seater</option>
                                                    </select>
                                                </td>
                                                <td><input type="text" name="source" className="form-control form-control-sm" value={editFormData.source || ''} onChange={handleEditChange} /></td>
                                                <td><input type="text" name="destination" className="form-control form-control-sm" value={editFormData.destination || ''} onChange={handleEditChange} /></td>
                                                <td><input type="text" name="departureTime" className="form-control form-control-sm" value={editFormData.departureTime || ''} onChange={handleEditChange} /></td>
                                                <td><input type="text" name="arrivalTime" className="form-control form-control-sm" value={editFormData.arrivalTime || ''} onChange={handleEditChange} /></td>
                                                <td><input type="number" name="totalSeats" className="form-control form-control-sm" value={editFormData.totalSeats || ''} onChange={handleEditChange} /></td>
                                                <td><input type="number" name="availableSeats" className="form-control form-control-sm" value={editFormData.availableSeats || ''} onChange={handleEditChange} /></td>
                                                <td><input type="number" name="fare" className="form-control form-control-sm" value={editFormData.fare || ''} onChange={handleEditChange} /></td>
                                                <td className="text-center">
                                                    <button className="btn btn-sm btn-success me-1 mb-1" onClick={handleSave}>Save</button>
                                                    <button className="btn btn-sm btn-secondary mb-1" onClick={handleCancel}>Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{value.busNumber}</td>
                                                <td>{value.busName}</td>
                                                <td>{value.busType}</td>
                                                <td>{value.source}</td>
                                                <td>{value.destination}</td>
                                                <td>{value.departureTime}</td>
                                                <td>{value.arrivalTime}</td>
                                                <td>{value.totalSeats}</td>
                                                <td>{value.availableSeats}</td>
                                                <td>${value.fare}</td>
                                                <td className="text-center">
                                                    <button className="btn btn-sm btn-outline-primary me-1 mb-1" onClick={() => handleEditClick(value)}>Edit</button>
                                                    <button className="btn btn-sm btn-outline-danger mb-1" onClick={() => handleDelete(value._id)}>Delete</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="11" className="text-center">No buses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Viewbus;