import React from "react";
import styles from "./IndividualContract.module.css";
import { IndividualContractPropType } from "./types";
import HeaderHandler from "./Header/HeaderHandler";
import OverviewHandler from "./Overview/OverviewHandler";
// import RevenueProjectionHandler from "../RevenueProjection/RevenueProjectionHandler";
import MilestonesHandler from "./Milestones/MilestonesHandler";
import DocumentsUsersCommentsHandler from "./DocumentsUsersComments/DocumentsUsersCommentsHandler";
import CloseContractHandler from "./CloseContract/CloseContractHandler";

const IndividualContract = ({
  responses,
  id,
  loading,
}: IndividualContractPropType) => {
  let revenueid = parseInt(id);
  return (
    <div className={`col-12 ${styles.maincontainer}`}>
      <HeaderHandler responses={responses} id={id} />
      <OverviewHandler responses={responses} loading={loading} />
      <div
        style={{
          border: "solid 1px #ffffff",
          width: "66%",
          height: "24rem",
          marginTop: "1rem",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.253)",
          borderRadius: "10px",
        }}
      >
        <div className={styles.maincontainer__chart}>
          {/* <RevenueProjectionHandler id={revenueid} /> */}
        </div>
      </div>
      <div className={`${styles.maincontainer__milestones}`}>
        <MilestonesHandler responses={responses} loading={loading} />
      </div>
      <DocumentsUsersCommentsHandler responses={responses} loading={loading} />
      <CloseContractHandler responses={responses} id={id} />
    </div>
  );
};

export default IndividualContract;
