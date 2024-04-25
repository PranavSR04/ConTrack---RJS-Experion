import { Card, Space, Table } from "antd";
import React from "react";
import styles from "./ContractList.module.css";
import { ContractListPropType } from "./types";
import { Doughnut } from "react-chartjs-2";
const ContractList = ({
  columns,
  contractData,
  chartData,
  options,
}: ContractListPropType) => {
  console.log(contractData, "is the contract data given");
  return (
    <>
      <Card className={styles.contract_list}>
        <div className={styles.contract_list_heading}>
          <h4>Contract List</h4>
        </div>
        <div>
          <Table
          className={styles.contract_list_table}
            dataSource={contractData}
            columns={columns}
            pagination={false}
            size="small"
          />
        </div>
      </Card>
      {/* <div style={{ width:'16vw'}}>
   <Card className={styles.contract_list_statusChart} style={{ height: '35vh '}}> <><Doughnut data={chartData} options={options}></Doughnut>
    <p style={{fontSize:'.7rem',textAlign:'center',fontWeight:'600'}}>Contract Status</p></>
  </Card>
      </div> */}
    </>
  );
};

export default ContractList;
