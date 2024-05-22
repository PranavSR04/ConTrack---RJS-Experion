import React from 'react'
import styles from '../OverView/MsaOverview.module.css'
import { Doughnut } from 'react-chartjs-2'
import { Card } from 'antd'
import { MsaOverViewPropType } from '../OverView/types'

const ContractStatusGraph = ({chartData,
    options,
    noContracts,
    loading}:MsaOverViewPropType) => {
  return (
    <div>
      <div className={styles.maincontainer__overview__right}>
        <Card
          className={styles.maincontainer__overview__overview__count}
          loading={loading}
        >
          <div className={styles.maincontainer__overview__title}>
            <h4>Contract Status</h4>
          </div>
          <div className={styles.manincontainer__overview__doughnutchart}>
            {noContracts?
            <p>No Contracts Found</p>:
               <Doughnut  data={chartData} options={options}></Doughnut> }
          
        </div>
        </Card>
      </div>
    </div>
  )
}

export default ContractStatusGraph
