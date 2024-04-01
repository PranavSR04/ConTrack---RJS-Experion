import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ContractListHandler from '../Features/Contract/ContractListing/ContractListHandler'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<></>}></Route>
            <Route path='/AllContracts' element={<ContractListHandler/>}></Route>
            <Route path='/MyContracts' element={<ContractListHandler/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
