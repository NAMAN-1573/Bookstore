import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import Showbook from './pages/Showbook'
import Deletebook from './pages/Deletebook'
import Addbook from './pages/Addbook'
import Editbook from './Editbook'


const App = () => {
  return (
    <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/book/edit/:id" element={<Editbook/>}/>
    <Route path="/book/:id" element={<Showbook/>}/>
    <Route path="/book/delete/:id" element={<Deletebook/>}/>
    <Route path="/book/create" element={<Addbook/>}/>
   </Routes>
    </>
  )
}

export default App