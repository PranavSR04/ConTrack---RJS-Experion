
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarHandler from "../Components/NavBar/NavBarHandler";
import LoginHandler from "../Features/Login/LoginHandler";
import AuthContext from "../Components/AuthContext/AuthContext";
import ContractListHandler from '../Features/Contract/ContractListing/ContractListHandler'
import RevenueProjectionHandler from "../Features/RevenueProjection/RevenueProjectionHandler";
import IndividualContractHandler from "../Features/Contract/IndividualContract/IndividualContractHandler";
import SideBar from "../Components/SideBar/SideBar";
import ManageUsersHandler from '../Features/ManageUsers/ManageUsersHandler'
import Dashboard from "../Features/Dashboard/Dashboard";
import MSAListHandler from "../Features/MSA/MSAList/MSAListHandler";
import MSAFormHandler from "../Features/MSA/MSAForm/MSAFormHandler";
import AddContractHandler from "../Features/AddContract/AddContractHandler";
import AddMsaHandler from "../Features/MSAOld/AddMsa/AddMsaHandler";
import EditMsaHandler from "../Features/MSAOld/EditMsa/EditMsaHandler";
import RenewMsaHandler from "../Features/MSAOld/RenewMsa/RenewMsaHandler";
import NavContext from "../Components/NavContext/NavContext";
 


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthContext>
             <NavContext>

                <Routes>
                    <Route path="/" element={<LoginHandler />}></Route>
                    <Route path="/navbar" element={<><NavBarHandler /><SideBar/></>}></Route>
                    <Route path='/AllContracts' element={<><NavBarHandler /><SideBar><ContractListHandler/></SideBar></>}></Route>
                    <Route path='/MyContracts' element={<><NavBarHandler /><SideBar><ContractListHandler/></SideBar></>}></Route>
                    <Route path="/Revenue" element={<><NavBarHandler /><SideBar><RevenueProjectionHandler /></SideBar></>}></Route>
                    <Route path="/AllContracts/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/AllContracts/Add Contract" element={<><NavBarHandler /><SideBar><AddContractHandler /></SideBar></>}/>
                    <Route path="/MyContracts/Add Contract" element={<><NavBarHandler /><SideBar><AddContractHandler /></SideBar></>}/>
                    <Route path="/MyContracts/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/Revenue/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/Dashboard/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/MSAOverview/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/MyContracts/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/AllContracts/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/Revenue/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/ManageUser/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/ManageUser" element={<><NavBarHandler /><SideBar><ManageUsersHandler/></SideBar></>}></Route>
                    <Route path="/MSAOverview" element={<><NavBarHandler /><SideBar><MSAListHandler/></SideBar></>} />
                    <Route path='MSAForm' element={<><NavBarHandler/><SideBar><MSAFormHandler/></SideBar></>}/>
                    {/* <Route path="/MSAForm" element={<><NavBarHandler /><SideBar><AddMsaHandler /></SideBar></>} />
                    <Route path="/msa/edit" element={<><NavBarHandler /><SideBar><EditMsaHandler /></SideBar></>} />
                    <Route path="/msa/renew" element={<><NavBarHandler /><SideBar><RenewMsaHandler /></SideBar></>} /> */}



					<Route path="/Dashboard" element={<><NavBarHandler /><SideBar><Dashboard/></SideBar></>}></Route>
			
                </Routes>
             </NavContext>

            </AuthContext>
        </BrowserRouter>
    );
};
 
export default AppRoutes;