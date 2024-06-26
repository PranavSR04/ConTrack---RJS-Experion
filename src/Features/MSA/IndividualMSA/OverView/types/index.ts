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
    responses: MsaApiType | AxiosError<unknown, any> | undefined;
    noContracts: boolean
    startDate: string;
    endDate: string;
    totalEstimate: number;
    ffTotalEstimate: number;
    tmTotalEstimate: number;
    totalContractCount: number;
    tmContractCount: number;
    ffContractCount: number;
    loading: boolean;
    region: string;
    msaTerm:number;
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
  