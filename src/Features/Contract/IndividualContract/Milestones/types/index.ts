import { AxiosError } from "axios";
import { ContractApiType, Milestone } from "../../types";

export interface MilestonesHandlerPropType{
    responses: ContractApiType | AxiosError<unknown, any> | undefined;
    loading: boolean;
}

export interface MilestonesHandlerType{
    getMilestones: (responses: any) => void
}

export interface MilestonesPropType{
    milestones: Milestone[]|undefined;
    isCompletedCount: number
}