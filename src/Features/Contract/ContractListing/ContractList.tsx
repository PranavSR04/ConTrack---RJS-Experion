import { Button, ConfigProvider, Segmented, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./contractsList.module.css";
import { AllContractsPropType, ContractData } from "./types";
import { useNavigate } from "react-router";
import { LoadingOutlined } from "@ant-design/icons";
import Toast from "../../Components/Toast/Toast";

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
  showExpired,
  contractAddToast,
  contractEditToast,
  isMyContracts,
  handleSegmentChange
}: AllContractsPropType) => {
  const navigate = useNavigate();
  const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10); //get loged in users role

  return (
    <>
      <h3 className={styles["contracts-h1"]}>{pageTitle}</h3>
      <div className={styles["contracts-table"]}>
        <div className={styles["contracts-buttons"]}>
          <div className={styles["contracts-buttons-expired"]}>
            <label className={styles["contracts-button-switch"]}>
              {" "}
              Show Expired &nbsp;{" "}
            </label>
            <Switch size="small" onChange={showExpired} />
          </div>
          {ROLE_ID !== 3 && isMyContracts && (
            <div className={styles["contracts-buttons-addedBy"]}>
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
              className={styles["contracts-addContract"]}
              onClick={() => navigate("Add Contract")}
            >
              + Add Contract
            </Button>
          )}
        </div>
        <Table
          className={styles["contracts-tableHead"]}
          columns={columns as ColumnsType<ContractData>}
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
          loading={{
            indicator: (
              <div>
                <LoadingOutlined style={{ fontSize: 30 }} spin />{" "}
              </div>
            ),
            spinning: loading,
          }}
        ></Table> 
        {contractAddToast && (    //show toasts if corresponding values received
          <Toast messageType="success" message="Contract Added"></Toast> 
        )}
        {contractEditToast && (
          <Toast messageType="success" message="Contract Edited"></Toast>
        )}
      </div>
    </>
  );
};

export default ContractList;
