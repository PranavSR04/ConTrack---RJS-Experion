import React from 'react'
import { HeaderPropType } from './types'
import styles from "./MsaHeader.module.css";
import { CSVLink } from 'react-csv';

const MsaHeader = ({
  msaRefId,
  clientName,
  ROLE_ID,
  msaExcelData,
  msaStatus,
  navigateToEditMsa,
  navigateToRenewMsa,
  loading,
  id
}:HeaderPropType) => {
  return (
    <div className={styles.maincontainer__header}>
      <div className={styles.maincontainer__header__title}>
        <div className={styles.maincontainer__header__title__contract}>
          <h2>
            {clientName} <span>#{msaRefId}</span>
          </h2>
        </div>
        <div className={styles.maincontainer__header__subheading}>
        <div className={styles.maincontainer__header__subheading__box}>
        {loading && (
         msaStatus === 0 ? <p>INACTIVE</p> : <p>ACTIVE</p>
  )}
      </div>

        </div>
        <div className={styles.maincontainer__header__title__edit}>
          {ROLE_ID !== 3 && (
            <button
              className={styles.maincontainer__header__title__edit__button}
              onClick={() => navigateToEditMsa(id)}
            >
              Edit
            </button>
          )}
        </div>
        <div className={styles.maincontainer__header__title__renew}>
          {ROLE_ID !== 3 && (
            <button
              className={styles.maincontainer__header__title__renew__button}
              onClick={() => navigateToRenewMsa(id)}
            >
              Renew
            </button>
          )}
        </div>
        <div className={styles.maincontainer__header__title__export}>
          {msaExcelData && (
            <button
              className={styles.maincontainer__header__title__export__button}
            >
              <CSVLink
                filename={`${clientName} ${msaRefId}.xlsx`}
                data={msaExcelData}
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
}

export default MsaHeader
