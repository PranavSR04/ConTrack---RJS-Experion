import React, { useContext, useEffect, useState } from "react";
import { NotificationProps, NotificationType } from "./types";
import styles from "./Notification.module.css";
  const Notification = ({notification,difference,actionStyle,cardStyle ,stylenames,ItemClickHandler}: NotificationProps) => 
  {

      return (
        <div className={styles[stylenames]} onClick={() => ItemClickHandler(notification)}>
          <div className={styles[actionStyle]}>
            <p>
              {notification.action.toUpperCase()}
            </p>
          </div>
          <div className={styles[cardStyle]}>
            <b>
              {notification.contract_ref_id ? `${notification.contract_ref_id}: Contract ${notification.action} for ${notification.client_name}`
                : `${notification.msa_ref_id}: Msa ${notification.action} for ${notification.client_name}`}
            </b>
          </div>
          <div className={styles.difference}>
            <p>
              <b>{difference}</b>
            </p>
          </div>
        </div>
      );
  };
  
export default Notification;
