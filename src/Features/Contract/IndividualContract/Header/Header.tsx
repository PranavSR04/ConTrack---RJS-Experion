import React from "react";
import { HeaderPropType } from "./types";
import styles from "./Header.module.css";
import { CSVLink } from "react-csv";

const Header = ({
  clientName,
  contractRefId,
  ROLE_ID,
  contractExcelData,
  contractType,
  du,
  contractStatus,
  navigateToEditContract,
  id,
}: HeaderPropType) => {
  return (
    <div className={`${styles.maincontainer__header}`}>
      <div className={`${styles.maincontainer__header__title}`}>
        <div className={`${styles.maincontainer__header__title__contract}`}>
          <h2>
            {clientName} <span>#{contractRefId}</span>
          </h2>
        </div>
        <div className={`${styles.maincontainer__header__subheading}`}>
          <div className={`${styles.maincontainer__header__subheading__box}`}>
            <p>{du}</p>
          </div>
          <div className={`${styles.maincontainer__header__subheading__box}`}>
            <p>{contractStatus}</p>
          </div>
          <div className={`${styles.maincontainer__header__subheading__box}`}>
            <p>{contractType}</p>
          </div>
        </div>
        <div className={`${styles.maincontainer__header__title__edit}`}>
          {ROLE_ID !== 3 && (
            <button
              className={`${styles.maincontainer__header__title__edit__button}`}
              onClick={() => navigateToEditContract(id)}
            >
              Edit
            </button>
          )}
        </div>
        <div className={`${styles.maincontainer__header__title__export}`}>
          {contractExcelData && (
            <button
              className={styles.maincontainer__header__title__export__button}
            >
              <CSVLink
                filename={`${clientName} ${contractRefId}.xlsx`}
                data={contractExcelData}
                style={{ textDecoration: "none", color: "white" }}
              >
                Export
              </CSVLink>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
