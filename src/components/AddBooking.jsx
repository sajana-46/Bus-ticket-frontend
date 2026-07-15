import React, { useState } from 'react'
import axios from 'axios'
import NavigationBar from './NavigationBar'

function AddBooking() {
  const [userId, setUserId] = useState('')
  const [busId, setBusId] = useState('')
  const [journeyDate, setJourneyDate] = useState('')
  const [passengerName, setPassengerName] = useState('')
  const [passengerAge, setPassengerAge] = useState('')
  const [passengerGender, setPassengerGender] = useState('')
  const [seatNumber, setSeatNumber] = useState('')
  const [totalFare, setTotalFare] = useState('')
  const [bookingStatus, setBookingStatus] = useState('Confirmed')
  const [message, setMessage] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const bookingData = {
      userId: userId,
      busId: busId,
      journeyDate: journeyDate,
      passengerName: passengerName,
      passengerAge: passengerAge,
      passengerGender: passengerGender,
      seatNumber: seatNumber,
      totalFare: totalFare,
      bookingStatus: bookingStatus
    }

    axios.post('http://localhost:3000/add-booking', bookingData)
      .then((res) => {
        if (res.data.status === 'Success') {
          setMessage('Booking added successfully!')
          // Clear all fields manually
          setUserId('')
          setBusId('')
          setJourneyDate('')
          setPassengerName('')
          setPassengerAge('')
          setPassengerGender('')
          setSeatNumber('')
          setTotalFare('')
          setBookingStatus('Confirmed')
        }
      })
      .catch((err) => {
        console.log(err)
        setMessage('Error creating booking.')
      })
  }

  return (
    <div className="container mt-3" style={{ maxWidth: '450px' }}>
      <NavigationBar />
      <h2>Add New Booking</h2>
      
      {message && <p className="alert alert-info py-2">{message}</p>}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-2">
          <label>User ID</label>
          <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label>Bus ID</label>
          <input type="text" className="form-control" value={busId} onChange={(e) => setBusId(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label>Journey Date</label>
          <input type="date" className="form-control" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label>Passenger Name</label>
          <input type="text" className="form-control" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label>Passenger Age</label>
          <input type="number" className="form-control" value={passengerAge} onChange={(e) => setPassengerAge(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label>Gender</label>
          <select className="form-select" value={passengerGender} onChange={(e) => setPassengerGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Seat Number</label>
          <input type="number" className="form-control" value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label>Total Fare</label>
          <input type="number" className="form-control" value={totalFare} onChange={(e) => setTotalFare(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Booking Status</label>
          <select className="form-select" value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)}>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-5">Book Ticket</button>
      </form>
    </div>
  )
}

export default AddBooking