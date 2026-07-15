import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ViewBookings() {
  const [bookingsList, setBookingsList] = useState([])

  useEffect(() => {
    // Calls your exact backend GET endpoint
    axios.get('http://localhost:3000/view-bookings')
      .then((res) => {
        setBookingsList(res.data)
      })
      .catch((err) => {
        console.log("Error fetching data:", err)
      })
  }, [])

  return (
    <div className="container mt-4">
      <h2>All Bus Bookings</h2>

      {bookingsList.length === 0 ? (
        <p>No bookings found in the system database.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
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
              </tr>
            </thead>
            <tbody>
              {bookingsList.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.userId}</td>
                  <td>{booking.busId}</td>
                  <td>{booking.passengerName}</td>
                  <td>{booking.passengerAge}</td>
                  <td>{booking.passengerGender}</td>
                  <td>{booking.journeyDate}</td>
                  <td>{booking.seatNumber}</td>
                  <td>${booking.totalFare}</td>
                  <td>{booking.bookingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ViewBookings