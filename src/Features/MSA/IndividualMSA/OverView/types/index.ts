import { AxiosError } from "axios";
import { MsaApiType } from "../../types";

export interface HandlerPropType {
    responses: MsaApiType | AxiosError<unknown, any> | undefined;
    loading: boolean;
    msa_id:string
  }
  export interface OverviewHandlerType {
    getOverview: (responses: any) => void;
  }
  
  export interface MsaOverViewPropType {
    responses: MsaApiType | AxiosError<unknown, any> | undefined;
    msa_id:string;
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
    chartData: {
      labels: string[];
      datasets: {
          data: number[];
          backgroundColor: string[];
      }[];
  }
  options: {
    plugins: {
        legend: {
            labels: {
                font: {
                    size: number;
                };
                boxWidth: number;
            };
        };
    };
}
  }
  