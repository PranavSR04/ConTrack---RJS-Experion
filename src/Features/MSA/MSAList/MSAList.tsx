import { ConfigProvider, Segmented, Table } from "antd";
import styles from './MSAList.module.css'
import { MsaListDataType } from "./types";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
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

  return (
    <>
    <div className={styles.MSAList}>
      <h3 className={styles.MSAList_heading}>MASTER SERVICE AGREEMENT</h3>
      <div className={styles.MSAList_Table}>
        <div className={styles.MSAList_Table_row1}>
        <div className={styles.MSAList_Table_row1_col1_Toggle}>
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
        <div className={styles.MSAList_Table_row1_col2_Addbutton}>
        {ROLE_ID !== 3 && (
        <button
                    className={styles.MSAList_Table_Addbutton}
                   onClick={handleAddMSA}
                  >
                    + Add MSA
                  </button>
        )}
        </div>
      </div>
      <div className={styles.MSAList_Table_Table}>
      <Table
      locale={{ emptyText: " " }}
      size="small"
      columns={columns}
      dataSource={data}
      scroll={scroll}
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
