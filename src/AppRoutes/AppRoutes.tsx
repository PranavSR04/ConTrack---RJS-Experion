
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
// import AddContractHandler from "../Features/AddContract/AddContractHandler";
import NavContext from "../Components/NavContext/NavContext";
// import EditContractHandler from "../Features/AddContract/EditContractHandler";
import ContractFormHandler from "../Features/Contract/ContractForm/ContractFormHandler";
import IndividualMsaHandler from "../Features/MSA/IndividualMSA/IndividualMSAHandler";
import IndividualMSA from "../Features/MSA/IndividualMSA/IndividualMSA";
import AddContractHandler from "../Features/Contract/AddContract/AddContractHandler";
import EditContractHandler from "../Features/Contract/EditContract/EditContractHandler";
import AddMSAHandler from "../Features/MSA/AddMSA/AddMSAHandler";
import EditMSAHandler from "../Features/MSA/EditMSA/EditMSAHandler";
import RenewMSAHandler from "../Features/MSA/RenewMSA/RenewMsaHandler";
import EditMsaHandler from "../Features/MSAOld/EditMsa/EditMsaHandler";
import MSAFormHandler from "../Features/MSA/MSAForm/MSAFormHandler";
 
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthContext> 
             <NavContext> 
                <Routes>
                    <Route path="/" element={<LoginHandler />}></Route>
                    <Route path="/navbar" element={<><NavBarHandler /><SideBar /></>}></Route>
                    <Route path='/AllContracts' element={<><NavBarHandler /><SideBar><ContractListHandler /></SideBar></>}></Route>
                    <Route path='/MyContracts' element={<><NavBarHandler /><SideBar><ContractListHandler /></SideBar></>}></Route>
                    
                    
                    <Route path="/Revenue" element={<><NavBarHandler /><SideBar><RevenueProjectionHandler /></SideBar></>}></Route>
                    
                    <Route path="/AllContracts/Edit Contract" element={<><NavBarHandler /><SideBar><EditContractHandler /></SideBar></>}></Route>

                    <Route path="/AllContracts/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/AllContracts/Add Contract" element={<><NavBarHandler /><SideBar><AddContractHandler /></SideBar></>}/>
                    <Route path="/MyContracts/Add Contract" element={<><NavBarHandler /><SideBar><AddContractHandler /></SideBar></>}/>
                    <Route path="/MyContracts/Edit Contract" element={<><NavBarHandler /><SideBar><EditContractHandler /></SideBar></>}/>
                    <Route path="/MyContracts/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/Revenue/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path='/MSAOverview/:msa_ref_id' element={<><NavBarHandler/><SideBar><IndividualMsaHandler/></SideBar></>}/>

                    <Route path="/Dashboard/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/MSAOverview/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/ManageUser/:contract_ref_id" element={<><NavBarHandler /><SideBar><IndividualContractHandler/></SideBar></>}></Route>
                    <Route path="/ManageUser" element={<><NavBarHandler /><SideBar><ManageUsersHandler/></SideBar></>}></Route>
                    <Route path="/MSAOverview" element={<><NavBarHandler /><SideBar><MSAListHandler/></SideBar></>} />
                    {/* <Route path='MSAForm' element={<><NavBarHandler/><SideBar><MSAFormHandler/></SideBar></>}/> */}
                    <Route path='/MSAOverview/AddMSA' element={<><NavBarHandler/><SideBar><AddMSAHandler/></SideBar></>}/>
                    {/* <Route path='/MSA/EditMSA/:msa_ref_id' element={<><NavBarHandler/><SideBar><EditMSAHandler/></SideBar></>}/> */}
                    {/* <Route path="/MSA/RenewMSA/:msa_ref_id" element={<><NavBarHandler /><SideBar><RenewMSAHandler/></SideBar></>} /> */}
                    {/* <Route path="/contract/edit" element={<><NavBarHandler /><SideBar><EditContractHandler /></SideBar></>} /> */}
                    {/* <Route path="/msa/msaDetails" element={<><NavBarHandler /><SideBar><IndividualMsaHandler /></SideBar></>} /> */}
                    <Route path="/Dashboard" element={<><NavBarHandler /><SideBar><Dashboard /></SideBar></>}></Route>
                    <Route path="/:msa_ref_id" element={<><NavBarHandler /><SideBar><IndividualMsaHandler/></SideBar></>}></Route>
                    <Route path='/MSAOverview/EditMSA' element={<><NavBarHandler/><SideBar><EditMSAHandler/></SideBar></>}/>
                    <Route path="/MSAOverview/RenewMSA" element={<><NavBarHandler /><SideBar><RenewMSAHandler/></SideBar></>} />
                    {/* <Route path="/MSAOverview/RenewMSA" element={<><NavBarHandler /><SideBar><RenewMSAHandler/></SideBar></>} /> */}
                    <Route path='/MSAOverview/:msa_ref_id/EditMSA' element={<><NavBarHandler/><SideBar><EditMSAHandler/></SideBar></>}/>

                </Routes>
            </NavContext>

             </AuthContext>
        </BrowserRouter>
    );
};
 
export default AppRoutes;