import react  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import Home from './componets/Home'



function App() {

  return (
    <>
       <div>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        </Routes>
        </BrowserRouter>
       </div>
    </>
  )
}

export default App
