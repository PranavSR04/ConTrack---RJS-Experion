import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarHandler from "../Components/NavBar/NavBarHandler";
import LoginHandler from "../Features/Login/LoginHandler";
import AuthContext from "../Components/AuthContext/AuthContext";
import ContractListHandler from '../Features/Contract/ContractListing/ContractListHandler'

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthContext>
				<Routes>
					{/* <Route path="" */}
					<Route path="/" element={<LoginHandler />}></Route>
					<Route path="/navbar" element={<NavBarHandler />}></Route>
					<Route path='/AllContracts' element={<ContractListHandler/>}></Route>
            		<Route path='/MyContracts' element={<ContractListHandler/>}></Route>
				</Routes>
			</AuthContext>
		</BrowserRouter>
	);
};

export default AppRoutes;
