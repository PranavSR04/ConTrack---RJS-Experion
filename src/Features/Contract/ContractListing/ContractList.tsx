import { Button, ConfigProvider, Segmented, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./ContractList.module.css";
import { ContractListPropType, ContractData } from "./types";
import { LoadingOutlined } from "@ant-design/icons";
import Toast from "../../../Components/Toast/Toast";

const ContractList = ({
  columns,
  data,
  handleTableChange,
  actionClicked,
  pagination,
  loading,
  pageTitle,
  rowClassName,
  locale,
  setContractEditToast,
  setContractAddToast,
  showExpired,
  contractAddToast,
  contractEditToast,
  isMyContracts,
  handleSegmentChange,
  navigate,
  ROLE_ID,
  SCROLL
}: ContractListPropType) => {
  console.log("contract added toast",contractAddToast)
  console.log("contract edited toast",contractEditToast)
  return (
    <>
      <p className={styles["contractsHeading"]}>{pageTitle}</p>
      <div className={styles["contractsTableWrap"]}>
        <div className={styles["contractsTableWrap__buttons"]}>
          <div className={styles["contractsTableWrap__buttonExpired"]}>
            <label className={styles["contractsTableWrap__buttonSwitch"]}>
              {" "}
              Show Expired &nbsp;{" "}
            </label>
            <Switch size="small" onChange={showExpired} />
          </div>
          {ROLE_ID !== 3 && isMyContracts && (
            <div className={styles["contractsTableWrap__buttonAddedBy"]}>
              <ConfigProvider //show selection slider
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
                <div className={styles.ListMsa_Details_Table_row1_msabutton}>
                  <Segmented
                    options={["All", "Added","Associated"]}
                    defaultValue="All" 
                    size="middle"
                    onChange={(value) => {
                      handleSegmentChange(value);
                    }}
                  />
                </div>
              </ConfigProvider>
            </div>
          )}
          {ROLE_ID !== 3 && ( //show button only isnt reader
            <Button
              className={styles["contractsTableWrap__buttons__addContract"]}
              onClick={() => navigate("Add Contract")}
            >
              + Add Contract
            </Button>
          )}
        </div>
        <div >
        <Table
          columns={columns as ColumnsType<ContractData>}
          rootClassName= {styles["contractsTable"]}
          dataSource={data.map((item) => ({ ...item, key: item.id }))}
          locale={locale} //empty message
          pagination={{
            ...pagination,
            position: ["bottomCenter"],
            itemRender: (current, type, originalElement) => {
              if (type === "page") { //change color of current active page number
                return (
                  <a
                    style={{
                      background:
                        current === pagination.current ? "#DC143C" : "",
                      color: current === pagination.current ? "white" : "",
                      borderBlockColor: "#DC143C",
                      border: "none",
                    }}
                  >
                    {current}
                  </a>
                );
              }
              return originalElement;
            },
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
          rowClassName={rowClassName}
          size="small"
          scroll =  {SCROLL}
          loading={{
            indicator: (
              <div>
                <LoadingOutlined style={{ fontSize: 30 }} spin />{" "}
              </div>
            ),
            spinning: loading,
          }}
          
        ></Table> 
        </div>
        {contractAddToast && (    //show toasts if corresponding values received
          <><Toast messageType="success" message="Contract Added"></Toast></>
        )}
        
        {contractEditToast && (
          <><Toast messageType="success" message="Contract Edited"></Toast></>
        )}
      </div>
    </>
  );
};

export default ContractList;
