import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './assets/components/Home'
import Addbus from './components/Addbus'
import Viewbus from './components/Viewbus'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Home/>
    <Addbus/>
    <Viewbus/>
      
    </>
  )
}

export default App
