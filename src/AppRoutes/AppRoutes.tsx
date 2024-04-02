import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ManageUsersHandler from '../Features/ManageUsers/ManageUsersHandler'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/ManageUser" element={<><ManageUsersHandler/></>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
