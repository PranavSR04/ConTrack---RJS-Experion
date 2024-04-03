import React from 'react'
import { BrowserRouter,Routes,Route, Router } from 'react-router-dom'
import MSAForm from '../Features/MSA/MSAForm/MSAForm'
import MSAFormHandler from '../Features/MSA/MSAForm/MSAFormHandler'
import MSAListHandler from '../Features/MSA/MSAList/MSAListHandler'
const AppRoutes = () => {
  return (
<BrowserRouter>
<Routes>
        <Route path="/" element={<></>} />
        <Route path="/MSAList" element={<MSAListHandler />} />
        <Route path="/MSAForm" element={<MSAFormHandler />} />
</Routes>
</BrowserRouter>
          )
}

export default AppRoutes
