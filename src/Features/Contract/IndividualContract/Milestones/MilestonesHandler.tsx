import React, { useEffect, useState } from "react";
import { MilestonesHandlerPropType, MilestonesHandlerType } from "./types";
import Milestones from "./Milestones";
import { Milestone } from "../types";

const MilestonesHandler = ({
  responses,
  loading,
}: MilestonesHandlerPropType) => {
  const [milestones, setMilestones] = useState<Milestone[] | undefined>();
  const [error, setError] = useState<string>("");
  const [isCompletedCount, setIsCompletedCount] = useState<number>(0)

  useEffect(() => {
    console.log("response in Header Handler", responses);
    getMilestones(responses);
  }, [responses]);

  // Function which is used to set the data required from response
  const getMilestones: MilestonesHandlerType["getMilestones"] = (responses) => {
    if (responses && responses.data && responses.data.length > 0) {
      setMilestones(responses.data[0].milestones);

      responses.data[0].milestones.forEach((milestone:any, index:number) => {
        const expectedCompletionDate = new Date(milestone.milestone_enddate);
        const today = new Date();
        console.log("today:", today)
        if (today >= expectedCompletionDate) {
            setIsCompletedCount(prev => prev + 1);
        }
      });
    } else {
      setError("Failed to get response");
    }
  };
  useEffect(() => {
    console.log("completedCount:", isCompletedCount);
  }, [isCompletedCount]);
  
  return (
    <>
      <Milestones milestones={milestones} isCompletedCount={isCompletedCount}/>
    </>
  );
};

export default MilestonesHandler;
