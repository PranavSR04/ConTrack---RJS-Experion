import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import NavBarHandler from "../Components/NavBar/NavBarHandler";
import LoginHandler from "../Features/Login/LoginHandler";
import AuthContext from "../Components/AuthContext/AuthContext";
import ContractListHandler from "../Features/Contract/ContractListing/ContractListHandler";
import RevenueProjectionHandler from "../Features/RevenueProjection/RevenueProjectionHandler";
import IndividualContractHandler from "../Features/Contract/IndividualContract/IndividualContractHandler";
import AddContractHandler from "../Features/AddContract/AddContractHandler";
import SideBar from "../Components/SideBar/SideBar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path="/" element={<LoginHandler />}></Route>
          <Route
            path="/navbar"
            element={
              <>
                <NavBarHandler />
                <SideBar />
              </>
            }
          ></Route>
          <Route
            path="/AllContracts"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <ContractListHandler />
                </SideBar>
              </>
            }
          ></Route>
          <Route
            path="/MyContracts"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <ContractListHandler />
                </SideBar>
              </>
            }
          ></Route>
          <Route
            path="/Revenue"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <RevenueProjectionHandler />
                </SideBar>
              </>
            }
          ></Route>
          <Route
            path="/AllContracts/:contract_ref_id"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <IndividualContractHandler />
                </SideBar>
              </>
            }
          ></Route>
          <Route
            path="/AllContracts/Add Contract"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <AddContractHandler />
                </SideBar>
              </>
            }
          />
          <Route
            path="/MyContracts/:contract_ref_id"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <IndividualContractHandler />
                </SideBar>
              </>
            }
          ></Route>
          <Route
            path="/Revenue/:contract_ref_id"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <IndividualContractHandler />
                </SideBar>
              </>
            }
          ></Route>
          <Route
            path="/ManageUser"
            element={
              <>
                <NavBarHandler />
                <SideBar>
                  <ManageUsersHandler />
                </SideBar>
              </>
            }
          ></Route>
          <Route path="/MSAOverview" element={<MSAListHandler />} />
          <Route path="/MSAForm" element={<MSAFormHandler />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
};

export default AppRoutes;
