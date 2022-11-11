import React from 'react'
import Login from './Login';
import Register from './Register';
import { Routes, Route } from 'react-router-dom';

const Pages = () => {
  return (
      <>
          <Routes>
              <Route path='/' element={ <Register />} />
              <Route path='/login' element={ <Login />} />
          </Routes>
      </>
  )
}

export default Pages