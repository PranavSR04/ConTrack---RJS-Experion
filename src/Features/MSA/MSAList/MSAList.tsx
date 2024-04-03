import { ConfigProvider, Segmented, Table } from "antd";
import styles from './MSAList.module.css'
import { MsaListDataType } from "./types";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { NavContexts } from "../../../Components/NavContext/NavContext";
const MSAList = (
    {
        columns,
        data,
        pagination,
        handleTableChange,
        msaAdded,
        edited,
        rowClassName,
        loading,
        renew,
        handleSegmentChange,
        handleAddMSA,
        
    }:MsaListDataType
) => {
    const scroll={x:'auto'};
    const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10);
    const [showAddedToast, setShowAddedToast] = useState(false);
    const [showEditedToast, setShowEditedToast] = useState(false);
    const [showRenewToast, setShowRenewToast] = useState(false);
    const{setAdded,setEdited,setRenew}=useContext(NavContexts);
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
    <div className={styles.MSAList}>
      <h3 className={styles.MSAList__heading}>MASTER SERVICE AGREEMENT</h3>
      <div className={styles.MSAList__Table}>
        <div className={styles.MSAList__Table__row1}>
        <div className={styles.MSAList__Table__row1__col1__Toggle}>
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
                    className='MSAList_Table_segment'
                    options={["Active", "Inactive"]}
                    defaultValue="Active"
                    size="middle"
                    onChange={(value) => {
                      handleSegmentChange(value);
                    }}
                  />
                </ConfigProvider>
        </div>
        <div className={styles.MSAList__Table__row1__col2__Addbutton}>
        {ROLE_ID !== 3 && (
        <button
                    className={styles.MSAList__Table__Addbutton}
                   onClick={handleAddMSA}
                  >
                    + Add MSA
                  </button>
        )}
        </div>
      </div>
      <div className={styles.MSAList__Table__Table}>
      <Table
      locale={{ emptyText: " " }}
      size="small"
      columns={columns}
      dataSource={data}
      scroll={scroll}
      className={styles.ListMsa__Details__Table__table}
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
            rowClassName={rowClassName}
            loading={{
              indicator: (
                <div>
                  <LoadingOutlined style={{ fontSize: 30 }} spin />{" "}
                </div>
              ),
              spinning: loading,
            }}
      >

      </Table>
      
      {/* {msaAdded ? (
            <Toast
              messageType="success"
              message="MSA Added Successfully"
            ></Toast>):<></>} */}
      </div>
      </div>
    </div>
    </>
  )
}

export default MSAList
