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
responses,
msa_id
}:MsaOverViewPropType) => {
  return (
      <div className={`${styles.maincontainer__overviewpayment}`}>
        <Card
          className={`${styles.maincontainer__overviewpayment__overview}`}
          loading={loading}
        >
          <div className={`${styles.maincontainer__overviewpayment__title}`}>
            <h4>Msa Details</h4>
          </div>
          <div className={`${styles.maincontainer__overviewpayment__content}`}>
            <div
              className={`${styles.maincontainer__overviewpayment__content__list}`}
            >
              <h5>Region</h5>
              <h5
                className={`${styles.maincontainer__overviewpayment__content__list__value}`}
              >
                {region}
              </h5>
            </div>
            <div
              className={`${styles.maincontainer__overviewpayment__content__list}`}
            >
              <h5>Start Date</h5>
              <h5
                className={`${styles.maincontainer__overviewpayment__content__list__value}`}
              >
                {startDate}
              </h5>
            </div>
            <div
              className={`${styles.maincontainer__overviewpayment__content__list}`}
            >
              <h5>End Date</h5>
              <h5
                className={`${styles.maincontainer__overviewpayment__content__list__value}`}
              >
                {endDate}
              </h5>
            </div>
            <div
              className={`${styles.maincontainer__overviewpayment__content__list}`}
            >
              <h5>Msa Term</h5>
              <h5
                className={`${styles.maincontainer__overviewpayment__content__list__value}`}
              >
                {msaTerm && msaTerm !== 0
                  ? `${msaTerm} Years`
                  : "1 Year"}
              </h5>
            </div>
          </div>
        </Card>
        <Card
          className={`${styles.maincontainer__overviewpayment__payment}`}
          loading={loading}
        >
          <div className={`${styles.maincontainer__overviewpayment__title}`}>
            <h4>Revenue Details</h4>
          </div>
          <div
            className={`${styles.maincontainer__overviewpayment__content__list}`}
          >
            <h5>Estimated Amount</h5>
            <h5
              className={`${styles.maincontainer__overviewpayment__content__list__value}`}
            >
              {totalEstimate !== 0
                ? totalEstimate / 1000000 > 1
                  ? `${totalEstimate / 1000000}M`
                  : `${totalEstimate / 1000}K`
                : 0}{" USD"}
            </h5>
          </div>
          
          
          <div
            className={`${styles.maincontainer__overviewpayment__content__list}`}
          >
            <h5>Fixed Fee Revenue</h5>
            <h5
              className={`${styles.maincontainer__overviewpayment__content__list__value}`}
            >
              {ffTotalEstimate !== 0
                ? ffTotalEstimate / 1000000 > 1
                  ? `${ffTotalEstimate / 1000000}M`
                  : `${ffTotalEstimate / 1000}K`
                : 0}{" USD"}
            </h5>
          </div>
          <div
            className={`${styles.maincontainer__overviewpayment__content__list}`}
          >
            <h5>T&M Revenue</h5>
            <h5
              className={`${styles.maincontainer__overviewpayment__content__list__value}`}
            >
              {tmTotalEstimate !== 0
                ? (tmTotalEstimate) / 1000000 > 1
                  ? `${(tmTotalEstimate) / 1000000}M`
                  : `${(tmTotalEstimate) / 1000}K`
                : 0}{" USD"}
            </h5>
          </div>
        </Card>

         
                <ContractListHandler responses={responses} id={msa_id} />
              {/* <Doughnut  data={chartData} options={options}></Doughnut> */}
              
    </div>
  )
}

export default MsaOverview
