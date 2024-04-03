import React from "react";
import styles from "./Milestones.module.css";
import { Card, Divider, Steps } from "antd";
import { title } from "process";
import { MilestonesPropType } from "./types";

const Milestones = ({milestones, isCompletedCount}: MilestonesPropType) => {
  return (
    <>
      <div className={`${styles.milestones}`}>
        <div className={`${styles.milestones__heading}`}>
        <div>
          <h2>Milestones</h2>
        </div>
        <Divider />
        </div>
        <div className={`${styles.milestones__content}`}>
          <Steps
            progressDot
            current={isCompletedCount-1}
            direction="vertical"
            items={milestones && milestones.map((milestone, index) => ({
                title: `${milestone.milestone_desc}`,
                subTitle: `\nCompletion Date: ${milestone.milestone_enddate}`,
                description: `Amount: ${parseFloat(milestone.amount) / 1000}K USD`,
                // status: index === currentStepIndex ? "process" : index < currentStepIndex ? "finish" : "wait",
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default Milestones;
