import React from 'react'
import { MsaOverViewPropType } from './types'
import styles from './MsaOverview.module.css'
import { Card } from 'antd'
import { Doughnut } from 'react-chartjs-2'
import ContractListHandler from '../ContractList/ContractListHandler'
const MsaOverview = ({
  startDate,
  endDate,
  totalEstimate,
  loading,
  region,
  msaTerm,
  totalContracts,
  activeContracts,
  closedContracts,
  expiringContracts,
  onProgressContracts,
  ffTotalEstimate,
  tmTotalEstimate,
chartData,options,
responses
,noContracts
}:MsaOverViewPropType) => {
  return (
    <div className={styles.maincontainer__overview__maindiv}>
      <div className={styles.maincontainer__overview__left}>
            <Card
              className={styles.maincontainer__overview__overview}
              loading={loading}
            >
              <div className={styles.maincontainer__overview__title}>
                <h4>Msa Details</h4>
              </div>
              <div className={styles.maincontainer__overview__content}>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>Region</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {region}
                  </h5>
                </div>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>Start Date</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {startDate}
                  </h5>
                </div>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>End Date</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {endDate}
                  </h5>
                </div>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>Msa Term</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {msaTerm && msaTerm !== 0
                      ? `${msaTerm} Years`
                      : "1 Year"}
                  </h5>
                </div>
              </div>
            </Card>
            <Card
              className={styles.maincontainer__overview__payment}
              loading={loading}
            >
              <div className={styles.maincontainer__overview__title}>
                <h4>Revenue Details</h4>
              </div>
              <div
                className={styles.maincontainer__overview__content__list}
              >
                <h5>Estimated Amount</h5>
                <h5
                  className={styles.maincontainer__overview__content__list__value}
                >
                  {totalEstimate !== 0
                    ? totalEstimate / 1000000 > 1
                      ? `${totalEstimate / 1000000}M`
                      : `${totalEstimate / 1000}K`
                    : 0}{" USD"}
                </h5>
              </div>
              
              
              <div
                className={styles.maincontainer__overview__content__list}
              >
                <h5>Fixed Fee Revenue</h5>
                <h5
                  className={styles.maincontainer__overview__content__list__value}
                >
                  {ffTotalEstimate !== 0
                    ? ffTotalEstimate / 1000000 > 1
                      ? `${ffTotalEstimate / 1000000}M`
                      : `${ffTotalEstimate / 1000}K`
                    : 0}{" USD"}
                </h5>
              </div>
              <div
                className={styles.maincontainer__overview__content__list}
              >
                <h5>T&M Revenue</h5>
                <h5
                  className={styles.maincontainer__overview__content__list__value}
                >
                  {tmTotalEstimate !== 0
                    ? (tmTotalEstimate) / 1000000 > 1
                      ? `${(tmTotalEstimate) / 1000000}M`
                      : `${(tmTotalEstimate) / 1000}K`
                    : 0}{" USD"}
                </h5>
              </div>
            </Card>
            {/* for demo only */}



            <Card
              className={styles.maincontainer__overview__overview__2}
              loading={loading}
            >
              <div className={styles.maincontainer__overview__title}>
                <h4>Msa Details</h4>
              </div>
              <div className={styles.maincontainer__overview__content}>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>Region</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {region}
                  </h5>
                </div>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>Start Date</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {startDate}
                  </h5>
                </div>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>End Date</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {endDate}
                  </h5>
                </div>
                <div
                  className={styles.maincontainer__overview__content__list}
                >
                  <h5>Msa Term</h5>
                  <h5
                    className={styles.maincontainer__overview__content__list__value}
                  >
                    {msaTerm && msaTerm !== 0
                      ? `${msaTerm} Years`
                      : "1 Year"}
                  </h5>
                </div>
              </div>
            </Card>
            {/* for demo end */}


      </div>
      <div className={styles.maincontainer__overview__right}>
          <Card
          className={styles.maincontainer__overview__overview_count}
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

export default MsaOverview
