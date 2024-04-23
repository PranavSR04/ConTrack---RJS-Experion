import { AxiosError } from "axios";
import { MsaApiType } from "../../types";

export interface HandlerPropType {
    responses: MsaApiType | AxiosError<unknown, any> | undefined;
    loading: boolean;
  }
  export interface OverviewHandlerType {
    getOverview: (responses: any) => void;
  }
  
  export interface MsaOverViewPropType {
    startDate: string;
    endDate: string;
    totalEstimate: number;
    ffTotalEstimate: number;
    tmTotalEstimate: number;
    loading: boolean;
    region: string;
    msaTerm:number;
    totalContracts: number;
    activeContracts: number;
    closedContracts: number;
    expiringContracts: number;
    onProgressContracts: number;
  }
  