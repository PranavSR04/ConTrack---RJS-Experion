import React, { useContext, useEffect, useState } from "react";
import styles from "./ListMsa.module.css";
import { ConfigProvider, Segmented, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { MsaListDataType } from "./types";
import { useNavigate } from "react-router";
import Toast from "../../../Components/Toast/Toast";
import { NavContexts } from "../../../Components/NavContext/NavContext";
const ListMsa = ({
  columns,
  data,
  pagination,
  handleTableChange,
  msaAdded,
  showInactiveMSA,
  fetchData,
  edited,
  rowClassName,
  loading,
  renew,
}: MsaListDataType) => {
  const navigate = useNavigate();
  const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10);

  const [activeTab, setActiveTab] = useState("Active");
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [showEditedToast, setShowEditedToast] = useState(false);
  const [showRenewToast, setShowRenewToast] = useState(false);
  const{setAdded,setEdited,setRenew}=useContext(NavContexts);
  const handleSegmentChange = (value: string) => {
    setActiveTab(value);
    if (value === "Active") {
      fetchData();
    } else if (value === "Inactive") {
      showInactiveMSA();
    }
  };
  useEffect(() => {
    if (msaAdded && !showAddedToast) {
      setShowAddedToast(true);
      setAdded(false);
    }
  }, [msaAdded, showAddedToast, setAdded]);

  useEffect(() => {
    if (edited && !showEditedToast) {
      setShowEditedToast(true);
      setEdited(false);
    }
  }, [edited, showEditedToast, setEdited]);

  useEffect(() => {
    if (renew && !showRenewToast) {
      setShowRenewToast(true);
      setRenew(false);
    }
  }, [renew, showRenewToast, setRenew]);
  return (
    <>
      <div className={styles.ListMsa}>
        {/* <BreadCrumbs style={{ marginTop: "1rem" }} /> */}
        <h3 className={styles.ListMsa_heading}>MASTER SERVICE AGREEMENT</h3>
        {/* <div className={styles.ListMsa_Details}> */}
        <div className={styles.ListMsa_Details_Table}>
          <div className={styles.ListMsa_Details_Table_row1}>
            <div className={styles.ListMsa_Details_Table_row1_col2}>
              <div className={styles.ListMsa_Details_segment_button}>
                <ConfigProvider
                  theme={{
                    token: {
                      borderRadius: 20,
                    },
                    components: {
                      Segmented: {
                        itemSelectedBg: "#DC143C",
                        itemSelectedColor: "#FFF",
                      },
                    },
                  }}
                >
                  <Segmented
                    className={styles.ListMsa_Details_segment}
                    options={["Active", "Inactive"]}
                    defaultValue="Active"
                    size="middle"
                    onChange={(value) => {
                      handleSegmentChange(value);
                    }}
                  />
                </ConfigProvider>
              </div>
              <div className={styles.ListMsa_Details_Table_row1_msabutton}>
                {ROLE_ID !== 3 && (
                  <button
                    className={styles.ListMsa_Details_Table_row1_col2_button}
                    onClick={() => navigate("/MSAOverview/Add MSA")}
                  >
                    + Add MSA
                  </button>
                )}
              </div>
            </div>
          </div>
          <Table
            locale={{ emptyText: " " }}
            columns={columns}
            dataSource={data}
            className={styles.ListMsa_Details_Table_table}
            pagination={{
              ...pagination,
              position: ["bottomCenter"],
              showSizeChanger: false,
              itemRender: (
                current:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined,
                type: string,
                originalElement: any
              ) => {
                if (type === "page") {
                  return (
                    <a
                      style={{
                        background:
                          current === pagination.current ? "#DC143C" : "",
                        color: current === pagination.current ? "white" : "",
                        borderBlockColor: "#DC143C",
                        border: "none",
                        textDecoration: "none",
                      }}
                    >
                      {current}
                    </a>
                  );
                }
                return originalElement;
              },
            }}
            onChange={handleTableChange}
            size="small"
            rowClassName={rowClassName}
            loading={{
              indicator: (
                <div>
                  <LoadingOutlined style={{ fontSize: 30 }} spin />{" "}
                </div>
              ),
              spinning: loading,
            }}
          ></Table>
          {showAddedToast ? (
            <Toast
              messageType="success"
              message="MSA Added Successfully"
            ></Toast>
          ) : showEditedToast ? (
            <Toast
              messageType="success"
              message="MSA Edited Successfully"
            ></Toast>
          ) : (
            <></>
          )}
          {showRenewToast ? (
            <Toast
              messageType="success"
              message="MSA Renewed Successfully"
            ></Toast>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default ListMsa;