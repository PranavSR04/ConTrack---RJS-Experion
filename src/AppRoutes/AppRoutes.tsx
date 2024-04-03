
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import NavBarHandler from "../Components/NavBar/NavBarHandler";
import LoginHandler from "../Features/Login/LoginHandler";
import AuthContext from "../Components/AuthContext/AuthContext";
import ContractListHandler from '../Features/Contract/ContractListing/ContractListHandler'
import IndividualContractHandler from "../Features/Contract/IndividualContract/IndividualContractHandler";
import ManageUsersHandler from '../Features/ManageUsers/ManageUsersHandler'
import MSAListHandler from "../Features/MSA/MSAList/MSAListHandler";
import MSAFormHandler from "../Features/MSA/MSAForm/MSAFormHandler";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthContext>
				<Routes>
					<Route path="/" element={<LoginHandler />}></Route>
					<Route path="/navbar" element={<NavBarHandler />}></Route>
					<Route path='/AllContracts' element={<ContractListHandler/>}></Route>
            		<Route path='/MyContracts' element={<ContractListHandler/>}></Route>
					<Route path="/AllContracts/:contract_ref_id" element={<IndividualContractHandler/>}></Route>
              		<Route path="/MyContracts/:contract_ref_id" element={<IndividualContractHandler />}></Route>
              		<Route path="/Revenue/:contract_ref_id" element={<IndividualContractHandler />}></Route>
					<Route path="/ManageUser" element={<><ManageUsersHandler/></>}></Route>
                      <Route path="/MSAList" element={<MSAListHandler/>} />
                    <Route path="/MSAForm" element={<MSAFormHandler />} />

				</Routes>
			</AuthContext>
		</BrowserRouter>
	);
};

export default AppRoutes;
