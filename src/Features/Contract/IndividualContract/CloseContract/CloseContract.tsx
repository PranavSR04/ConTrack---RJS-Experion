import { Button } from "antd";
import React from "react";
import CloseContractModal from "./CloseContractModal";
import styles from './CloseContract.module.css'
import { CloseContractPropType } from "./types";

const CloseContract = ({
    visible,
    onCancel,
    closeContract,
    modalPopUp,
    contractStatus}: CloseContractPropType) => {
      // Getting the ROLE_ID to check if close contract button needs to be shown to readers
      const ROLE_ID=parseInt(localStorage.getItem('role_id') || '0', 10);
  return (
    <>
      <div className={`${styles.maincontainer__documents__buttons}`}>
        {contractStatus !== "Closed" && ROLE_ID!==3 && (
          <Button
            type="primary"
            style={{
              marginBottom: "2rem",
              backgroundColor: "red",
              marginLeft: "auto",
              marginRight: "4rem",
              fontSize:"small"
            }}
            onClick={modalPopUp}
          >
            Close Contract
          </Button>
        )}
      </div>
      <CloseContractModal
        visible={visible}
        closeContract={closeContract}
        onCancel={onCancel}
      />
    </>
  );
};

export default CloseContract;
