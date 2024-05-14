import React from "react";
import styles from "./IndividualContract.module.css";
import { IndividualContractPropType } from "./types";
import HeaderHandler from "./Header/HeaderHandler";
import OverviewHandler from "./Overview/OverviewHandler";
import MilestonesHandler from "./Milestones/MilestonesHandler";
import DocumentsUsersCommentsHandler from "./DocumentsUsersComments/DocumentsUsersCommentsHandler";
import CloseContractHandler from "./CloseContract/CloseContractHandler";
import RevenueProjectionHandler from "../../RevenueProjection/RevenueProjectionHandler";

const IndividualContract = ({
  responses,
  id,
  loading,
}: IndividualContractPropType) => {
  let revenueid = parseInt(id);
  return (
    <div className={`${styles.maincontainer}`}>
      <HeaderHandler responses={responses} id={id} />
      <OverviewHandler responses={responses} loading={loading} />
      <div className={`${styles.maincontainer__milestones}`}>
        <MilestonesHandler responses={responses} loading={loading} />
      </div>
      <div className={`${styles.maincontainer__revenue}`}>
        <div className={styles.maincontainer__chart}>
          <RevenueProjectionHandler id={revenueid} />
        </div>
      </div>
      
      <DocumentsUsersCommentsHandler responses={responses} loading={loading} />
      <CloseContractHandler responses={responses} id={id} />
    </div>
  );
};

export default IndividualContract;
