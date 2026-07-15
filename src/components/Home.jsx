import React from 'react'
import NavigationBar from './NavigationBar'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import neonBusImg from '../assets/neon_bus.png'
import transparentBusImg from '../assets/transparent_bus.png'

const Home = () => {
  return (
    <>
      <NavigationBar/>
      <div className="container mt-4">
        <div className="row align-items-center" style={{ minHeight: '80vh' }}>
          
          <div className="col-md-6 text-center text-md-start mb-5 mb-md-0">
            <h1 className="display-4 fw-bold mb-3" style={{ background: 'linear-gradient(to right, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Travel With Comfort <br /> & Style
            </h1>
            
            <p className="lead mb-4 text-light" style={{ opacity: 0.8 }}>
              Experience the most seamless bus ticketing system. Book your seats instantly, check schedules, and manage your journeys all in one premium glassmorphic interface.
            </p>
            
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <Link to="/AddBooking" className="btn btn-primary px-4 py-2" style={{ borderRadius: '50px' }}>
                Book a Ticket
              </Link>
              <Link to="/ViewBus" className="btn glass px-4 py-2" style={{ borderRadius: '50px', color: '#fff', textDecoration: 'none' }}>
                View Buses
              </Link>
            </div>
          </div>
          
          <div className="col-md-6 text-center">
            <div className="glass p-3" style={{ borderRadius: '2rem' }}>
              <img 
                src={heroImg} 
                alt="Bus Hero" 
                className="img-fluid rounded" 
                style={{ 
                  maxHeight: '400px', 
                  objectFit: 'cover' 
                }} 
              />
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Home