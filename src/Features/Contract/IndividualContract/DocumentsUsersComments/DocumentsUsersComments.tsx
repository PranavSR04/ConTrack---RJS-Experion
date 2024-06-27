import { Card } from "antd";
import React from "react";
import styles from "./DocumentsUsersComments.module.css";
import { AssociatedGroupsType, AssociatedUsersType, DocumentsUsersCommentsPropType } from "./types";
import { FilePdfFilled } from "@ant-design/icons";

const DocumentsUsersComments = ({
  loading,
  contractDocuments,
  contractRefId,
  clientName,
  addendums,
  comments,
  associatedUsers,
  associatedGroups,
}: DocumentsUsersCommentsPropType) => {
  return (
    <>
      <div className={`${styles.maincontainer__docusercomm}`}>
        <Card
          className={`${styles.maincontainer__docusercomm__overview}`}
          loading={loading}
        >
          <div className={`${styles.maincontainer__docusercomm__title}`}>
            <h4>Documents</h4>
          </div>
          <div className={`${styles.maincontainer__docusercomm__body}`}>
            <div
              className={`${styles.maincontainer__docusercomm__body__contract}`}
            >
              <FilePdfFilled style={{ fontSize: "1rem", color: "#dc143c" }} />
              <a href={contractDocuments} target="_blank">
                {contractRefId} {clientName} Contract
              </a>
            </div>
            {addendums?.map((addendum, index) => (
              <div
                key={addendum.id}
                className={styles.maincontainer__docusercomm__body__contract}
              >
                <FilePdfFilled style={{ fontSize: "1rem", color: "#dc143c" }} />
                <a
                  className={styles.addendumLink}
                  href={addendum.addendum_doclink || "#"}
                  target="_blank"
                >
                  Addendum {index + 1}
                </a>
              </div>
            ))}
          </div>
        </Card>
        <Card
          className={`${styles.maincontainer__docusercomm__payment}`}
          loading={loading}
        >
          <div className={`${styles.maincontainer__docusercomm__title}`}>
            <h4>Associated Users</h4>
          </div>
          <div className={`${styles.maincontainer__docusercomm__list}`}>
            <div
              className={`${styles.maincontainer__membercomments__members__body__wrapper}`}
            >
              {associatedUsers?.map((user: AssociatedUsersType, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.maincontainer__membercomments__members__body__wrapper__data}`}
                  >
                    <p>{user.user_name}</p>
                  </div>
                );
              })}
              {associatedGroups.map((group: AssociatedGroupsType, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.maincontainer__membercomments__members__body__wrapper__data__groups}`}
                  >
                    <p>{group.group_name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
        <Card
          className={`${styles.maincontainer__docusercomm__payment}`}
          loading={loading}
        >
          <div className={`${styles.maincontainer__docusercomm__title}`}>
            <h4>Comments</h4>
          </div>
          <div className={`${styles.maincontainer__docusercomm__list}`}>
            {comments}
          </div>
        </Card>
      </div>
    </>
  );
};

export default DocumentsUsersComments;
