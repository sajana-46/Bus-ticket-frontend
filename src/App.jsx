import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './assets/components/Home'
import Addbus from './components/Addbus'
import Viewbus from './components/Viewbus'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewUser from './components/ViewUser'
import AddUser from './components/AddUser'
import AddBooking from './components/AddBooking'
import ViewBookings from './components/ViewBooking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/ViewBus' element={<Viewbus/>} />
    <Route path='/AddUser' element={<AddUser/>} />   
    <Route path='/ViewUser' element={<ViewUser/>} /> 
    <Route path='/AddBooking' element={<AddBooking/>} />   
    <Route path='/ViewBooking' element={<ViewBookings/>} />   
    <Route path='/AddBus' element={<Addbus/>} />        
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
