import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';

function ViewBookings() {
  const [bookingsList, setBookingsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Edit State
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    // Calls your exact backend GET endpoint
    axios.get('http://localhost:3000/view-bookings')
      .then((res) => {
        setBookingsList(res.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios.post('http://localhost:3000/delete-booking', { _id: id })
        .then(() => {
          setBookingsList(bookingsList.filter(booking => booking._id !== id));
        })
        .catch(err => {
          console.error("Error deleting booking:", err);
          axios.delete(`http://localhost:3000/delete-booking/${id}`)
            .then(() => setBookingsList(bookingsList.filter(b => b._id !== id)))
            .catch(e => console.error("Fallback delete failed:", e));
        });
    }
  };

  const handleEditClick = (booking) => {
    setEditingBookingId(booking._id);
    setEditFormData({ ...booking });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    axios.post('http://localhost:3000/update-booking', editFormData)
      .then(() => {
        setBookingsList(bookingsList.map(b => b._id === editingBookingId ? editFormData : b));
        setEditingBookingId(null);
      })
      .catch(err => console.error("Error updating booking:", err));
  };

  const handleCancel = () => {
    setEditingBookingId(null);
  };

  const filteredBookings = bookingsList.filter(booking => {
    return (
      (booking.passengerName && booking.passengerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (booking.userId && booking.userId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (booking.busId && booking.busId.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      <NavigationBar />
      <div className="container mt-4">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>All Bus Bookings</h2>
          <div className="w-25">
            <input
              type="text"
              className="form-control"
              placeholder="Search by passenger, user ID, or bus ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>User ID</th>
                  <th>Bus ID</th>
                  <th>Passenger Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Journey Date</th>
                  <th>Seat No</th>
                  <th>Fare</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    {editingBookingId === booking._id ? (
                      <>
                        <td><input type="text" name="userId" className="form-control form-control-sm" value={editFormData.userId || ''} onChange={handleEditChange} /></td>
                        <td><input type="text" name="busId" className="form-control form-control-sm" value={editFormData.busId || ''} onChange={handleEditChange} /></td>
                        <td><input type="text" name="passengerName" className="form-control form-control-sm" value={editFormData.passengerName || ''} onChange={handleEditChange} /></td>
                        <td><input type="number" name="passengerAge" className="form-control form-control-sm" value={editFormData.passengerAge || ''} onChange={handleEditChange} /></td>
                        <td>
                          <select name="passengerGender" className="form-select form-select-sm" value={editFormData.passengerGender || ''} onChange={handleEditChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>
                        <td><input type="date" name="journeyDate" className="form-control form-control-sm" value={editFormData.journeyDate || ''} onChange={handleEditChange} /></td>
                        <td><input type="number" name="seatNumber" className="form-control form-control-sm" value={editFormData.seatNumber || ''} onChange={handleEditChange} /></td>
                        <td><input type="number" name="totalFare" className="form-control form-control-sm" value={editFormData.totalFare || ''} onChange={handleEditChange} /></td>
                        <td>
                          <select name="bookingStatus" className="form-select form-select-sm" value={editFormData.bookingStatus || ''} onChange={handleEditChange}>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-success me-1 mb-1" onClick={handleSave}>Save</button>
                          <button className="btn btn-sm btn-secondary mb-1" onClick={handleCancel}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{booking.userId}</td>
                        <td>{booking.busId}</td>
                        <td>{booking.passengerName}</td>
                        <td>{booking.passengerAge}</td>
                        <td>{booking.passengerGender}</td>
                        <td>{booking.journeyDate}</td>
                        <td>{booking.seatNumber}</td>
                        <td>${booking.totalFare}</td>
                        <td>{booking.bookingStatus}</td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary me-1 mb-1" onClick={() => handleEditClick(booking)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger mb-1" onClick={() => handleDelete(booking._id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewBookings;