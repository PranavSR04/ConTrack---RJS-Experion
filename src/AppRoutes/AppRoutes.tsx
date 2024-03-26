import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<></>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
