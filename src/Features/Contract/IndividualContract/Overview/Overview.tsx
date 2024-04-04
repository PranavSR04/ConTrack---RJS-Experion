import React, { useEffect } from "react";
import styles from "./Overview.module.css";
import { Card } from "antd";
import { OverviewPropType } from "./types";

const Overview = ({
  dateOfSignature,
  startDate,
  endDate,
  estimatedAmount,
  loading,
  contractTerm,
  region,
  isCompletedCount,
  milestoneCount,
  totalRevenue,
  revenueGenerated,
}: OverviewPropType) => {
  return (
    <>
      <div className={`${styles.maincontainer__overviewpayment}`}>
        <Card
          className={`${styles.maincontainer__overviewpayment__overview}`}
          loading={loading}
        >
          <div className={`${styles.maincontainer__overviewpayment__title}`}>
            <h4>Contract Details</h4>
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
              <h5>Date of Signature</h5>
              <h5
                className={`${styles.maincontainer__overviewpayment__content__list__value}`}
              >
                {dateOfSignature}
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
              <h5>Contract Term</h5>
              <h5
                className={`${styles.maincontainer__overviewpayment__content__list__value}`}
              >
                {contractTerm && contractTerm !== 0
                  ? `${contractTerm} Years`
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
              {estimatedAmount !== 0
                ? estimatedAmount / 1000000 > 1
                  ? `${estimatedAmount / 1000000}M`
                  : `${estimatedAmount / 1000}K`
                : 0}{" USD"}
            </h5>
          </div>
          <div
            className={`${styles.maincontainer__overviewpayment__content__list}`}
          >
            <h5>Milestones Completed</h5>
            <h5
              className={`${styles.maincontainer__overviewpayment__content__list__value}`}
            >
              {isCompletedCount}
            </h5>
          </div>
          <div
            className={`${styles.maincontainer__overviewpayment__content__list}`}
          >
            <h5>Total Milestones</h5>
            <h5
              className={`${styles.maincontainer__overviewpayment__content__list__value}`}
            >
              {milestoneCount}
            </h5>
          </div>
          <div
            className={`${styles.maincontainer__overviewpayment__content__list}`}
          >
            <h5>Generated Revenue</h5>
            <h5
              className={`${styles.maincontainer__overviewpayment__content__list__value}`}
            >
              {revenueGenerated !== 0
                ? revenueGenerated / 1000000 > 1
                  ? `${revenueGenerated / 1000000}M`
                  : `${revenueGenerated / 1000}K`
                : 0}{" USD"}
            </h5>
          </div>
          <div
            className={`${styles.maincontainer__overviewpayment__content__list}`}
          >
            <h5>Pending Revenue</h5>
            <h5
              className={`${styles.maincontainer__overviewpayment__content__list__value}`}
            >
              {totalRevenue - revenueGenerated !== 0
                ? (totalRevenue - revenueGenerated) / 1000000 > 1
                  ? `${(totalRevenue - revenueGenerated) / 1000000}M`
                  : `${(totalRevenue - revenueGenerated) / 1000}K`
                : 0}{" USD"}
            </h5>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Overview;
