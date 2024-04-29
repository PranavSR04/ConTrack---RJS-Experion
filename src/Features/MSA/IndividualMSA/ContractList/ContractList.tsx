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

    </>
  );
};

export default ContractList;
