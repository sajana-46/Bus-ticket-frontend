import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './assets/components/Home'
import Addbus from './components/Addbus'
import Viewbus from './components/Viewbus'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
    <Routes>
    <Route path='/' element={<Addbus/>} />
    <Route path='/view' element={<Viewbus/>} />
        
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
