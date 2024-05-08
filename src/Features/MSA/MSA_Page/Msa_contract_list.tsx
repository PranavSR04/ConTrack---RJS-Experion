import { Card, Collapse, Space } from 'antd'
import React from 'react'
import styles from './Msa_contract_list.module.css'
import { MsaIndividualPage } from './types'
const Msa_contract_list = ({msaData,collapseComponents}:MsaIndividualPage) => {
    // const totalContractCount = msaData.total_contracts_count;
    // const collapseComponents = [];
    // for (let i = 1; i <= totalContractCount; i++) {
    //   collapseComponents.push(
    //     <Collapse
    //       key={i.toString()}
    //       collapsible="header"
    //       defaultActiveKey={['1']}
    //       items={[
    //         {
    //           key: '1',
    //           label: `Collapse Panel ${i}`,
    //           children: <p>Content for Panel {i}</p>,
    //         },
    //       ]}
    //     />
    //   );
    // }
  return (
    <Card className={styles.contract_list}>
      Contract List
      <div className={styles.contract_list_names}>
      <Space direction="vertical">
      {collapseComponents}
  </Space>
  </div>
    </Card>
    
  )
}

export default Msa_contract_list
