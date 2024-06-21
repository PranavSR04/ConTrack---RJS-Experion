import React, { useEffect, useState } from "react";
import { HandlerPropType } from "../Header/types";
import Overview from "./Overview";
import { OverviewHandlerType } from "./types";
import { Milestone } from "../types";
import { MilestonesHandlerType } from "../Milestones/types";

const OverviewHandler = ({ responses, loading }: HandlerPropType) => {
  const [error, setError] = useState<string>("");
  const [dateOfSignature, setDateOfSignature] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [estimatedAmount, setEstimatedAmount] = useState<number>(0);
  const [contractTerm, setContractTerm] = useState<number>()
  const [milestones, setMilestones] = useState<Milestone[] | undefined>();
  const [isCompletedCount, setIsCompletedCount] = useState<number>(0)
  const [milestonesCount, setMilestonesCount] = useState<number>(0);
  const [revenueGenerated, setRevenueGenerated] = useState<number>(0)
  const [totalRevenue,setTotalRevenue] = useState<number>(0)
  const [contractAddedBy, setContractAddedBy] = useState<string>("");

  useEffect(() => {
    console.log("response in Header Handler", responses);
    getOverview(responses);
    getMilestones(responses)
  }, [responses]);

  const getOverview: OverviewHandlerType["getOverview"] = (responses) => {
    if (responses && responses.data && responses.data.length > 0) {
        console.log("res", responses.data[0]);
        setDateOfSignature(responses.data[0].date_of_signature);
        setRegion(responses.data[0].region);
        setContractAddedBy(responses.data[0].user_name);

        const startDate = new Date(responses.data[0].start_date);
        const endDate = new Date(responses.data[0].end_date);

        setStartDate(responses.data[0].start_date);
        setEndDate(responses.data[0].end_date);

        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); // Convert difference to months

        setContractTerm(diffMonths);
        setEstimatedAmount(responses.data[0].estimated_amount);
    } else {
        setError("Failed to get response");
    }
};


  const getMilestones: MilestonesHandlerType["getMilestones"] = (responses) => {
    if (responses && responses.data && responses.data.length > 0) {
      setMilestones(responses.data[0].milestones);

      responses.data[0].milestones.forEach((milestone:any, index:number) => {
        setMilestonesCount(prev => prev + 1)
        const expectedCompletionDate = new Date(milestone.milestone_enddate);
        const today = new Date();
        console.log("today:", today)
        if (today >= expectedCompletionDate) {
            setIsCompletedCount(prev => prev + 1);
            setRevenueGenerated(prev=> prev+ milestone.amount);
        }
        setTotalRevenue(prev=>prev+milestone.amount)
      });
    
    } else {
      setError("Failed to get response");
    }
  };
  useEffect(() => {
    console.log("completedCount:", isCompletedCount);
  }, [isCompletedCount]);

  return (
    <div>
      <Overview  dateOfSignature={dateOfSignature}
        startDate={startDate}
        endDate={endDate}
        estimatedAmount={estimatedAmount}
        loading={loading} 
        contractTerm={contractTerm}
        region={region}
        isCompletedCount={isCompletedCount}
        milestoneCount={milestonesCount}
        totalRevenue={totalRevenue}
        revenueGenerated={revenueGenerated}
        contractAddedBy={contractAddedBy}
        />
    </div>
  );
};

export default OverviewHandler;
