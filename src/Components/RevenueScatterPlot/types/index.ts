
import { ChartOptions, ChartData } from "chart.js";
 
 export interface ContractRevenue {
    contract_id: number;
    estimated_amount: number;
    duration_months: number;
  }

  export interface LineProps {
    options: ChartOptions<'scatter'>;
    data: ChartData<'scatter'>;
  }

 export interface ScatterPlotHandlerPropType{
    scatterData:Object
    fetchContractRevenue: () => Promise<void> 
     data: {
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        data: Object;
        pointBackgroundColor: string;
        pointBorderWidth: number;
        pointHoverRadius: number;
        pointHoverBackgroundColor: string;
        pointHoverBorderColor: string;
        pointHoverBorderWidth: number;
        pointRadius: number;
        pointHitRadius: number;
    }[];
}
}